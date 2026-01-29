// app/marketplace/[id]/VenueDetailClient.tsx
"use client";

import { useState, useEffect } from "react";
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
  ShareNetwork,
  CalendarPlus,
  Users,
  TrendUp,
  ChatCircle,
  Warning,
  X,
  PaperPlaneTilt,
  SignIn,
  MapTrifold,
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
  images: string[];  // ADD THIS
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

type CurrentUser = {
  id: string;
  clerkId: string;
  archetype: string | null;
  mood: string | null;
} | null;

type AstrologyProfile = {
  moonSign: string | null;
  sunSign: string | null;
  risingSign: string | null;
} | null;

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

const MOOD_OPTIONS = [
  { value: "focused", emoji: "🎯", label: "Focused" },
  { value: "social", emoji: "🎉", label: "Social" },
  { value: "relaxed", emoji: "😌", label: "Relaxed" },
  { value: "creative", emoji: "🎨", label: "Creative" },
  { value: "contemplative", emoji: "🤔", label: "Contemplative" },
  { value: "energized", emoji: "⚡", label: "Energized" },
];

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
      <div className="relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-800">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-black/80 transition-all"
            >
              <CaretLeft className="w-5 h-5 text-white" weight="bold" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-black/80 transition-all"
            >
              <CaretRight className="w-5 h-5 text-white" weight="bold" />
            </motion.button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm border border-white/10"
          >
            <span className="text-xs font-medium text-white">
              {currentIndex + 1} / {images.length}
            </span>
          </motion.div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentIndex(idx)}
              className={`relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                idx === currentIndex
                  ? "border-white shadow-lg shadow-white/20"
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   MAIN COMPONENT
   ============================================================================ */

export default function VenueDetailClient({ 
  venue,
  currentUser,
  astrologyProfile,
}: { 
  venue: VenueDetail;
  currentUser: CurrentUser;
  astrologyProfile: AstrologyProfile;
}) {
  const [imageError, setImageError] = useState(false);
  
  // Check-in state
  const [checkinStatus, setCheckinStatus] = useState<string | null>(null);
  const [loadingCheckin, setLoadingCheckin] = useState(false);
  
  // Mood state
  const [currentMood, setCurrentMood] = useState<string | null>(currentUser?.mood || null);
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  
  // Favorite state
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Venue stats
  const [venueStats, setVenueStats] = useState<any>(null);
  const [similarVenues, setSimilarVenues] = useState<any[]>([]);
  
  // Chat state
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loadingChat, setLoadingChat] = useState(false);
  const [showReportModal, setShowReportModal] = useState<string | null>(null);

  // Fetch user's check-in status
  useEffect(() => {
    if (!currentUser) return;
    
    fetch(`/api/venue-checkin?venueId=${venue.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.checkin) {
          setCheckinStatus(data.checkin.status);
        }
      })
      .catch((err) => console.error("Error fetching check-in:", err));
  }, [venue.id, currentUser]);

  // Fetch venue stats
  useEffect(() => {
    fetch(`/api/venue-stats?venueId=${venue.id}`)
      .then((res) => res.json())
      .then((data) => setVenueStats(data))
      .catch((err) => console.error("Error fetching venue stats:", err));
  }, [venue.id]);

  // Fetch similar venues
  useEffect(() => {
    fetch(`/api/similar-venues?venueId=${venue.id}`)
      .then((res) => res.json())
      .then((data) => setSimilarVenues(data.similarVenues || []))
      .catch((err) => console.error("Error fetching similar venues:", err));
  }, [venue.id]);

  // Fetch chat messages
  const fetchChatMessages = () => {
    setLoadingChat(true);
    fetch(`/api/venue-chat?venueId=${venue.id}`)
      .then((res) => res.json())
      .then((data) => {
        setChatMessages(data.messages || []);
        setLoadingChat(false);
      })
      .catch((err) => {
        console.error("Error fetching chat:", err);
        setLoadingChat(false);
      });
  };

  useEffect(() => {
    fetchChatMessages();
  }, [venue.id]);

  // Check-in handler
  const handleCheckin = async (status: "here" | "going") => {
    if (!currentUser) return;
    
    setLoadingCheckin(true);
    try {
      const res = await fetch("/api/venue-checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ venueId: venue.id, status }),
      });

      if (res.ok) {
        setCheckinStatus(status);
        // Refresh stats
        fetch(`/api/venue-stats?venueId=${venue.id}`)
          .then((r) => r.json())
          .then((data) => setVenueStats(data));
      }
    } catch (err) {
      console.error("Error checking in:", err);
    } finally {
      setLoadingCheckin(false);
    }
  };

  // Remove check-in
  const handleRemoveCheckin = async () => {
    if (!currentUser) return;
    
    setLoadingCheckin(true);
    try {
      const res = await fetch(`/api/venue-checkin?venueId=${venue.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setCheckinStatus(null);
        // Refresh stats
        fetch(`/api/venue-stats?venueId=${venue.id}`)
          .then((r) => r.json())
          .then((data) => setVenueStats(data));
      }
    } catch (err) {
      console.error("Error removing check-in:", err);
    } finally {
      setLoadingCheckin(false);
    }
  };

  // Mood update handler
  const handleMoodUpdate = async (mood: string) => {
    if (!currentUser) return;
    
    try {
      const res = await fetch("/api/users/mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood }),
      });

      if (res.ok) {
        setCurrentMood(mood);
        setShowMoodSelector(false);
      }
    } catch (err) {
      console.error("Error updating mood:", err);
    }
  };

  // Send chat message
  const handleSendMessage = async () => {
    if (!currentUser || !newMessage.trim()) return;
    
    try {
      const res = await fetch("/api/venue-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          venueId: venue.id,
          message: newMessage,
          mood: currentMood,
        }),
      });

      if (res.ok) {
        setNewMessage("");
        fetchChatMessages(); // Refresh messages
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  // Report chat message
  const handleReportMessage = async (chatId: string, reason?: string) => {
    if (!currentUser) return;
    
    try {
      const res = await fetch("/api/venue-chat/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId, reason }),
      });

      if (res.ok) {
        setShowReportModal(null);
        fetchChatMessages(); // Refresh messages
      }
    } catch (err) {
      console.error("Error reporting message:", err);
    }
  };

  // Share handler
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: venue.name,
        text: `Check out ${venue.name} on Avirage!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // Prepare images array (currently just one, but ready for multiple)
  const images = venue.images.length > 0 ? venue.images : 
               (venue.imageUrl && !imageError ? [venue.imageUrl] : []);

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
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-950/10 to-black pb-20">{

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

      {/* Hero Image with Gradient Overlay */}
      <div className="relative w-full h-[40vh] bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-blue-900/20 overflow-hidden">
        {images.length > 0 ? (
          <>
            <img
              src={images[0]}
              alt={venue.name}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-950 to-blue-950">
            <Sparkle className="w-20 h-20 text-blue-400/30" weight="duotone" />
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

        {/* Check-in Buttons - Bottom of Hero */}
        {currentUser && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
            {checkinStatus === "here" ? (
              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={handleRemoveCheckin}
                disabled={loadingCheckin}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-500 text-white font-semibold border-2 border-emerald-400 shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all disabled:opacity-50"
              >
                <Check className="w-5 h-5" weight="bold" />
                <span>I'm Here</span>
                {currentMood && (
                  <span className="ml-1">
                    {MOOD_OPTIONS.find((m) => m.value === currentMood)?.emoji}
                  </span>
                )}
              </motion.button>
            ) : checkinStatus === "going" ? (
              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={handleRemoveCheckin}
                disabled={loadingCheckin}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-blue-500 text-white font-semibold border-2 border-blue-400 shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all disabled:opacity-50"
              >
                <CalendarPlus className="w-5 h-5" weight="bold" />
                <span>I'm Going</span>
              </motion.button>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCheckin("here")}
                  disabled={loadingCheckin}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-md text-white font-semibold border border-white/20 hover:bg-white/20 transition-all disabled:opacity-50"
                >
                  <SignIn className="w-5 h-5" weight="bold" />
                  <span>I am here</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCheckin("going")}
                  disabled={loadingCheckin}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-md text-white font-semibold border border-white/20 hover:bg-white/20 transition-all disabled:opacity-50"
                >
                  <CalendarPlus className="w-5 h-5" weight="bold" />
                  <span>I am going</span>
                </motion.button>
              </>
            )}
          </div>
        )}

        {/* Current Activity Badge */}
        {venueStats && venueStats.currentActivity && venueStats.currentActivity.total > 0 && (
          <div className="absolute bottom-6 right-6 px-3 py-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/10">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" weight="fill" />
              <span className="text-xs text-white font-medium">
                {venueStats.currentActivity.here} here · {venueStats.currentActivity.going} going
              </span>
            </div>
          </div>
        )}
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
              className="p-5 sm:p-6 rounded-lg bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-white/5 shadow-lg shadow-blue-500/5"
            >
              <div className="flex items-start gap-3 sm:gap-4 mb-4">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center flex-shrink-0"
                >
                  <Sparkle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" weight="fill" />
                </motion.div>
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

            {/* Personalized Archetype Insights */}
            {venue.userMatch && venue.userMatch.archetype && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-5 sm:p-6 rounded-lg bg-gradient-to-br from-blue-950/30 to-purple-950/30 border border-blue-500/20"
              >
                <h3 className="text-base sm:text-lg font-semibold text-white mb-4">
                  Why This Venue Suits Your {venue.userMatch.archetype}
                </h3>
                <div className="space-y-3 text-sm text-zinc-300">
                  <p>
                    As a <span className="font-semibold text-white">{venue.userMatch.archetype}</span>, you naturally resonate with spaces that honor your unique energy and values.
                  </p>
                  {astrologyProfile && astrologyProfile.moonSign && (
                    <p className="pl-4 border-l-2 border-blue-500/30">
                      <span className="text-blue-300">Moon in {astrologyProfile.moonSign}:</span> Your emotional nature seeks environments that nurture your inner world. This space provides the atmosphere you need to feel centered.
                    </p>
                  )}
                  <p>
                    The dominant <span className="font-semibold text-white">{venue.dominantArchetype.name}</span> energy here complements your natural tendencies, creating a harmonious backdrop for connection and growth.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Trending Archetypes */}
            {venueStats && venueStats.trendingArchetypes && venueStats.trendingArchetypes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-5 sm:p-6 rounded-lg bg-[#111111] border border-white/5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <TrendUp className="w-5 h-5 text-emerald-400" weight="bold" />
                  <h3 className="text-base sm:text-lg font-semibold text-white">
                    Trending Archetypes Here
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 mb-4">
                  Who's been visiting this week
                </p>
                <div className="space-y-2">
                  {venueStats.trendingArchetypes.map((item: any, idx: number) => (
                    <div
                      key={item.archetype}
                      className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/50 border border-white/5"
                    >
                      <span className="text-sm text-white capitalize font-medium">
                        {item.archetype}
                      </span>
                      <span className="text-xs text-zinc-400">
                        {item.count} {item.count === 1 ? "visit" : "visits"}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Popular Times */}
            {venueStats && venueStats.popularTimes && venueStats.popularTimes.peakDay && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-5 sm:p-6 rounded-lg bg-[#111111] border border-white/5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-blue-400" weight="fill" />
                  <h3 className="text-base sm:text-lg font-semibold text-white">
                    Popular Times
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {venueStats.popularTimes.peakDay && (
                    <div className="p-3 rounded-lg bg-zinc-900/50">
                      <p className="text-xs text-zinc-400 mb-1">Busiest Day</p>
                      <p className="text-sm font-semibold text-white">
                        {venueStats.popularTimes.peakDay}
                      </p>
                    </div>
                  )}
                  {venueStats.popularTimes.peakHour !== null && (
                    <div className="p-3 rounded-lg bg-zinc-900/50">
                      <p className="text-xs text-zinc-400 mb-1">Peak Hour</p>
                      <p className="text-sm font-semibold text-white">
                        {venueStats.popularTimes.peakHour}:00
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Similar Venues */}
            {similarVenues.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-base sm:text-lg font-semibold text-white mb-4">
                  Similar Venues You Might Like
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {similarVenues.slice(0, 4).map((similar: any) => (
                    <Link
                      key={similar.id}
                      href={`/marketplace/${similar.id}`}
                      className="group p-4 rounded-lg bg-[#111111] border border-white/5 hover:border-white/20 transition-all"
                    >
                      <div className="flex gap-3">
                        {similar.imageUrl && (
                          <img
                            src={similar.imageUrl}
                            alt={similar.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors truncate">
                            {similar.name}
                          </h4>
                          <p className="text-xs text-zinc-400">
                            {similar.neighborhood || similar.city}
                          </p>
                          {similar.priceRange && (
                            <p className="text-xs text-zinc-500 mt-1">
                              {similar.priceRange}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Host Meetup CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="p-5 sm:p-6 rounded-lg bg-gradient-to-br from-purple-950/30 to-blue-950/30 border border-purple-500/20"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-purple-400" weight="fill" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                    Host a Meetup Here
                  </h3>
                  <p className="text-sm text-zinc-300 mb-4">
                    Bring your community together at this space. Create meaningful connections with like-minded souls.
                  </p>
                  <Link
                    href="/dashboard/meetups"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500 text-white text-sm font-semibold hover:bg-purple-600 transition-all"
                  >
                    <CalendarPlus className="w-4 h-4" weight="bold" />
                    Create Meetup
                  </Link>
                </div>
              </div>
            </motion.div>

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
                      <motion.div
                        key={vibe}
                        whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.2)" }}
                        className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-white/5 cursor-default"
                      >
                        <motion.span 
                          animate={{ rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                          className="text-xl sm:text-2xl"
                        >
                          {info.emoji}
                        </motion.span>
                        <span className="text-sm text-zinc-300">
                          {info.label}
                        </span>
                      </motion.div>
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

            {/* Mood Tracker - Only for logged-in users */}
            {currentUser && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-lg bg-gradient-to-br from-blue-950/30 to-purple-950/30 border border-blue-500/20"
              >
                <h3 className="text-sm font-semibold text-white mb-3">
                  How are you feeling?
                </h3>
                {!showMoodSelector ? (
                  <button
                    onClick={() => setShowMoodSelector(true)}
                    className="w-full p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left"
                  >
                    {currentMood ? (
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">
                          {MOOD_OPTIONS.find((m) => m.value === currentMood)?.emoji}
                        </span>
                        <span className="text-sm text-white capitalize">
                          {currentMood}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-zinc-400">Select your mood</span>
                    )}
                  </button>
                ) : (
                  <div className="space-y-2">
                    {MOOD_OPTIONS.map((mood) => (
                      <button
                        key={mood.value}
                        onClick={() => handleMoodUpdate(mood.value)}
                        className={`w-full p-3 rounded-lg flex items-center gap-3 transition-all ${
                          currentMood === mood.value
                            ? "bg-blue-500/20 border-2 border-blue-500"
                            : "bg-white/5 border border-white/10 hover:bg-white/10"
                        }`}
                      >
                        <span className="text-2xl">{mood.emoji}</span>
                        <span className="text-sm text-white">{mood.label}</span>
                      </button>
                    ))}
                    <button
                      onClick={() => setShowMoodSelector(false)}
                      className="w-full p-2 text-xs text-zinc-400 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* Interactive Action Buttons */}
            {currentUser && (
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                    isFavorite
                      ? "bg-red-500/20 border-red-500/50 text-red-400"
                      : "bg-white/5 border-white/10 text-zinc-400 hover:border-white/30"
                  }`}
                >
                  <Heart
                    className="w-5 h-5"
                    weight={isFavorite ? "fill" : "regular"}
                  />
                  <span className="text-sm font-medium">
                    {isFavorite ? "Saved" : "Save"}
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:border-white/30 transition-all"
                >
                  <ShareNetwork className="w-5 h-5" weight="bold" />
                  <span className="text-sm font-medium">Share</span>
                </motion.button>
              </div>
            )}

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
              {/* Book/Inquire Button - If venue has booking capability */}
              <Link
                href={`/marketplace/${venue.id}/inquire`}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg shadow-blue-500/20"
              >
                <CalendarPlus className="w-5 h-5" weight="bold" />
                Book / Inquire
              </Link>

              {venue.googleMapsUrl && (
                <a
                  href={venue.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-white text-black font-semibold hover:bg-white/90 transition-all"
                >
                  <MapTrifold className="w-5 h-5" weight="fill" />
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

            {/* Venue Chat */}
            <div className="p-5 sm:p-6 rounded-lg bg-[#111111] border border-white/5">
              <div className="flex items-center gap-2 mb-4">
                <ChatsCircle
                  className="w-5 h-5 text-blue-400"
                  weight="duotone"
                />
                <h3 className="text-base font-semibold text-white">
                  Venue Chat
                </h3>
              </div>

              {/* Chat Messages */}
              <div className="space-y-3 mb-4 max-h-[400px] overflow-y-auto">
                {loadingChat ? (
                  <p className="text-sm text-zinc-400 text-center py-4">
                    Loading messages...
                  </p>
                ) : chatMessages.length === 0 ? (
                  <div className="text-center py-8">
                    <ChatCircle
                      className="w-12 h-12 text-zinc-700 mx-auto mb-3"
                      weight="duotone"
                    />
                    <p className="text-sm text-zinc-400">
                      No messages yet. Be the first to share!
                    </p>
                  </div>
                ) : (
                  chatMessages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-lg bg-zinc-900/50 border border-white/5"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {msg.user?.avatar && (
                            <img
                              src={msg.user.avatar}
                              alt={msg.user.name || "User"}
                              className="w-6 h-6 rounded-full"
                            />
                          )}
                          <div>
                            <p className="text-xs font-semibold text-white">
                              {msg.user?.name || msg.user?.username || "Anonymous"}
                            </p>
                            {msg.user?.primaryCode && (
                              <p className="text-[10px] text-zinc-500 capitalize">
                                {msg.user.primaryCode}
                              </p>
                            )}
                          </div>
                          {msg.isCheckedIn && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              Here
                            </span>
                          )}
                          {msg.mood && (
                            <span className="text-sm">
                              {MOOD_OPTIONS.find((m) => m.value === msg.mood)?.emoji}
                            </span>
                          )}
                        </div>
                        {currentUser && msg.userId !== currentUser.clerkId && (
                          <button
                            onClick={() => setShowReportModal(msg.id)}
                            className="text-zinc-500 hover:text-red-400 transition-colors"
                          >
                            <Warning className="w-4 h-4" weight="fill" />
                          </button>
                        )}
                      </div>
                      <p className="text-sm text-zinc-300 leading-relaxed">
                        {msg.message}
                      </p>
                      <p className="text-[10px] text-zinc-500 mt-1">
                        {new Date(msg.createdAt).toLocaleString()}
                      </p>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Chat Input */}
              {currentUser ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Share your thoughts..."
                    maxLength={500}
                    className="flex-1 px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-blue-500/50"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <PaperPlaneTilt className="w-5 h-5" weight="fill" />
                  </button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-zinc-400 mb-3">
                    Sign in to join the conversation
                  </p>
                  <Link
                    href="/sign-in"
                    className="inline-block px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 transition-all"
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Report Modal */}
      <AnimatePresence>
        {showReportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setShowReportModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md p-6 rounded-lg bg-[#111111] border border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Report Message</h3>
                <button
                  onClick={() => setShowReportModal(null)}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" weight="bold" />
                </button>
              </div>
              <p className="text-sm text-zinc-400 mb-4">
                This message will be flagged for moderation. Multiple reports will result in automatic removal.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowReportModal(null)}
                  className="flex-1 px-4 py-2 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleReportMessage(showReportModal)}
                  className="flex-1 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all"
                >
                  Report
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}