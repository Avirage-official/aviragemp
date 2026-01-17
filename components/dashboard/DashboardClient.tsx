// components/dashboard/DashboardClient.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkle,
  Sun,
  Hash,
  Users,
  Heart,
  Calendar,
  MapPin,
  ArrowRight,
  Smiley,
  Lightning,
  Star,
  MoonStars,
  Compass,
} from "@phosphor-icons/react";

/* ============================================================================
   TYPES
   ============================================================================ */

type UserData = {
  id: string;
  name: string;
  username: string | null;
  primaryCode: string;
  secondaryCode: string | null;
  tertiaryCode: string | null;
  city: string | null;
  currentMood: string | null;
  astrology: {
    sunSign: string | null;
    moonSign: string | null;
    risingSign: string | null;
    birthElement: string | null;
  } | null;
  numerology: {
    lifePathNumber: number | null;
    expressionNumber: number | null;
    soulUrgeNumber: number | null;
  } | null;
  friendCount: number;
  upcomingMeetups: number;
};

type DashboardClientProps = {
  user: UserData;
};

/* ============================================================================
   ANIMATION VARIANTS
   ============================================================================ */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* ============================================================================
   ZODIAC DATA
   ============================================================================ */

const ZODIAC_SYMBOLS: Record<string, string> = {
  aries: "♈",
  taurus: "♉",
  gemini: "♊",
  cancer: "♋",
  leo: "♌",
  virgo: "♍",
  libra: "♎",
  scorpio: "♏",
  sagittarius: "♐",
  capricorn: "♑",
  aquarius: "♒",
  pisces: "♓",
};

/* ============================================================================
   GREETING HELPER
   ============================================================================ */

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function getEncouragement(): string {
  const phrases = [
    "You're doing amazing ✨",
    "Today is your day 🌟",
    "Keep shining bright 💫",
    "You've got this 🔥",
    "The universe is on your side ✨",
    "Your energy is magnetic today 💜",
  ];
  return phrases[Math.floor(Math.random() * phrases.length)];
}

/* ============================================================================
   MAIN COMPONENT
   ============================================================================ */

export function DashboardClient({ user }: DashboardClientProps) {
  const [encouragement] = useState(getEncouragement);
  
  const sunSign = user.astrology?.sunSign?.toLowerCase();
  const zodiacSymbol = sunSign ? ZODIAC_SYMBOLS[sunSign] : null;
  const lifePathNumber = user.numerology?.lifePathNumber;
  
  // Format code name for display
  const formatCode = (code: string) => {
    return code.charAt(0).toUpperCase() + code.slice(1);
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full bg-[#4F8CFF] opacity-[0.04] blur-[100px] animate-float" />
        <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] rounded-full bg-[#C7B9FF] opacity-[0.05] blur-[80px] animate-float" style={{ animationDelay: "-2s" }} />
        <div className="absolute bottom-[10%] left-[30%] w-[350px] h-[350px] rounded-full bg-[#7CF5C8] opacity-[0.04] blur-[90px] animate-float" style={{ animationDelay: "-4s" }} />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12"
      >
        {/* ================================================================
            HERO SECTION — Personal Greeting
            ================================================================ */}
        <motion.section variants={itemVariants} className="mb-10">
          <div className="relative rounded-[2rem] overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#4F8CFF]/20 via-[#C7B9FF]/10 to-[#7CF5C8]/10" />
            <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03]" />
            
            <div className="relative px-6 sm:px-10 py-10 sm:py-14">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                <div>
                  {/* Greeting */}
                  <p className="text-[#B8B8D0] text-sm mb-2 flex items-center gap-2">
                    <Lightning weight="fill" className="w-4 h-4 text-[#FFD97D]" />
                    {encouragement}
                  </p>
                  
                  {/* Name */}
                  <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                    {getGreeting()},{" "}
                    <span className="text-gradient-blue">{user.name}</span>
                  </h1>
                  
                  {/* Identity summary */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="badge-lavender flex items-center gap-1.5">
                      <Sparkle weight="fill" className="w-3.5 h-3.5" />
                      {formatCode(user.primaryCode)}
                    </span>
                    
                    {user.astrology?.sunSign && (
                      <span className="badge-blue flex items-center gap-1.5">
                        <span className="text-base">{zodiacSymbol}</span>
                        {user.astrology.sunSign}
                      </span>
                    )}
                    
                    {lifePathNumber && (
                      <span className="badge-mint flex items-center gap-1.5">
                        <Hash weight="bold" className="w-3.5 h-3.5" />
                        Life Path {lifePathNumber}
                      </span>
                    )}
                    
                    {user.city && (
                      <span className="badge flex items-center gap-1.5">
                        <MapPin weight="fill" className="w-3.5 h-3.5 text-[#7878A0]" />
                        {user.city}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Mood Button */}
                <button className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD97D] to-[#FF8F8F] flex items-center justify-center">
                    <Smiley weight="fill" className="w-5 h-5 text-[#0F0F1A]" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-[#7878A0]">Current mood</p>
                    <p className="text-sm font-medium text-white">
                      {user.currentMood || "Set your vibe"}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#7878A0] group-hover:text-white group-hover:translate-x-1 transition-all" />
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ================================================================
            BENTO GRID — The Hub
            ================================================================ */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          
          {/* YOUR CODES — Large Card */}
          <motion.div variants={itemVariants} className="col-span-2 row-span-2">
            <Link href="/dashboard/codes" className="block h-full">
              <div className="group relative h-full rounded-[1.75rem] overflow-hidden transition-all duration-500 hover:scale-[1.02]">
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C7B9FF]/20 via-[#4F8CFF]/10 to-transparent" />
                <div className="absolute inset-0 bg-[#1E1E30]/80" />
                
                {/* Animated glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#C7B9FF]/20 blur-[60px]" />
                </div>
                
                {/* Border */}
                <div className="absolute inset-0 rounded-[1.75rem] border border-[#C7B9FF]/20 group-hover:border-[#C7B9FF]/40 transition-colors" />
                
                <div className="relative h-full p-6 sm:p-8 flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C7B9FF] to-[#8B7FD4] flex items-center justify-center shadow-lg shadow-[#C7B9FF]/20">
                      <Sparkle weight="fill" className="w-7 h-7 text-[#0F0F1A]" />
                    </div>
                    <span className="badge-lavender">3 codes</span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">Your Mythical Codes</h3>
                    <p className="text-[#B8B8D0] text-sm mb-6">
                      The archetypes that define your essence
                    </p>
                    
                    {/* Code badges */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className="w-2 h-8 rounded-full bg-[#4F8CFF]" />
                        <div>
                          <p className="text-white font-semibold">{formatCode(user.primaryCode)}</p>
                          <p className="text-xs text-[#7878A0]">Primary Code</p>
                        </div>
                      </div>
                      
                      {user.secondaryCode && (
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                          <div className="w-2 h-8 rounded-full bg-[#7CF5C8]" />
                          <div>
                            <p className="text-white font-semibold">{formatCode(user.secondaryCode)}</p>
                            <p className="text-xs text-[#7878A0]">Secondary Code</p>
                          </div>
                        </div>
                      )}
                      
                      {user.tertiaryCode && (
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                          <div className="w-2 h-8 rounded-full bg-[#C7B9FF]" />
                          <div>
                            <p className="text-white font-semibold">{formatCode(user.tertiaryCode)}</p>
                            <p className="text-xs text-[#7878A0]">Tertiary Code</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Footer */}
                  <div className="flex items-center gap-2 text-[#C7B9FF] text-sm font-medium mt-6 group-hover:gap-3 transition-all">
                    <span>Explore your identity</span>
                    <ArrowRight weight="bold" className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* ASTROLOGY */}
          <motion.div variants={itemVariants}>
            <Link href="/dashboard/astrology" className="block h-full">
              <div className="group relative h-full min-h-[200px] rounded-[1.5rem] overflow-hidden transition-all duration-500 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#4F8CFF]/15 to-transparent" />
                <div className="absolute inset-0 bg-[#1E1E30]/80" />
                <div className="absolute inset-0 rounded-[1.5rem] border border-[#4F8CFF]/20 group-hover:border-[#4F8CFF]/40 transition-colors" />
                
                <div className="relative h-full p-5 flex flex-col">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#4F8CFF] to-[#3B7AE8] flex items-center justify-center mb-4 shadow-lg shadow-[#4F8CFF]/20">
                    <Sun weight="fill" className="w-5 h-5 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-1">Astrology</h3>
                  
                  {user.astrology?.sunSign ? (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-3xl">{zodiacSymbol}</span>
                      <div>
                        <p className="text-white font-medium">{user.astrology.sunSign}</p>
                        <p className="text-xs text-[#7878A0]">{user.astrology.birthElement || "Element"}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-[#7878A0] mt-auto">Discover your cosmic blueprint</p>
                  )}
                  
                  <div className="flex items-center gap-1 text-[#4F8CFF] text-sm font-medium mt-auto pt-4 group-hover:gap-2 transition-all">
                    <span>Explore</span>
                    <ArrowRight weight="bold" className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* NUMEROLOGY */}
          <motion.div variants={itemVariants}>
            <Link href="/dashboard/numerology" className="block h-full">
              <div className="group relative h-full min-h-[200px] rounded-[1.5rem] overflow-hidden transition-all duration-500 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#7CF5C8]/15 to-transparent" />
                <div className="absolute inset-0 bg-[#1E1E30]/80" />
                <div className="absolute inset-0 rounded-[1.5rem] border border-[#7CF5C8]/20 group-hover:border-[#7CF5C8]/40 transition-colors" />
                
                <div className="relative h-full p-5 flex flex-col">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#7CF5C8] to-[#5ED9A8] flex items-center justify-center mb-4 shadow-lg shadow-[#7CF5C8]/20">
                    <Hash weight="bold" className="w-5 h-5 text-[#0F0F1A]" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-1">Numerology</h3>
                  
                  {lifePathNumber ? (
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-5xl font-bold text-[#7CF5C8]">{lifePathNumber}</span>
                      <span className="text-xs text-[#7878A0]">Life Path</span>
                    </div>
                  ) : (
                    <p className="text-sm text-[#7878A0] mt-auto">Unlock your number story</p>
                  )}
                  
                  <div className="flex items-center gap-1 text-[#7CF5C8] text-sm font-medium mt-auto pt-4 group-hover:gap-2 transition-all">
                    <span>Explore</span>
                    <ArrowRight weight="bold" className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* FRIENDS */}
          <motion.div variants={itemVariants}>
            <Link href="/dashboard/friends" className="block h-full">
              <div className="group relative h-full min-h-[200px] rounded-[1.5rem] overflow-hidden transition-all duration-500 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFB5E8]/15 to-transparent" />
                <div className="absolute inset-0 bg-[#1E1E30]/80" />
                <div className="absolute inset-0 rounded-[1.5rem] border border-[#FFB5E8]/20 group-hover:border-[#FFB5E8]/40 transition-colors" />
                
                <div className="relative h-full p-5 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FFB5E8] to-[#E89FD0] flex items-center justify-center shadow-lg shadow-[#FFB5E8]/20">
                      <Users weight="fill" className="w-5 h-5 text-[#0F0F1A]" />
                    </div>
                    {user.friendCount > 0 && (
                      <span className="badge-coral">{user.friendCount}</span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-1">Friends</h3>
                  <p className="text-sm text-[#7878A0]">
                    {user.friendCount > 0 
                      ? `${user.friendCount} connection${user.friendCount > 1 ? "s" : ""}`
                      : "Build your circle"
                    }
                  </p>
                  
                  <div className="flex items-center gap-1 text-[#FFB5E8] text-sm font-medium mt-auto pt-4 group-hover:gap-2 transition-all">
                    <span>View all</span>
                    <ArrowRight weight="bold" className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* COMPATIBILITY */}
          <motion.div variants={itemVariants}>
            <Link href="/dashboard/compatibility" className="block h-full">
              <div className="group relative h-full min-h-[200px] rounded-[1.5rem] overflow-hidden transition-all duration-500 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF8F8F]/15 to-transparent" />
                <div className="absolute inset-0 bg-[#1E1E30]/80" />
                <div className="absolute inset-0 rounded-[1.5rem] border border-[#FF8F8F]/20 group-hover:border-[#FF8F8F]/40 transition-colors" />
                
                <div className="relative h-full p-5 flex flex-col">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FF8F8F] to-[#E87878] flex items-center justify-center mb-4 shadow-lg shadow-[#FF8F8F]/20">
                    <Heart weight="fill" className="w-5 h-5 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-1">Compatibility</h3>
                  <p className="text-sm text-[#7878A0]">Find your matches</p>
                  
                  <div className="flex items-center gap-1 text-[#FF8F8F] text-sm font-medium mt-auto pt-4 group-hover:gap-2 transition-all">
                    <span>Check vibes</span>
                    <ArrowRight weight="bold" className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* MEETUPS — Wide Card */}
          <motion.div variants={itemVariants} className="col-span-2">
            <Link href="/dashboard/meetups" className="block h-full">
              <div className="group relative h-full min-h-[180px] rounded-[1.5rem] overflow-hidden transition-all duration-500 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFD97D]/15 via-[#FF8F8F]/10 to-[#FFB5E8]/15" />
                <div className="absolute inset-0 bg-[#1E1E30]/80" />
                <div className="absolute inset-0 rounded-[1.5rem] border border-[#FFD97D]/20 group-hover:border-[#FFD97D]/40 transition-colors" />
                
                <div className="relative h-full p-6 flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFD97D] to-[#F0C060] flex items-center justify-center shadow-lg shadow-[#FFD97D]/20">
                      <Calendar weight="fill" className="w-7 h-7 text-[#0F0F1A]" />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Meetups</h3>
                      <p className="text-[#7878A0]">
                        {user.upcomingMeetups > 0 
                          ? `${user.upcomingMeetups} upcoming event${user.upcomingMeetups > 1 ? "s" : ""}`
                          : "Discover events near you"
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="hidden sm:flex items-center gap-3">
                    {user.upcomingMeetups > 0 && (
                      <span className="badge-gold text-sm">{user.upcomingMeetups} upcoming</span>
                    )}
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#FFD97D]/20 group-hover:border-[#FFD97D]/30 transition-all">
                      <ArrowRight weight="bold" className="w-5 h-5 text-[#FFD97D]" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* MARKETPLACE PROMO — Wide Card */}
          <motion.div variants={itemVariants} className="col-span-2">
            <Link href="/marketplace" className="block">
              <div className="group relative rounded-[1.5rem] overflow-hidden transition-all duration-500 hover:scale-[1.02]">
                {/* Rainbow gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#4F8CFF]/20 via-[#C7B9FF]/20 to-[#7CF5C8]/20" />
                <div className="absolute inset-0 bg-[#1E1E30]/70" />
                <div className="absolute inset-0 rounded-[1.5rem] border border-white/10 group-hover:border-white/20 transition-colors" />
                
                <div className="relative p-6 flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4F8CFF] via-[#C7B9FF] to-[#7CF5C8] flex items-center justify-center shadow-lg">
                      <Compass weight="fill" className="w-7 h-7 text-white" />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Explore Marketplace</h3>
                      <p className="text-[#B8B8D0]">
                        Experiences curated for <span className="text-[#C7B9FF]">{formatCode(user.primaryCode)}</span> energy
                      </p>
                    </div>
                  </div>
                  
                  <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-all">
                    <span className="text-sm font-medium text-white">Browse now</span>
                    <ArrowRight weight="bold" className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

        </section>

        {/* ================================================================
            FOOTER ENCOURAGEMENT
            ================================================================ */}
        <motion.section 
          variants={itemVariants} 
          className="mt-12 text-center"
        >
          <p className="text-[#7878A0] text-sm flex items-center justify-center gap-2">
            <Star weight="fill" className="w-4 h-4 text-[#FFD97D]" />
            Your journey is uniquely yours. Keep exploring.
            <Star weight="fill" className="w-4 h-4 text-[#FFD97D]" />
          </p>
        </motion.section>
      </motion.div>
    </div>
  );
}