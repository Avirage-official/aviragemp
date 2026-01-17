// components/dashboard/DashboardClient.tsx
"use client";

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
  Star,
  ChatCircle,
  Fire,
  Lightning,
} from "@phosphor-icons/react";

/* ============================================================================
   MYTHICAL CODES — Display names mapping
   ============================================================================ */

const MYTHICAL_CODE_NAMES: Record<string, { name: string; tagline: string; emoji: string }> = {
  lhumir: { name: "Stillmind", tagline: "Inner clarity through stillness", emoji: "🧘" },
  khoisan: { name: "Earthlistener", tagline: "Grounded wisdom of the land", emoji: "🌍" },
  polaris: { name: "Northstar", tagline: "Guiding light in darkness", emoji: "⭐" },
  ainu: { name: "Echoheart", tagline: "Resonance with all beings", emoji: "💫" },
  yoruba: { name: "Sparkmaker", tagline: "Creative fire within", emoji: "✨" },
  navajo: { name: "Skyweaver", tagline: "Patterns in the infinite", emoji: "🌌" },
  maori: { name: "Neonmuse", tagline: "Bold artistic vision", emoji: "🎨" },
  celtic: { name: "Tidekeeper", tagline: "Flowing with life's rhythms", emoji: "🌊" },
  norse: { name: "Ironreader", tagline: "Strength through knowledge", emoji: "⚔️" },
  mongolian: { name: "Pathfinder", tagline: "Explorer of new horizons", emoji: "🧭" },
  quechua: { name: "Otherseer", tagline: "Empathic understanding", emoji: "👁️" },
  hebrew: { name: "Lumenward", tagline: "Guardian of inner light", emoji: "💡" },
  persian: { name: "Ashcaller", tagline: "Phoenix rising energy", emoji: "🔥" },
  greek: { name: "Horizonkin", tagline: "Seeker of distant truths", emoji: "🏛️" },
  roman: { name: "Stonebound", tagline: "Enduring foundation", emoji: "🗿" },
  egyptian: { name: "Waveborn", tagline: "Fluid adaptability", emoji: "〰️" },
  chinese: { name: "Quietforge", tagline: "Patient creation", emoji: "🛠️" },
  japanese: { name: "Brightsignal", tagline: "Clear communication", emoji: "🎌" },
  indian: { name: "Deepthread", tagline: "Connected to all", emoji: "🕉️" },
  african: { name: "Mythwalker", tagline: "Living the legend", emoji: "🦁" },
  alethir: { name: "Stillmind", tagline: "Inner clarity through stillness", emoji: "🧘" },
  sahen: { name: "Earthlistener", tagline: "Grounded wisdom of the land", emoji: "🌍" },
};

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

/* ============================================================================
   ANIMATION
   ============================================================================ */

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: [0.22, 1, 0.36, 1] 
    } 
  },
};

/* ============================================================================
   HELPERS
   ============================================================================ */

const ZODIAC: Record<string, string> = {
  aries: "♈", taurus: "♉", gemini: "♊", cancer: "♋",
  leo: "♌", virgo: "♍", libra: "♎", scorpio: "♏",
  sagittarius: "♐", capricorn: "♑", aquarius: "♒", pisces: "♓",
};

const getCodeDisplay = (code: string | null) => {
  if (!code) return null;
  const key = code.toLowerCase();
  return MYTHICAL_CODE_NAMES[key] || { name: code, tagline: "", emoji: "✨" };
};

/* ============================================================================
   COMPONENT
   ============================================================================ */

export function DashboardClient({ user }: { user: UserData }) {
  const primaryDisplay = getCodeDisplay(user.primaryCode);
  const secondaryDisplay = getCodeDisplay(user.secondaryCode);
  const tertiaryDisplay = getCodeDisplay(user.tertiaryCode);
  
  const sunSign = user.astrology?.sunSign?.toLowerCase();
  const zodiacSymbol = sunSign ? ZODIAC[sunSign] : null;
  const lifePath = user.numerology?.lifePathNumber;

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-8">
      <div className="grid grid-cols-12 gap-6">
        
        {/* ================================================================
            LEFT COLUMN — PROFILE CARD
            ================================================================ */}
        <motion.aside 
          variants={container}
          initial="hidden"
          animate="show"
          className="col-span-12 lg:col-span-3"
        >
          <motion.div 
            variants={item}
            className="sticky top-24 rounded-3xl bg-[#0F0F14] border border-white/[0.08] p-8"
          >
            {/* Avatar with Golden Ring */}
            <div className="mb-6 flex flex-col items-center">
              {/* Stats Above */}
              <div className="mb-4 flex w-full items-center justify-around">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{user.friendCount}</div>
                  <div className="text-xs text-white/40 uppercase tracking-wider">Friends</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{user.upcomingMeetups}</div>
                  <div className="text-xs text-white/40 uppercase tracking-wider">Meetups</div>
                </div>
              </div>

              {/* Large Avatar with Thick Ring */}
              <div className="relative mb-6">
                {/* Outer glow */}
                <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-[#FFD97D] via-[#FF8F8F] to-[#FFB5E8] opacity-40 blur-2xl" />
                
                {/* Thick golden ring */}
                <div className="relative rounded-full bg-gradient-to-br from-[#FFD97D] via-[#FFA94D] to-[#FF8F8F] p-2">
                  <div className="relative h-40 w-40 rounded-full bg-gradient-to-br from-[#4F8CFF]/20 to-[#C7B9FF]/20 border-4 border-[#0F0F14] flex items-center justify-center overflow-hidden">
                    <div className="text-7xl">{primaryDisplay?.emoji || "✨"}</div>
                  </div>
                </div>

                {/* Active indicator */}
                <div className="absolute bottom-2 right-2 h-7 w-7 rounded-full bg-[#7CF5C8] border-4 border-[#0F0F14]" />
              </div>

              {/* Name & Username */}
              <h2 className="text-2xl font-bold text-white text-center mb-1">
                {user.name}
              </h2>
              {user.username && (
                <p className="text-sm text-white/40 text-center mb-4">@{user.username}</p>
              )}

              {/* Bio / Primary Code */}
              {primaryDisplay && (
                <div className="text-center mb-6">
                  <p className="text-sm text-white/60 flex items-center justify-center gap-2">
                    <Star weight="fill" className="w-4 h-4 text-[#FFD97D]" />
                    {primaryDisplay.name}
                  </p>
                  <p className="text-xs text-white/40 mt-1">{primaryDisplay.tagline}</p>
                </div>
              )}

              {/* My Profile Button */}
              <Link 
                href="/dashboard/profile"
                className="w-full rounded-xl bg-white/[0.06] border border-white/10 px-6 py-3 text-center text-sm font-medium text-white hover:bg-white/[0.08] hover:border-white/20 transition-all"
              >
                My Profile
              </Link>
            </div>

            {/* Skills Section */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-white mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {secondaryDisplay && (
                  <span className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-white/70">
                    {secondaryDisplay.name}
                  </span>
                )}
                {tertiaryDisplay && (
                  <span className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-white/70">
                    {tertiaryDisplay.name}
                  </span>
                )}
                {user.astrology?.sunSign && (
                  <span className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-white/70">
                    {zodiacSymbol} {user.astrology.sunSign}
                  </span>
                )}
              </div>
            </div>

            {/* Communities Section */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">Communities</h3>
              <div className="space-y-2">
                <Link href="/dashboard/friends" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.04] transition-colors group">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#7CF5C8]/20 to-[#7CF5C8]/10 flex items-center justify-center">
                    <Users weight="fill" className="w-4 h-4 text-[#7CF5C8]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-white/80 truncate">Friend Circle</p>
                    <p className="text-[10px] text-white/40">{user.friendCount} members</p>
                  </div>
                </Link>

                <Link href="/dashboard/meetups" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.04] transition-colors group">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#FFD97D]/20 to-[#FFD97D]/10 flex items-center justify-center">
                    <Calendar weight="fill" className="w-4 h-4 text-[#FFD97D]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-white/80 truncate">Active Meetups</p>
                    <p className="text-[10px] text-white/40">{user.upcomingMeetups} upcoming</p>
                  </div>
                </Link>

                <Link href="/marketplace" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.04] transition-colors group">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#C7B9FF]/20 to-[#C7B9FF]/10 flex items-center justify-center">
                    <Sparkle weight="fill" className="w-4 h-4 text-[#C7B9FF]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-white/80 truncate">Marketplace</p>
                    <p className="text-[10px] text-white/40">Discover experiences</p>
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.aside>

        {/* ================================================================
            CENTER COLUMN — MAIN CONTENT FEED
            ================================================================ */}
        <motion.main 
          variants={container}
          initial="hidden"
          animate="show"
          className="col-span-12 lg:col-span-6 space-y-4"
        >
          {/* Post/Update Input */}
          <motion.div variants={item} className="rounded-3xl bg-[#0F0F14] border border-white/[0.08] p-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#4F8CFF]/20 to-[#C7B9FF]/20 flex items-center justify-center">
                <span className="text-xl">{primaryDisplay?.emoji || "✨"}</span>
              </div>
              <input
                type="text"
                placeholder="Share your thoughts..."
                className="flex-1 bg-transparent text-sm text-white/60 placeholder:text-white/30 focus:outline-none"
              />
            </div>
          </motion.div>

          {/* Quick Actions Cards */}
          <div className="grid grid-cols-2 gap-4">
            {/* Your Codes */}
            <motion.div variants={item}>
              <Link href="/dashboard/codes" className="group block">
                <div className="rounded-2xl bg-[#0F0F14] border border-white/[0.08] p-6 hover:border-[#C7B9FF]/30 transition-all">
                  <div className="mb-4 h-12 w-12 rounded-xl bg-gradient-to-br from-[#C7B9FF] to-[#A89BE8] flex items-center justify-center">
                    <Sparkle weight="fill" className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">Your Codes</h3>
                  <p className="text-xs text-white/40 mb-3">3 mythical archetypes</p>
                  <div className="flex items-center gap-2 text-[#C7B9FF] text-xs font-medium">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Astrology */}
            <motion.div variants={item}>
              <Link href="/dashboard/astrology" className="group block">
                <div className="rounded-2xl bg-[#0F0F14] border border-white/[0.08] p-6 hover:border-[#4F8CFF]/30 transition-all">
                  <div className="mb-4 h-12 w-12 rounded-xl bg-gradient-to-br from-[#4F8CFF] to-[#3B7AE8] flex items-center justify-center">
                    <Sun weight="fill" className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">Astrology</h3>
                  <p className="text-xs text-white/40 mb-3">{sunSign ? `${zodiacSymbol} ${user.astrology?.sunSign}` : "Set your chart"}</p>
                  <div className="flex items-center gap-2 text-[#4F8CFF] text-xs font-medium">
                    <span>View chart</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Numerology */}
            <motion.div variants={item}>
              <Link href="/dashboard/numerology" className="group block">
                <div className="rounded-2xl bg-[#0F0F14] border border-white/[0.08] p-6 hover:border-[#7CF5C8]/30 transition-all">
                  <div className="mb-4 h-12 w-12 rounded-xl bg-gradient-to-br from-[#7CF5C8] to-[#5ED9A8] flex items-center justify-center">
                    <Hash weight="fill" className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">Numerology</h3>
                  <p className="text-xs text-white/40 mb-3">{lifePath ? `Life Path ${lifePath}` : "Discover your numbers"}</p>
                  <div className="flex items-center gap-2 text-[#7CF5C8] text-xs font-medium">
                    <span>Learn more</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Compatibility */}
            <motion.div variants={item}>
              <Link href="/dashboard/compatibility" className="group block">
                <div className="rounded-2xl bg-[#0F0F14] border border-white/[0.08] p-6 hover:border-[#FFB5E8]/30 transition-all">
                  <div className="mb-4 h-12 w-12 rounded-xl bg-gradient-to-br from-[#FFB5E8] to-[#E89FD0] flex items-center justify-center">
                    <Heart weight="fill" className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">Compatibility</h3>
                  <p className="text-xs text-white/40 mb-3">Find your matches</p>
                  <div className="flex items-center gap-2 text-[#FFB5E8] text-xs font-medium">
                    <span>Discover</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Marketplace Promo */}
          <motion.div variants={item}>
            <Link href="/marketplace" className="group block">
              <div className="rounded-3xl bg-gradient-to-br from-[#1A1A2E] to-[#0F0F14] border border-white/[0.08] p-8 hover:border-[#7CF5C8]/30 transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Discover Experiences</h3>
                    <p className="text-sm text-white/50 mb-4">Find activities matched to your mythical codes</p>
                    <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/[0.06] border border-white/10 w-fit">
                      <span className="text-sm font-medium text-white">Explore Marketplace</span>
                      <ArrowRight className="w-4 h-4 text-white/60 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                  <div className="hidden sm:block h-24 w-24 rounded-2xl bg-gradient-to-br from-[#7CF5C8] to-[#5ED9A8] opacity-20" />
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.main>

        {/* ================================================================
            RIGHT COLUMN — RECENT ACTIVITY
            ================================================================ */}
        <motion.aside 
          variants={container}
          initial="hidden"
          animate="show"
          className="col-span-12 lg:col-span-3"
        >
          <motion.div 
            variants={item}
            className="sticky top-24 rounded-3xl bg-[#0F0F14] border border-white/[0.08] p-6"
          >
            <h3 className="text-sm font-bold text-white mb-4">Recent Activity</h3>
            
            <div className="space-y-4">
              {/* Activity Item 1 */}
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#4F8CFF]/20 to-[#4F8CFF]/10 flex items-center justify-center">
                    <span className="text-sm">👤</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-[#7CF5C8] flex items-center justify-center">
                    <Users weight="fill" className="w-2 h-2 text-black" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/70"><span className="font-semibold text-white">New friend</span> connected</p>
                  <p className="text-[10px] text-white/40 mt-0.5">2 hours ago</p>
                </div>
              </div>

              {/* Activity Item 2 */}
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#FFD97D]/20 to-[#FFD97D]/10 flex items-center justify-center">
                    <span className="text-sm">📅</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-[#FFD97D] flex items-center justify-center">
                    <Calendar weight="fill" className="w-2 h-2 text-black" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/70"><span className="font-semibold text-white">Meetup</span> tomorrow</p>
                  <p className="text-[10px] text-white/40 mt-0.5">1 day</p>
                </div>
              </div>

              {/* Activity Item 3 */}
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#C7B9FF]/20 to-[#C7B9FF]/10 flex items-center justify-center">
                    <span className="text-sm">✨</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-[#C7B9FF] flex items-center justify-center">
                    <Sparkle weight="fill" className="w-2 h-2 text-black" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/70">Completed <span className="font-semibold text-white">personality quiz</span></p>
                  <p className="text-[10px] text-white/40 mt-0.5">3 days ago</p>
                </div>
              </div>
            </div>

            {/* View All */}
            <button className="mt-4 w-full rounded-lg bg-white/[0.04] border border-white/[0.08] px-4 py-2 text-xs font-medium text-white/70 hover:bg-white/[0.06] hover:text-white transition-all">
              View all activity
            </button>
          </motion.div>
        </motion.aside>

      </div>
    </div>
  );
}