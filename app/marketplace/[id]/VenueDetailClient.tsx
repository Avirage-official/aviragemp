// app/marketplace/[id]/VenueDetailClient.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Clock,
  CurrencyDollar,
  Globe,
  Sparkle,
  Check,
  Phone,
  ChatsCircle,
  CaretLeft,
  CaretRight,
  Heart,
} from "@phosphor-icons/react";

/* ============================================================================
   TYPES
   ============================================================================ */

type VenueDetail = {
  id: string;
  name: string;
  description: string | null;
  neighborhood: string | null;
  city: string;
  countryCode: string;
  address: string | null;
  subcategory: string;
  priceRange: string | null;
  imageUrl: string | null;
  googleMapsUrl: string | null;
  website: string | null;
  phone: string | null;
  hours: any;
  compatibilityScores: Record<string, number>;
  vibes: string[];
  dominantArchetype: {
    name: string;
    score: number;
    description: string;
  };
  userMatch: {
    percentage: number;
    archetype: string;
  } | null;
};

/* ============================================================================
   CONSTANTS
   ============================================================================ */

const VIBE_DISPLAY: Record<string, { label: string; emoji: string }> = {
  date_quiet: { label: "Date · Quiet", emoji: "💑" },
  loud_friends: { label: "Friends · Lively", emoji: "🎉" },
  solo_treat: { label: "Solo · Treat", emoji: "☕" },
  work_lunch: { label: "Work Lunch", emoji: "💼" },
  calm_focus: { label: "Calm · Focus", emoji: "🧘" },
  high_energy_social: { label: "High Energy · Social", emoji: "⚡" },
  creative_flow: { label: "Creative Flow", emoji: "🎨" },
  solo_recharge: { label: "Solo · Recharge", emoji: "🌿" },
};

/* ============================================================================
   HELPER FUNCTIONS
   ============================================================================ */

function getMatchLevel(percentage: number): {
  label: string;
  color: string;
  bgColor: string;
} {
  if (percentage >= 85)
    return {
      label: "Perfect Match",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    };
  if (percentage >= 70)
    return {
      label: "Great Match",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    };
  if (percentage >= 50)
    return {
      label: "Good Match",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    };
  return {
    label: "Worth Exploring",
    color: "text-zinc-400",
    bgColor: "bg-zinc-800/30",
  };
}

/* ============================================================================
   IMAGE CAROUSEL COMPONENT
   ============================================================================ */

function ImageCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) return null;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-3">
      {/* Main Image Display */}
      <div className="relative aspect-square rounded-lg overflow-hidden bg-zinc-900">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-black/80 transition-all"
            >
              <CaretLeft className="w-5 h-5 text-white" weight="bold" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-black/80 transition-all"
            >
              <CaretRight className="w-5 h-5 text-white" weight="bold" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm border border-white/10">
            <span className="text-xs font-medium text-white">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                idx === currentIndex
                  ? "border-white"
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   MAIN COMPONENT
   ============================================================================ */

export default function VenueDetailClient({ venue }: { venue: VenueDetail }) {
  const [imageError, setImageError] = useState(false);

  // Prepare images array (currently just one, but ready for multiple)
  const images = venue.imageUrl && !imageError ? [venue.imageUrl] : [];

  // Check if user's archetype matches venue's dominant archetype
  const isSameArchetype =
    venue.userMatch &&
    venue.userMatch.archetype.toLowerCase() ===
      venue.dominantArchetype.name.toLowerCase();

  // Get match level if percentage > 0
  const matchLevel =
    venue.userMatch && venue.userMatch.percentage > 0
      ? getMatchLevel(venue.userMatch.percentage)
      : null;

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3">
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" weight="bold" />
            Back to Spaces
          </Link>
        </div>
      </div>

      {/* Hero Image - Reduced height */}
      <div className="relative w-full h-[40vh] bg-zinc-900 overflow-hidden">
        {images.length > 0 ? (
          <>
            <img
              src={images[0]}
              alt={venue.name}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800">
            <Sparkle className="w-20 h-20 text-zinc-700" weight="duotone" />
          </div>
        )}

        {/* Subcategory Badge */}
        <div className="absolute top-4 sm:top-6 right-4 sm:right-6">
          <div className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10">
            <span className="text-xs font-semibold text-white">
              {venue.subcategory === "nomnoms" ? "NomNoms" : "Creative Vibe"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Title & Location */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                {venue.name}
              </h1>

              <div className="flex items-center gap-2 text-zinc-400 mb-4">
                <MapPin className="w-5 h-5 flex-shrink-0" weight="fill" />
                <span className="text-sm sm:text-base">
                  {venue.neighborhood
                    ? `${venue.neighborhood}, ${venue.city}`
                    : venue.city}
                </span>
              </div>

              {venue.description && (
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {venue.description}
                </p>
              )}
            </div>

            {/* Venue Personality Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 sm:p-6 rounded-lg bg-[#111111] border border-white/5"
            >
              <div className="flex items-start gap-3 sm:gap-4 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Sparkle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" weight="fill" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1">
                    {venue.dominantArchetype.name} Space
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400">
                    Dominant archetype alignment
                  </p>
                </div>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                {venue.dominantArchetype.description}
              </p>

              {/* Score Bar */}
              <div className="pt-4 border-t border-white/5">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-zinc-400">Archetype Strength</span>
                  <span className="text-white font-semibold">
                    {venue.dominantArchetype.score}%
                  </span>
                </div>
                <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${venue.dominantArchetype.score}%` }}
                  />
                </div>
              </div>
            </motion.div>

            {/* User Match Card - Only if percentage > 0 */}
            {matchLevel && venue.userMatch && venue.userMatch.percentage > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`p-5 sm:p-6 rounded-lg ${matchLevel.bgColor} border border-white/10`}
              >
                <div className="flex items-start gap-3 sm:gap-4 mb-4">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${matchLevel.bgColor} border border-white/10 flex items-center justify-center flex-shrink-0`}
                  >
                    {isSameArchetype ? (
                      <Heart
                        className={`w-5 h-5 sm:w-6 sm:h-6 ${matchLevel.color}`}
                        weight="fill"
                      />
                    ) : (
                      <Check
                        className={`w-5 h-5 sm:w-6 sm:h-6 ${matchLevel.color}`}
                        weight="bold"
                      />
                    )}
                  </div>
                  <div>
                    <h3
                      className={`text-base sm:text-lg font-semibold ${matchLevel.color} mb-1`}
                    >
                      {isSameArchetype
                        ? "This is Your Archetype Space!"
                        : matchLevel.label}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400">
                      {isSameArchetype
                        ? `Perfect alignment with ${venue.userMatch.archetype}`
                        : `For your ${venue.userMatch.archetype} archetype`}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                  {isSameArchetype
                    ? "This space embodies your core archetype. You'll feel completely at home here - the energy, vibe, and atmosphere are designed for people like you."
                    : `This space aligns with your personality. The environment resonates with traits commonly found in ${venue.userMatch.archetype} archetypes.`}
                </p>

                {/* Match Bar */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-zinc-400">Compatibility</span>
                    <span className={`font-semibold ${matchLevel.color}`}>
                      {venue.userMatch.percentage}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${matchLevel.color.replace(
                        "text-",
                        "bg-"
                      )} rounded-full transition-all duration-500`}
                      style={{ width: `${venue.userMatch.percentage}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Vibes Section */}
            {venue.vibes.length > 0 && (
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-4">
                  Atmosphere & Vibes
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {venue.vibes.map((vibe) => {
                    const info = VIBE_DISPLAY[vibe] || {
                      label: vibe,
                      emoji: "✨",
                    };
                    return (
                      <div
                        key={vibe}
                        className="flex items-center gap-3 p-4 rounded-lg bg-[#111111] border border-white/5"
                      >
                        <span className="text-xl sm:text-2xl">{info.emoji}</span>
                        <span className="text-sm text-zinc-300">
                          {info.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Image Carousel */}
            {images.length > 0 && <ImageCarousel images={images} />}

            {/* Quick Info */}
            <div className="p-5 sm:p-6 rounded-lg bg-[#111111] border border-white/5 space-y-4">
              <h3 className="text-base font-semibold text-white">Quick Info</h3>

              {/* Price */}
              {venue.priceRange && (
                <div className="flex items-center gap-3">
                  <CurrencyDollar
                    className="w-5 h-5 text-zinc-400 flex-shrink-0"
                    weight="fill"
                  />
                  <div>
                    <p className="text-xs text-zinc-500">Price Range</p>
                    <p className="text-sm text-white font-medium">
                      {venue.priceRange}
                    </p>
                  </div>
                </div>
              )}

              {/* Hours */}
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-zinc-400 flex-shrink-0" weight="fill" />
                <div>
                  <p className="text-xs text-zinc-500">Hours</p>
                  <p className="text-sm text-white font-medium">
                    Check website for hours
                  </p>
                </div>
              </div>

              {/* Phone */}
              {venue.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-zinc-400 flex-shrink-0" weight="fill" />
                  <div>
                    <p className="text-xs text-zinc-500">Phone</p>
                    <a
                      href={`tel:${venue.phone}`}
                      className="text-sm text-white font-medium hover:text-blue-400 transition-colors"
                    >
                      {venue.phone}
                    </a>
                  </div>
                </div>
              )}

              {/* Address */}
              {venue.address && (
                <div className="flex items-start gap-3">
                  <MapPin
                    className="w-5 h-5 text-zinc-400 mt-0.5 flex-shrink-0"
                    weight="fill"
                  />
                  <div>
                    <p className="text-xs text-zinc-500">Address</p>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {venue.address}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {venue.googleMapsUrl && (
                <a
                  href={venue.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-white text-black font-semibold hover:bg-white/90 transition-all"
                >
                  <MapPin className="w-5 h-5" weight="fill" />
                  View on Maps
                </a>
              )}

              {venue.website && (
                <a
                  href={venue.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-[#111111] border border-white/10 text-white font-medium hover:bg-[#151515] transition-all"
                >
                  <Globe className="w-5 h-5" weight="fill" />
                  Visit Website
                </a>
              )}
            </div>

            {/* Community Chat Placeholder */}
            <div className="p-5 sm:p-6 rounded-lg bg-[#111111] border border-white/5">
              <div className="text-center">
                <ChatsCircle
                  className="w-10 h-10 sm:w-12 sm:h-12 text-zinc-700 mx-auto mb-3"
                  weight="duotone"
                />
                <h3 className="text-sm sm:text-base font-semibold text-white mb-2">
                  Community Chat
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Coming soon - connect with others at this space
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}