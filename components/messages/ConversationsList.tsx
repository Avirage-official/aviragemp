"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface Conversation {
  id: string;
  otherUser: {
    id: string;
    name: string | null;
    username: string | null;
    primaryCode: string | null;
    avatar: string | null;
  } | null;
  lastMessage: {
    content: string;
    createdAt: Date;
    senderId: string;
  } | null;
  updatedAt: Date;
}

export function ConversationsList({
  conversations,
  currentUserId,
}: {
  conversations: Conversation[];
  currentUserId: string;
}) {
  const router = useRouter();

  if (conversations.length === 0) {
    return (
      <div className="h-full rounded-3xl border border-white/10 bg-white/[0.02] p-6 flex flex-col items-center justify-center text-center">
        <div className="text-5xl mb-4">💬</div>
        <p className="text-white/70 font-medium mb-1">
          No conversations yet
        </p>
        <p className="text-sm text-white/40 max-w-xs">
          When you message someone from your circle, it will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full rounded-3xl border border-white/10 bg-white/[0.02] overflow-y-auto">
      <div className="px-5 py-4 border-b border-white/10">
        <h2 className="text-sm uppercase tracking-wider text-white/60">
          Conversations
        </h2>
      </div>

      <div className="p-2 space-y-1">
        {conversations.map((conv) => {
          if (!conv.otherUser) return null;

          const other = conv.otherUser;
          const timeAgo = getTimeAgo(new Date(conv.updatedAt));
          const isFromMe =
            conv.lastMessage?.senderId === currentUserId;

          return (
            <motion.button
              key={conv.id}
              onClick={() =>
                router.push(`/dashboard/messages/${conv.id}`)
              }
              whileHover={{ x: 4 }}
              className="group relative w-full text-left rounded-2xl px-4 py-3 transition hover:bg-white/[0.06]"
            >
              {/* ambient hover glow */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl transition" />

              <div className="relative z-10 flex items-center gap-3">
                {/* avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {(other.name || other.username || "?")[0]?.toUpperCase()}
                </div>

                {/* text */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <p className="text-sm font-medium text-white truncate">
                      {other.name || other.username || "Anonymous"}
                    </p>
                    <span className="text-xs text-white/40 ml-2">
                      {timeAgo}
                    </span>
                  </div>

                  {conv.lastMessage ? (
                    <p className="text-xs text-white/60 truncate">
                      {isFromMe && "You: "}
                      {conv.lastMessage.content}
                    </p>
                  ) : (
                    <p className="text-xs text-white/40 italic">
                      No messages yet
                    </p>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor(
    (Date.now() - date.getTime()) / 1000
  );

  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d`;

  return date.toLocaleDateString();
}