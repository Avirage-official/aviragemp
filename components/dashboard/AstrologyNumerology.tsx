// components/dashboard/AstrologyNumerology.tsx
"use client";

import { useState, useEffect } from "react";
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
  Palette
} from "lucide-react";
import { motion } from "framer-motion";

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
    astrology?: {
      rulingPlanet?: string;
    };
  } | null;
}

interface SignInfo {
  sign: string;
  symbol: string | null;
  description: string;
  traits: string[];
  element: string;
  rulingPlanet: string | null;
}

interface NumerologyInfo {
  number: number;
  name: string;
  description: string;
  traits: string[];
  lifeTheme: string | null;
}

/* -------------------------------------------------------------------------- */
/* ELEMENT ICONS                                                              */
/* -------------------------------------------------------------------------- */

const ELEMENT_CONFIG: Record<string, { icon: typeof Flame; color: string; bg: string }> = {
  Fire: { icon: Flame, color: "text-orange-400", bg: "from-orange-500/20 to-red-500/20" },
  Earth: { icon: Mountain, color: "text-green-400", bg: "from-green-500/20 to-emerald-500/20" },
  Air: { icon: Wind, color: "text-sky-400", bg: "from-sky-500/20 to-blue-500/20" },
  Water: { icon: Droplets, color: "text-blue-400", bg: "from-blue-500/20 to-indigo-500/20" },
};

const ZODIAC_SYMBOLS: Record<string, string> = {
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
/* SUB-COMPONENTS                                                             */
/* -------------------------------------------------------------------------- */

function NumerologyCard({ 
  number, 
  label, 
  icon: Icon, 
  color,
  description 
}: { 
  number: number | null; 
  label: string; 
  icon: typeof Hash;
  color: string;
  description?: string;
}) {
  if (!number) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative"
    >
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative rounded-2xl bg-white/[0.03] border border-white/10 p-4 hover:border-white/20 transition-all">
        <div className="flex items-start justify-between mb-2">
          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
            <Icon className="w-4 h-4 text-white" />
          </div>
          <span className="text-3xl font-bold text-white">{number}</span>
        </div>
        <p className="text-xs text-white/50 uppercase tracking-wider">{label}</p>
        {description && (
          <p className="text-xs text-white/40 mt-2 line-clamp-2">{description}</p>
        )}
      </div>
    </motion.div>
  );
}

function LuckyBadge({ items, icon: Icon, label, colorClass }: { 
  items: (string | number)[]; 
  icon: typeof Clover;
  label: string;
  colorClass: string;
}) {
  if (!items || items.length === 0) return null;
  
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Icon className={`w-4 h-4 ${colorClass}`} />
        <span className="text-xs text-white/50 uppercase tracking-wider">{label}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span 
            key={i}
            className={`px-3 py-1 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-white/80`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                                                             */
/* -------------------------------------------------------------------------- */

export function AstrologyNumerology() {
  const [profile, setProfile] = useState<AstrologyProfile | null>(null);
  const [signInfo, setSignInfo] = useState<SignInfo | null>(null);
  const [numerologyInfo, setNumerologyInfo] = useState<NumerologyInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch astrology profile
        const res = await fetch("/api/astrology/calculate", { method: "GET" });
        const data = await res.json();
        
        if (!data.profile) {
          setError("No astrology profile found. Complete onboarding to see your cosmic blueprint.");
          setLoading(false);
          return;
        }
        
        setProfile(data.profile);

        // Fetch sign info from reference table
        if (data.profile.sunSign) {
          const signRes = await fetch(`/api/astrology/sign-info?sign=${data.profile.sunSign}`);
          if (signRes.ok) {
            const signData = await signRes.json();
            setSignInfo(signData.info);
          }
        }

        // Fetch numerology info from reference table
        if (data.profile.lifePathNumber) {
          const numRes = await fetch(`/api/astrology/numerology-info?number=${data.profile.lifePathNumber}`);
          if (numRes.ok) {
            const numData = await numRes.json();
            setNumerologyInfo(numData.info);
          }
        }
      } catch (err) {
        console.error("Failed to fetch astrology data:", err);
        setError("Failed to load your cosmic profile.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-white/10 rounded-lg w-48 mx-auto mb-4" />
          <div className="h-64 bg-white/5 rounded-3xl" />
        </div>
      </div>
    );
  }

  // Error or no profile state
  if (error || !profile) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 text-center">
        <Sun className="w-12 h-12 text-white/20 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Cosmic Blueprint Awaits</h3>
        <p className="text-white/50 text-sm">
          {error || "Add your birth date in settings to unlock your astrology & numerology profile."}
        </p>
      </div>
    );
  }

  const element = profile.birthElement ? ELEMENT_CONFIG[profile.birthElement] : null;
  const ElementIcon = element?.icon || Sun;
  const zodiacSymbol = profile.sunSign ? ZODIAC_SYMBOLS[profile.sunSign] : "✧";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#C7B9FF]/10 via-[#4F8CFF]/10 to-[#7CF5C8]/10 border border-[#FAFAFA]/10 mb-4">
          <Sparkles className="h-4 w-4 text-[#C7B9FF]" />
          <span className="text-sm font-medium text-[#FAFAFA]/80">Cosmic Blueprint</span>
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#C7B9FF] via-[#4F8CFF] to-[#7CF5C8] bg-clip-text text-transparent">
          Astrology & Numerology
        </h2>
        <p className="text-[#FAFAFA]/50 text-sm max-w-2xl mx-auto">
          Your celestial profile based on the stars and numbers
        </p>
      </div>

      {/* Sun Sign Card - Hero */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group"
      >
        <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-br from-[#C7B9FF]/20 via-[#4F8CFF]/10 to-[#7CF5C8]/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
        
        <div className="relative rounded-[28px] bg-white/[0.03] backdrop-blur-2xl border border-[#FAFAFA]/10 p-8 overflow-hidden">
          {/* Background glow */}
          <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${element?.bg || "from-purple-500/20 to-blue-500/20"} rounded-full blur-3xl opacity-30`} />
          
          <div className="relative flex flex-col md:flex-row gap-8">
            {/* Left - Sign Info */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${element?.bg || "from-[#C7B9FF]/20 to-[#4F8CFF]/20"} border border-white/20 flex items-center justify-center`}>
                  <span className="text-3xl">{zodiacSymbol}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{profile.sunSign}</h3>
                  <p className="text-white/50 text-sm">Sun Sign</p>
                </div>
              </div>
              
              {signInfo && (
                <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
                  {signInfo.description}
                </p>
              )}

              {/* Traits */}
              {signInfo?.traits && signInfo.traits.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {signInfo.traits.slice(0, 4).map((trait, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white/70"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Right - Element & Modality */}
            <div className="flex flex-col gap-4 md:w-48">
              {/* Element */}
              {profile.birthElement && (
                <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4">
                  <div className="flex items-center gap-3">
                    <ElementIcon className={`w-5 h-5 ${element?.color}`} />
                    <div>
                      <p className="text-xs text-white/50 uppercase tracking-wider">Element</p>
                      <p className="text-white font-semibold">{profile.birthElement}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Modality */}
              {profile.modality && (
                <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4">
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-[#7CF5C8]" />
                    <div>
                      <p className="text-xs text-white/50 uppercase tracking-wider">Modality</p>
                      <p className="text-white font-semibold">{profile.modality}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Ruling Planet */}
              {profile.fullData?.astrology?.rulingPlanet && (
                <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4">
                  <div className="flex items-center gap-3">
                    <Moon className="w-5 h-5 text-[#4F8CFF]" />
                    <div>
                      <p className="text-xs text-white/50 uppercase tracking-wider">Ruler</p>
                      <p className="text-white font-semibold">{profile.fullData.astrology.rulingPlanet}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Numerology Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Hash className="w-5 h-5 text-[#7CF5C8]" />
          <h3 className="text-lg font-semibold text-white">Your Numbers</h3>
        </div>

        {/* Life Path - Featured */}
        {profile.lifePathNumber && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative group"
          >
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-[#7CF5C8]/20 to-[#4F8CFF]/20 opacity-0 group-hover:opacity-100 blur-lg transition-opacity" />
            <div className="relative rounded-2xl bg-white/[0.03] border border-white/10 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7CF5C8]/20 to-[#4F8CFF]/20 border border-[#7CF5C8]/30 flex items-center justify-center">
                      <Target className="w-5 h-5 text-[#7CF5C8]" />
                    </div>
                    <div>
                      <p className="text-xs text-white/50 uppercase tracking-wider">Life Path Number</p>
                      <p className="text-white/70 text-sm">Your core purpose</p>
                    </div>
                  </div>
                  {numerologyInfo && (
                    <p className="text-white/60 text-sm mt-3 line-clamp-2">
                      {numerologyInfo.description}
                    </p>
                  )}
                </div>
                <span className="text-5xl font-bold bg-gradient-to-br from-[#7CF5C8] to-[#4F8CFF] bg-clip-text text-transparent">
                  {profile.lifePathNumber}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Other Numbers Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          <NumerologyCard 
            number={profile.birthDayNumber} 
            label="Birthday" 
            icon={Calendar}
            color="from-[#4F8CFF]/20 to-[#4F8CFF]/10"
          />
          <NumerologyCard 
            number={profile.destinyNumber} 
            label="Destiny" 
            icon={Star}
            color="from-[#C7B9FF]/20 to-[#C7B9FF]/10"
          />
          <NumerologyCard 
            number={profile.soulUrgeNumber} 
            label="Soul Urge" 
            icon={Heart}
            color="from-pink-500/20 to-pink-500/10"
          />
          <NumerologyCard 
            number={profile.personalityNumber} 
            label="Personality" 
            icon={Sparkles}
            color="from-amber-500/20 to-amber-500/10"
          />
          <NumerologyCard 
            number={profile.personalYearNumber} 
            label="Personal Year" 
            icon={Sun}
            color="from-[#7CF5C8]/20 to-[#7CF5C8]/10"
          />
        </div>
      </div>

      {/* Lucky Section */}
      {(profile.luckyNumbers.length > 0 || profile.luckyColors.length > 0) && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl bg-white/[0.02] border border-white/10 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Clover className="w-5 h-5 text-[#7CF5C8]" />
            <h3 className="text-lg font-semibold text-white">Lucky Attributes</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <LuckyBadge 
              items={profile.luckyNumbers} 
              icon={Hash} 
              label="Lucky Numbers"
              colorClass="text-[#4F8CFF]"
            />
            <LuckyBadge 
              items={profile.luckyColors} 
              icon={Palette} 
              label="Lucky Colors"
              colorClass="text-[#C7B9FF]"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}