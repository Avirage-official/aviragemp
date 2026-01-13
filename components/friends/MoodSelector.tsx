"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const MOODS = [
  { id: "social", label: "Feeling social", emoji: "🎉", color: "from-pink-500/30 to-purple-500/30" },
  { id: "recharging", label: "Recharging", emoji: "🔋", color: "from-emerald-500/30 to-green-500/30" },
  { id: "open", label: "Open to plans", emoji: "📅", color: "from-blue-500/30 to-cyan-500/30" },
  { id: "focused", label: "Focused / busy", emoji: "🎯", color: "from-orange-500/30 to-red-500/30" }
];

export function MoodSelector({ currentMood }: { currentMood: string | null }) {
  const [mood, setMood] = useState(currentMood);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function updateMood(newMood: string) {
    if (newMood === mood) return;

    setLoading(true);
    await fetch("/api/users/mood", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mood: newMood }),
    });
    setMood(newMood);
    setLoading(false);
    router.refresh();
  }

  return (
    <div className="relative rounded-3xl border border-white/10 bg-white/[0.02] p-6 overflow-hidden">
      {/* ambient glow */}
      {mood && (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent blur-2xl" />
        </div>
      )}

      <h3 className="relative z-10 text-sm uppercase tracking-wider text-white/60 mb-4">
        Your current mood
      </h3>

      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {MOODS.map((m) => {
          const active = mood === m.label;

          return (
            <motion.button
              key={m.id}
              onClick={() => updateMood(m.label)}
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              animate={
                active
                  ? { y: [0, -4, 0] }
                  : { y: 0 }
              }
              transition={
                active
                  ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.2 }
              }
              className={[
                "relative rounded-2xl p-4 text-left transition",
                "border border-white/10",
                active
                  ? "bg-white/[0.08]"
                  : "bg-white/[0.03] hover:bg-white/[0.06]",
              ].join(" ")}
            >
              {/* mood aura */}
              {active && (
                <div
                  className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br ${m.color} blur-xl`}
                />
              )}

              <div className="relative z-10 flex items-center gap-3">
                <span className="text-2xl">{m.emoji}</span>
                <span className="text-sm font-medium text-white">
                  {m.label}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {mood && (
        <p className="relative z-10 mt-4 text-xs text-white/40">
          This signal helps friends understand your availability.
        </p>
      )}
    </div>
  );
}
