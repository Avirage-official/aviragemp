"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  content: string;
  createdAt: Date;
  senderId: string;
  sender: {
    id: string;
    name: string | null;
    username: string | null;
  };
}

export function MessageThread({
  messages: initialMessages,
  currentUserId,
  conversationId,
}: {
  messages: Message[];
  currentUserId: string;
  conversationId: string;
}) {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  /* polling */
  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(
        `/api/messages?conversationId=${conversationId}`
      );
      const data = await res.json();
      if (data?.messages) setMessages(data.messages);
    }, 3000);

    return () => clearInterval(interval);
  }, [conversationId]);

  /* autoscroll */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-black/20">
        <div className="text-center space-y-3">
          <div className="text-4xl">💭</div>
          <p className="text-white/70 font-medium">
            No messages yet
          </p>
          <p className="text-sm text-white/40">
            Start the conversation when it feels right.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-black/20">
      <AnimatePresence initial={false}>
        {messages.map((msg, i) => {
          const isMe = msg.senderId === currentUserId;
          const previous = messages[i - 1];
          const sameSender =
            previous && previous.senderId === msg.senderId;

          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${
                isMe ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={[
                  "max-w-[70%] rounded-2xl px-4 py-3",
                  isMe
                    ? "bg-white text-black"
                    : "bg-white/[0.08] text-white",
                  sameSender
                    ? "rounded-tl-md rounded-tr-md"
                    : "",
                ].join(" ")}
              >
                <p className="text-sm leading-relaxed break-words">
                  {msg.content}
                </p>

                <div
                  className={`mt-1 text-[11px] ${
                    isMe ? "text-black/40" : "text-white/40"
                  }`}
                >
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      <div ref={bottomRef} />
    </div>
  );
}