"use client";

import { useState } from "react";

const MOODS = [
  { id: "social", label: "Feeling social", emoji: "🎉" },
  { id: "recharging", label: "Recharging", emoji: "🔋" },
  { id: "open", label: "Open to plans", emoji: "📅" },
  { id: "focused", label: "Focused/busy", emoji: "🎯" }
];

export function MoodSelector({ currentMood }: { currentMood: string | null }) {
  const [mood, setMood] = useState(currentMood);
  const [loading, setLoading] = useState(false);
  
  async function updateMood(newMood: string) {
    setLoading(true);
    await fetch("/api/users/mood", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mood: newMood })
    });
    setMood(newMood);
    setLoading(false);
  }
  
  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h3 className="font-semibold mb-3">Your Current Mood</h3>
      
      <div className="flex gap-2 flex-wrap">
        {MOODS.map(m => (
          <button
            key={m.id}
            onClick={() => updateMood(m.label)}
            disabled={loading}
            className={`px-4 py-2 rounded transition disabled:opacity-50 ${
              mood === m.label 
                ? "bg-blue-600 text-white" 
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <span className="mr-1">{m.emoji}</span>
            {m.label}
          </button>
        ))}
      </div>
      
      {mood && (
        <p className="text-sm text-gray-600 mt-3">
          Friends can see your mood status
        </p>
      )}
    </div>
  );
}