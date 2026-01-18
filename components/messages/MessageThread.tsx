// components/messages/MessageThread.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PaperPlaneRight, 
  Smiley,
  Image as ImageIcon,
  Link as LinkIcon,
} from "@phosphor-icons/react";

type Message = {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
  sender: {
    name: string | null;
    username: string | null;
  };
};

function formatTime(date: string): string {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function MessageBubble({
  message,
  isOwn,
  showAvatar,
}: {
  message: Message;
  isOwn: boolean;
  showAvatar: boolean;
}) {
  const displayName = message.sender.name || message.sender.username || "Unknown";
  const initials = displayName.slice(0, 2).toUpperCase();

  // Detect if message contains URL
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const hasUrl = urlRegex.test(message.content);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-end gap-2 ${isOwn ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      {showAvatar ? (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4F8CFF] to-[#C7B9FF] flex items-center justify-center text-white text-xs font-bold shrink-0">
          {initials}
        </div>
      ) : (
        <div className="w-8 shrink-0" />
      )}

      {/* Message bubble */}
      <div className={`max-w-[65%] ${isOwn ? "items-end" : "items-start"} flex flex-col gap-1`}>
        <div
          className={`px-4 py-2.5 rounded-2xl ${
            isOwn
              ? "bg-[#4F8CFF] text-white rounded-br-sm"
              : "bg-white/[0.06] text-white rounded-bl-sm"
          }`}
        >
          <p className="text-sm whitespace-pre-wrap break-words">
            {hasUrl ? (
              // Render URLs as clickable links
              message.content.split(urlRegex).map((part, i) =>
                urlRegex.test(part) ? (
                  <a
                    key={i}
                    href={part}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:opacity-80"
                  >
                    {part}
                  </a>
                ) : (
                  part
                )
              )
            ) : (
              message.content
            )}
          </p>
        </div>

        <span className="text-[10px] text-white/40 px-1">
          {formatTime(message.createdAt)}
        </span>
      </div>
    </motion.div>
  );
}

export function MessageThread({
  conversationId,
  otherUser,
  currentUserId,
  currentUserName,
}: {
  conversationId: string;
  otherUser: {
    id: string;
    name: string | null;
    username: string | null;
  };
  currentUserId: string;
  currentUserName: string;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const otherUserName = otherUser.name || otherUser.username || "Unknown";

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(`/api/messages?conversationId=${conversationId}`);
      const data = await res.json();
      if (data.messages) {
        setMessages(data.messages);
      }
    };

    fetchMessages();
    
    // Poll for new messages every 3 seconds
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [conversationId]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const handleSend = async () => {
    if (!inputValue.trim() || isSending) return;

    setIsSending(true);
    try {
      const res = await fetch("/api/messages/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId,
          content: inputValue.trim(),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [...prev, data.message]);
        setInputValue("");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header - Desktop only (mobile shows in MessagesClient) */}
      <div className="hidden lg:flex px-6 py-4 border-b border-white/[0.06] items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4F8CFF] to-[#C7B9FF] flex items-center justify-center text-white text-sm font-bold">
          {otherUserName.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <h2 className="text-base font-semibold text-white">{otherUserName}</h2>
          <p className="text-xs text-white/50">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-4 lg:px-6 py-3 lg:py-4 space-y-3 lg:space-y-4"
      >
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-white/40 text-sm">No messages yet. Say hello! 👋</p>
          </div>
        ) : (
          <AnimatePresence>
            {messages.map((msg, index) => {
              const isOwn = msg.senderId === currentUserId;
              const prevMsg = index > 0 ? messages[index - 1] : null;
              const showAvatar = !prevMsg || prevMsg.senderId !== msg.senderId;

              return (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  isOwn={isOwn}
                  showAvatar={showAvatar}
                />
              );
            })}
          </AnimatePresence>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 lg:px-6 py-3 lg:py-4 border-t border-white/[0.06]">
        <div className="flex items-end gap-2 lg:gap-3">
          <div className="flex-1 relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              rows={1}
              className="w-full px-3 lg:px-4 py-2.5 lg:py-3 pr-10 lg:pr-12 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/40 focus:border-[#4F8CFF]/50 focus:bg-white/[0.06] outline-none resize-none"
              style={{ minHeight: "44px", maxHeight: "120px" }}
            />
            
            {/* Emoji button */}
            <button
              type="button"
              className="absolute right-2 lg:right-3 bottom-2.5 lg:bottom-3 p-1.5 rounded-lg hover:bg-white/[0.08] transition-colors"
            >
              <Smiley weight="regular" className="w-4 h-4 lg:w-5 lg:h-5 text-white/40" />
            </button>
          </div>

          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isSending}
            className="shrink-0 w-10 h-10 lg:w-11 lg:h-11 rounded-xl bg-[#4F8CFF] hover:bg-[#4F8CFF]/90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            <PaperPlaneRight weight="fill" className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
          </button>
        </div>

        {/* Formatting toolbar - desktop only */}
        <div className="hidden lg:flex items-center gap-1 mt-2 text-white/30">
          <button className="p-1.5 rounded hover:bg-white/[0.04] transition-colors">
            <span className="text-xs font-semibold">B</span>
          </button>
          <button className="p-1.5 rounded hover:bg-white/[0.04] transition-colors">
            <span className="text-xs font-semibold italic">I</span>
          </button>
          <button className="p-1.5 rounded hover:bg-white/[0.04] transition-colors">
            <span className="text-xs font-semibold underline">U</span>
          </button>
          <div className="w-px h-4 bg-white/[0.08] mx-1" />
          <button className="p-1.5 rounded hover:bg-white/[0.04] transition-colors">
            <LinkIcon weight="bold" className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded hover:bg-white/[0.04] transition-colors">
            <ImageIcon weight="bold" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}