// app/dashboard/astrology/page.tsx
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { MainNav } from "@/components/navigation/MainNav";
import Link from "next/link";
import { 
  ArrowLeft, 
  Sun, 
  Moon, 
  Flame, 
  Droplets, 
  Wind, 
  Mountain,
  Star,
  Sparkles
} from "lucide-react";

const ZODIAC_SYMBOLS: Record<string, string> = {
  Aries: "♈", Taurus: "♉", Gemini: "♊", Cancer: "♋",
  Leo: "♌", Virgo: "♍", Libra: "♎", Scorpio: "♏",
  Sagittarius: "♐", Capricorn: "♑", Aquarius: "♒", Pisces: "♓",
};

const ELEMENT_CONFIG: Record<string, { icon: typeof Flame; color: string; bgClass: string }> = {
  Fire: { icon: Flame, color: "text-orange-400", bgClass: "from-orange-500/20 to-red-500/10" },
  Earth: { icon: Mountain, color: "text-green-400", bgClass: "from-green-500/20 to-emerald-500/10" },
  Air: { icon: Wind, color: "text-sky-400", bgClass: "from-sky-500/20 to-blue-500/10" },
  Water: { icon: Droplets, color: "text-blue-400", bgClass: "from-blue-500/20 to-indigo-500/10" },
};

export default async function AstrologyPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { astrology: true },
  });

  if (!user) {
    redirect("/onboarding");
  }

  const astrology = user.astrology;
  const sunSign = astrology?.sunSign;
  const zodiacSymbol = sunSign ? ZODIAC_SYMBOLS[sunSign] : "✧";
  const element = astrology?.birthElement ? ELEMENT_CONFIG[astrology.birthElement] : null;
  const ElementIcon = element?.icon || Sun;

  // Fetch sign info from database
  let signInfo = null;
  if (sunSign) {
    signInfo = await prisma.astrologySignInfo.findUnique({
      where: { sign: sunSign },
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111827] via-[#0f172a] to-[#111827] text-white">
      {/* Ambient Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-[30%] right-[10%] h-[800px] w-[800px] rounded-full bg-[#4F8CFF] blur-[180px] opacity-[0.08] animate-pulse" />
        <div className="absolute bottom-[-20%] left-[20%] h-[750px] w-[750px] rounded-full bg-[#C7B9FF] blur-[170px] opacity-[0.06]" />
      </div>

      <MainNav />

      <main className="relative max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Back Button */}
        <Link 
          href="/dashboard"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-6 sm:mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Dashboard</span>
        </Link>

        {/* Header */}
        <header className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4F8CFF]/10 border border-[#4F8CFF]/30 mb-4">
            <Sun className="w-4 h-4 text-[#4F8CFF]" />
            <span className="text-sm font-medium text-[#4F8CFF]">Cosmic Blueprint</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#4F8CFF] via-[#C7B9FF] to-[#7CF5C8] bg-clip-text text-transparent mb-2">
            Your Astrology
          </h1>
          <p className="text-white/50">Celestial insights based on your birth chart</p>
        </header>

        {!astrology || !sunSign ? (
          /* No Data State */
          <div className="text-center py-16">
            <Sun className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">No birth data found</h2>
            <p className="text-white/50 mb-6">Add your birth date to unlock your astrology profile</p>
            <Link
              href="/settings"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4F8CFF] text-white font-medium hover:bg-[#4F8CFF]/80 transition-colors"
            >
              Add Birth Date
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Sun Sign Hero Card */}
            <div className={`relative rounded-3xl bg-gradient-to-br ${element?.bgClass || "from-[#4F8CFF]/20 to-[#4F8CFF]/5"} border border-white/10 p-6 sm:p-8 overflow-hidden`}>
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl" />
              
              <div className="relative flex flex-col sm:flex-row gap-6 sm:gap-8">
                {/* Symbol */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto sm:mx-0">
                    <span className="text-5xl sm:text-6xl">{zodiacSymbol}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-1">{sunSign}</h2>
                  <p className="text-white/50 text-sm mb-4">Sun Sign</p>
                  
                  {signInfo?.description && (
                    <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-4">
                      {signInfo.description}
                    </p>
                  )}

                  {/* Traits */}
                  {signInfo?.traits && signInfo.traits.length > 0 && (
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                      {signInfo.traits.slice(0, 5).map((trait, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 border border-white/10 text-white/80"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Attributes Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {/* Element */}
              <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-2">
                  <ElementIcon className={`w-5 h-5 ${element?.color || "text-[#4F8CFF]"}`} />
                  <span className="text-xs text-white/50 uppercase tracking-wider">Element</span>
                </div>
                <p className="text-lg sm:text-xl font-semibold text-white">{astrology.birthElement || "—"}</p>
              </div>

              {/* Modality */}
              <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Star className="w-5 h-5 text-[#7CF5C8]" />
                  <span className="text-xs text-white/50 uppercase tracking-wider">Modality</span>
                </div>
                <p className="text-lg sm:text-xl font-semibold text-white">{astrology.modality || "—"}</p>
              </div>

              {/* Ruling Planet */}
              <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 sm:p-6 col-span-2 sm:col-span-1">
                <div className="flex items-center gap-3 mb-2">
                  <Moon className="w-5 h-5 text-[#C7B9FF]" />
                  <span className="text-xs text-white/50 uppercase tracking-wider">Ruling Planet</span>
                </div>
                <p className="text-lg sm:text-xl font-semibold text-white">
                  {(astrology.fullData as { astrology?: { rulingPlanet?: string } })?.astrology?.rulingPlanet || signInfo?.rulingPlanet || "—"}
                </p>
              </div>
            </div>

            {/* Compatibility Preview */}
            {signInfo?.compatibleSigns && signInfo.compatibleSigns.length > 0 && (
              <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-5 h-5 text-pink-400" />
                  <span className="text-sm font-medium text-white">Compatible Signs</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {signInfo.compatibleSigns.map((sign, i) => (
                    <span 
                      key={i}
                      className="px-3 py-2 rounded-xl text-sm font-medium bg-pink-500/10 border border-pink-500/20 text-pink-300"
                    >
                      {ZODIAC_SYMBOLS[sign] || ""} {sign}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Lucky Attributes */}
            {(astrology.luckyNumbers.length > 0 || astrology.luckyColors.length > 0) && (
              <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 sm:p-6">
                <h3 className="text-sm font-medium text-white mb-4">Lucky Attributes</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {astrology.luckyNumbers.length > 0 && (
                    <div>
                      <p className="text-xs text-white/50 uppercase tracking-wider mb-2">Lucky Numbers</p>
                      <div className="flex flex-wrap gap-2">
                        {astrology.luckyNumbers.map((num, i) => (
                          <span key={i} className="px-3 py-1 rounded-full text-sm bg-white/10 text-white">
                            {num}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {astrology.luckyColors.length > 0 && (
                    <div>
                      <p className="text-xs text-white/50 uppercase tracking-wider mb-2">Lucky Colors</p>
                      <div className="flex flex-wrap gap-2">
                        {astrology.luckyColors.map((color, i) => (
                          <span key={i} className="px-3 py-1 rounded-full text-sm bg-white/10 text-white">
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}