"use client";

import { useEffect, useState } from "react";
import { MagnifyingGlass, X, Funnel } from "@phosphor-icons/react";

interface FiltersBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedVibes: string[];
  onVibesChange: (vibes: string[]) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onReset: () => void;
  onMobileFilterOpen: () => void;
}

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

export function FiltersBar({
  searchValue,
  onSearchChange,
  selectedVibes,
  onVibesChange,
  selectedCategory,
  onCategoryChange,
  onReset,
  onMobileFilterOpen,
}: FiltersBarProps) {
  const [localSearch, setLocalSearch] = useState(searchValue);

  // Debounce search input (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localSearch);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearch, onSearchChange]);

  const hasActiveFilters =
    searchValue.trim() !== "" ||
    selectedCategory !== "all" ||
    selectedVibes.length > 0;

  const removeVibe = (vibe: string) => {
    onVibesChange(selectedVibes.filter((v) => v !== vibe));
  };

  return (
    <div className="sticky top-0 z-40 bg-[#0B0D10]/90 backdrop-blur-2xl border-b border-white/[0.08]">
      <div className="max-w-[1800px] mx-auto px-6 py-5">
        {/* Top row: Title + Search + Actions */}
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="hidden md:block">
            <h1 className="text-xl md:text-2xl font-semibold text-white tracking-tight">
              Discover Spaces
            </h1>
            <p className="text-xs text-zinc-400 mt-1 font-medium">
              Curated discovery without noise
            </p>
          </div>

          {/* Search Input - Enhanced Design */}
          <div className="relative flex-1 md:flex-none md:w-[460px]">
            <MagnifyingGlass
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500"
              weight="bold"
            />
            <input
              type="search"
              placeholder="Search spaces, neighborhoods, vibes..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              aria-label="Search venues"
              className="w-full h-12 pl-12 pr-4 rounded-xl bg-[#111111] border border-white/[0.08] text-sm text-white placeholder:text-zinc-500 focus:border-[#4F8CFF]/50 focus:ring-2 focus:ring-[#4F8CFF]/20 outline-none transition-all duration-200"
            />
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {hasActiveFilters && (
              <motion.button
                onClick={onReset}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Reset all filters"
                className="h-12 px-5 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-200 font-medium"
                type="button"
              >
                Reset All
              </motion.button>
            )}
          </div>

          {/* Mobile Filter Button - Enhanced */}
          <motion.button
            onClick={onMobileFilterOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open filter menu"
            className="md:hidden w-12 h-12 rounded-xl bg-gradient-to-br from-white/[0.08] to-white/[0.04] border border-white/10 flex items-center justify-center shadow-lg"
            type="button"
          >
            <Funnel className="w-5 h-5 text-white" weight="bold" />
          </motion.button>
        </div>

        {/* Category Tabs - Enhanced Design */}
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1">
          {SUBCATEGORIES.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`px-6 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                selectedCategory === cat.id
                  ? "bg-gradient-to-r from-[#4F8CFF] to-[#C7B9FF] text-[#041021] shadow-[0_4px_20px_rgba(79,140,255,0.4)]"
                  : "bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/10"
              }`}
              type="button"
              aria-pressed={selectedCategory === cat.id}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Active Filter Pills - Enhanced */}
        {selectedVibes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mt-5 flex-wrap"
          >
            <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Active filters:</span>
            {selectedVibes.map((vibe, idx) => (
              <motion.button
                key={vibe}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.03 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => removeVibe(vibe)}
                className="group flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-gradient-to-r from-[#4F8CFF]/15 to-[#C7B9FF]/15 border border-[#4F8CFF]/25 text-xs font-medium text-[#C7B9FF] hover:border-[#4F8CFF]/50 transition-all duration-200 shadow-sm"
                type="button"
                aria-label={`Remove ${vibe} filter`}
              >
                {vibe.replace(/_/g, " ")}
                <X className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" weight="bold" />
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
