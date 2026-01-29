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
    <div className="sticky top-0 z-40 bg-[#0B0D10]/80 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-[1800px] mx-auto px-6 py-4">
        {/* Top row: Title + Search + Actions */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="hidden md:block">
            <h1 className="text-xl font-semibold text-white">
              Discover Spaces
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              Curated discovery without noise
            </p>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 md:flex-none md:w-[420px]">
            <MagnifyingGlass
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500"
              weight="bold"
            />
            <input
              type="search"
              placeholder="Search spaces..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              aria-label="Search venues"
              className="w-full h-11 pl-10 pr-4 rounded-lg bg-[#111111] border border-white/[0.06] text-sm text-white placeholder:text-zinc-500 focus:border-white/10 outline-none transition-all"
            />
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {hasActiveFilters && (
              <button
                onClick={onReset}
                aria-label="Reset all filters"
                className="h-11 px-4 rounded-lg text-sm text-zinc-400 hover:text-white transition-colors"
                type="button"
              >
                Reset
              </button>
            )}
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={onMobileFilterOpen}
            aria-label="Open filter menu"
            className="md:hidden w-11 h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"
            type="button"
          >
            <Funnel className="w-5 h-5 text-white" weight="bold" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-2">
          {SUBCATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? "bg-gradient-to-r from-[#4F8CFF] to-[#C7B9FF] text-[#041021] shadow-lg"
                  : "bg-transparent text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
              type="button"
              aria-pressed={selectedCategory === cat.id}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Active Filter Pills */}
        {selectedVibes.length > 0 && (
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <span className="text-xs text-zinc-500">Active filters:</span>
            {selectedVibes.map((vibe) => (
              <button
                key={vibe}
                onClick={() => removeVibe(vibe)}
                className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#4F8CFF]/10 to-[#C7B9FF]/10 border border-white/[0.06] text-xs text-zinc-300 hover:border-white/20 transition-all"
                type="button"
                aria-label={`Remove ${vibe} filter`}
              >
                {vibe.replace(/_/g, " ")}
                <X className="w-3 h-3 opacity-50 group-hover:opacity-100" weight="bold" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
