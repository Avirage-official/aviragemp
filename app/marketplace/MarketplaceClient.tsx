"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { X, Sparkle } from "@phosphor-icons/react";
import type { Venue } from "./page";

import { MarketplaceHero } from "./_components/MarketplaceHero";
import { FiltersBar } from "./_components/FiltersBar";
import { MarketplaceGrid } from "./_components/MarketplaceGrid";
import { EditorialLane } from "./_components/EditorialLane";

/* ============================================================================
   TYPES & CONSTANTS
   ============================================================================ */

type LayoutMode = "grid" | "editorial";

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
   MAIN COMPONENT
   ============================================================================ */

export default function MarketplaceClient({
  initialVenues,
  userArchetype,
}: {
  initialVenues: Venue[];
  userArchetype: string | null;
}) {
  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Determine layout mode
  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCategory !== "all" ||
    selectedVibes.length > 0;

  const layoutMode: LayoutMode = hasActiveFilters ? "grid" : "editorial";

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedVibes([]);
  };

  // Hero venues (top matches for user)
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

  // Filtered venues for grid mode
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

    // Sort by match if user is logged in
    if (userArchetype) {
      filtered.sort((a, b) => {
        const matchA = getMatchPercentage(a.compatibilityScores, userArchetype);
        const matchB = getMatchPercentage(b.compatibilityScores, userArchetype);
        return matchB - matchA;
      });
    }

    return filtered;
  }, [initialVenues, searchQuery, selectedCategory, selectedVibes, userArchetype]);

  // Editorial lanes (by category)
  const editorialLanes = useMemo(() => {
    const pickByCategory = (subcategory: string) => {
      let items = initialVenues.filter((v) => v.subcategory === subcategory);

      if (userArchetype) {
        items = items.sort((a, b) => {
          const ma = getMatchPercentage(a.compatibilityScores, userArchetype);
          const mb = getMatchPercentage(b.compatibilityScores, userArchetype);
          return mb - ma;
        });
      }

      return items.slice(0, 12);
    };

    const categories = [
      { title: "NomNoms", subcategory: "nomnoms" },
      { title: "Creative", subcategory: "creativevibe" },
      { title: "Wellness", subcategory: "wellness" },
      { title: "Nightlife", subcategory: "nightlife" },
      { title: "Outdoors", subcategory: "outdoors" },
      { title: "Learning", subcategory: "learning" },
      { title: "Community", subcategory: "community" },
    ];

    return categories
      .map(({ title, subcategory }) => ({
        title,
        venues: pickByCategory(subcategory),
      }))
      .filter((lane) => lane.venues.length > 0);
  }, [initialVenues, userArchetype]);

  const toggleVibe = (vibeId: string) => {
    setSelectedVibes((prev) =>
      prev.includes(vibeId)
        ? prev.filter((v) => v !== vibeId)
        : [...prev, vibeId]
    );
  };

  return (
    <div className="min-h-screen bg-[#0B0D10]">
      {/* Sticky Filters Bar */}
      <FiltersBar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        selectedVibes={selectedVibes}
        onVibesChange={setSelectedVibes}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onReset={resetFilters}
        onMobileFilterOpen={() => setShowMobileFilter(true)}
      />

      {/* Editorial Mode: Hero + Lanes */}
      {layoutMode === "editorial" && (
        <>
          <MarketplaceHero slides={heroVenues} />
          <div className="max-w-[1800px] mx-auto py-8">
            {editorialLanes.map((lane) => (
              <EditorialLane
                key={lane.title}
                title={lane.title}
                venues={lane.venues}
              />
            ))}
          </div>
        </>
      )}

      {/* Grid Mode: Filtered Results */}
      {layoutMode === "grid" && (
        <div className="max-w-[1800px] mx-auto px-6 py-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-white">
              Results
              <span className="ml-3 text-zinc-500 text-lg">
                ({filteredVenues.length})
              </span>
            </h2>
          </div>

          <MarketplaceGrid venues={filteredVenues} isLoading={isLoading} />
        </div>
      )}

      {/* Mobile Vibe Filter Bottom Sheet */}
      {showMobileFilter && (
        <div className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            className="w-full bg-[#0F1114] rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto border-t border-white/[0.06]"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">
                Filter by Vibe
              </h3>
              <button
                onClick={() => setShowMobileFilter(false)}
                className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center"
                type="button"
                aria-label="Close filter menu"
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
                      ? "bg-gradient-to-r from-[#4F8CFF]/10 to-[#C7B9FF]/10 text-[#C7B9FF] border border-[#C7B9FF]/20"
                      : "bg-zinc-800/30 text-zinc-400 hover:bg-zinc-800/50"
                  }`}
                  type="button"
                >
                  {vibe.label}
                </button>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowMobileFilter(false)}
                className="flex-1 h-12 rounded-full bg-gradient-to-r from-[#4F8CFF] to-[#C7B9FF] text-[#041021] text-sm font-semibold"
                type="button"
              >
                Apply Filters
              </button>
              <button
                onClick={() => setSelectedVibes([])}
                className="h-12 px-6 rounded-full bg-white/5 text-white text-sm border border-white/10"
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
