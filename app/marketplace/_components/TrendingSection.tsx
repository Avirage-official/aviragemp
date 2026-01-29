"use client";

import { motion } from "framer-motion";
import { TrendUp, Fire } from "@phosphor-icons/react";
import { MarketplaceCard } from "./MarketplaceCard";
import type { Venue } from "../page";

interface TrendingSectionProps {
  venues: Venue[];
  title?: string;
}

export function TrendingSection({ venues, title = "Trending Now" }: TrendingSectionProps) {
  if (venues.length === 0) {
    return null;
  }

  const trendingVenues = venues.slice(0, 6);

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
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500"
        >
          <Fire className="w-5 h-5 text-white" weight="fill" />
        </motion.div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            {title}
            <TrendUp className="w-6 h-6 text-orange-500" weight="bold" />
          </h2>
          <p className="text-sm text-slate-600">
            Hot spots in your area right now
          </p>
        </div>
      </div>

      {/* Grid of trending venues */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingVenues.map((venue, index) => (
          <motion.div
            key={venue.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            {/* Trending badge */}
            {index < 3 && (
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                className="absolute -top-2 -right-2 z-10 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-lg"
              >
                #{index + 1}
              </motion.div>
            )}
            <MarketplaceCard venue={venue} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
