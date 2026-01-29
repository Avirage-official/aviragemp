// app/marketplace/MarketplaceClient.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MagnifyingGlass,
  MapPin,
  Check,
  CaretRight,
  Sparkle,
} from "@phosphor-icons/react";

/* ============================================================================
   TYPES
   ============================================================================ */

type Venue = {
  id: string;
  name: string;
  description: string | null;
  neighborhood: string | null;
  city: string;
  countryCode: string;
  subcategory: string;
  priceRange: string | null;
  imageUrl: string | null;
  compatibilityScores: Record<string, number>;
  vibes: string[];
  googleMapsUrl: string | null;
  website: string | null;
};

type SubcategoryFilter = "all" | "nomnoms" | "creativevibe";

/* ============================================================================
   CONSTANTS
   ============================================================================ */

const SUBCATEGORIES = [
  { id: "all" as const, label: "All Spaces", count: 0 },
  { id: "nomnoms" as const, label: "NomNoms", count: 0 },
  { id: "creativevibe" as const, label: "Creative Vibe", count: 0 },
];

// Vibe labels for display
const VIBE_LABELS: Record<string, string> = {
  date_quiet: "Date · Quiet",
  loud_friends: "Friends · Lively",
  solo_treat: "Solo · Treat",
  work_lunch: "Work Lunch",
  calm_focus: "Calm · Focus",
  high_energy_social: "High Energy · Social",
  creative_flow: "Creative Flow",
  solo_recharge: "Solo · Recharge",
};

/* ============================================================================
   UTILITY FUNCTIONS
   ============================================================================ */

function getMatchPercentage(
  scores: Record<string, number>,
  userArchetype: string | null
): number {
  if (!userArchetype) return 0;
  const archetypeLower = userArchetype.toLowerCase();
  return scores[archetypeLower] || 0;
}

function getMatchLevel(percentage: number): {
  label: string;
  color: string;
  bgColor: string;
} {
  if (percentage >= 85)
    return {
      label: "Perfect Match",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    };
  if (percentage >= 70)
    return {
      label: "Great Match",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    };
  if (percentage >= 50)
    return {
      label: "Good Match",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    };
  return {
    label: "Explore",
    color: "text-zinc-400",
    bgColor: "bg-zinc-500/10",
  };
}

/* ============================================================================
   VENUE CARD COMPONENT
   ============================================================================ */

function VenueCard({
  venue,
  userArchetype,
}: {
  venue: Venue;
  userArchetype: string | null;
}) {
  const matchPercentage = getMatchPercentage(
    venue.compatibilityScores,
    userArchetype
  );
  const matchLevel = getMatchLevel(matchPercentage);

  return (
    <Link href={`/marketplace/${venue.id}`}>
      <motion.article
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className="group h-full"
      >
        <div className="relative h-full bg-[#111111] border border-white/5 hover:border-white/10 rounded-lg overflow-hidden transition-all duration-200">
          {/* Image Section */}
          <div className="relative aspect-[4/3] bg-zinc-900 overflow-hidden">
            {venue.imageUrl ? (
              <img
                src={venue.imageUrl}
                alt={venue.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800">
                <Sparkle className="w-12 h-12 text-zinc-700" weight="duotone" />
              </div>
            )}

            {/* Match Badge - Only show if user has archetype */}
            {userArchetype && matchPercentage > 0 && (
              <div
                className={`absolute top-3 right-3 px-2.5 py-1.5 rounded-md ${matchLevel.bgColor} backdrop-blur-sm border border-white/10`}
              >
                <span className={`text-xs font-semibold ${matchLevel.color}`}>
                  {matchPercentage}% Match
                </span>
              </div>
            )}

            {/* Subcategory Badge */}
            <div className="absolute top-3 left-3 px-2.5 py-1.5 rounded-md bg-black/60 backdrop-blur-sm border border-white/10">
              <span className="text-xs font-medium text-white">
                {venue.subcategory === "nomnoms"
                  ? "NomNoms"
                  : "Creative Vibe"}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4 space-y-3">
            {/* Title */}
            <h3 className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
              {venue.name}
            </h3>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-sm text-zinc-400">
              <MapPin className="w-4 h-4 flex-shrink-0" weight="fill" />
              <span className="truncate">
                {venue.neighborhood
                  ? `${venue.neighborhood}, ${venue.city}`
                  : venue.city}
              </span>
            </div>

            {/* Description */}
            {venue.description && (
              <p className="text-sm text-zinc-500 line-clamp-2 leading-relaxed">
                {venue.description}
              </p>
            )}

            {/* Vibes */}
            {venue.vibes.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {venue.vibes.slice(0, 2).map((vibe) => (
                  <span
                    key={vibe}
                    className="px-2 py-1 rounded bg-zinc-800/50 border border-white/5 text-xs text-zinc-400"
                  >
                    {VIBE_LABELS[vibe] || vibe}
                  </span>
                ))}
                {venue.vibes.length > 2 && (
                  <span className="px-2 py-1 rounded bg-zinc-800/50 border border-white/5 text-xs text-zinc-400">
                    +{venue.vibes.length - 2}
                  </span>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              {/* Price */}
              <div>
                {venue.priceRange ? (
                  <span className="text-sm font-semibold text-white">
                    {venue.priceRange}
                  </span>
                ) : (
                  <span className="text-sm text-zinc-500">Price varies</span>
                )}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-1 text-sm text-blue-400 group-hover:gap-2 transition-all">
                <span className="font-medium">View</span>
                <CaretRight className="w-4 h-4" weight="bold" />
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

/* ============================================================================
   MAIN COMPONENT
   ============================================================================ */

export default function MarketplaceClient({
  initialVenues,
  userArchetype,
}: {
  initialVenues: Venue[];
  userArchetype: string | null;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] =
    useState<SubcategoryFilter>("all");
  const [showMatchedOnly, setShowMatchedOnly] = useState(false);

  // Calculate category counts
  const counts = useMemo(() => {
    return {
      all: initialVenues.length,
      nomnoms: initialVenues.filter((v) => v.subcategory === "nomnoms").length,
      creativevibe: initialVenues.filter((v) => v.subcategory === "creativevibe")
        .length,
    };
  }, [initialVenues]);

  // Filter venues
  const filteredVenues = useMemo(() => {
    let filtered = [...initialVenues];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (v) =>
          v.name.toLowerCase().includes(query) ||
          v.description?.toLowerCase().includes(query) ||
          v.city.toLowerCase().includes(query) ||
          v.neighborhood?.toLowerCase().includes(query)
      );
    }

    // Subcategory filter
    if (selectedSubcategory !== "all") {
      filtered = filtered.filter((v) => v.subcategory === selectedSubcategory);
    }

    // Matched only filter
    if (showMatchedOnly && userArchetype) {
      filtered = filtered.filter((v) => {
        const match = getMatchPercentage(v.compatibilityScores, userArchetype);
        return match >= 70; // Only show 70%+ matches
      });
    }

    // Sort by match percentage if user has archetype
    if (userArchetype) {
      filtered.sort((a, b) => {
        const matchA = getMatchPercentage(a.compatibilityScores, userArchetype);
        const matchB = getMatchPercentage(b.compatibilityScores, userArchetype);
        return matchB - matchA;
      });
    }

    return filtered;
  }, [initialVenues, searchQuery, selectedSubcategory, showMatchedOnly, userArchetype]);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          {/* Title Section */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-1">
              Discover Spaces
            </h1>
            <p className="text-sm text-zinc-400">
              Curated venues matched to your personality
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <MagnifyingGlass
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500"
              weight="bold"
            />
            <input
              type="text"
              placeholder="Search spaces, neighborhoods, vibes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-lg bg-[#111111] border border-white/5 text-sm text-white placeholder:text-zinc-500 focus:border-white/10 focus:bg-[#151515] outline-none transition-all"
            />
          </div>

          {/* Filters Row */}
          <div className="flex items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex items-center gap-2">
              {SUBCATEGORIES.map((cat) => {
                const count = counts[cat.id];
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedSubcategory(cat.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedSubcategory === cat.id
                        ? "bg-white text-black"
                        : "bg-[#111111] text-zinc-400 hover:text-white hover:bg-[#151515] border border-white/5"
                    }`}
                  >
                    {cat.label}
                    <span
                      className={`ml-2 text-xs ${
                        selectedSubcategory === cat.id
                          ? "text-black/60"
                          : "text-zinc-500"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Match Filter Toggle - Only show if user has archetype */}
            {userArchetype && (
              <button
                onClick={() => setShowMatchedOnly(!showMatchedOnly)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  showMatchedOnly
                    ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    : "bg-[#111111] text-zinc-400 hover:text-white hover:bg-[#151515] border border-white/5"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center ${
                    showMatchedOnly
                      ? "bg-blue-500 border-blue-500"
                      : "border-zinc-600"
                  }`}
                >
                  {showMatchedOnly && (
                    <Check className="w-3 h-3 text-white" weight="bold" />
                  )}
                </div>
                Best Matches Only
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-6 py-8">
        {/* Results Info */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-zinc-400">
            <span className="text-white font-medium">
              {filteredVenues.length}
            </span>{" "}
            {filteredVenues.length === 1 ? "space" : "spaces"} found
          </p>

          {/* Active Filters */}
          {(searchQuery || showMatchedOnly || selectedSubcategory !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedSubcategory("all");
                setShowMatchedOnly(false);
              }}
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Venues Grid */}
        {filteredVenues.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredVenues.map((venue) => (
              <VenueCard
                key={venue.id}
                venue={venue}
                userArchetype={userArchetype}
              />
            ))}
          </div>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mb-4">
              <MagnifyingGlass
                className="w-8 h-8 text-zinc-700"
                weight="duotone"
              />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              No spaces found
            </h3>
            <p className="text-sm text-zinc-500 mb-6 max-w-md">
              Try adjusting your filters or search terms to discover more
              venues.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedSubcategory("all");
                setShowMatchedOnly(false);
              }}
              className="px-4 py-2 rounded-lg bg-[#111111] border border-white/5 text-white text-sm font-medium hover:bg-[#151515] transition-all"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}