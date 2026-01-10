"use client";

import { useEffect, useRef, useState } from "react";

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
  conversationId
}: { 
  messages: Message[], 
  currentUserId: string,
  conversationId: string
}) {
  const [messages, setMessages] = useState(initialMessages);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Polling for new messages (every 3 seconds)
  useEffect(() => {
    const interval = setInterval(async () => {
      const response = await fetch(`/api/messages?conversationId=${conversationId}`);
      const data = await response.json();
      if (data.messages) {
        setMessages(data.messages);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [conversationId]);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-2">👋</div>
          <p>No messages yet. Say hello!</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
      {messages.map(msg => (
        <div
          key={msg.id}
          className={`flex ${
            msg.senderId === currentUserId ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[70%] rounded-lg p-3 ${
              msg.senderId === currentUserId
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-900"
            }`}
          >
            <p className="break-words">{msg.content}</p>
            <p className={`text-xs mt-1 ${
              msg.senderId === currentUserId ? "text-blue-100" : "text-gray-500"
            }`}>
              {new Date(msg.createdAt).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
        </div>
      ))}
      <div ref={scrollRef} />
    </div>
  );
}