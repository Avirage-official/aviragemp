"use client";

import { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  content: string;
  createdAt: Date;
  senderId: string;
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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  return (
    <div className="flex-1 overflow-y-auto bg-black px-6 py-6 space-y-3">
      {messages.map((m) => {
        const mine = m.senderId === currentUserId;

        return (
          <div
            key={m.id}
            className={`flex ${mine ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                mine
                  ? "bg-white text-black"
                  : "bg-white/10 text-white"
              }`}
            >
              {m.content}
              <div
                className={`mt-1 text-[10px] ${
                  mine ? "text-black/40" : "text-white/40"
                }`}
              >
                {new Date(m.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        );
      })}

      <div ref={bottomRef} />
    </div>
  );
}
