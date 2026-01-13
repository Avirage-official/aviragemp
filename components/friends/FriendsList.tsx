"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

interface Friend {
  id: string;
  user: {
    id: string;
    name: string | null;
    username: string | null;
    primaryCode: string | null;
    currentMood: string | null;
    avatar: string | null;
  };
}

export function FriendsList({ friends }: { friends: Friend[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function startConversation(friendUserId: string) {
    setLoading(friendUserId);

    const res = await fetch("/api/conversations/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ friendId: friendUserId }),
    });

    const data = await res.json();
    setLoading(null);

    if (data?.conversationId) {
      router.push(`/dashboard/messages/${data.conversationId}`);
    }
  }

  if (friends.length === 0) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-12 text-center">
        <div className="text-5xl mb-4">🌌</div>
        <h2 className="text-xl font-medium text-white mb-2">
          Your circle is forming
        </h2>
        <p className="text-white/50 max-w-sm mx-auto">
          Invite people who move like you. ETHOS is about alignment, not numbers.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {friends.map(({ id, user }) => {
        const isLoading = loading === user.id;

        return (
          <motion.div
            key={id}
            whileHover={{ y: -6 }}
            className="relative rounded-3xl border border-white/10 bg-white/[0.02] p-6 overflow-hidden"
          >
            {/* mood aura */}
            {user.currentMood && (
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 to-transparent blur-xl" />
            )}

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                  {(user.name || user.username || "?")[0]?.toUpperCase()}
                </div>

                <div>
                  <p className="text-white font-medium">
                    {user.name || user.username || "Anonymous"}
                  </p>
                  <p className="text-xs text-white/50">
                    {user.primaryCode || "Unknown code"}
                  </p>

                  {user.currentMood && (
                    <p className="text-xs text-blue-400 mt-1">
                      {user.currentMood}
                    </p>
                  )}
                </div>
              </div>

              {/* hover actions */}
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => startConversation(user.id)}
                  disabled={isLoading}
                  className="rounded-full bg-white text-black px-3 py-1 text-xs font-medium hover:opacity-90 transition"
                >
                  {isLoading ? "..." : "Message"}
                </button>
                <button
                  onClick={() => router.push("/dashboard/meetups")}
                  className="rounded-full border border-white/20 px-3 py-1 text-xs text-white hover:bg-white/10 transition"
                >
                  Meetup
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
