"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smiley, SmileyMeh, SmileySad, Heart, Fire, Sun, Moon } from "@phosphor-icons/react";

const MOOD_OPTIONS = [
  { id: "energized", label: "Energized", icon: Fire, color: "from-orange-500 to-red-500" },
  { id: "happy", label: "Happy", icon: Smiley, color: "from-yellow-500 to-orange-500" },
  { id: "calm", label: "Calm", icon: Sun, color: "from-blue-500 to-cyan-500" },
  { id: "peaceful", label: "Peaceful", icon: Moon, color: "from-indigo-500 to-purple-500" },
  { id: "neutral", label: "Neutral", icon: SmileyMeh, color: "from-slate-500 to-slate-600" },
  { id: "low", label: "Low", icon: SmileySad, color: "from-slate-600 to-slate-700" },
];

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMoodSelect = async (moodId: string) => {
    setSelectedMood(moodId);
    // TODO: Save mood to backend
    setTimeout(() => setIsExpanded(false), 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative"
    >
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200 flex items-center gap-3 hover:shadow-md transition-all"
      >
        <Heart className="w-5 h-5 text-pink-600" weight="fill" />
        <div className="flex-1 text-left">
          <p className="text-xs font-medium text-pink-900">How are you feeling?</p>
          {selectedMood && (
            <p className="text-xs text-pink-700">
              {MOOD_OPTIONS.find((m) => m.id === selectedMood)?.label}
            </p>
          )}
        </div>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 p-3 bg-white rounded-xl border border-slate-200 shadow-xl z-50"
          >
            <div className="grid grid-cols-3 gap-2">
              {MOOD_OPTIONS.map((mood) => (
                <motion.button
                  key={mood.id}
                  onClick={() => handleMoodSelect(mood.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-lg flex flex-col items-center gap-1 transition-all ${
                    selectedMood === mood.id
                      ? `bg-gradient-to-br ${mood.color} text-white shadow-md`
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <mood.icon className="w-6 h-6" weight="fill" />
                  <span className="text-xs font-medium">{mood.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
