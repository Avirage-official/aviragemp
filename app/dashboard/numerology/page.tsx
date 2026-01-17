// app/dashboard/numerology/page.tsx
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { MainNav } from "@/components/navigation/MainNav";
import Link from "next/link";
import { 
  ArrowLeft, 
  Hash, 
  Target,
  Calendar,
  Star,
  Heart,
  Sparkles,
  Sun,
  Clover
} from "lucide-react";

export default async function NumerologyPage() {
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
  const lifePathNumber = astrology?.lifePathNumber;

  // Fetch numerology info from database
  let numerologyInfo = null;
  if (lifePathNumber) {
    numerologyInfo = await prisma.numerologyInfo.findUnique({
      where: { number: lifePathNumber },
    });
  }

  const numberCards = [
    { 
      label: "Life Path", 
      value: astrology?.lifePathNumber, 
      icon: Target, 
      color: "from-[#7CF5C8]/20 to-[#7CF5C8]/5",
      textColor: "text-[#7CF5C8]",
      description: "Your core purpose and life mission"
    },
    { 
      label: "Birthday", 
      value: astrology?.birthDayNumber, 
      icon: Calendar, 
      color: "from-[#4F8CFF]/20 to-[#4F8CFF]/5",
      textColor: "text-[#4F8CFF]",
      description: "Natural talents you were born with"
    },
    { 
      label: "Destiny", 
      value: astrology?.destinyNumber, 
      icon: Star, 
      color: "from-[#C7B9FF]/20 to-[#C7B9FF]/5",
      textColor: "text-[#C7B9FF]",
      description: "What you're meant to become"
    },
    { 
      label: "Soul Urge", 
      value: astrology?.soulUrgeNumber, 
      icon: Heart, 
      color: "from-pink-500/20 to-pink-500/5",
      textColor: "text-pink-400",
      description: "Your inner desires and motivations"
    },
    { 
      label: "Personality", 
      value: astrology?.personalityNumber, 
      icon: Sparkles, 
      color: "from-amber-500/20 to-amber-500/5",
      textColor: "text-amber-400",
      description: "How others perceive you"
    },
    { 
      label: "Personal Year", 
      value: astrology?.personalYearNumber, 
      icon: Sun, 
      color: "from-orange-500/20 to-orange-500/5",
      textColor: "text-orange-400",
      description: "Theme for this year"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111827] via-[#0f172a] to-[#111827] text-white">
      {/* Ambient Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-[30%] left-[10%] h-[800px] w-[800px] rounded-full bg-[#7CF5C8] blur-[180px] opacity-[0.08] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[20%] h-[750px] w-[750px] rounded-full bg-[#4F8CFF] blur-[170px] opacity-[0.06]" />
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7CF5C8]/10 border border-[#7CF5C8]/30 mb-4">
            <Hash className="w-4 h-4 text-[#7CF5C8]" />
            <span className="text-sm font-medium text-[#7CF5C8]">Number Wisdom</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#7CF5C8] via-[#4F8CFF] to-[#C7B9FF] bg-clip-text text-transparent mb-2">
            Your Numerology
          </h1>
          <p className="text-white/50">The hidden meaning in your numbers</p>
        </header>

        {!astrology || !lifePathNumber ? (
          /* No Data State */
          <div className="text-center py-16">
            <Hash className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">No birth data found</h2>
            <p className="text-white/50 mb-6">Add your birth date to unlock your numerology profile</p>
            <Link
              href="/settings"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#7CF5C8] text-black font-medium hover:bg-[#7CF5C8]/80 transition-colors"
            >
              Add Birth Date
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Life Path Hero */}
            <div className="relative rounded-3xl bg-gradient-to-br from-[#7CF5C8]/20 to-[#4F8CFF]/10 border border-white/10 p-6 sm:p-8 overflow-hidden">
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#7CF5C8]/20 to-transparent rounded-full blur-3xl" />
              
              <div className="relative flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                {/* Number */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <span className="text-5xl sm:text-6xl font-bold bg-gradient-to-br from-[#7CF5C8] to-[#4F8CFF] bg-clip-text text-transparent">
                      {lifePathNumber}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                    <Target className="w-5 h-5 text-[#7CF5C8]" />
                    <span className="text-xs text-white/50 uppercase tracking-wider">Life Path Number</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Your Core Purpose</h2>
                  
                  {numerologyInfo?.description && (
                    <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-4">
                      {numerologyInfo.description}
                    </p>
                  )}

                  {/* Traits */}
                  {numerologyInfo?.traits && numerologyInfo.traits.length > 0 && (
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                      {numerologyInfo.traits.slice(0, 4).map((trait, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-[#7CF5C8]/10 border border-[#7CF5C8]/20 text-[#7CF5C8]"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Life Theme & Lesson */}
            {(numerologyInfo?.lifeTheme || numerologyInfo?.lifeLesson) && (
              <div className="grid sm:grid-cols-2 gap-4">
                {numerologyInfo?.lifeTheme && (
                  <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 sm:p-6">
                    <h3 className="text-xs text-white/50 uppercase tracking-wider mb-2">Life Theme</h3>
                    <p className="text-white/80">{numerologyInfo.lifeTheme}</p>
                  </div>
                )}
                {numerologyInfo?.lifeLesson && (
                  <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 sm:p-6">
                    <h3 className="text-xs text-white/50 uppercase tracking-wider mb-2">Life Lesson</h3>
                    <p className="text-white/80">{numerologyInfo.lifeLesson}</p>
                  </div>
                )}
              </div>
            )}

            {/* All Numbers Grid */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">All Your Numbers</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {numberCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <div 
                      key={card.label}
                      className={`rounded-2xl bg-gradient-to-br ${card.color} border border-white/10 p-4 sm:p-5`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Icon className={`w-4 h-4 ${card.textColor}`} />
                        <span className="text-xs text-white/50 uppercase tracking-wider">{card.label}</span>
                      </div>
                      <p className={`text-3xl sm:text-4xl font-bold ${card.textColor} mb-1`}>
                        {card.value || "—"}
                      </p>
                      <p className="text-xs text-white/40 line-clamp-2">{card.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Lucky Section */}
            {(astrology.luckyNumbers.length > 0 || astrology.luckyColors.length > 0) && (
              <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clover className="w-5 h-5 text-[#7CF5C8]" />
                  <h3 className="text-sm font-medium text-white">Lucky Attributes</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {astrology.luckyNumbers.length > 0 && (
                    <div>
                      <p className="text-xs text-white/50 uppercase tracking-wider mb-2">Lucky Numbers</p>
                      <div className="flex flex-wrap gap-2">
                        {astrology.luckyNumbers.map((num, i) => (
                          <span key={i} className="px-3 py-1 rounded-full text-sm bg-white/10 text-white font-medium">
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