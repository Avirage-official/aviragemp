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

  // Polling (keep for now)
  useEffect(() => {
    const i = setInterval(async () => {
      const res = await fetch(
        `/api/messages?conversationId=${conversationId}`
      );
      const data = await res.json();
      if (data.messages) setMessages(data.messages);
    }, 3000);

    return () => clearInterval(i);
  }, [conversationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 bg-black">
      <AnimatePresence initial={false}>
        {messages.map((m) => {
          const isMe = m.senderId === currentUserId;

          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex mb-4 ${
                isMe ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  isMe
                    ? "bg-white text-black"
                    : "bg-white/10 text-white"
                }`}
              >
                <p>{m.content}</p>
                <p
                  className={`mt-1 text-[10px] ${
                    isMe ? "text-black/50" : "text-white/40"
                  }`}
                >
                  {new Date(m.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      <div ref={bottomRef} />
    </div>
  );
}
