"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell } from "@phosphor-icons/react";

export function NotificationsBell() {
  const [unreadCount] = useState(3); // TODO: Fetch from API
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all shadow-sm"
      >
        <Bell className="w-5 h-5 text-slate-700" weight="bold" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center"
          >
            {unreadCount}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full right-0 mt-2 w-80 p-4 bg-white rounded-xl border border-slate-200 shadow-xl z-50"
          >
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Notifications</h3>
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                <p className="text-xs text-blue-900">
                  New venue near you: <span className="font-semibold">Café Harmony</span>
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                <p className="text-xs text-green-900">
                  Your friend checked in at <span className="font-semibold">Zen Studio</span>
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
                <p className="text-xs text-purple-900">
                  Complete your profile to unlock personalized recommendations
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
