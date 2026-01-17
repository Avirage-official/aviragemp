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
  Compass,
  Lightning,
  Flame,
  ShootingStar,
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
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1] 
    } 
  },
};

const heroItem = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 0.7, 
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

const greet = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
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
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative"
    >
      {/* ================================================================
          HERO PROFILE SECTION
          ================================================================ */}
      <motion.section 
        variants={heroItem}
        className="relative mb-8 overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0D0D14] via-[#0A0A0A] to-[#0D0D14] border border-white/[0.06]"
      >
        {/* Ambient glow */}
        <div className="absolute -top-[40%] -right-[20%] w-[500px] h-[500px] rounded-full bg-[#4F8CFF] opacity-[0.08] blur-[120px]" />
        <div className="absolute -bottom-[30%] -left-[10%] w-[400px] h-[400px] rounded-full bg-[#C7B9FF] opacity-[0.06] blur-[100px]" />
        
        <div className="relative p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            
            {/* Profile Photo */}
            <div className="relative shrink-0">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#4F8CFF] via-[#C7B9FF] to-[#7CF5C8] opacity-60 blur-xl" />
              <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-[#4F8CFF]/20 to-[#C7B9FF]/20 border-4 border-white/10 flex items-center justify-center overflow-hidden">
                <div className="text-6xl">{primaryDisplay?.emoji || "✨"}</div>
              </div>
              
              {/* Active indicator */}
              <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-[#7CF5C8] border-4 border-[#0A0A0A]" />
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-6">
              {/* Name & Username */}
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight">
                  {user.name}
                </h1>
                {user.username && (
                  <p className="text-lg text-white/40">@{user.username}</p>
                )}
              </div>

              {/* Stats Row */}
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">
                    {user.friendCount}
                  </div>
                  <div className="text-sm text-white/40 uppercase tracking-wider">
                    Friends
                  </div>
                </div>
                
                <div className="w-px h-12 bg-white/10" />
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">
                    {user.upcomingMeetups}
                  </div>
                  <div className="text-sm text-white/40 uppercase tracking-wider">
                    Meetups
                  </div>
                </div>
              </div>

              {/* Primary Code - Big & Bold */}
              {primaryDisplay && (
                <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="w-3 h-16 rounded-full bg-gradient-to-b from-[#4F8CFF] to-[#C7B9FF]" />
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-1">
                      Primary Code
                    </p>
                    <p className="text-2xl font-bold text-white mb-1">
                      {primaryDisplay.name}
                    </p>
                    <p className="text-sm text-white/50">
                      {primaryDisplay.tagline}
                    </p>
                  </div>
                </div>
              )}

              {/* Tags Row */}
              <div className="flex flex-wrap items-center gap-3">
                {sunSign && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4F8CFF]/15 border border-[#4F8CFF]/30 text-[#4F8CFF] text-sm font-semibold">
                    <span className="text-base">{zodiacSymbol}</span>
                    {user.astrology.sunSign}
                  </span>
                )}
                
                {lifePath && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7CF5C8]/15 border border-[#7CF5C8]/30 text-[#7CF5C8] text-sm font-semibold">
                    <Hash weight="bold" className="w-4 h-4" />
                    Life Path {lifePath}
                  </span>
                )}
                
                {user.city && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm">
                    <MapPin weight="fill" className="w-4 h-4" />
                    {user.city}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ================================================================
          DYNAMIC BENTO GRID
          ================================================================ */}
      <motion.section 
        variants={container}
        className="grid grid-cols-6 gap-4 auto-rows-[200px]"
      >
        
        {/* YOUR MYTHICAL CODES — Large Feature Card (3x2) */}
        <motion.div variants={item} className="col-span-6 lg:col-span-3 row-span-2">
          <Link href="/dashboard/codes" className="group block h-full">
            <div className="relative h-full rounded-3xl bg-[#0A0A0A] border border-white/[0.08] p-8 overflow-hidden hover:border-[#C7B9FF]/30 transition-all duration-500">
              {/* Ambient glow */}
              <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-[#C7B9FF] opacity-0 group-hover:opacity-[0.12] blur-[100px] transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C7B9FF] to-[#8B7FD4] flex items-center justify-center shadow-[0_8px_32px_rgba(199,185,255,0.3)]">
                    <Sparkle weight="fill" className="w-8 h-8 text-black" />
                  </div>
                  <span className="px-4 py-2 rounded-full bg-[#C7B9FF]/15 border border-[#C7B9FF]/30 text-[#C7B9FF] text-xs font-bold uppercase tracking-wider">
                    3 Codes
                  </span>
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-3">Your Mythical Codes</h3>
                <p className="text-white/40 text-sm mb-8">The archetypes that define you</p>
                
                {/* Codes List */}
                <div className="flex-1 space-y-4">
                  {primaryDisplay && (
                    <div className="flex items-center gap-5 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] group-hover:bg-white/[0.05] transition-colors">
                      <div className="w-2 h-14 rounded-full bg-[#4F8CFF]" />
                      <div className="flex-1">
                        <p className="text-white font-bold text-lg mb-1">{primaryDisplay.name}</p>
                        <p className="text-white/40 text-xs uppercase tracking-wider">Primary • {primaryDisplay.tagline}</p>
                      </div>
                      <span className="text-3xl">{primaryDisplay.emoji}</span>
                    </div>
                  )}
                  
                  {secondaryDisplay && (
                    <div className="flex items-center gap-5 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] group-hover:bg-white/[0.05] transition-colors">
                      <div className="w-2 h-14 rounded-full bg-[#7CF5C8]" />
                      <div className="flex-1">
                        <p className="text-white font-bold text-lg mb-1">{secondaryDisplay.name}</p>
                        <p className="text-white/40 text-xs uppercase tracking-wider">Secondary • {secondaryDisplay.tagline}</p>
                      </div>
                      <span className="text-3xl">{secondaryDisplay.emoji}</span>
                    </div>
                  )}
                  
                  {tertiaryDisplay && (
                    <div className="flex items-center gap-5 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] group-hover:bg-white/[0.05] transition-colors">
                      <div className="w-2 h-14 rounded-full bg-[#C7B9FF]" />
                      <div className="flex-1">
                        <p className="text-white font-bold text-lg mb-1">{tertiaryDisplay.name}</p>
                        <p className="text-white/40 text-xs uppercase tracking-wider">Tertiary • {tertiaryDisplay.tagline}</p>
                      </div>
                      <span className="text-3xl">{tertiaryDisplay.emoji}</span>
                    </div>
                  )}
                </div>

                {/* Footer CTA */}
                <div className="flex items-center gap-3 text-[#C7B9FF] group-hover:gap-4 transition-all mt-6">
                  <span className="font-semibold">Explore your codes</span>
                  <ArrowRight weight="bold" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* ASTROLOGY — Tall Card (2x2) */}
        <motion.div variants={item} className="col-span-6 sm:col-span-3 lg:col-span-2 row-span-2">
          <Link href="/dashboard/astrology" className="group block h-full">
            <div className="relative h-full rounded-3xl bg-[#0A0A0A] border border-white/[0.08] p-6 overflow-hidden hover:border-[#4F8CFF]/30 transition-all duration-500">
              {/* Ambient glow */}
              <div className="absolute -top-[20%] right-0 w-[200px] h-[200px] bg-[#4F8CFF] opacity-0 group-hover:opacity-[0.12] blur-[80px] transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative h-full flex flex-col">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4F8CFF] to-[#3B7AE8] flex items-center justify-center mb-6 shadow-[0_8px_32px_rgba(79,140,255,0.25)]">
                  <Sun weight="fill" className="w-7 h-7 text-black" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">Astrology</h3>
                <p className="text-white/40 text-sm mb-6">Your cosmic blueprint</p>
                
                {/* Astrology Details */}
                <div className="flex-1 space-y-3">
                  {user.astrology?.sunSign && (
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Sun</p>
                      <p className="text-white font-semibold">{zodiacSymbol} {user.astrology.sunSign}</p>
                    </div>
                  )}
                  
                  {user.astrology?.moonSign && (
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Moon</p>
                      <p className="text-white font-semibold">{user.astrology.moonSign}</p>
                    </div>
                  )}
                  
                  {user.astrology?.risingSign && (
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Rising</p>
                      <p className="text-white font-semibold">{user.astrology.risingSign}</p>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 text-[#4F8CFF] group-hover:gap-3 transition-all mt-4">
                  <span className="font-medium text-sm">View full chart</span>
                  <ArrowRight weight="bold" className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* FRIENDS — Square Card (2x1) */}
        <motion.div variants={item} className="col-span-6 sm:col-span-3 lg:col-span-2 row-span-1">
          <Link href="/dashboard/friends" className="group block h-full">
            <div className="relative h-full rounded-3xl bg-[#0A0A0A] border border-white/[0.08] p-6 overflow-hidden hover:border-[#7CF5C8]/30 transition-all duration-500">
              <div className="absolute -right-[30%] -bottom-[30%] w-[150px] h-[150px] bg-[#7CF5C8] opacity-0 group-hover:opacity-[0.1] blur-[60px] transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7CF5C8] to-[#5ED9A8] flex items-center justify-center mb-4 shadow-[0_8px_24px_rgba(124,245,200,0.25)]">
                    <Users weight="fill" className="w-6 h-6 text-black" />
                  </div>
                  
                  <div className="text-4xl font-bold text-white mb-1">{user.friendCount}</div>
                  <p className="text-white/40 text-sm">Friends</p>
                </div>

                <div className="flex items-center gap-2 text-[#7CF5C8]">
                  <span className="font-medium text-sm">View all</span>
                  <ArrowRight weight="bold" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* MEETUPS — Square Card (2x1) */}
        <motion.div variants={item} className="col-span-6 sm:col-span-3 lg:col-span-2 row-span-1">
          <Link href="/dashboard/meetups" className="group block h-full">
            <div className="relative h-full rounded-3xl bg-[#0A0A0A] border border-white/[0.08] p-6 overflow-hidden hover:border-[#FFD97D]/30 transition-all duration-500">
              <div className="absolute -right-[30%] -bottom-[30%] w-[150px] h-[150px] bg-[#FFD97D] opacity-0 group-hover:opacity-[0.1] blur-[60px] transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFD97D] to-[#F0C060] flex items-center justify-center mb-4 shadow-[0_8px_24px_rgba(255,217,125,0.25)]">
                    <Calendar weight="fill" className="w-6 h-6 text-black" />
                  </div>
                  
                  <div className="text-4xl font-bold text-white mb-1">{user.upcomingMeetups}</div>
                  <p className="text-white/40 text-sm">Upcoming</p>
                </div>

                <div className="flex items-center gap-2 text-[#FFD97D]">
                  <span className="font-medium text-sm">View calendar</span>
                  <ArrowRight weight="bold" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* NUMEROLOGY — Wide Card (3x1) */}
        <motion.div variants={item} className="col-span-6 lg:col-span-3 row-span-1">
          <Link href="/dashboard/numerology" className="group block h-full">
            <div className="relative h-full rounded-3xl bg-[#0A0A0A] border border-white/[0.08] p-6 overflow-hidden hover:border-[#C7B9FF]/30 transition-all duration-500">
              <div className="absolute -right-[20%] top-1/2 -translate-y-1/2 w-[180px] h-[180px] bg-[#C7B9FF] opacity-0 group-hover:opacity-[0.1] blur-[70px] transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative h-full flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C7B9FF] to-[#A89BE8] flex items-center justify-center shadow-[0_8px_24px_rgba(199,185,255,0.25)]">
                    <Hash weight="fill" className="w-7 h-7 text-black" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Numerology</h3>
                    <p className="text-white/40 text-sm">Your life path numbers</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  {lifePath && (
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-1">{lifePath}</div>
                      <div className="text-xs text-white/40 uppercase tracking-wider">Life Path</div>
                    </div>
                  )}
                  
                  {user.numerology?.expressionNumber && (
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-1">{user.numerology.expressionNumber}</div>
                      <div className="text-xs text-white/40 uppercase tracking-wider">Expression</div>
                    </div>
                  )}

                  <ArrowRight weight="bold" className="w-5 h-5 text-[#C7B9FF] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* COMPATIBILITY — Tall Card (2x2) */}
        <motion.div variants={item} className="col-span-6 sm:col-span-3 lg:col-span-2 row-span-2">
          <Link href="/dashboard/compatibility" className="group block h-full">
            <div className="relative h-full rounded-3xl bg-[#0A0A0A] border border-white/[0.08] p-6 overflow-hidden hover:border-[#FFB5E8]/30 transition-all duration-500">
              <div className="absolute -top-[20%] left-0 w-[200px] h-[200px] bg-[#FFB5E8] opacity-0 group-hover:opacity-[0.12] blur-[80px] transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative h-full flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFB5E8] to-[#E89FD0] flex items-center justify-center mb-6 shadow-[0_8px_32px_rgba(255,181,232,0.25)]">
                  <Heart weight="fill" className="w-7 h-7 text-black" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">Compatibility</h3>
                <p className="text-white/40 text-sm mb-6">Find your resonance</p>
                
                <div className="flex-1 space-y-3">
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Best Matches</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#FFB5E8]/15 border border-[#FFB5E8]/30 text-[#FFB5E8] text-xs font-semibold">
                        Horizonkin
                      </span>
                      <span className="px-3 py-1 rounded-full bg-[#FFB5E8]/15 border border-[#FFB5E8]/30 text-[#FFB5E8] text-xs font-semibold">
                        Waveborn
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[#FFB5E8] group-hover:gap-3 transition-all mt-4">
                  <span className="font-medium text-sm">Discover more</span>
                  <ArrowRight weight="bold" className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* MESSAGES — Square Card (2x1) */}
        <motion.div variants={item} className="col-span-6 sm:col-span-3 lg:col-span-2 row-span-1">
          <Link href="/dashboard/messages" className="group block h-full">
            <div className="relative h-full rounded-3xl bg-[#0A0A0A] border border-white/[0.08] p-6 overflow-hidden hover:border-[#4F8CFF]/30 transition-all duration-500">
              <div className="absolute -right-[30%] -bottom-[30%] w-[150px] h-[150px] bg-[#4F8CFF] opacity-0 group-hover:opacity-[0.1] blur-[60px] transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4F8CFF] to-[#3B7AE8] flex items-center justify-center mb-4 shadow-[0_8px_24px_rgba(79,140,255,0.25)]">
                    <Lightning weight="fill" className="w-6 h-6 text-black" />
                  </div>
                  
                  <div className="text-4xl font-bold text-white mb-1">12</div>
                  <p className="text-white/40 text-sm">New messages</p>
                </div>

                <div className="flex items-center gap-2 text-[#4F8CFF]">
                  <span className="font-medium text-sm">Open inbox</span>
                  <ArrowRight weight="bold" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* MARKETPLACE — Wide Promo Card (4x1) */}
        <motion.div variants={item} className="col-span-6 lg:col-span-4 row-span-1">
          <Link href="/marketplace" className="group block h-full">
            <div className="relative h-full rounded-3xl bg-gradient-to-br from-[#1A1A2E] to-[#0A0A0A] border border-white/[0.08] p-6 overflow-hidden hover:border-[#7CF5C8]/30 transition-all duration-500">
              {/* Multiple glows for marketplace */}
              <div className="absolute -left-[10%] top-1/2 -translate-y-1/2 w-[150px] h-[150px] bg-[#4F8CFF] opacity-[0.08] blur-[60px]" />
              <div className="absolute right-[20%] top-1/2 -translate-y-1/2 w-[120px] h-[120px] bg-[#C7B9FF] opacity-[0.06] blur-[50px]" />
              <div className="absolute -right-[5%] top-1/2 -translate-y-1/2 w-[150px] h-[150px] bg-[#7CF5C8] opacity-0 group-hover:opacity-[0.1] blur-[60px] transition-opacity duration-700" />
              
              <div className="relative h-full flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7CF5C8] to-[#5ED9A8] flex items-center justify-center shadow-[0_8px_32px_rgba(124,245,200,0.3)]">
                    <Compass weight="fill" className="w-7 h-7 text-black" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Discover Experiences</h3>
                    <p className="text-white/40 text-sm">Find activities matched to your codes</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/[0.06] border border-white/10 group-hover:bg-white/[0.08] group-hover:border-white/20 transition-all">
                  <span className="text-white font-semibold">Explore</span>
                  <ArrowRight weight="bold" className="w-5 h-5 text-white/60 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

      </motion.section>
    </motion.div>
  );
}