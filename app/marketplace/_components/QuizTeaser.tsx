"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Question, ArrowRight, Sparkles } from "@phosphor-icons/react";

export function QuizTeaser() {
  return (
    <Link href="/quiz">
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="relative p-5 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all"
      >
        {/* Animated background elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-0 left-0 w-24 h-24 bg-white/20 rounded-full blur-2xl"
        />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Question className="w-6 h-6 text-white" weight="fill" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-sm">Discover Your Archetype</h3>
              <p className="text-white/90 text-xs">Take the 5-minute quiz</p>
            </div>
            <Sparkles className="w-5 h-5 text-yellow-300" weight="fill" />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-white/90 text-xs max-w-[200px]">
              Unlock personalized venue recommendations
            </p>
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-white" weight="bold" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
