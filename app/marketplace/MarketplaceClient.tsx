"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { X, Sparkle } from "@phosphor-icons/react";
import type { Venue } from "./page";

import { MarketplaceHero } from "./_components/MarketplaceHero";
import { FiltersBar } from "./_components/FiltersBar";
import { SideFilters } from "./_components/SideFilters";
import { MarketplaceGrid } from "./_components/MarketplaceGrid";
import { EditorialLane } from "./_components/EditorialLane";
import { ArchetypeSpotlight } from "./_components/ArchetypeSpotlight";
import { FriendsPicks } from "./_components/FriendsPicks";
import { MoodTracker } from "./_components/MoodTracker";
import { ProgressBadges } from "./_components/ProgressBadges";
import { NotificationsBell } from "./_components/NotificationsBell";
import { QuizTeaser } from "./_components/QuizTeaser";
import { FunLoadingState } from "./_components/FunLoadingState";
import { TrendingSection } from "./_components/TrendingSection";
import { SeasonalSection } from "./_components/SeasonalSection";
import { CrossPromotionLinks } from "./_components/CrossPromotionLinks";

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
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([1, 4]);
  const [maxDistance, setMaxDistance] = useState<number>(50);

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
    setPriceRange([1, 4]);
    setMaxDistance(50);
  };

  // Surprise Me - Random venue selection
  const handleSurpriseMe = () => {
    if (filteredVenues.length > 0) {
      const randomVenue = filteredVenues[Math.floor(Math.random() * filteredVenues.length)];
      router.push(`/marketplace/${randomVenue.id}`);
    }
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
    <div className="min-h-screen bg-white">
      {/* Side Filters (Desktop - Fixed, Always Visible) */}
      <SideFilters
        selectedVibes={selectedVibes}
        onVibesChange={setSelectedVibes}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onReset={resetFilters}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        maxDistance={maxDistance}
        onMaxDistanceChange={setMaxDistance}
        onSurpriseMe={handleSurpriseMe}
      />

      {/* Main Content Area - Offset for fixed sidebar on desktop */}
      <div className="lg:pl-80">
        {/* Top Bar with Notifications */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-lg border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
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
            </div>
            <NotificationsBell />
          </div>
        </div>

        {/* Archetype Spotlight */}
        {userArchetype && (
          <div className="px-6 pt-8">
            <ArchetypeSpotlight userArchetype={userArchetype} />
          </div>
        )}

        {/* Interactive Widgets - Only show when not filtering */}
        {!hasActiveFilters && (
          <div className="px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <MoodTracker />
              <ProgressBadges />
              {!userArchetype && <QuizTeaser />}
            </div>
          </div>
        )}

        {/* Friends' Picks Lane - Show in editorial mode */}
        {layoutMode === "editorial" && (
          <div className="px-6 py-6">
            <FriendsPicks />
          </div>
        )}

        {/* Editorial Mode: Hero + Lanes */}
        {layoutMode === "editorial" && (
          <>
            <MarketplaceHero slides={heroVenues} userArchetype={userArchetype} />
            <div className="px-6 py-8">
              {/* Trending Section */}
              <TrendingSection venues={initialVenues.slice(0, 6)} />

              {/* Seasonal Section */}
              <SeasonalSection venues={initialVenues.slice(6, 12)} />

              {/* Cross-Promotion Links */}
              <CrossPromotionLinks />

              {/* Editorial Lanes by Category */}
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
          <div className="px-6 py-10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-slate-900">
                Results
                <span className="ml-3 text-slate-500 text-lg">
                  ({filteredVenues.length})
                </span>
              </h2>
            </div>

            <MarketplaceGrid venues={filteredVenues} isLoading={isLoading} />
          </div>
        )}
      </div>

      {/* Mobile Vibe Filter Bottom Sheet - Enhanced Design */}
      {showMobileFilter && (
        <div className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-end">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="w-full bg-white rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto border-t border-slate-200 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-7">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 tracking-tight">
                  Filter by Vibe
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  Select one or more vibes to refine results
                </p>
              </div>
              <motion.button
                onClick={() => setShowMobileFilter(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200"
                type="button"
                aria-label="Close filter menu"
              >
                <X className="w-5 h-5 text-slate-700" weight="bold" />
              </motion.button>
            </div>

            <div className="space-y-2.5">
              {VIBE_OPTIONS.map((vibe, idx) => (
                <motion.button
                  key={vibe.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.01 }}
                  onClick={() => toggleVibe(vibe.id)}
                  className={`w-full text-left px-5 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedVibes.includes(vibe.id)
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200 shadow-sm"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
                  }`}
                  type="button"
                >
                  {vibe.label}
                </motion.button>
              ))}
            </div>

            <div className="mt-8 flex gap-3 sticky bottom-0 bg-white pt-4 pb-2">
              <motion.button
                onClick={() => setShowMobileFilter(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white text-base font-bold shadow-lg shadow-blue-500/30"
                type="button"
              >
                Apply Filters
              </motion.button>
              <motion.button
                onClick={() => setSelectedVibes([])}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="h-14 px-7 rounded-2xl bg-slate-100 text-slate-700 text-base font-semibold border border-slate-200"
                type="button"
              >
                Clear
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
