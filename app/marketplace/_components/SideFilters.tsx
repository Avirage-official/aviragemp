"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Funnel, CaretRight, SlidersHorizontal, Sparkle, MapPin } from "@phosphor-icons/react";

interface SideFiltersProps {
  selectedVibes: string[];
  onVibesChange: (vibes: string[]) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onReset: () => void;
  isOpen: boolean;
  onToggle: () => void;
  priceRange?: [number, number];
  onPriceRangeChange?: (range: [number, number]) => void;
  maxDistance?: number;
  onMaxDistanceChange?: (distance: number) => void;
  onSurpriseMe?: () => void;
}

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

const SUBCATEGORIES = [
  { id: "all", label: "All Spaces" },
  { id: "nomnoms", label: "NomNoms" },
  { id: "creativevibe", label: "Creative" },
  { id: "wellness", label: "Wellness" },
  { id: "nightlife", label: "Nightlife" },
  { id: "outdoors", label: "Outdoors" },
  { id: "learning", label: "Learning" },
  { id: "community", label: "Community" },
];

const PRICE_LEVELS = [
  { value: 1, label: "$", desc: "Budget-friendly" },
  { value: 2, label: "$$", desc: "Moderate" },
  { value: 3, label: "$$$", desc: "Upscale" },
  { value: 4, label: "$$$$", desc: "Premium" },
];

export function SideFilters({
  selectedVibes,
  onVibesChange,
  selectedCategory,
  onCategoryChange,
  onReset,
  isOpen,
  onToggle,
  priceRange = [1, 4],
  onPriceRangeChange,
  maxDistance = 50,
  onMaxDistanceChange,
  onSurpriseMe,
}: SideFiltersProps) {
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);
  const [localMaxDistance, setLocalMaxDistance] = useState(maxDistance);

  const toggleVibe = (vibeId: string) => {
    onVibesChange(
      selectedVibes.includes(vibeId)
        ? selectedVibes.filter((v) => v !== vibeId)
        : [...selectedVibes, vibeId]
    );
  };

  const hasActiveFilters = 
    selectedCategory !== "all" || 
    selectedVibes.length > 0 ||
    localPriceRange[0] !== 1 ||
    localPriceRange[1] !== 4 ||
    localMaxDistance !== 50;

  const handlePriceRangeChange = (index: number, value: number) => {
    const newRange: [number, number] = [...localPriceRange] as [number, number];
    newRange[index] = value;
    setLocalPriceRange(newRange);
    onPriceRangeChange?.(newRange);
  };

  const handleDistanceChange = (value: number) => {
    setLocalMaxDistance(value);
    onMaxDistanceChange?.(value);
  };

  return (
    <>
      {/* Fixed Sidebar (always visible on desktop) */}
      <motion.aside
        initial={{ x: 0 }}
        className="hidden lg:block fixed left-0 top-0 bottom-0 w-80 bg-white/95 backdrop-blur-lg border-r border-slate-200 shadow-xl z-40 overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-lg border-b border-slate-200 p-6 z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-blue-500" weight="bold" />
              <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
            </div>
          </div>
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={onReset}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Reset all filters
            </motion.button>
          )}
        </div>

        {/* Surprise Me Button */}
        {onSurpriseMe && (
          <div className="p-6 border-b border-slate-200">
            <motion.button
              onClick={onSurpriseMe}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Sparkle className="w-5 h-5" weight="fill" />
              <span>Surprise Me!</span>
            </motion.button>
          </div>
        )}

        {/* Price Range */}
        {onPriceRangeChange && (
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Price Range
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                {PRICE_LEVELS.map((level) => (
                  <motion.button
                    key={level.value}
                    onClick={() => {
                      if (localPriceRange[0] === level.value && localPriceRange[1] === level.value) {
                        handlePriceRangeChange(0, 1);
                        handlePriceRangeChange(1, 4);
                      } else {
                        handlePriceRangeChange(0, level.value);
                        handlePriceRangeChange(1, level.value);
                      }
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-bold transition-all ${
                      level.value >= localPriceRange[0] && level.value <= localPriceRange[1]
                        ? "bg-green-500 text-white shadow-md"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {level.label}
                  </motion.button>
                ))}
              </div>
              <p className="text-xs text-slate-600 text-center">
                {localPriceRange[0] === 1 && localPriceRange[1] === 4
                  ? "All prices"
                  : `${PRICE_LEVELS.find(p => p.value === localPriceRange[0])?.label} to ${PRICE_LEVELS.find(p => p.value === localPriceRange[1])?.label}`}
              </p>
            </div>
          </div>
        )}

        {/* Distance Filter */}
        {onMaxDistanceChange && (
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4" weight="bold" />
              Max Distance
            </h3>
            <div className="space-y-3">
              <input
                type="range"
                min="1"
                max="100"
                value={localMaxDistance}
                onChange={(e) => handleDistanceChange(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">1 km</span>
                <span className="font-semibold text-blue-600">{localMaxDistance} km</span>
                <span className="text-slate-600">100 km</span>
              </div>
            </div>
          </div>
        )}

        {/* Category Section */}
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
            Category
          </h3>
          <div className="space-y-2">
            {SUBCATEGORIES.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-between ${
                  selectedCategory === cat.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                <span>{cat.label}</span>
                {selectedCategory === cat.id && (
                  <CaretRight className="w-4 h-4" weight="bold" />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Vibes Section */}
        <div className="p-6">
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
            Vibes
            {selectedVibes.length > 0 && (
              <span className="ml-2 text-blue-600">({selectedVibes.length})</span>
            )}
          </h3>
          <div className="space-y-2">
            {VIBE_OPTIONS.map((vibe) => (
              <motion.button
                key={vibe.id}
                onClick={() => toggleVibe(vibe.id)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedVibes.includes(vibe.id)
                    ? "bg-blue-100 text-blue-700 border border-blue-300"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {vibe.label}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.aside>

      {/* Mobile Filter Button & Modal */}
      <div className="lg:hidden">
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onToggle}
            className="fixed left-4 top-24 z-40 w-12 h-12 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-200 hover:scale-105"
            aria-label="Open filters"
          >
            <Funnel className="w-5 h-5 text-slate-700" weight="bold" />
          </motion.button>
        )}

        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onToggle}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              />

              {/* Mobile Sidebar */}
              <motion.aside
                initial={{ x: -320 }}
                animate={{ x: 0 }}
                exit={{ x: -320 }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed left-0 top-0 bottom-0 w-80 bg-white border-r border-slate-200 shadow-2xl z-50 overflow-y-auto"
              >
                {/* Mobile Header */}
                <div className="sticky top-0 bg-white border-b border-slate-200 p-6 z-10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="w-5 h-5 text-blue-500" weight="bold" />
                      <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
                    </div>
                    <motion.button
                      onClick={onToggle}
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
                      aria-label="Close filters"
                    >
                      <X className="w-4 h-4 text-slate-700" weight="bold" />
                    </motion.button>
                  </div>
                  {hasActiveFilters && (
                    <motion.button
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={onReset}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Reset all filters
                    </motion.button>
                  )}
                </div>

                {/* Mobile content - same sections as desktop */}
                {/* Surprise Me */}
                {onSurpriseMe && (
                  <div className="p-6 border-b border-slate-200">
                    <motion.button
                      onClick={() => {
                        onSurpriseMe();
                        onToggle();
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Sparkle className="w-5 h-5" weight="fill" />
                      <span>Surprise Me!</span>
                    </motion.button>
                  </div>
                )}

                {/* Price Range - Mobile */}
                {onPriceRangeChange && (
                  <div className="p-6 border-b border-slate-200">
                    <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
                      Price Range
                    </h3>
                    <div className="flex items-center gap-2">
                      {PRICE_LEVELS.map((level) => (
                        <motion.button
                          key={level.value}
                          onClick={() => {
                            handlePriceRangeChange(0, level.value);
                            handlePriceRangeChange(1, level.value);
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex-1 px-3 py-2 rounded-lg text-sm font-bold ${
                            level.value >= localPriceRange[0] && level.value <= localPriceRange[1]
                              ? "bg-green-500 text-white"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {level.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Category - Mobile */}
                <div className="p-6 border-b border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
                    Category
                  </h3>
                  <div className="space-y-2">
                    {SUBCATEGORIES.map((cat) => (
                      <motion.button
                        key={cat.id}
                        onClick={() => onCategoryChange(cat.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium ${
                          selectedCategory === cat.id
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                            : "bg-slate-50 text-slate-700 border border-slate-200"
                        }`}
                      >
                        {cat.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Vibes - Mobile */}
                <div className="p-6">
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
                    Vibes
                    {selectedVibes.length > 0 && (
                      <span className="ml-2 text-blue-600">({selectedVibes.length})</span>
                    )}
                  </h3>
                  <div className="space-y-2">
                    {VIBE_OPTIONS.map((vibe) => (
                      <motion.button
                        key={vibe.id}
                        onClick={() => toggleVibe(vibe.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium ${
                          selectedVibes.includes(vibe.id)
                            ? "bg-blue-100 text-blue-700 border border-blue-300"
                            : "bg-slate-50 text-slate-700 border border-slate-200"
                        }`}
                      >
                        {vibe.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
