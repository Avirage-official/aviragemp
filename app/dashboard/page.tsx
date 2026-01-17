// app/dashboard/page.tsx
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { MainNav } from "@/components/navigation/MainNav";
import { BentoCard } from "@/components/dashboard/BentoCard";
import { 
  Sparkles, 
  Sun, 
  Hash, 
  Users, 
  Calendar, 
  Target,
  MapPin
} from "lucide-react";

// Zodiac symbols for display
const ZODIAC_SYMBOLS: Record<string, string> = {
  Aries: "♈", Taurus: "♉", Gemini: "♊", Cancer: "♋",
  Leo: "♌", Virgo: "♍", Libra: "♎", Scorpio: "♏",
  Sagittarius: "♐", Capricorn: "♑", Aquarius: "♒", Pisces: "♓",
};

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      astrology: true,
      friendships: true,
    },
  });

  if (!user || !user.primaryCode) {
    redirect("/onboarding");
  }

  // Get counts
  const friendCount = user.friendships?.length || 0;
  const meetupCount = await prisma.meetupParticipant.count({
    where: { 
      userId: user.id,
      meetup: { scheduledAt: { gte: new Date() } }
    },
  });

  const sunSign = user.astrology?.sunSign || null;
  const lifePathNumber = user.astrology?.lifePathNumber || null;
  const zodiacSymbol = sunSign ? ZODIAC_SYMBOLS[sunSign] : "✧";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111827] via-[#0f172a] to-[#111827] text-white">
      {/* Ambient Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-[30%] right-[10%] h-[800px] w-[800px] rounded-full bg-[#C7B9FF] blur-[180px] opacity-[0.08] animate-pulse" />
        <div className="absolute bottom-[-20%] left-[40%] h-[750px] w-[750px] rounded-full bg-[#4F8CFF] blur-[170px] opacity-[0.06]" />
      </div>

      <MainNav />

      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Hero Section */}
        <section className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            {/* Avatar/Emblem placeholder */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#4F8CFF]/30 to-[#C7B9FF]/30 border border-white/20 flex items-center justify-center">
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-[#4F8CFF]" />
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                Hey, {user.username || user.name || "Explorer"} 👋
              </h1>
              <p className="text-white/50 text-sm sm:text-base flex flex-wrap items-center gap-2">
                <span className="capitalize">{user.primaryCode}</span>
                {sunSign && (
                  <>
                    <span className="text-white/30">•</span>
                    <span>{zodiacSymbol} {sunSign}</span>
                  </>
                )}
                {lifePathNumber && (
                  <>
                    <span className="text-white/30">•</span>
                    <span>Life Path {lifePathNumber}</span>
                  </>
                )}
              </p>
            </div>

            {/* Location */}
            {user.city && (
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <MapPin className="w-4 h-4 text-white/50" />
                <span className="text-sm text-white/70">{user.city}</span>
              </div>
            )}
          </div>
        </section>

        {/* Bento Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {/* Your Codes - Large */}
          <div className="col-span-2 lg:col-span-1 lg:row-span-2">
            <BentoCard
              title="Your Codes"
              subtitle="Mythical identity badges"
              icon={Sparkles}
              href="/dashboard/codes"
              color="lavender"
              size="large"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4F8CFF]" />
                  <span className="text-sm text-white/70 capitalize">{user.primaryCode}</span>
                  <span className="text-xs text-white/40">Primary</span>
                </div>
                {user.secondaryCode && (
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#7CF5C8]" />
                    <span className="text-sm text-white/70 capitalize">{user.secondaryCode}</span>
                    <span className="text-xs text-white/40">Secondary</span>
                  </div>
                )}
                {user.tertiaryCode && (
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C7B9FF]" />
                    <span className="text-sm text-white/70 capitalize">{user.tertiaryCode}</span>
                    <span className="text-xs text-white/40">Tertiary</span>
                  </div>
                )}
              </div>
            </BentoCard>
          </div>

          {/* Astrology */}
          <BentoCard
            title="Astrology"
            subtitle={sunSign ? `${zodiacSymbol} ${sunSign}` : "Discover your sign"}
            icon={Sun}
            href="/dashboard/astrology"
            color="blue"
          >
            {sunSign && (
              <div className="flex items-center gap-2">
                <span className="text-2xl">{zodiacSymbol}</span>
                <div>
                  <p className="text-sm font-medium text-white">{sunSign}</p>
                  <p className="text-xs text-white/40">{user.astrology?.birthElement || "Element"}</p>
                </div>
              </div>
            )}
          </BentoCard>

          {/* Numerology */}
          <BentoCard
            title="Numerology"
            subtitle={lifePathNumber ? `Life Path ${lifePathNumber}` : "Your numbers"}
            icon={Hash}
            href="/dashboard/numerology"
            color="mint"
          >
            {lifePathNumber && (
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-[#7CF5C8]">{lifePathNumber}</span>
                <span className="text-xs text-white/40">Life Path</span>
              </div>
            )}
          </BentoCard>

          {/* Friends */}
          <BentoCard
            title="Friends"
            subtitle="Your circle"
            icon={Users}
            href="/dashboard/friends"
            color="lavender"
            badge={friendCount > 0 ? friendCount : undefined}
          >
            <p className="text-sm text-white/50">
              {friendCount > 0 
                ? `${friendCount} connection${friendCount > 1 ? "s" : ""}`
                : "Start building your circle"
              }
            </p>
          </BentoCard>

          {/* Compatibility */}
          <BentoCard
            title="Compatibility"
            subtitle="Who vibes with you"
            icon={Target}
            href="/dashboard/compatibility"
            color="pink"
          >
            <p className="text-sm text-white/50">
              Find your matches
            </p>
          </BentoCard>

          {/* Meetups */}
          <BentoCard
            title="Meetups"
            subtitle="Upcoming events"
            icon={Calendar}
            href="/dashboard/meetups"
            color="orange"
            badge={meetupCount > 0 ? meetupCount : undefined}
          >
            <p className="text-sm text-white/50">
              {meetupCount > 0 
                ? `${meetupCount} upcoming`
                : "No meetups yet"
              }
            </p>
          </BentoCard>
        </section>
      </main>
    </div>
  );
}