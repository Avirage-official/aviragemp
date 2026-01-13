"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function MessageInput({
  conversationId,
}: {
  conversationId: string;
}) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const router = useRouter();

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim() || sending) return;

    setSending(true);
    await fetch("/api/messages/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conversationId,
        content: text.trim(),
      }),
    });

    setText("");
    setSending(false);
    router.refresh();
  }

  return (
    <form
      onSubmit={send}
      className="flex items-center gap-3 border-t border-white/10 bg-black px-6 py-4"
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Message…"
        className="flex-1 rounded-full bg-white/10 px-4 py-2 text-sm text-white placeholder-white/40 outline-none focus:ring-1 focus:ring-white/20"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black disabled:opacity-40"
      >
        Send
      </button>
    </form>
  );
}
