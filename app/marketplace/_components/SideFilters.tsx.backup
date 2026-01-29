"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Funnel, CaretRight, SlidersHorizontal } from "@phosphor-icons/react";

interface SideFiltersProps {
  selectedVibes: string[];
  onVibesChange: (vibes: string[]) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onReset: () => void;
  isOpen: boolean;
  onToggle: () => void;
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

export function SideFilters({
  selectedVibes,
  onVibesChange,
  selectedCategory,
  onCategoryChange,
  onReset,
  isOpen,
  onToggle,
}: SideFiltersProps) {
  const toggleVibe = (vibeId: string) => {
    onVibesChange(
      selectedVibes.includes(vibeId)
        ? selectedVibes.filter((v) => v !== vibeId)
        : [...selectedVibes, vibeId]
    );
  };

  const hasActiveFilters = selectedCategory !== "all" || selectedVibes.length > 0;

  return (
    <>
      {/* Toggle Button (when sidebar is closed) */}
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

      {/* Sidebar Overlay (desktop) */}
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

            {/* Sidebar */}
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white border-r border-slate-200 shadow-2xl z-50 overflow-y-auto"
            >
              {/* Header */}
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
                          ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200 shadow-sm"
                          : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
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
    </>
  );
}
