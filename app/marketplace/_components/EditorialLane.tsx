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
    <section className="mb-20">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-6 px-6">
        <h2 className="text-2xl font-semibold text-white tracking-tight">
          {title}
        </h2>
      </div>

      {/* Lane */}
      <div className="relative overflow-x-auto scrollbar-hide">
        <div className="flex gap-6 px-6 pb-3">
          {venues.map((venue, idx) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.03 }}
              className="flex-[0_0_340px]"
            >
              <MarketplaceCard venue={venue} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
