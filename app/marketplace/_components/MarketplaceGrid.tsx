"use client";

import { useState } from "react";
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (venues.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-zinc-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">
          No spaces found
        </h3>
        <p className="text-sm text-zinc-500">
          Try adjusting your filters or search terms
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {visibleVenues.map((venue) => (
          <MarketplaceCard key={venue.id} venue={venue} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-6">
          <button
            onClick={loadMore}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-white/10 to-white/5 hover:from-white/15 hover:to-white/10 border border-white/10 text-white text-sm font-medium transition-all backdrop-blur-md"
            aria-label={`Load ${Math.min(ITEMS_PER_PAGE, venues.length - visibleCount)} more venues`}
          >
            Load More ({venues.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
