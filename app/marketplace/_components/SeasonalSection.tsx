"use client";

import { motion } from "framer-motion";
import { Snowflake, Sun, Leaf, FlowerLotus } from "@phosphor-icons/react";
import { MarketplaceCard } from "./MarketplaceCard";
import type { Venue } from "../page";

interface SeasonalSectionProps {
  venues: Venue[];
}

// Determine current season
function getCurrentSeason() {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return "spring";
  if (month >= 5 && month <= 7) return "summer";
  if (month >= 8 && month <= 10) return "fall";
  return "winter";
}

const SEASON_CONFIG = {
  spring: {
    title: "Spring Awakening",
    description: "Fresh starts and blooming experiences",
    icon: FlowerLotus,
    gradient: "from-pink-500 to-green-500",
  },
  summer: {
    title: "Summer Vibes",
    description: "Sun-soaked adventures await",
    icon: Sun,
    gradient: "from-yellow-500 to-orange-500",
  },
  fall: {
    title: "Autumn Escapes",
    description: "Cozy moments and warm gatherings",
    icon: Leaf,
    gradient: "from-orange-500 to-red-500",
  },
  winter: {
    title: "Winter Wonderland",
    description: "Magical experiences in the cold",
    icon: Snowflake,
    gradient: "from-blue-500 to-cyan-500",
  },
};

export function SeasonalSection({ venues }: SeasonalSectionProps) {
  if (venues.length === 0) {
    return null;
  }

  const season = getCurrentSeason();
  const config = SEASON_CONFIG[season];
  const Icon = config.icon;
  const seasonalVenues = venues.slice(0, 6);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          animate={{
            rotate: season === "winter" ? [0, 360] : 0,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
          className={`flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br ${config.gradient}`}
        >
          <Icon className="w-5 h-5 text-white" weight="fill" />
        </motion.div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {config.title}
          </h2>
          <p className="text-sm text-slate-600">
            {config.description}
          </p>
        </div>
      </div>

      {/* Horizontal scrolling cards */}
      <div className="relative">
        <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar">
          {seasonalVenues.map((venue, index) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="min-w-[320px] flex-shrink-0"
            >
              <MarketplaceCard venue={venue} />
            </motion.div>
          ))}
        </div>

        {/* Fade gradient at edges */}
        <div className="absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </motion.div>
  );
}
