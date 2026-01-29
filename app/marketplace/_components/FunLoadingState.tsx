"use client";

import { motion } from "framer-motion";
import { Sparkle, Heart, Star, Coffee } from "@phosphor-icons/react";

const LOADING_MESSAGES = [
  { text: "Finding your perfect spots...", icon: Sparkle },
  { text: "Curating experiences...", icon: Heart },
  { text: "Discovering hidden gems...", icon: Star },
  { text: "Brewing recommendations...", icon: Coffee },
];

export function FunLoadingState() {
  const randomMessage = LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];
  const Icon = randomMessage.icon;

  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* Animated icon */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-6 shadow-lg"
      >
        <Icon className="w-10 h-10 text-white" weight="fill" />
      </motion.div>

      {/* Loading text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg font-semibold text-slate-900 mb-2"
      >
        {randomMessage.text}
      </motion.p>

      {/* Animated dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="w-2 h-2 rounded-full bg-blue-500"
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="w-64 h-1 bg-slate-200 rounded-full overflow-hidden mt-6">
        <motion.div
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-full w-1/2 bg-gradient-to-r from-blue-500 to-purple-500"
        />
      </div>
    </div>
  );
}
