"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  MagnifyingGlass,
  Sparkle,
  X,
} from "@phosphor-icons/react";
import type { Venue } from "./page";

import { HeroBannerCanvas } from "./_components/HeroBannerCanvas";
import { EditorialLane } from "./_components/EditorialLane";

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
  { id: "date_quiet", label: "Date · Quiet" },
  { id: "loud_friends", label: "Friends · Lively" },
  { id: "solo_treat", label: "Solo · Treat" },
  { id: "work_friendly", label: "Work Friendly" },
  { id: "quick_visit", label: "Quick Visit" },
  { id: "all_day_hangout", label: "All Day Hangout" },
  { id: "work_lunch", label: "Work Lunch" },
  { id: "coffee_focused", label: "Coffee Focused" },
  { id: "full_meal_experience", label: "Full Meal" },
  { id: "late_night_eats", label: "Late Night Eats" },
  { id: "brunch_scene", label: "Brunch Scene" },
  { id: "bar_bites", label: "Bar Bites" },
  { id: "hands_on_making", label: "Hands-On Making" },
  { id: "performance_space", label: "Performance Space" },
  { id: "gallery_browsing", label: "Gallery Browsing" },
  { id: "creative_flow", label: "Creative Flow" },
  { id: "collaborative_energy", label: "Collaborative" },
  { id: "deep_healing", label: "Deep Healing" },
  { id: "gentle_movement", label: "Gentle Movement" },
  { id: "mindful_practice", label: "Mindful Practice" },
  { id: "body_focused", label: "Body Focused" },
  { id: "spiritual_journey", label: "Spiritual Journey" },
  { id: "high_energy_party", label: "High Energy Party" },
  { id: "intimate_cocktails", label: "Intimate Cocktails" },
  { id: "live_music", label: "Live Music" },
  { id: "dance_floor", label: "Dance Floor" },
  { id: "after_hours", label: "After Hours" },
  { id: "nature_immersion", label: "Nature Immersion" },
  { id: "active_adventure", label: "Active Adventure" },
  { id: "scenic_relaxation", label: "Scenic Relaxation" },
  { id: "group_activity", label: "Group Activity" },
  { id: "solo_exploration", label: "Solo Exploration" },
  { id: "structured_class", label: "Structured Class" },
  { id: "self_paced_learning", label: "Self-Paced Learning" },
  { id: "skill_building", label: "Skill Building" },
  { id: "knowledge_exchange", label: "Knowledge Exchange" },
  { id: "workshop_style", label: "Workshop Style" },
  { id: "networking_friendly", label: "Networking Friendly" },
  { id: "co_working_vibe", label: "Co-Working Vibe" },
  { id: "social_meetup", label: "Social Meetup" },
  { id: "support_circle", label: "Support Circle" },
  { id: "casual_gathering", label: "Casual Gathering" },
];

/* ============================================================================
   HELPERS
============================================================================ */

function getMatchPercentage(
  scores: Record<string, number>,
  userArchetype: string | null
): number {
  if (!userArchetype) return 0;
  return scores[userArchetype.toLowerCase()] || 0;
}

/* ============================================================================
   GRID CARD (used only when user forces it via search/filter)
============================================================================ */

function GridCard({ venue }: { venue: Venue }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-xl overflow-hidden bg-[#111111] border border-white/5 hover:border-white/10 transition-all"
    >
      <div className="relative aspect-[4/3] bg-zinc-900 overflow-hidden">
        {venue.imageUrl ? (
          <img
            src={venue.imageUrl}
            alt={venue.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Sparkle className="w-10 h-10 text-zinc-700" weight="duotone" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-4">
        <div className="text-white font-medium line-clamp-2">{venue.name}</div>
        <div className="text-xs text-zinc-400 mt-1 line-clamp-1">
          {venue.neighborhood
            ? `${venue.neighborhood}, ${venue.city}`
            : venue.city}
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================================
   MAIN
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
  const [forceGrid, setForceGrid] = useState(false);

  const toggleVibe = (vibeId: string) => {
    setSelectedVibes((prev) =>
      prev.includes(vibeId)
        ? prev.filter((v) => v !== vibeId)
        : [...prev, vibeId]
    );
  };

  const clearAll = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedVibes([]);
    setForceGrid(false);
  };

  const filtersActive =
    forceGrid ||
    !!searchQuery.trim() ||
    selectedCategory !== "all" ||
    selectedVibes.length > 0;

  // === Featured (hero)
  const heroVenues = useMemo(() => {
    if (!userArchetype) return [];
    return [...initialVenues]
      .map((v) => ({
        venue: v,
        match: getMatchPercentage(v.compatibilityScores, userArchetype),
      }))
      .filter((x) => x.match >= 70 && x.venue.imageUrl)
      .sort((a, b) => b.match - a.match)
      .slice(0, 5);
  }, [initialVenues, userArchetype]);

  // === Filtered venues (grid-mode)
  const filteredVenues = useMemo(() => {
    let filtered = [...initialVenues];

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

    if (selectedCategory !== "all") {
      filtered = filtered.filter((v) => v.subcategory === selectedCategory);
    }

    if (selectedVibes.length > 0) {
      filtered = filtered.filter((v) =>
        selectedVibes.some((vibe) => v.vibes.includes(vibe))
      );
    }

    if (userArchetype) {
      filtered.sort((a, b) => {
        const matchA = getMatchPercentage(a.compatibilityScores, userArchetype);
        const matchB = getMatchPercentage(b.compatibilityScores, userArchetype);
        return matchB - matchA;
      });
    }

    return filtered;
  }, [initialVenues, searchQuery, selectedCategory, selectedVibes, userArchetype]);

  // === Editorial lanes (default-mode)
  const lanes = useMemo(() => {
    const pick = (subcategory: SubcategoryFilter) => {
      let items = initialVenues.filter((v) => v.subcategory === subcategory);

      if (userArchetype) {
        items = items.sort((a, b) => {
          const ma = getMatchPercentage(a.compatibilityScores, userArchetype);
          const mb = getMatchPercentage(b.compatibilityScores, userArchetype);
          return mb - ma;
        });
      }

      // alive but not cramped
      return items.slice(0, 12);
    };

    return [
      { title: "NomNoms", venues: pick("nomnoms") },
      { title: "Creative", venues: pick("creativevibe") },
      { title: "Wellness", venues: pick("wellness") },
      { title: "Nightlife", venues: pick("nightlife") },
      { title: "Outdoors", venues: pick("outdoors") },
      { title: "Learning", venues: pick("learning") },
      { title: "Community", venues: pick("community") },
    ].filter((x) => x.venues.length > 0);
  }, [initialVenues, userArchetype]);

  return (
    <div className="min-h-screen bg-black">
      {/* Sticky Header Bar */}
      <div className="sticky top-0 z-40 bg-black/70 backdrop-blur border-b border-white/5">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="hidden md:block">
              <div className="text-white text-lg font-semibold">
                Discover Spaces
              </div>
              <div className="text-xs text-zinc-400">
                Curated discovery without noise
              </div>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-[420px]">
              <MagnifyingGlass
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500"
                weight="bold"
              />
              <input
                type="text"
                placeholder="Search spaces..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.trim()) setForceGrid(true);
                }}
                className="w-full h-11 pl-10 pr-4 rounded-lg bg-[#111111] border border-white/5 text-sm text-white placeholder:text-zinc-500 focus:border-white/10 outline-none transition-all"
              />
            </div>

            {/* Desktop: View All toggle */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => setForceGrid((v) => !v)}
                className="h-11 px-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-white transition"
                type="button"
              >
                {forceGrid ? "Curated view" : "View all"}
              </button>

              {(searchQuery ||
                selectedCategory !== "all" ||
                selectedVibes.length > 0) && (
                <button
                  onClick={clearAll}
                  className="h-11 px-4 rounded-lg text-sm text-zinc-300 hover:text-white transition"
                  type="button"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mt-4 flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {SUBCATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  if (cat.id !== "all") setForceGrid(true);
                }}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-white text-black"
                    : "bg-transparent text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
                type="button"
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* DEFAULT MODE (no grid) */}
      {!filtersActive && (
        <>
          <HeroBannerCanvas venues={heroVenues} />
          <div className="max-w-[1800px] mx-auto">
            {lanes.map((lane) => (
              <EditorialLane
                key={lane.title}
                title={lane.title}
                venues={lane.venues}
              />
            ))}
          </div>
        </>
      )}

      {/* GRID MODE (only when user intends it) */}
      {filtersActive && (
        <div className="max-w-[1800px] mx-auto px-6 py-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              Results
              <span className="ml-2 text-zinc-500">
                ({filteredVenues.length})
              </span>
            </h2>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setForceGrid(false)}
                className="text-sm text-zinc-400 hover:text-white transition"
                type="button"
              >
                Back to curated
              </button>
              <button
                onClick={clearAll}
                className="text-sm text-zinc-400 hover:text-white transition"
                type="button"
              >
                Clear filters
              </button>
            </div>
          </div>

          {filteredVenues.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredVenues.map((v) => (
                <GridCard key={v.id} venue={v} />
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
      )}

      {/* Mobile Vibe Filter Button */}
      <button
        onClick={() => setShowVibeFilter(true)}
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-xl z-50"
        type="button"
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
                type="button"
              >
                <X className="w-5 h-5 text-white" weight="bold" />
              </button>
            </div>

            <div className="space-y-2">
              {VIBE_OPTIONS.map((vibe) => (
                <button
                  key={vibe.id}
                  onClick={() => {
                    toggleVibe(vibe.id);
                    setForceGrid(true);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all ${
                    selectedVibes.includes(vibe.id)
                      ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      : "bg-zinc-800/30 text-zinc-400"
                  }`}
                  type="button"
                >
                  {vibe.label}
                </button>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  setShowVibeFilter(false);
                }}
                className="flex-1 h-11 rounded-lg bg-white text-black text-sm font-semibold"
                type="button"
              >
                Apply
              </button>
              <button
                onClick={() => setSelectedVibes([])}
                className="h-11 px-4 rounded-lg bg-white/5 text-white text-sm border border-white/10"
                type="button"
              >
                Clear
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
