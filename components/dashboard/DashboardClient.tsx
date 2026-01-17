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
  Star,
  Compass,
  Fire,
} from "@phosphor-icons/react";

/* ============================================================================
   MYTHICAL CODES — Display names mapping
   ============================================================================ */

const MYTHICAL_CODE_NAMES: Record<string, { name: string; tagline: string }> = {
  // Primary keys (cultural/internal names)
  lhumir: { name: "Stillmind", tagline: "Inner clarity through stillness" },
  khoisan: { name: "Earthlistener", tagline: "Grounded wisdom of the land" },
  polaris: { name: "Northstar", tagline: "Guiding light in darkness" },
  ainu: { name: "Echoheart", tagline: "Resonance with all beings" },
  yoruba: { name: "Sparkmaker", tagline: "Creative fire within" },
  navajo: { name: "Skyweaver", tagline: "Patterns in the infinite" },
  maori: { name: "Neonmuse", tagline: "Bold artistic vision" },
  celtic: { name: "Tidekeeper", tagline: "Flowing with life's rhythms" },
  norse: { name: "Ironreader", tagline: "Strength through knowledge" },
  mongolian: { name: "Pathfinder", tagline: "Explorer of new horizons" },
  quechua: { name: "Otherseer", tagline: "Empathic understanding" },
  hebrew: { name: "Lumenward", tagline: "Guardian of inner light" },
  persian: { name: "Ashcaller", tagline: "Phoenix rising energy" },
  greek: { name: "Horizonkin", tagline: "Seeker of distant truths" },
  roman: { name: "Stonebound", tagline: "Enduring foundation" },
  egyptian: { name: "Waveborn", tagline: "Fluid adaptability" },
  chinese: { name: "Quietforge", tagline: "Patient creation" },
  japanese: { name: "Brightsignal", tagline: "Clear communication" },
  indian: { name: "Deepthread", tagline: "Connected to all" },
  african: { name: "Mythwalker", tagline: "Living the legend" },
  // Display names as keys (for already-converted data)
  stillmind: { name: "Stillmind", tagline: "Inner clarity through stillness" },
  earthlistener: { name: "Earthlistener", tagline: "Grounded wisdom of the land" },
  northstar: { name: "Northstar", tagline: "Guiding light in darkness" },
  echoheart: { name: "Echoheart", tagline: "Resonance with all beings" },
  sparkmaker: { name: "Sparkmaker", tagline: "Creative fire within" },
  skyweaver: { name: "Skyweaver", tagline: "Patterns in the infinite" },
  neonmuse: { name: "Neonmuse", tagline: "Bold artistic vision" },
  tidekeeper: { name: "Tidekeeper", tagline: "Flowing with life's rhythms" },
  ironreader: { name: "Ironreader", tagline: "Strength through knowledge" },
  pathfinder: { name: "Pathfinder", tagline: "Explorer of new horizons" },
  otherseer: { name: "Otherseer", tagline: "Empathic understanding" },
  lumenward: { name: "Lumenward", tagline: "Guardian of inner light" },
  ashcaller: { name: "Ashcaller", tagline: "Phoenix rising energy" },
  horizonkin: { name: "Horizonkin", tagline: "Seeker of distant truths" },
  stonebound: { name: "Stonebound", tagline: "Enduring foundation" },
  waveborn: { name: "Waveborn", tagline: "Fluid adaptability" },
  quietforge: { name: "Quietforge", tagline: "Patient creation" },
  brightsignal: { name: "Brightsignal", tagline: "Clear communication" },
  deepthread: { name: "Deepthread", tagline: "Connected to all" },
  mythwalker: { name: "Mythwalker", tagline: "Living the legend" },
  // Additional aliases from your DB
  alethir: { name: "Stillmind", tagline: "Inner clarity through stillness" },
  sahen: { name: "Earthlistener", tagline: "Grounded wisdom of the land" },
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
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
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
  return MYTHICAL_CODE_NAMES[key] || { name: code, tagline: "" };
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
      className="space-y-6"
    >
      {/* ================================================================
          HERO — Bold greeting
          ================================================================ */}
      <motion.section variants={item}>
        <div className="relative overflow-hidden rounded-3xl bg-[#0A0A0A] border border-white/[0.08] p-8 sm:p-10">
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#4F8CFF] opacity-[0.08] blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#C7B9FF] opacity-[0.06] blur-[100px] pointer-events-none" />
          
          <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Fire weight="fill" className="w-5 h-5 text-[#FF8F8F]" />
                <span className="text-sm text-white/60">You&apos;re on fire today</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 tracking-tight">
                {greet()},{" "}
                <span className="text-[#4F8CFF]">{user.name}</span>
              </h1>
              
              {/* Identity badges */}
              <div className="flex flex-wrap gap-3">
                {primaryDisplay && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C7B9FF]/15 border border-[#C7B9FF]/30 text-[#C7B9FF] text-sm font-semibold">
                    <Sparkle weight="fill" className="w-4 h-4" />
                    {primaryDisplay.name}
                  </span>
                )}
                
                {user.astrology?.sunSign && (
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
            
            {/* Mood button */}
            <button className="group flex items-center gap-4 px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-white/20 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFD97D] to-[#FF8F8F] flex items-center justify-center">
                <span className="text-2xl">✨</span>
              </div>
              <div className="text-left">
                <p className="text-xs text-white/40 uppercase tracking-wider">Mood</p>
                <p className="text-white font-medium">{user.currentMood || "Set your vibe"}</p>
              </div>
              <ArrowRight weight="bold" className="w-5 h-5 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
            </button>
          </div>
        </div>
      </motion.section>

      {/* ================================================================
          BENTO GRID
          ================================================================ */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* YOUR CODES — Large */}
        <motion.div variants={item} className="col-span-2 row-span-2">
          <Link href="/dashboard/codes" className="group block h-full">
            <div className="relative h-full rounded-3xl bg-[#0A0A0A] border border-white/[0.08] p-6 sm:p-8 overflow-hidden hover:border-[#C7B9FF]/30 transition-all duration-300">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#C7B9FF] opacity-0 group-hover:opacity-[0.1] blur-[80px] transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative">
                <div className="flex items-start justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C7B9FF] to-[#8B7FD4] flex items-center justify-center">
                    <Sparkle weight="fill" className="w-7 h-7 text-black" />
                  </div>
                  <span className="px-3 py-1.5 rounded-full bg-[#C7B9FF]/15 border border-[#C7B9FF]/30 text-[#C7B9FF] text-xs font-bold">
                    3 CODES
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">Your Mythical Codes</h3>
                <p className="text-white/50 text-sm mb-8">The archetypes that define you</p>
                
                <div className="space-y-3">
                  {primaryDisplay && (
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                      <div className="w-1.5 h-10 rounded-full bg-[#4F8CFF]" />
                      <div>
                        <p className="text-white font-semibold">{primaryDisplay.name}</p>
                        <p className="text-white/40 text-xs">Primary • {primaryDisplay.tagline}</p>
                      </div>
                    </div>
                  )}
                  
                  {secondaryDisplay && (
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                      <div className="w-1.5 h-10 rounded-full bg-[#7CF5C8]" />
                      <div>
                        <p className="text-white font-semibold">{secondaryDisplay.name}</p>
                        <p className="text-white/40 text-xs">Secondary • {secondaryDisplay.tagline}</p>
                      </div>
                    </div>
                  )}
                  
                  {tertiaryDisplay && (
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                      <div className="w-1.5 h-10 rounded-full bg-[#C7B9FF]" />
                      <div>
                        <p className="text-white font-semibold">{tertiaryDisplay.name}</p>
                        <p className="text-white/40 text-xs">Tertiary • {tertiaryDisplay.tagline}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2 text-[#C7B9FF] text-sm font-semibold mt-8 group-hover:gap-3 transition-all">
                  <span>Explore your identity</span>
                  <ArrowRight weight="bold" className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* ASTROLOGY */}
        <motion.div variants={item}>
          <Link href="/dashboard/astrology" className="group block h-full">
            <div className="relative h-full min-h-[180px] rounded-2xl bg-[#0A0A0A] border border-white/[0.08] p-5 overflow-hidden hover:border-[#4F8CFF]/30 transition-all duration-300">
              <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-[#4F8CFF] opacity-0 group-hover:opacity-[0.15] blur-[60px] transition-opacity duration-500" />
              
              <div className="relative h-full flex flex-col">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#4F8CFF] to-[#3B7AE8] flex items-center justify-center mb-4">
                  <Sun weight="fill" className="w-5 h-5 text-white" />
                </div>
                
                <h3 className="text-lg font-bold text-white mb-1">Astrology</h3>
                
                {user.astrology?.sunSign ? (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-3xl text-[#4F8CFF]">{zodiacSymbol}</span>
                    <span className="text-white/70">{user.astrology.sunSign}</span>
                  </div>
                ) : (
                  <p className="text-white/40 text-sm mt-auto">Discover your chart</p>
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
        <motion.div variants={item}>
          <Link href="/dashboard/numerology" className="group block h-full">
            <div className="relative h-full min-h-[180px] rounded-2xl bg-[#0A0A0A] border border-white/[0.08] p-5 overflow-hidden hover:border-[#7CF5C8]/30 transition-all duration-300">
              <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-[#7CF5C8] opacity-0 group-hover:opacity-[0.15] blur-[60px] transition-opacity duration-500" />
              
              <div className="relative h-full flex flex-col">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#7CF5C8] to-[#5ED9A8] flex items-center justify-center mb-4">
                  <Hash weight="bold" className="w-5 h-5 text-black" />
                </div>
                
                <h3 className="text-lg font-bold text-white mb-1">Numerology</h3>
                
                {lifePath ? (
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-4xl font-bold text-[#7CF5C8]">{lifePath}</span>
                    <span className="text-white/40 text-xs">Life Path</span>
                  </div>
                ) : (
                  <p className="text-white/40 text-sm mt-auto">Your numbers await</p>
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
        <motion.div variants={item}>
          <Link href="/dashboard/friends" className="group block h-full">
            <div className="relative h-full min-h-[180px] rounded-2xl bg-[#0A0A0A] border border-white/[0.08] p-5 overflow-hidden hover:border-[#FFB5E8]/30 transition-all duration-300">
              <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-[#FFB5E8] opacity-0 group-hover:opacity-[0.15] blur-[60px] transition-opacity duration-500" />
              
              <div className="relative h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FFB5E8] to-[#E89FD0] flex items-center justify-center">
                    <Users weight="fill" className="w-5 h-5 text-black" />
                  </div>
                  {user.friendCount > 0 && (
                    <span className="px-2 py-1 rounded-full bg-[#FFB5E8]/15 border border-[#FFB5E8]/30 text-[#FFB5E8] text-xs font-bold">
                      {user.friendCount}
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-white mb-1">Friends</h3>
                <p className="text-white/40 text-sm">
                  {user.friendCount > 0 ? `${user.friendCount} connections` : "Build your circle"}
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
        <motion.div variants={item}>
          <Link href="/dashboard/compatibility" className="group block h-full">
            <div className="relative h-full min-h-[180px] rounded-2xl bg-[#0A0A0A] border border-white/[0.08] p-5 overflow-hidden hover:border-[#FF8F8F]/30 transition-all duration-300">
              <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-[#FF8F8F] opacity-0 group-hover:opacity-[0.15] blur-[60px] transition-opacity duration-500" />
              
              <div className="relative h-full flex flex-col">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FF8F8F] to-[#E87878] flex items-center justify-center mb-4">
                  <Heart weight="fill" className="w-5 h-5 text-white" />
                </div>
                
                <h3 className="text-lg font-bold text-white mb-1">Compatibility</h3>
                <p className="text-white/40 text-sm">Find your matches</p>
                
                <div className="flex items-center gap-1 text-[#FF8F8F] text-sm font-medium mt-auto pt-4 group-hover:gap-2 transition-all">
                  <span>Check vibes</span>
                  <ArrowRight weight="bold" className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* MEETUPS — Wide */}
        <motion.div variants={item} className="col-span-2">
          <Link href="/dashboard/meetups" className="group block">
            <div className="relative rounded-2xl bg-[#0A0A0A] border border-white/[0.08] p-6 overflow-hidden hover:border-[#FFD97D]/30 transition-all duration-300">
              <div className="absolute top-0 left-1/2 w-[200px] h-[100px] bg-[#FFD97D] opacity-0 group-hover:opacity-[0.1] blur-[80px] transition-opacity duration-500" />
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFD97D] to-[#F0C060] flex items-center justify-center">
                    <Calendar weight="fill" className="w-7 h-7 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Meetups</h3>
                    <p className="text-white/50">
                      {user.upcomingMeetups > 0 
                        ? `${user.upcomingMeetups} upcoming event${user.upcomingMeetups > 1 ? "s" : ""}`
                        : "Discover events near you"
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {user.upcomingMeetups > 0 && (
                    <span className="hidden sm:inline-flex px-3 py-1.5 rounded-full bg-[#FFD97D]/15 border border-[#FFD97D]/30 text-[#FFD97D] text-xs font-bold">
                      {user.upcomingMeetups} UPCOMING
                    </span>
                  )}
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-[#FFD97D]/10 group-hover:border-[#FFD97D]/30 transition-all">
                    <ArrowRight weight="bold" className="w-5 h-5 text-[#FFD97D]" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* MARKETPLACE — Wide */}
        <motion.div variants={item} className="col-span-2">
          <Link href="/marketplace" className="group block">
            <div className="relative rounded-2xl bg-gradient-to-r from-[#4F8CFF]/10 via-[#C7B9FF]/10 to-[#7CF5C8]/10 border border-white/[0.08] p-6 overflow-hidden hover:border-white/20 transition-all duration-300">
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4F8CFF] via-[#C7B9FF] to-[#7CF5C8] flex items-center justify-center">
                    <Compass weight="fill" className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Explore Marketplace</h3>
                    <p className="text-white/50">
                      Experiences curated for <span className="text-[#C7B9FF]">{primaryDisplay?.name || "you"}</span> energy
                    </p>
                  </div>
                </div>
                
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 group-hover:bg-white/10 transition-all">
                  <span className="text-sm font-medium text-white">Browse now</span>
                  <ArrowRight weight="bold" className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

      </section>

      {/* FOOTER */}
      <motion.footer variants={item} className="text-center pt-8">
        <p className="text-white/30 text-sm flex items-center justify-center gap-2">
          <Star weight="fill" className="w-4 h-4 text-[#FFD97D]" />
          Your journey is uniquely yours
          <Star weight="fill" className="w-4 h-4 text-[#FFD97D]" />
        </p>
      </motion.footer>
    </motion.div>
  );
}