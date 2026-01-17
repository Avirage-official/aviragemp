// components/dashboard/AstrologyNumerology.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Sun,
  Moon,
  Sparkles,
  Hash,
  Flame,
  Droplets,
  Wind,
  Mountain,
  Star,
  Heart,
  Target,
  Calendar,
  Clover,
  Palette,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* TYPES                                                                      */
/* -------------------------------------------------------------------------- */

interface AstrologyProfile {
  sunSign: string | null;
  moonSign: string | null;
  risingSign: string | null;
  birthElement: string | null;
  modality: string | null;
  lifePathNumber: number | null;
  destinyNumber: number | null;
  soulUrgeNumber: number | null;
  personalityNumber: number | null;
  birthDayNumber: number | null;
  personalYearNumber: number | null;
  luckyNumbers: number[];
  luckyColors: string[];
  fullData: {
    astrology?: { rulingPlanet?: string };
  } | null;
}

/* -------------------------------------------------------------------------- */
/* CONFIG                                                                     */
/* -------------------------------------------------------------------------- */

const ELEMENTS: Record<
  string,
  { icon: any; accent: string; softBg: string }
> = {
  Fire: { icon: Flame, accent: "text-orange-500", softBg: "bg-orange-500/10" },
  Earth: {
    icon: Mountain,
    accent: "text-emerald-600",
    softBg: "bg-emerald-500/10",
  },
  Air: { icon: Wind, accent: "text-sky-600", softBg: "bg-sky-500/10" },
  Water: {
    icon: Droplets,
    accent: "text-blue-600",
    softBg: "bg-blue-500/10",
  },
};

const ZODIAC: Record<string, string> = {
  Aries: "♈",
  Taurus: "♉",
  Gemini: "♊",
  Cancer: "♋",
  Leo: "♌",
  Virgo: "♍",
  Libra: "♎",
  Scorpio: "♏",
  Sagittarius: "♐",
  Capricorn: "♑",
  Aquarius: "♒",
  Pisces: "♓",
};

/* -------------------------------------------------------------------------- */
/* SUB COMPONENTS                                                             */
/* -------------------------------------------------------------------------- */

function NumberCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: number | null;
  icon: any;
  accent: string;
}) {
  if (!value) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-white border border-black/5 p-4"
    >
      <div className="flex items-center justify-between mb-2">
        <div
          className={`w-9 h-9 rounded-xl ${accent} bg-black/5 flex items-center justify-center`}
        >
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-3xl font-semibold text-black">{value}</span>
      </div>
      <p className="text-xs uppercase tracking-wide text-black/50">
        {label}
      </p>
    </motion.div>
  );
}

function PillList({
  label,
  icon: Icon,
  items,
}: {
  label: string;
  icon: any;
  items: (string | number)[];
}) {
  if (!items.length) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-black/60 text-xs uppercase tracking-wide">
        <Icon className="w-4 h-4" />
        {label}
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((v, i) => (
          <span
            key={i}
            className="px-3 py-1 rounded-full bg-black/5 text-sm text-black/80"
          >
            {v}
          </span>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* MAIN                                                                       */
/* -------------------------------------------------------------------------- */

export function AstrologyNumerology() {
  const [profile, setProfile] = useState<AstrologyProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/astrology/calculate");
      const data = await res.json();
      setProfile(data.profile ?? null);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse rounded-3xl bg-black/5 h-64" />
    );
  }

  if (!profile) {
    return (
      <div className="rounded-3xl bg-white border border-black/5 p-8 text-center">
        <Sun className="w-10 h-10 text-black/20 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-black">
          Astrology not set
        </h3>
        <p className="text-sm text-black/60">
          Add your birth details to unlock this section.
        </p>
      </div>
    );
  }

  const element = profile.birthElement
    ? ELEMENTS[profile.birthElement]
    : null;

  const ElementIcon = element?.icon ?? Sun;

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 text-sm text-black/70">
          <Sparkles className="w-4 h-4" />
          Cosmic Blueprint
        </div>
        <h2 className="text-3xl font-semibold text-black">
          Astrology & Numerology
        </h2>
        <p className="text-sm text-black/60">
          A clean view of your celestial and numerical patterns
        </p>
      </div>

      {/* SUN SIGN */}
      <div className="rounded-3xl bg-white border border-black/5 p-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-16 rounded-2xl ${
                  element?.softBg ?? "bg-black/5"
                } flex items-center justify-center`}
              >
                <span className="text-3xl">
                  {profile.sunSign ? ZODIAC[profile.sunSign] : "✧"}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-black">
                  {profile.sunSign}
                </h3>
                <p className="text-sm text-black/50">Sun Sign</p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 md:w-56">
            {profile.birthElement && (
              <div className="rounded-xl bg-black/5 p-4 flex items-center gap-3">
                <ElementIcon
                  className={`w-5 h-5 ${element?.accent}`}
                />
                <div>
                  <p className="text-xs uppercase text-black/50">
                    Element
                  </p>
                  <p className="font-medium text-black">
                    {profile.birthElement}
                  </p>
                </div>
              </div>
            )}

            {profile.modality && (
              <div className="rounded-xl bg-black/5 p-4 flex items-center gap-3">
                <Star className="w-5 h-5 text-indigo-500" />
                <div>
                  <p className="text-xs uppercase text-black/50">
                    Modality
                  </p>
                  <p className="font-medium text-black">
                    {profile.modality}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* NUMEROLOGY */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-black flex items-center gap-2">
          <Hash className="w-5 h-5" />
          Numbers
        </h3>

        {profile.lifePathNumber && (
          <div className="rounded-2xl bg-white border border-black/5 p-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase text-black/50">
                Life Path
              </p>
              <p className="text-sm text-black/60">
                Core direction
              </p>
            </div>
            <span className="text-5xl font-semibold text-black">
              {profile.lifePathNumber}
            </span>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <NumberCard
            label="Birthday"
            value={profile.birthDayNumber}
            icon={Calendar}
            accent="text-blue-600"
          />
          <NumberCard
            label="Destiny"
            value={profile.destinyNumber}
            icon={Star}
            accent="text-indigo-600"
          />
          <NumberCard
            label="Soul Urge"
            value={profile.soulUrgeNumber}
            icon={Heart}
            accent="text-pink-600"
          />
          <NumberCard
            label="Personality"
            value={profile.personalityNumber}
            icon={Sparkles}
            accent="text-violet-600"
          />
          <NumberCard
            label="Personal Year"
            value={profile.personalYearNumber}
            icon={Target}
            accent="text-emerald-600"
          />
        </div>
      </div>

      {/* LUCKY */}
      {(profile.luckyNumbers.length > 0 ||
        profile.luckyColors.length > 0) && (
        <div className="rounded-2xl bg-white border border-black/5 p-6 grid md:grid-cols-2 gap-6">
          <PillList
            label="Lucky Numbers"
            icon={Hash}
            items={profile.luckyNumbers}
          />
          <PillList
            label="Lucky Colors"
            icon={Palette}
            items={profile.luckyColors}
          />
        </div>
      )}
    </div>
  );
}
