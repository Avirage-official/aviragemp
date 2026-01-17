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
   MOTION
   ============================================================================ */

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

/* ============================================================================
   HELPERS
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

const greet = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
};

const encouragements = [
  "You’re in sync today",
  "Energy looks good today",
  "You’re aligned ✨",
  "Momentum is on your side",
];

const formatCode = (c: string) => c[0].toUpperCase() + c.slice(1);

/* ============================================================================
   COMPONENT
   ============================================================================ */

export function DashboardClient({ user }: DashboardClientProps) {
  const [encouragement] = useState(
    () => encouragements[Math.floor(Math.random() * encouragements.length)]
  );

  const sun = user.astrology?.sunSign?.toLowerCase() ?? null;
  const zodiac = sun ? ZODIAC_SYMBOLS[sun] : null;
  const lifePath = user.numerology?.lifePathNumber;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
    >
      {/* HERO */}
      <motion.section variants={item} className="mb-10">
        <div className="rounded-[28px] bg-white/80 backdrop-blur-xl border border-black/5 p-8 sm:p-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <p className="text-sm text-black/50 flex items-center gap-2 mb-2">
              <Lightning className="w-4 h-4 text-[#FFD97D]" />
              {encouragement}
            </p>

            <h1 className="text-4xl sm:text-5xl font-semibold text-black mb-4">
              {greet()},{" "}
              <span className="text-gradient-blue">{user.name}</span>
            </h1>

            <div className="flex flex-wrap items-center gap-3">
              <span className="badge-lavender">
                <Sparkle weight="fill" />
                {formatCode(user.primaryCode)}
              </span>

              {user.astrology?.sunSign && (
                <span className="badge-blue">
                  {zodiac} {user.astrology.sunSign}
                </span>
              )}

              {lifePath && (
                <span className="badge-mint">
                  <Hash weight="bold" /> Life Path {lifePath}
                </span>
              )}

              {user.city && (
                <span className="badge">
                  <MapPin weight="fill" /> {user.city}
                </span>
              )}
            </div>
          </div>

          <button className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-black/5 hover:bg-black/10 transition">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD97D] to-[#FF8F8F] flex items-center justify-center">
              <Smiley weight="fill" className="text-black" />
            </div>
            <div className="text-left">
              <p className="text-xs text-black/50">Current mood</p>
              <p className="text-sm font-medium text-black">
                {user.currentMood || "Set your vibe"}
              </p>
            </div>
            <ArrowRight className="text-black/40" />
          </button>
        </div>
      </motion.section>

      {/* GRID */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {/* CODES */}
        <motion.div variants={item} className="col-span-2 row-span-2">
          <Link href="/dashboard/codes">
            <div className="h-full rounded-[24px] bg-white border border-black/5 p-6 hover:shadow-lg transition">
              <div className="flex justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#C7B9FF] flex items-center justify-center">
                  <Sparkle weight="fill" className="text-black" />
                </div>
                <span className="badge-lavender">3 codes</span>
              </div>

              <h3 className="text-xl font-semibold text-black mb-1">
                Your Mythical Codes
              </h3>
              <p className="text-black/60 text-sm mb-6">
                The archetypes shaping your identity
              </p>

              <div className="space-y-3">
                <div className="rounded-xl bg-black/5 p-3">
                  <p className="font-medium text-black">
                    {formatCode(user.primaryCode)}
                  </p>
                  <p className="text-xs text-black/50">Primary</p>
                </div>

                {user.secondaryCode && (
                  <div className="rounded-xl bg-black/5 p-3">
                    <p className="font-medium text-black">
                      {formatCode(user.secondaryCode)}
                    </p>
                    <p className="text-xs text-black/50">Secondary</p>
                  </div>
                )}

                {user.tertiaryCode && (
                  <div className="rounded-xl bg-black/5 p-3">
                    <p className="font-medium text-black">
                      {formatCode(user.tertiaryCode)}
                    </p>
                    <p className="text-xs text-black/50">Tertiary</p>
                  </div>
                )}
              </div>
            </div>
          </Link>
        </motion.div>

        {/* ASTROLOGY */}
        <motion.div variants={item}>
          <Link href="/dashboard/astrology">
            <div className="rounded-[22px] bg-white border border-black/5 p-5 h-full">
              <Sun className="text-[#4F8CFF] mb-4" />
              <h3 className="font-semibold text-black mb-1">Astrology</h3>
              <p className="text-sm text-black/60">
                {user.astrology?.sunSign || "Explore your chart"}
              </p>
            </div>
          </Link>
        </motion.div>

        {/* NUMEROLOGY */}
        <motion.div variants={item}>
          <Link href="/dashboard/numerology">
            <div className="rounded-[22px] bg-white border border-black/5 p-5 h-full">
              <Hash className="text-[#7CF5C8] mb-4" />
              <h3 className="font-semibold text-black mb-1">Numerology</h3>
              <p className="text-sm text-black/60">
                {lifePath ? `Life Path ${lifePath}` : "Discover your numbers"}
              </p>
            </div>
          </Link>
        </motion.div>

        {/* FRIENDS */}
        <motion.div variants={item}>
          <Link href="/dashboard/friends">
            <div className="rounded-[22px] bg-white border border-black/5 p-5 h-full">
              <Users className="text-[#FFB5E8] mb-4" />
              <h3 className="font-semibold text-black mb-1">Friends</h3>
              <p className="text-sm text-black/60">
                {user.friendCount
                  ? `${user.friendCount} connections`
                  : "Build your circle"}
              </p>
            </div>
          </Link>
        </motion.div>

        {/* COMPATIBILITY */}
        <motion.div variants={item}>
          <Link href="/dashboard/compatibility">
            <div className="rounded-[22px] bg-white border border-black/5 p-5 h-full">
              <Heart className="text-[#FF8F8F] mb-4" />
              <h3 className="font-semibold text-black mb-1">Compatibility</h3>
              <p className="text-sm text-black/60">Check your matches</p>
            </div>
          </Link>
        </motion.div>

        {/* MEETUPS */}
        <motion.div variants={item} className="col-span-2">
          <Link href="/dashboard/meetups">
            <div className="rounded-[22px] bg-white border border-black/5 p-6 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Calendar className="text-[#FFD97D]" />
                <div>
                  <h3 className="font-semibold text-black">Meetups</h3>
                  <p className="text-sm text-black/60">
                    {user.upcomingMeetups
                      ? `${user.upcomingMeetups} upcoming`
                      : "Discover events"}
                  </p>
                </div>
              </div>
              <ArrowRight className="text-black/40" />
            </div>
          </Link>
        </motion.div>

        {/* MARKETPLACE */}
        <motion.div variants={item} className="col-span-2">
          <Link href="/marketplace">
            <div className="rounded-[22px] bg-gradient-to-r from-[#4F8CFF]/10 via-[#C7B9FF]/10 to-[#7CF5C8]/10 border border-black/5 p-6 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Compass className="text-black" />
                <div>
                  <h3 className="font-semibold text-black">
                    Explore Marketplace
                  </h3>
                  <p className="text-sm text-black/60">
                    Curated for your energy
                  </p>
                </div>
              </div>
              <ArrowRight className="text-black" />
            </div>
          </Link>
        </motion.div>
      </section>

      <motion.footer variants={item} className="mt-12 text-center">
        <p className="text-sm text-black/50 flex items-center justify-center gap-2">
          <Star className="text-[#FFD97D]" />
          Keep exploring.
          <Star className="text-[#FFD97D]" />
        </p>
      </motion.footer>
    </motion.div>
  );
}
