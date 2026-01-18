// app/marketplace/MarketplaceClient.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MagnifyingGlass,
  Funnel,
  Heart,
  Clock,
  Eye,
  MapPin,
  Plus,
  Sparkle,
  TrendUp,
  Users,
  BookOpen,
  Lightning,
} from "@phosphor-icons/react";

/* ============================================================================
   TYPES
   ============================================================================ */

type Experience = {
  id: string;
  title: string;
  description: string;
  location: string;
  city: string;
  category: "experience" | "retreat" | "workshop" | "event" | "service";
  priceLabel: string;
  bookingType: "INQUIRY" | "INSTANT";
  tags: string[];
  createdAt?: string;
  views?: number;
  likes?: number;
  businessName?: string;
};

type Category = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

type SortOption = "newest" | "popular" | "price-low" | "price-high";
type FilterStatus = "all" | "available" | "instant";

/* ============================================================================
   CONSTANTS
   ============================================================================ */

const CATEGORIES: Category[] = [
  { id: "all", label: "All", icon: <Sparkle weight="fill" className="w-4 h-4" /> },
  { id: "experience", label: "Experiences", icon: <Lightning weight="fill" className="w-4 h-4" /> },
  { id: "retreat", label: "Retreats", icon: <MapPin weight="fill" className="w-4 h-4" /> },
  { id: "workshop", label: "Workshops", icon: <Users weight="fill" className="w-4 h-4" /> },
  { id: "event", label: "Events", icon: <Clock weight="fill" className="w-4 h-4" /> },
  { id: "service", label: "Services", icon: <BookOpen weight="fill" className="w-4 h-4" /> },
];

const SIDEBAR_NAV = [
  { label: "Explore", href: "/marketplace", icon: <Sparkle weight="fill" className="w-5 h-5" /> },
  { label: "Activity", href: "/marketplace/activity", icon: <TrendUp weight="fill" className="w-5 h-5" /> },
  { label: "How it works", href: "/marketplace/how-it-works", icon: <BookOpen weight="fill" className="w-5 h-5" /> },
  { label: "Community", href: "/marketplace/community", icon: <Users weight="fill" className="w-5 h-5" /> },
];

/* ============================================================================
   UTILITY FUNCTIONS
   ============================================================================ */

function getTimeAgo(dateString?: string): string {
  if (!dateString) return "Recently";
  
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  
  if (diffInHours < 1) return "Just now";
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  return `${diffInWeeks}w ago`;
}

/* ============================================================================
   LISTING CARD COMPONENT
   ============================================================================ */

function ListingCard({ experience }: { experience: Experience }) {
  const [isLiked, setIsLiked] = useState(false);
  
  // Generate gradient based on category
  const categoryGradients: Record<string, string> = {
    experience: "from-[#4F8CFF] to-[#7CF5C8]",
    retreat: "from-[#C7B9FF] to-[#FFB5E8]",
    workshop: "from-[#FFD97D] to-[#FF8F8F]",
    event: "from-[#7CF5C8] to-[#4F8CFF]",
    service: "from-[#FFB5E8] to-[#C7B9FF]",
  };
  
  const gradient = categoryGradients[experience.category] || categoryGradients.experience;

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="group relative"
    >
      <Link href={`/marketplace/${experience.id}`} className="block">
        <div className="relative overflow-hidden rounded-2xl bg-[#0D0D14] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300">
          {/* Image placeholder with gradient */}
          <div className={`relative aspect-square bg-gradient-to-br ${gradient} opacity-60`}>
            <div className="absolute inset-0 bg-[#0A0A0A]/20 backdrop-blur-sm" />
            
            {/* Category badge */}
            <div className="absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10">
              <span className="text-xs font-semibold text-white uppercase tracking-wider">
                {experience.category}
              </span>
            </div>

            {/* Booking type badge */}
            {experience.bookingType === "INSTANT" && (
              <div className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-[#7CF5C8]/20 backdrop-blur-md border border-[#7CF5C8]/30">
                <span className="text-xs font-bold text-[#7CF5C8] uppercase">
                  <Lightning weight="fill" className="w-3 h-3 inline mr-1" />
                  Instant
                </span>
              </div>
            )}

            {/* Center emoji/icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl opacity-80">
                {experience.category === "retreat" ? "🧘" : 
                 experience.category === "workshop" ? "🛠️" :
                 experience.category === "event" ? "🎉" :
                 experience.category === "service" ? "💼" : "✨"}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Title */}
            <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-[#4F8CFF] transition-colors">
              {experience.title}
            </h3>

            {/* Business name */}
            {experience.businessName && (
              <p className="text-sm text-white/40 mb-3">
                by {experience.businessName}
              </p>
            )}

            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-white/60 mb-4">
              <MapPin weight="fill" className="w-4 h-4" />
              <span>{experience.city}</span>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
              {/* Price */}
              <div>
                <span className="text-xl font-bold text-white">
                  {experience.priceLabel}
                </span>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-white/40">
                <div className="flex items-center gap-1">
                  <Eye weight="fill" className="w-4 h-4" />
                  <span>{experience.views || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock weight="fill" className="w-4 h-4" />
                  <span>{getTimeAgo(experience.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Like button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsLiked(!isLiked);
        }}
        className="absolute bottom-5 right-5 w-10 h-10 rounded-full bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center hover:scale-110 transition-transform z-10"
      >
        <Heart
          weight={isLiked ? "fill" : "regular"}
          className={`w-5 h-5 ${isLiked ? "text-red-500" : "text-white/60"}`}
        />
      </button>
    </motion.article>
  );
}

/* ============================================================================
   MAIN COMPONENT
   ============================================================================ */

export default function MarketplaceClient({
  initialExperiences,
}: {
  initialExperiences: Experience[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [displayCount, setDisplayCount] = useState(12);

  // Filter and sort experiences
  const filteredExperiences = useMemo(() => {
    let filtered = [...initialExperiences];

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter((exp) =>
        [exp.title, exp.description, exp.city, exp.businessName]
          .join(" ")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((exp) => exp.category === selectedCategory);
    }

    // Status filter
    if (filterStatus === "instant") {
      filtered = filtered.filter((exp) => exp.bookingType === "INSTANT");
    } else if (filterStatus === "available") {
      filtered = filtered.filter((exp) => exp.bookingType === "INQUIRY");
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      } else if (sortBy === "popular") {
        return (b.views || 0) - (a.views || 0);
      }
      return 0;
    });

    return filtered;
  }, [initialExperiences, searchQuery, selectedCategory, sortBy, filterStatus]);

  const displayedExperiences = filteredExperiences.slice(0, displayCount);
  const hasMore = displayCount < filteredExperiences.length;

  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      {/* ================================================================
          LEFT SIDEBAR
          ================================================================ */}
      <aside className="hidden lg:flex w-64 shrink-0 border-r border-white/[0.06] bg-[#0D0D14]/50 backdrop-blur-xl">
        <div className="fixed w-64 h-screen flex flex-col p-6">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-3 mb-12 group">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-[#4F8CFF] to-[#C7B9FF] opacity-70 blur group-hover:opacity-100 transition-opacity" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#4F8CFF] to-[#C7B9FF]">
                <Sparkle weight="fill" className="h-5 w-5 text-black" />
              </div>
            </div>
            <span className="text-xl font-bold text-white">ETHOS</span>
          </Link>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {SIDEBAR_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  item.href === "/marketplace"
                    ? "bg-white/[0.08] text-white"
                    : "text-white/50 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Create button */}
          <Link
            href="/business/listings/new"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#4F8CFF] to-[#7CF5C8] text-black font-semibold hover:opacity-90 transition-opacity"
          >
            <Plus weight="bold" className="w-5 h-5" />
            Create
          </Link>
        </div>
      </aside>

      {/* ================================================================
          MAIN CONTENT
          ================================================================ */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-8 py-8">
          
          {/* ================================================================
              TOP FILTERS BAR
              ================================================================ */}
          <div className="mb-8 space-y-6">
            
            {/* Search + Filters Row */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <MagnifyingGlass
                  weight="bold"
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40"
                />
                <input
                  type="text"
                  placeholder="Search experiences, retreats, workshops..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-white/40 focus:border-[#4F8CFF]/50 focus:bg-white/[0.05] outline-none transition-all"
                />
              </div>

              {/* Filter dropdown */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Funnel
                    weight="bold"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40"
                  />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
                    className="h-12 pl-10 pr-8 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm font-medium appearance-none cursor-pointer hover:bg-white/[0.05] transition-all outline-none"
                  >
                    <option value="all">All Status</option>
                    <option value="available">Available</option>
                    <option value="instant">Instant Book</option>
                  </select>
                </div>

                {/* Sort dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="h-12 px-4 pr-8 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm font-medium appearance-none cursor-pointer hover:bg-white/[0.05] transition-all outline-none"
                  >
                    <option value="newest">Newest</option>
                    <option value="popular">Most Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? "bg-white/[0.08] text-white border border-white/[0.08]"
                      : "text-white/50 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {cat.icon}
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Results count + Active filters */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/50">
                <span className="text-white font-semibold">{filteredExperiences.length}</span> experiences found
              </p>

              {/* Active filter badges */}
              {(searchQuery || selectedCategory !== "all" || filterStatus !== "all") && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/40">Active filters:</span>
                  {searchQuery && (
                    <span className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-xs text-white/70">
                      Search: {searchQuery}
                    </span>
                  )}
                  {selectedCategory !== "all" && (
                    <span className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-xs text-white/70">
                      {CATEGORIES.find((c) => c.id === selectedCategory)?.label}
                    </span>
                  )}
                  {filterStatus !== "all" && (
                    <span className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-xs text-white/70">
                      {filterStatus === "instant" ? "Instant Book" : "Available"}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ================================================================
              LISTINGS GRID
              ================================================================ */}
          {displayedExperiences.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {displayedExperiences.map((exp) => (
                  <ListingCard key={exp.id} experience={exp} />
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="flex justify-center">
                  <button
                    onClick={() => setDisplayCount((prev) => prev + 12)}
                    className="px-8 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white font-medium hover:bg-white/[0.06] hover:border-white/[0.12] transition-all"
                  >
                    Load More ({filteredExperiences.length - displayCount} remaining)
                  </button>
                </div>
              )}
            </>
          ) : (
            // Empty state
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-full bg-white/[0.03] flex items-center justify-center mb-6">
                <MagnifyingGlass weight="duotone" className="w-10 h-10 text-white/20" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No experiences found</h3>
              <p className="text-white/50 mb-6">Try adjusting your filters or search query</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setFilterStatus("all");
                }}
                className="px-6 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm font-medium hover:bg-white/[0.08] transition-all"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}