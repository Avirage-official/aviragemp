"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function MessageInput({ conversationId }: { conversationId: string }) {
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  const router = useRouter();
  
  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    
    if (!content.trim() || sending) return;
    
    setSending(true);
    
    try {
      await fetch("/api/messages/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId,
          content: content.trim()
        })
      });
      
      setContent("");
      router.refresh();
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setSending(false);
    }
  }
  
  return (
    <div className="bg-white border-t p-4">
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(e)}
          placeholder="Type a message..."
          disabled={sending}
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 text-gray-900"
        />
        <button
          type="submit"
          disabled={!content.trim() || sending}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
        >
          {sending ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}