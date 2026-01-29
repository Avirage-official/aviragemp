// app/marketplace/MarketplaceClient.tsx
"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import {
  MagnifyingGlass,
  MapPin,
  Sparkle,
  Lightning,
  CaretLeft,
  CaretRight,
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
   HELPERS
============================================================================ */

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

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
   VENUE CARDS (KEEP YOUR ORIGINAL VISUAL LANGUAGE)
============================================================================ */

function HeroBannerSlide({
  venue,
  matchPercentage,
}: {
  venue: Venue;
  matchPercentage: number;
}) {
  const matchLevel = getMatchLevel(matchPercentage);

  return (
    <Link href={`/marketplace/${venue.id}`} className="block">
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="relative h-[420px] rounded-2xl overflow-hidden group cursor-pointer border border-white/5 bg-[#0B0B0B]"
      >
        {venue.imageUrl ? (
          <img
            src={venue.imageUrl}
            alt={venue.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-800 flex items-center justify-center">
            <Sparkle className="w-16 h-16 text-zinc-700" weight="duotone" />
          </div>
        )}

        {/* Cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.18),transparent_55%)] opacity-80 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(147,51,234,0.14),transparent_55%)] opacity-70 pointer-events-none" />

        {/* Badge */}
        {matchPercentage > 0 && (
          <div
            className={`absolute top-5 right-5 px-3 py-1.5 rounded-lg ${matchLevel.bgColor} backdrop-blur-md border border-white/10`}
          >
            <span className={`text-sm font-semibold ${matchLevel.color}`}>
              {matchPercentage}% Match
            </span>
          </div>
        )}

        {/* Text */}
        <div className="absolute bottom-0 left-0 right-0 p-7">
          <div className="flex items-center gap-2 text-xs text-zinc-300 mb-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-md">
              <Lightning className="w-4 h-4 text-emerald-400" weight="fill" />
              Resonating now
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-semibold text-white mb-2 line-clamp-1">
            {venue.name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-zinc-300">
            <MapPin className="w-4 h-4" weight="fill" />
            <span className="line-clamp-1">
              {venue.neighborhood
                ? `${venue.neighborhood}, ${venue.city}`
                : venue.city}
            </span>
          </div>
          {venue.description && (
            <p className="mt-3 text-sm text-zinc-400 line-clamp-2 max-w-[72ch]">
              {venue.description}
            </p>
          )}
        </div>
      </motion.div>
    </Link>
  );
}

function CarouselVenueCard({
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
    <Link href={`/marketplace/${venue.id}`} className="block">
      <motion.div
        whileHover={{ y: -4 }}
        className="group h-full rounded-xl overflow-hidden bg-[#111111] border border-white/5 hover:border-white/10 transition-all"
      >
        <div className="relative aspect-[4/3] bg-zinc-900 overflow-hidden">
          {venue.imageUrl ? (
            <img
              src={venue.imageUrl}
              alt={venue.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800">
              <Sparkle className="w-12 h-12 text-zinc-700" weight="duotone" />
            </div>
          )}

          {userArchetype && matchPercentage > 0 && (
            <div
              className={`absolute top-3 right-3 px-2.5 py-1 rounded-md ${matchLevel.bgColor} backdrop-blur-sm border border-white/10`}
            >
              <span className={`text-xs font-semibold ${matchLevel.color}`}>
                {matchPercentage}%
              </span>
            </div>
          )}

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/55 via-black/0 to-black/0" />
        </div>

        <div className="p-4">
          <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
            {venue.name}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <MapPin className="w-4 h-4 flex-shrink-0" weight="fill" />
            <span className="truncate">
              {venue.neighborhood
                ? `${venue.neighborhood}, ${venue.city}`
                : venue.city}
            </span>
          </div>
          {venue.priceRange && (
            <div className="mt-3 text-sm font-medium text-white">
              {venue.priceRange}
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
}

function GridVenueCard({
  venue,
  userArchetype,
}: {
  venue: Venue;
  userArchetype: string | null;
}) {
  // keep your original grid card behavior
  return <CarouselVenueCard venue={venue} userArchetype={userArchetype} />;
}

/* ============================================================================
   CAROUSELS
============================================================================ */

function CarouselArrows({
  onPrev,
  onNext,
  className = "",
}: {
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={onPrev}
        className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md flex items-center justify-center transition"
        aria-label="Previous"
        type="button"
      >
        <CaretLeft className="w-4 h-4 text-white/90" weight="bold" />
      </button>
      <button
        onClick={onNext}
        className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md flex items-center justify-center transition"
        aria-label="Next"
        type="button"
      >
        <CaretRight className="w-4 h-4 text-white/90" weight="bold" />
      </button>
    </div>
  );
}

function HeroBannerCarousel({
  items,
}: {
  items: { venue: Venue; match: number }[];
}) {
  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    loop: true,
  });

  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);

  if (items.length === 0) return null;

  return (
    <section className="mb-14">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Lightning className="w-6 h-6 text-emerald-400" weight="fill" />
          <h2 className="text-2xl font-bold text-white">Resonating Now</h2>
        </div>

        <div className="hidden md:block">
          <CarouselArrows onPrev={scrollPrev} onNext={scrollNext} />
        </div>
      </div>

      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-6">
          {items.map(({ venue, match }) => (
            <div key={venue.id} className="flex-[0_0_88%] md:flex-[0_0_72%]">
              <HeroBannerSlide venue={venue} matchPercentage={match} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 md:hidden flex justify-end">
        <CarouselArrows onPrev={scrollPrev} onNext={scrollNext} />
      </div>
    </section>
  );
}

function CategoryCarouselRow({
  title,
  venues,
  userArchetype,
  onViewAll,
}: {
  title: string;
  venues: Venue[];
  userArchetype: string | null;
  onViewAll: () => void;
}) {
  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    dragFree: true,
  });

  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);

  if (venues.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <button
            onClick={onViewAll}
            className="text-xs text-zinc-400 hover:text-white transition-colors"
            type="button"
          >
            View all
          </button>
        </div>

        <div className="hidden md:block">
          <CarouselArrows onPrev={scrollPrev} onNext={scrollNext} />
        </div>
      </div>

      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-5">
          {venues.map((v) => (
            <div
              key={v.id}
              className="flex-[0_0_72%] sm:flex-[0_0_48%] md:flex-[0_0_32%] lg:flex-[0_0_24%] xl:flex-[0_0_20%]"
            >
              <CarouselVenueCard venue={v} userArchetype={userArchetype} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 md:hidden flex justify-end">
        <CarouselArrows onPrev={scrollPrev} onNext={scrollNext} />
      </div>
    </section>
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
  const [forceGrid, setForceGrid] = useState(false);

  const toggleVibe = (vibeId: string) => {
    setSelectedVibes((prev) =>
      prev.includes(vibeId)
        ? prev.filter((v) => v !== vibeId)
        : [...prev, vibeId]
    );
  };

  const filtersActive =
    !!searchQuery.trim() ||
    selectedCategory !== "all" ||
    selectedVibes.length > 0 ||
    forceGrid;

  // Top matches (hero inference) - keep your logic, broaden slightly + prefer image
  const topMatches = useMemo(() => {
    if (!userArchetype) return [];
    const scored = [...initialVenues]
      .map((venue) => ({
        venue,
        match: getMatchPercentage(venue.compatibilityScores, userArchetype),
      }))
      .filter((x) => x.match >= 70)
      .sort((a, b) => b.match - a.match);

    // prefer image for the hero "alive" feel
    const withImage = scored.filter((x) => !!x.venue.imageUrl);
    const pool = withImage.length >= 4 ? withImage : scored;

    return pool.slice(0, 6);
  }, [initialVenues, userArchetype]);

  // Filter venues (your original, untouched behavior)
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

  // Category rows (only used when not filtering)
  const categoryRows = useMemo(() => {
    const base = SUBCATEGORIES.filter((c) => c.id !== "all");

    return base
      .map((cat) => {
        let items = initialVenues.filter((v) => v.subcategory === cat.id);

        if (userArchetype) {
          items = items.sort((a, b) => {
            const ma = getMatchPercentage(a.compatibilityScores, userArchetype);
            const mb = getMatchPercentage(b.compatibilityScores, userArchetype);
            return mb - ma;
          });
        }

        // keep it promotional, not cramped
        const limit = clamp(items.length, 0, 10);
        return { ...cat, venues: items.slice(0, limit) };
      })
      .filter((row) => row.venues.length > 0);
  }, [initialVenues, userArchetype]);

  const clearAll = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedVibes([]);
    setForceGrid(false);
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
            <div className="relative w-[400px] max-w-[55vw]">
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

          {/* Category Tabs (keep your control surface) */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {SUBCATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setForceGrid(cat.id !== "all"); // selecting a category implies “view more”
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

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Left: Content */}
          <div className="flex-1 min-w-0">
            {/* Default: Alive, Editorial */}
            {!filtersActive && (
              <>
                <HeroBannerCarousel items={topMatches} />

                {categoryRows.map((row) => (
                  <CategoryCarouselRow
                    key={row.id}
                    title={row.label}
                    venues={row.venues}
                    userArchetype={userArchetype}
                    onViewAll={() => {
                      setSelectedCategory(row.id as SubcategoryFilter);
                      setForceGrid(true);
                    }}
                  />
                ))}

                <div className="mt-2">
                  <button
                    onClick={() => setForceGrid(true)}
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                    type="button"
                  >
                    Prefer a full list? View everything.
                  </button>
                </div>
              </>
            )}

            {/* Filter/Search/Grid mode (keep your original power) */}
            {filtersActive && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">
                    {selectedCategory === "all"
                      ? "All Spaces"
                      : SUBCATEGORIES.find((c) => c.id === selectedCategory)
                          ?.label}
                    <span className="ml-2 text-zinc-500">
                      ({filteredVenues.length})
                    </span>
                  </h2>

                  {(searchQuery ||
                    selectedCategory !== "all" ||
                    selectedVibes.length > 0 ||
                    forceGrid) && (
                    <div className="flex items-center gap-3">
                      {!searchQuery &&
                        selectedCategory === "all" &&
                        selectedVibes.length === 0 &&
                        forceGrid && (
                          <button
                            onClick={() => setForceGrid(false)}
                            className="text-sm text-zinc-400 hover:text-white transition-colors"
                            type="button"
                          >
                            Back to curated view
                          </button>
                        )}

                      <button
                        onClick={clearAll}
                        className="text-sm text-zinc-400 hover:text-white transition-colors"
                        type="button"
                      >
                        Clear filters
                      </button>
                    </div>
                  )}
                </div>

                {filteredVenues.length > 0 ? (
                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {filteredVenues.map((venue) => (
                      <GridVenueCard
                        key={venue.id}
                        venue={venue}
                        userArchetype={userArchetype}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mx-auto mb-4">
                      <MagnifyingGlass
                        className="w-8 h-8 text-zinc-700"
                        weight="duotone"
                      />
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
          </div>

          {/* Right: Vibe Filters Sidebar (kept) */}
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
                      type="button"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
                  {VIBE_OPTIONS.map((vibe) => (
                    <button
                      key={vibe.id}
                      onClick={() => {
                        toggleVibe(vibe.id);
                        setForceGrid(true);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-xs transition-all ${
                        selectedVibes.includes(vibe.id)
                          ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                          : "bg-zinc-800/30 text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                      }`}
                      type="button"
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

      {/* Mobile Vibe Filter Button (kept) */}
      <button
        onClick={() => setShowVibeFilter(true)}
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-xl z-50"
        type="button"
      >
        <Sparkle className="w-6 h-6" weight="fill" />
      </button>

      {/* Mobile Vibe Filter Modal (kept) */}
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
                  onClick={() => toggleVibe(vibe.id)}
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
                  setForceGrid(true);
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
