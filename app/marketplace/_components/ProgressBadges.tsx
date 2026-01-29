"use client";

import { motion } from "framer-motion";
import { Trophy, Star, Sparkle, Medal } from "@phosphor-icons/react";

const BADGES = [
  { id: "explorer", label: "Explorer", icon: Sparkle, progress: 75, color: "from-blue-500 to-cyan-500" },
  { id: "socialite", label: "Socialite", icon: Star, progress: 50, color: "from-purple-500 to-pink-500" },
  { id: "adventurer", label: "Adventurer", icon: Trophy, progress: 30, color: "from-orange-500 to-red-500" },
];

export function ProgressBadges() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200"
    >
      <div className="flex items-center gap-2 mb-3">
        <Medal className="w-5 h-5 text-yellow-600" weight="fill" />
        <h3 className="text-sm font-semibold text-slate-900">Your Progress</h3>
      </div>

      <div className="space-y-3">
        {BADGES.map((badge, index) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg bg-gradient-to-br ${badge.color}`}>
                  <badge.icon className="w-3.5 h-3.5 text-white" weight="fill" />
                </div>
                <span className="text-xs font-medium text-slate-700">{badge.label}</span>
              </div>
              <span className="text-xs font-semibold text-slate-900">{badge.progress}%</span>
            </div>
            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${badge.progress}%` }}
                transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
                className={`h-full bg-gradient-to-r ${badge.color}`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
