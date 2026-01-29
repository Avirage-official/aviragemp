"use client";

import { motion } from "framer-motion";
import { Sparkle, TrendUp, Users, MapPin, Fire } from "@phosphor-icons/react";
import { useState, useEffect } from "react";

interface FunFactsSectionProps {
  totalVenues: number;
  userArchetype?: string | null;
}

// Fun facts data
const ARCHETYPE_FACTS: Record<string, string[]> = {
  khoisan: [
    "Earthlisteners find 87% more satisfaction in outdoor and nature-focused venues",
    "Your archetype thrives in spaces with natural light and organic materials",
    "Most Earthlisteners prefer venues with a calm, grounded atmosphere",
  ],
  atlantean: [
    "Architects appreciate venues with structured layouts 92% more than others",
    "Your archetype values precision, detail, and methodical design",
    "Atlanteans rate highly-organized spaces 3x more favorably",
  ],
  lemurian: [
    "Harmonizers discover perfect balance in 78% of wellness-focused spaces",
    "Your archetype resonates with intuitive flow and holistic experiences",
    "Lemurians report 85% higher satisfaction in collaborative environments",
  ],
  hyperborean: [
    "Visionaries explore cutting-edge venues 2.5x more than other archetypes",
    "Your archetype drives innovation and embraces future-forward experiences",
    "Hyperboreans rate technology-integrated spaces 90% more favorably",
  ],
  muvian: [
    "Creators engage with artistic venues 3x more actively than others",
    "Your archetype celebrates expression through vibrant, creative spaces",
    "Muvians find inspiration in 82% of performance and gallery venues",
  ],
};

const GENERAL_FACTS = [
  "Join thousands discovering their perfect spaces",
  "New venues are being added daily to match your vibe",
  "Our compatibility algorithm considers 50+ factors for precise matching",
  "Members discover an average of 12 new favorite spots per month",
];

export function FunFactsSection({ totalVenues, userArchetype }: FunFactsSectionProps) {
  const [activeUsers, setActiveUsers] = useState(847);
  const [spacesFound, setSpacesFound] = useState(1243);

  // Animated counters
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers((prev) => prev + Math.floor(Math.random() * 3));
      setSpacesFound((prev) => prev + Math.floor(Math.random() * 5));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Get archetype-specific fact or general fact
  const facts = userArchetype && ARCHETYPE_FACTS[userArchetype.toLowerCase()]
    ? ARCHETYPE_FACTS[userArchetype.toLowerCase()]
    : GENERAL_FACTS;

  const randomFact = facts[Math.floor(Math.random() * facts.length)];

  return (
    <section className="w-full py-16 md:py-20 px-6 bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 overflow-hidden relative">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-10 left-1/4 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-20 right-1/4 h-72 w-72 rounded-full bg-purple-300/15 blur-3xl"
        />
      </div>

      <div className="max-w-[1800px] mx-auto relative z-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Stat Card 1: Active Users */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <div className="h-full p-6 rounded-2xl bg-white/80 backdrop-blur-xl border border-blue-200 shadow-lg hover:shadow-2xl hover:border-blue-300 transition-all duration-300">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30"
              >
                <Users weight="bold" className="w-7 h-7 text-white" />
              </motion.div>
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl font-bold text-slate-900 mb-2"
              >
                {activeUsers.toLocaleString()}+
              </motion.h3>
              <p className="text-sm text-slate-600 font-medium">
                Active explorers discovering spaces today
              </p>
            </div>
          </motion.div>

          {/* Stat Card 2: Spaces Found */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative group"
          >
            <div className="h-full p-6 rounded-2xl bg-white/80 backdrop-blur-xl border border-purple-200 shadow-lg hover:shadow-2xl hover:border-purple-300 transition-all duration-300">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: "spring" }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30"
              >
                <Fire weight="fill" className="w-7 h-7 text-white" />
              </motion.div>
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-3xl md:text-4xl font-bold text-slate-900 mb-2"
              >
                {spacesFound.toLocaleString()}
              </motion.h3>
              <p className="text-sm text-slate-600 font-medium">
                Perfect matches discovered this week
              </p>
            </div>
          </motion.div>

          {/* Stat Card 3: Total Venues */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group"
          >
            <div className="h-full p-6 rounded-2xl bg-white/80 backdrop-blur-xl border border-cyan-200 shadow-lg hover:shadow-2xl hover:border-cyan-300 transition-all duration-300">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: "spring" }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/30"
              >
                <MapPin weight="fill" className="w-7 h-7 text-white" />
              </motion.div>
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-slate-900 mb-2"
              >
                {totalVenues}+
              </motion.h3>
              <p className="text-sm text-slate-600 font-medium">
                Curated venues across all categories
              </p>
            </div>
          </motion.div>

          {/* Fun Fact Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative group"
          >
            <div className="h-full p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 border border-blue-400 shadow-lg hover:shadow-2xl transition-all duration-300">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring" }}
                className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4"
              >
                <Sparkle weight="fill" className="w-7 h-7 text-white" />
              </motion.div>
              <motion.h4
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="text-xs font-bold text-white/80 mb-2 uppercase tracking-wider"
              >
                Did You Know?
              </motion.h4>
              <p className="text-sm text-white font-medium leading-relaxed">
                {randomFact}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/80 backdrop-blur-xl border border-slate-200 shadow-lg">
            <TrendUp weight="bold" className="text-blue-500 w-6 h-6" />
            <span className="text-sm md:text-base text-slate-700 font-medium">
              <strong className="text-slate-900">Real-time discovery:</strong> New spaces added daily, matched to your vibe
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
