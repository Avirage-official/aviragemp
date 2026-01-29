"use client";

import { motion } from "framer-motion";
import type { Venue } from "../page";
import { MarketplaceCard } from "./MarketplaceCard";

export function EditorialLane({
  title,
  venues,
}: {
  title: string;
  venues: Venue[];
}) {
  if (!venues.length) return null;

  return (
    <section className="mb-24 w-full">
      {/* Section Header - Enhanced with Count */}
      <div className="flex items-end justify-between mb-7 px-6 max-w-[1800px] mx-auto">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight mb-1">
            {title}
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            {venues.length} {venues.length === 1 ? "space" : "spaces"} available
          </p>
        </div>
      </div>

      {/* Lane - Enhanced with Momentum Scrolling - Full Width */}
      <div className="relative overflow-x-auto scrollbar-hide scroll-smooth">
        <div className="flex gap-8 px-6 pb-4" style={{ scrollSnapType: "x mandatory" }}>
          {venues.map((venue, idx) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: idx * 0.04 }}
              className="flex-[0_0_360px] scroll-snap-align-start"
              style={{ scrollSnapAlign: "start" }}
            >
              <MarketplaceCard venue={venue} />
            </motion.div>
          ))}
        </div>
        
        {/* Scroll Fade Indicators */}
        <div className="absolute top-0 right-0 bottom-4 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 bottom-4 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
