// app/marketplace/MarketplaceClient.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MagnifyingGlass,
  MapPin,
  Sparkle,
  Lightning,
  X,
} from "@phosphor-icons/react";
import type { Venue } from "./page";

/* ============================================================================
   TYPES
   ============================================================================ */

type SubcategoryFilter =
  | "all"
  | "nomnoms"
  | "creativevibe"
  | "wellness"
  | "nightlife"
  | "outdoors"
  | "learning"
  | "community";

/* ============================================================================
   CONSTANTS
   ============================================================================ */

const SUBCATEGORIES = [
  { id: "all" as const, label: "All Spaces" },
  { id: "nomnoms" as const, label: "NomNoms" },
  { id: "creativevibe" as const, label: "Creative" },
  { id: "wellness" as const, label: "Wellness" },
  { id: "nightlife" as const, label: "Nightlife" },
  { id: "outdoors" as const, label: "Outdoors" },
  { id: "learning" as const, label: "Learning" },
  { id: "community" as const, label: "Community" },
];

const VIBE_OPTIONS = [
  // Universal
  { id: "date_quiet", label: "Date · Quiet" },
  { id: "loud_friends", label: "Friends · Lively" },
  { id: "solo_treat", label: "Solo · Treat" },
  { id: "work_friendly", label: "Work Friendly" },
  { id: "quick_visit", label: "Quick Visit" },
  { id: "all_day_hangout", label: "All Day Hangout" },
  { id: "work_lunch", label: "Work Lunch" },
  // NomNoms
  { id: "coffee_focused", label: "Coffee Focused" },
  { id: "full_meal_experience", label: "Full Meal" },
  { id: "late_night_eats", label: "Late Night Eats" },
  { id: "brunch_scene", label: "Brunch Scene" },
  { id: "bar_bites", label: "Bar Bites" },
  // Creative
  { id: "hands_on_making", label: "Hands-On Making" },
  { id: "performance_space", label: "Performance Space" },
  { id: "gallery_browsing", label: "Gallery Browsing" },
  { id: "creative_flow", label: "Creative Flow" },
  { id: "collaborative_energy", label: "Collaborative" },
  // Wellness
  { id: "deep_healing", label: "Deep Healing" },
  { id: "gentle_movement", label: "Gentle Movement" },
  { id: "mindful_practice", label: "Mindful Practice" },
  { id: "body_focused", label: "Body Focused" },
  { id: "spiritual_journey", label: "Spiritual Journey" },
  // Nightlife
  { id: "high_energy_party", label: "High Energy Party" },
  { id: "intimate_cocktails", label: "Intimate Cocktails" },
  { id: "live_music", label: "Live Music" },
  { id: "dance_floor", label: "Dance Floor" },
  { id: "after_hours", label: "After Hours" },
  // Outdoors
  { id: "nature_immersion", label: "Nature Immersion" },
  { id: "active_adventure", label: "Active Adventure" },
  { id: "scenic_relaxation", label: "Scenic Relaxation" },
  { id: "group_activity", label: "Group Activity" },
  { id: "solo_exploration", label: "Solo Exploration" },
  // Learning
  { id: "structured_class", label: "Structured Class" },
  { id: "self_paced_learning", label: "Self-Paced Learning" },
  { id: "skill_building", label: "Skill Building" },
  { id: "knowledge_exchange", label: "Knowledge Exchange" },
  { id: "workshop_style", label: "Workshop Style" },
  // Community
  { id: "networking_friendly", label: "Networking Friendly" },
  { id: "co_working_vibe", label: "Co-Working Vibe" },
  { id: "social_meetup", label: "Social Meetup" },
  { id: "support_circle", label: "Support Circle" },
  { id: "casual_gathering", label: "Casual Gathering" },
];

/* ============================================================================
   HELPER FUNCTIONS
   ============================================================================ */

function getMatchPercentage(
  scores: Record<string, number>,
  userArchetype: string | null
): number {
  if (!userArchetype) return 0;
  return scores[userArchetype.toLowerCase()] || 0;
}

function getMatchLevel(percentage: number): {
  color: string;
  bgColor: string;
} {
  if (percentage >= 85)
    return { color: "text-emerald-400", bgColor: "bg-emerald-500/10" };
  if (percentage >= 70)
    return { color: "text-green-400", bgColor: "bg-green-500/10" };
  if (percentage >= 50)
    return { color: "text-blue-400", bgColor: "bg-blue-500/10" };
  return { color: "text-zinc-400", bgColor: "bg-zinc-500/10" };
}

/* ============================================================================
   VENUE CARD COMPONENTS
   ============================================================================ */

function HeroVenueCard({
  venue,
  matchPercentage,
}: {
  venue: Venue;
  matchPercentage: number;
}) {
  const matchLevel = getMatchLevel(matchPercentage);

  return (
    <Link href={`/marketplace/${venue.id}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="relative h-[280px] rounded-xl overflow-hidden group cursor-pointer"
      >
        {/* Image */}
        {venue.imageUrl ? (
          <img
            src={venue.imageUrl}
            alt={venue.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-zinc-800 flex items-center justify-center">
            <Sparkle className="w-16 h-16 text-zinc-700" weight="duotone" />
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        {/* Match Badge */}
        <div
          className={`absolute top-4 right-4 px-3 py-1.5 rounded-lg ${matchLevel.bgColor} backdrop-blur-md border border-white/10`}
        >
          <span className={`text-sm font-semibold ${matchLevel.color}`}>
            {matchPercentage}% Match
          </span>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">
            {venue.name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-zinc-300 mb-2">
            <MapPin className="w-4 h-4" weight="fill" />
            <span className="line-clamp-1">
              {venue.neighborhood
                ? `${venue.neighborhood}, ${venue.city}`
                : venue.city}
            </span>
          </div>
          {venue.description && (
            <p className="text-sm text-zinc-400 line-clamp-2">
              {venue.description}
            </p>
          )}
        </div>
      </motion.div>
    </Link>
  );
}

function StandardVenueCard({
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
      <motion.div
        whileHover={{ y: -4 }}
        className="group h-full rounded-lg overflow-hidden bg-[#111111] border border-white/5 hover:border-white/10 transition-all"
      >
        {/* Image */}
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

          {/* Match Badge */}
          {userArchetype && matchPercentage > 0 && (
            <div
              className={`absolute top-3 right-3 px-2.5 py-1 rounded-md ${matchLevel.bgColor} backdrop-blur-sm border border-white/10`}
            >
              <span className={`text-xs font-semibold ${matchLevel.color}`}>
                {matchPercentage}%
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-base font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
            {venue.name}
          </h3>
          <div className="flex items-center gap-1.5 text-sm text-zinc-400 mb-3">
            <MapPin className="w-4 h-4 flex-shrink-0" weight="fill" />
            <span className="truncate">
              {venue.neighborhood
                ? `${venue.neighborhood}, ${venue.city}`
                : venue.city}
            </span>
          </div>
          {venue.priceRange && (
            <span className="text-sm font-medium text-white">
              {venue.priceRange}
            </span>
          )}
        </div>
      </motion.div>
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
  const [selectedCategory, setSelectedCategory] =
    useState<SubcategoryFilter>("all");
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [showVibeFilter, setShowVibeFilter] = useState(false);

  // Get top matches
  const topMatches = useMemo(() => {
    if (!userArchetype) return [];

    return [...initialVenues]
      .map((venue) => ({
        venue,
        match: getMatchPercentage(venue.compatibilityScores, userArchetype),
      }))
      .filter((item) => item.match >= 70)
      .sort((a, b) => b.match - a.match)
      .slice(0, 4);
  }, [initialVenues, userArchetype]);

  // Filter venues
  const filteredVenues = useMemo(() => {
    let filtered = [...initialVenues];

    // Search
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

    // Category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((v) => v.subcategory === selectedCategory);
    }

    // Vibes
    if (selectedVibes.length > 0) {
      filtered = filtered.filter((v) =>
        selectedVibes.some((vibe) => v.vibes.includes(vibe))
      );
    }

    // Sort by match if user has archetype
    if (userArchetype) {
      filtered.sort((a, b) => {
        const matchA = getMatchPercentage(a.compatibilityScores, userArchetype);
        const matchB = getMatchPercentage(b.compatibilityScores, userArchetype);
        return matchB - matchA;
      });
    }

    return filtered;
  }, [initialVenues, searchQuery, selectedCategory, selectedVibes, userArchetype]);

  const toggleVibe = (vibeId: string) => {
    setSelectedVibes((prev) =>
      prev.includes(vibeId)
        ? prev.filter((v) => v !== vibeId)
        : [...prev, vibeId]
    );
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-white/5">
        <div className="max-w-[1800px] mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">
                Discover Spaces
              </h1>
              <p className="text-sm text-zinc-400">
                Curated venues matched to your personality
              </p>
            </div>

            {/* Search */}
            <div className="relative w-[400px]">
              <MagnifyingGlass
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500"
                weight="bold"
              />
              <input
                type="text"
                placeholder="Search spaces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-lg bg-[#111111] border border-white/5 text-sm text-white placeholder:text-zinc-500 focus:border-white/10 outline-none transition-all"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {SUBCATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-white text-black"
                    : "bg-transparent text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Left: Content */}
          <div className="flex-1">
            {/* Top Matches Hero Section */}
            {topMatches.length > 0 && !searchQuery && selectedCategory === "all" && selectedVibes.length === 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <Lightning className="w-6 h-6 text-emerald-400" weight="fill" />
                  <h2 className="text-2xl font-bold text-white">
                    Top Matches For You
                  </h2>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                  {topMatches.map(({ venue, match }) => (
                    <HeroVenueCard
                      key={venue.id}
                      venue={venue}
                      matchPercentage={match}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* All Spaces */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">
                  {selectedCategory === "all" ? "All Spaces" : SUBCATEGORIES.find(c => c.id === selectedCategory)?.label}
                  <span className="ml-2 text-zinc-500">
                    ({filteredVenues.length})
                  </span>
                </h2>

                {/* Clear Filters */}
                {(searchQuery || selectedCategory !== "all" || selectedVibes.length > 0) && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                      setSelectedVibes([]);
                    }}
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    Clear filters
                  </button>
                )}
              </div>

              {/* Venues Grid */}
              {filteredVenues.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filteredVenues.map((venue) => (
                    <StandardVenueCard
                      key={venue.id}
                      venue={venue}
                      userArchetype={userArchetype}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mx-auto mb-4">
                    <MagnifyingGlass className="w-8 h-8 text-zinc-700" weight="duotone" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    No spaces found
                  </h3>
                  <p className="text-sm text-zinc-500">
                    Try adjusting your filters
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Vibe Filters Sidebar */}
          <div className="hidden lg:block w-[280px] flex-shrink-0">
            <div className="sticky top-6">
              <div className="rounded-lg bg-[#111111] border border-white/5 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-white">
                    Filter by Vibe
                  </h3>
                  {selectedVibes.length > 0 && (
                    <button
                      onClick={() => setSelectedVibes([])}
                      className="text-xs text-zinc-400 hover:text-white transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
                  {VIBE_OPTIONS.map((vibe) => (
                    <button
                      key={vibe.id}
                      onClick={() => toggleVibe(vibe.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-xs transition-all ${
                        selectedVibes.includes(vibe.id)
                          ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                          : "bg-zinc-800/30 text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                      }`}
                    >
                      {vibe.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Vibe Filter Button */}
      <button
        onClick={() => setShowVibeFilter(true)}
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-xl z-50"
      >
        <Sparkle className="w-6 h-6" weight="fill" />
      </button>

      {/* Mobile Vibe Filter Modal */}
      {showVibeFilter && (
        <div className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            className="w-full bg-[#0A0A0A] rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">
                Filter by Vibe
              </h3>
              <button
                onClick={() => setShowVibeFilter(false)}
                className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center"
              >
                <X className="w-5 h-5 text-white" weight="bold" />
              </button>
            </div>

            <div className="space-y-2">
              {VIBE_OPTIONS.map((vibe) => (
                <button
                  key={vibe.id}
                  onClick={() => toggleVibe(vibe.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all ${
                    selectedVibes.includes(vibe.id)
                      ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      : "bg-zinc-800/30 text-zinc-400"
                  }`}
                >
                  {vibe.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}