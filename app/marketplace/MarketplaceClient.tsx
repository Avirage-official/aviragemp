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
  Sparkle,
  TrendUp,
  Users,
  BookOpen,
  Lightning,
  Image as ImageIcon,
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
  imageUrl?: string | null;
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
  { id: "all", label: "All", icon: <Sparkle weight="fill" className="w-3.5 h-3.5" /> },
  { id: "experience", label: "Experiences", icon: <Lightning weight="fill" className="w-3.5 h-3.5" /> },
  { id: "retreat", label: "Retreats", icon: <MapPin weight="fill" className="w-3.5 h-3.5" /> },
  { id: "workshop", label: "Workshops", icon: <Users weight="fill" className="w-3.5 h-3.5" /> },
  { id: "event", label: "Events", icon: <Clock weight="fill" className="w-3.5 h-3.5" /> },
  { id: "service", label: "Services", icon: <BookOpen weight="fill" className="w-3.5 h-3.5" /> },
];

const SIDEBAR_NAV = [
  { label: "Explore", href: "/marketplace", icon: <Sparkle weight="fill" className="w-4 h-4" /> },
  { label: "Activity", href: "/marketplace/activity", icon: <TrendUp weight="fill" className="w-4 h-4" /> },
  { label: "How it works", href: "/marketplace/how-it-works", icon: <BookOpen weight="fill" className="w-4 h-4" /> },
  { label: "Community", href: "/marketplace/community", icon: <Users weight="fill" className="w-4 h-4" /> },
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
  const [imageError, setImageError] = useState(false);
  
  // Generate gradient based on category
  const categoryGradients: Record<string, string> = {
    experience: "from-[#4F8CFF] to-[#7CF5C8]",
    retreat: "from-[#C7B9FF] to-[#FFB5E8]",
    workshop: "from-[#FFD97D] to-[#FF8F8F]",
    event: "from-[#7CF5C8] to-[#4F8CFF]",
    service: "from-[#FFB5E8] to-[#C7B9FF]",
  };
  
  const gradient = categoryGradients[experience.category] || categoryGradients.experience;
  const hasImage = experience.imageUrl && !imageError;

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="group relative"
    >
      <Link href={`/marketplace/${experience.id}`} className="block">
        <div className="relative overflow-hidden rounded-xl bg-[#0D0D14] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden">
            {hasImage ? (
              <>
                <img
                  src={experience.imageUrl!}
                  alt={experience.title}
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </>
            ) : (
              // Fallback when no image
              <div className={`w-full h-full bg-gradient-to-br ${gradient} opacity-40 flex items-center justify-center`}>
                <ImageIcon weight="duotone" className="w-16 h-16 text-white/30" />
              </div>
            )}
            
            {/* Category badge */}
            <div className="absolute top-2 left-2 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10">
              <span className="text-[10px] font-semibold text-white uppercase tracking-wider">
                {experience.category}
              </span>
            </div>

            {/* Booking type badge */}
            {experience.bookingType === "INSTANT" && (
              <div className="absolute top-2 right-2 px-2.5 py-1 rounded-lg bg-[#7CF5C8]/20 backdrop-blur-md border border-[#7CF5C8]/30">
                <span className="text-[10px] font-bold text-[#7CF5C8] uppercase flex items-center gap-1">
                  <Lightning weight="fill" className="w-2.5 h-2.5" />
                  Instant
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Title */}
            <h3 className="text-sm font-bold text-white mb-1.5 line-clamp-2 group-hover:text-[#4F8CFF] transition-colors leading-tight">
              {experience.title}
            </h3>

            {/* Business name */}
            {experience.businessName && (
              <p className="text-xs text-white/40 mb-2.5">
                by {experience.businessName}
              </p>
            )}

            {/* Location */}
            <div className="flex items-center gap-1.5 text-xs text-white/60 mb-3">
              <MapPin weight="fill" className="w-3.5 h-3.5" />
              <span>{experience.city}</span>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
              {/* Price */}
              <div>
                <span className="text-base font-bold text-white">
                  {experience.priceLabel}
                </span>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-3 text-xs text-white/40">
                <div className="flex items-center gap-1">
                  <Eye weight="fill" className="w-3.5 h-3.5" />
                  <span>{experience.views || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock weight="fill" className="w-3.5 h-3.5" />
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
        className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center hover:scale-110 transition-transform z-10"
      >
        <Heart
          weight={isLiked ? "fill" : "regular"}
          className={`w-4 h-4 ${isLiked ? "text-red-500" : "text-white/60"}`}
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
    <div className="flex min-h-screen bg-[#0A0A0A] pt-16">
      {/* ================================================================
          LEFT SIDEBAR
          ================================================================ */}
      <aside className="hidden lg:flex w-56 shrink-0 border-r border-white/[0.06] bg-[#0D0D14]/50 backdrop-blur-xl">
        <div className="fixed w-56 h-screen flex flex-col p-5">
          
          {/* Navigation */}
          <nav className="flex-1 space-y-1.5 mt-4">
            {SIDEBAR_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
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
        </div>
      </aside>

      {/* ================================================================
          MAIN CONTENT
          ================================================================ */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-8 py-6">
          
          {/* ================================================================
              TOP FILTERS BAR
              ================================================================ */}
          <div className="mb-6 space-y-5">
            
            {/* Search + Filters Row */}
            <div className="flex flex-col md:flex-row gap-3">
              {/* Search */}
              <div className="flex-1 relative">
                <MagnifyingGlass
                  weight="bold"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40"
                />
                <input
                  type="text"
                  placeholder="Search experiences, retreats, workshops..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-white/40 focus:border-[#4F8CFF]/50 focus:bg-white/[0.05] outline-none transition-all"
                />
              </div>

              {/* Filter dropdown */}
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <Funnel
                    weight="bold"
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40"
                  />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
                    className="h-10 pl-8 pr-6 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white text-xs font-medium appearance-none cursor-pointer hover:bg-white/[0.05] transition-all outline-none"
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
                    className="h-10 px-3 pr-6 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white text-xs font-medium appearance-none cursor-pointer hover:bg-white/[0.05] transition-all outline-none"
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
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
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
              <p className="text-xs text-white/50">
                <span className="text-white font-semibold">{filteredExperiences.length}</span> experiences found
              </p>

              {/* Active filter badges */}
              {(searchQuery || selectedCategory !== "all" || filterStatus !== "all") && (
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-white/40">Active filters:</span>
                  {searchQuery && (
                    <span className="px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-[10px] text-white/70">
                      Search: {searchQuery}
                    </span>
                  )}
                  {selectedCategory !== "all" && (
                    <span className="px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-[10px] text-white/70">
                      {CATEGORIES.find((c) => c.id === selectedCategory)?.label}
                    </span>
                  )}
                  {filterStatus !== "all" && (
                    <span className="px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-[10px] text-white/70">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
                {displayedExperiences.map((exp) => (
                  <ListingCard key={exp.id} experience={exp} />
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="flex justify-center">
                  <button
                    onClick={() => setDisplayCount((prev) => prev + 12)}
                    className="px-6 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white text-sm font-medium hover:bg-white/[0.06] hover:border-white/[0.12] transition-all"
                  >
                    Load More ({filteredExperiences.length - displayCount} remaining)
                  </button>
                </div>
              )}
            </>
          ) : (
            // Empty state
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-white/[0.03] flex items-center justify-center mb-5">
                <MagnifyingGlass weight="duotone" className="w-8 h-8 text-white/20" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No experiences found</h3>
              <p className="text-sm text-white/50 mb-5">Try adjusting your filters or search query</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setFilterStatus("all");
                }}
                className="px-5 py-2 rounded-lg bg-white/[0.06] border border-white/[0.08] text-white text-xs font-medium hover:bg-white/[0.08] transition-all"
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