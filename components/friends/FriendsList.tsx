"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Calendar, Sparkles } from "lucide-react";

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

const MOOD_EMOJIS: Record<string, string> = {
  "Feeling social": "🎉",
  "Recharging": "🔋",
  "Open to plans": "📅",
  "Focused/busy": "🎯"
};

const CODE_COLORS: Record<string, string> = {
  "stillmind": "#C7B9FF",
  "earthlistener": "#7CF5C8",
  "fireweaver": "#FF6B6B",
  "skyweaver": "#4F8CFF",
  "waveborn": "#4ECDC4",
  "stonebound": "#95A99C"
};

export function FriendsList({ friends }: { friends: Friend[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function startConversation(friendUserId: string) {
    setLoading(friendUserId);

    try {
      const res = await fetch("/api/conversations/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ friendId: friendUserId }),
      });

      const data = await res.json();
      
      if (data?.conversationId) {
        router.push(`/dashboard/messages/${data.conversationId}`);
      }
    } catch (error) {
      console.error("Failed to start conversation:", error);
    } finally {
      setLoading(null);
    }
  }

  if (friends.length === 0) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-12 sm:p-16 text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4F8CFF]/20 to-[#7CF5C8]/20 flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-10 h-10 text-[#7CF5C8]" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">
          Your circle is empty — for now
        </h3>
        <p className="text-white/60 max-w-md mx-auto text-lg">
          ETHOS connects people through personality, not algorithms. 
          Invite people who move like you.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white mb-4">
        {friends.length} {friends.length === 1 ? "Friend" : "Friends"}
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {friends.map(({ id, user }) => {
          const isLoading = loading === user.id;
          const displayName = user.name || user.username || "Anonymous";
          const initial = displayName[0]?.toUpperCase() || "?";
          const codeKey = user.primaryCode?.toLowerCase() || "stillmind";
          const codeColor = CODE_COLORS[codeKey] || "#4F8CFF";
          const moodEmoji = user.currentMood ? MOOD_EMOJIS[user.currentMood] : null;

          return (
            <motion.div
              key={id}
              whileHover={{ y: -4 }}
              className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-6 overflow-hidden transition-all hover:border-white/20"
            >
              {/* Glow effect on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${codeColor}15, transparent 70%)`
                }}
              />

              {/* Content */}
              <div className="relative z-10 space-y-4">
                {/* Avatar & Info */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-black"
                      style={{
                        background: `linear-gradient(135deg, ${codeColor}, ${codeColor}CC)`
                      }}
                    >
                      {initial}
                    </div>

                    {/* Name & Code */}
                    <div>
                      <p className="text-white font-semibold">
                        {displayName}
                      </p>
                      <p className="text-xs text-white/50">
                        {user.primaryCode || "Unknown Code"}
                      </p>
                    </div>
                  </div>

                  {/* Mood Badge */}
                  {moodEmoji && (
                    <div className="px-2 py-1 rounded-lg bg-white/5 border border-white/10">
                      <span className="text-sm">{moodEmoji}</span>
                    </div>
                  )}
                </div>

                {/* Current Mood Text */}
                {user.currentMood && (
                  <p className="text-xs text-white/60 px-3 py-2 rounded-xl bg-white/5">
                    {user.currentMood}
                  </p>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => startConversation(user.id)}
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white text-black text-sm font-medium hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    {isLoading ? "..." : "Message"}
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/meetups")}
                    className="px-4 py-2 rounded-xl border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-all"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}