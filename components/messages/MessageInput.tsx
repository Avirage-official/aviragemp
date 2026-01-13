"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function MessageInput({
  conversationId,
}: {
  conversationId: string;
}) {
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  const router = useRouter();

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim() || sending) return;

    setSending(true);

    await fetch("/api/messages/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conversationId,
        content: content.trim(),
      }),
    });

    setContent("");
    setSending(false);
    router.refresh();
  }

  return (
    <form
      onSubmit={send}
      className="border-t border-white/10 bg-black px-6 py-4"
    >
      <div className="flex items-center gap-3">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Say something meaningful…"
          disabled={sending}
          className="flex-1 rounded-full bg-white/10 px-5 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
        />

        <button
          disabled={!content.trim() || sending}
          className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black hover:opacity-90 disabled:opacity-40"
        >
          Send
        </button>
      </div>
    </form>
  );
}
