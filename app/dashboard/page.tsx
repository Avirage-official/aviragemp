// app/dashboard/page.tsx
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { UserEmblems } from "@/components/dashboard/UserEmblems";
import { PersonalityBreakdown } from "@/components/dashboard/PersonalityBreakdown";
import { CompatibilityChart } from "@/components/dashboard/CompatibilityChart";
import { MonthlyInsights } from "@/components/dashboard/MonthlyInsights";
import { AstrologyNumerology } from "@/components/dashboard/AstrologyNumerology";
import Link from "next/link";
import { ArrowRight, Users, Compass } from "lucide-react";

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId }
  });

  if (!user) {
    redirect("/onboarding");
  }

  if (!user.primaryCode) {
    redirect("/onboarding");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111827] via-[#0f172a] to-[#111827] text-white">
      {/* Ambient Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-[30%] right-[10%] h-[800px] w-[800px] rounded-full bg-[#C7B9FF] blur-[180px] opacity-[0.08] animate-pulse" />
        <div className="absolute bottom-[-20%] left-[40%] h-[750px] w-[750px] rounded-full bg-[#4F8CFF] blur-[170px] opacity-[0.06]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-10 space-y-12">
        {/* Hero Section - Military Badge Emblems */}
        <UserEmblems 
          primaryCode={user.primaryCode}
          secondaryCode={user.secondaryCode}
          tertiaryCode={user.tertiaryCode}
        />

        {/* Astrology & Numerology Section - NEW */}
        <AstrologyNumerology />

        {/* Personality Section */}
        <PersonalityBreakdown quizResults={user.quizResults} />

        {/* Social & Marketplace Grid */}
        <section className="grid lg:grid-cols-2 gap-6">
          {/* Social */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-5 h-5 text-[#C7B9FF]" />
              <span className="text-sm uppercase tracking-wider text-white/60">
                Social
              </span>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-3">
              Your Circle
            </h3>

            <p className="text-white/70 mb-6">
              You're not alone. ETHOS connects you with people who move like you.
            </p>

            <div className="flex gap-3">
              <Link
                href="/dashboard/friends"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#C7B9FF]/10 border border-[#C7B9FF]/30 text-[#C7B9FF] text-sm font-medium hover:bg-[#C7B9FF]/20 transition-all"
              >
                View Friends <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/dashboard/messages"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm font-medium hover:bg-white/10 transition-all"
              >
                Messages
              </Link>
            </div>
          </div>

          {/* Experiences */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
            <div className="flex items-center gap-3 mb-4">
              <Compass className="w-5 h-5 text-[#4F8CFF]" />
              <span className="text-sm uppercase tracking-wider text-white/60">
                Experiences
              </span>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-3">
              Curated for You
            </h3>

            <p className="text-white/70 mb-6">
              Hand-selected moments aligned with your code.
            </p>

            <div className="flex gap-3">
              <Link
                href="/marketplace"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#4F8CFF]/10 border border-[#4F8CFF]/30 text-[#4F8CFF] text-sm font-medium hover:bg-[#4F8CFF]/20 transition-all"
              >
                Explore Marketplace <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/bookings"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm font-medium hover:bg-white/10 transition-all"
              >
                My Bookings
              </Link>
            </div>
          </div>
        </section>

        {/* Compatibility */}
        <CompatibilityChart userCode={user.primaryCode} />

        {/* Monthly Insights */}
        <MonthlyInsights code={user.primaryCode} />
      </div>
    </div>
  );
}