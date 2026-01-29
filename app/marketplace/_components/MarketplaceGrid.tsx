"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MarketplaceCard } from "./MarketplaceCard";
import { SkeletonCard } from "./SkeletonCard";
import type { Venue } from "../page";

interface MarketplaceGridProps {
  venues: Venue[];
  isLoading?: boolean;
}

const ITEMS_PER_PAGE = 12;

export function MarketplaceGrid({ venues, isLoading = false }: MarketplaceGridProps) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const visibleVenues = venues.slice(0, visibleCount);
  const hasMore = visibleCount < venues.length;

  const loadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (venues.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-24"
      >
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center mx-auto mb-6 border border-slate-200">
          <svg
            className="w-10 h-10 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-3 tracking-tight">
          No spaces found
        </h3>
        <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
          We couldn't find any spaces matching your criteria. Try adjusting your filters or search terms to discover more.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {visibleVenues.map((venue) => (
          <MarketplaceCard key={venue.id} venue={venue} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-8">
          <motion.button
            onClick={loadMore}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/30"
            aria-label={`Load ${Math.min(ITEMS_PER_PAGE, venues.length - visibleCount)} more venues`}
          >
            Load More · {venues.length - visibleCount} remaining
          </motion.button>
        </div>
      )}
    </div>
  );
}
