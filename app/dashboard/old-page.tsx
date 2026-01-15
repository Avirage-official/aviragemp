import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Sparkles, Users, Compass, ArrowRight, Shield } from "lucide-react";
import { AnimatedBackdrop } from "@/components/ui/AnimatedBackdrop";
import { CodeOverview } from "@/components/dashboard/CodeOverview";
import { PersonalityBreakdown } from "@/components/dashboard/PersonalityBreakdown";
import { CompatibilityChart } from "@/components/dashboard/CompatibilityChart";
import { MonthlyInsights } from "@/components/dashboard/MonthlyInsights";

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    redirect("/onboarding");
  }

  if (!user.primaryCode) {
    redirect("/onboarding");
  }

  // Route business users to business dashboard
  if (user.type === "BUSINESS") {
    redirect("/business/dashboard");
  }

  const displayName = user.name || user.username || "there";

  return (
    <div className="min-h-screen bg-[#111827] text-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="space-y-12">
          {/* HERO */}
          <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
            <AnimatedBackdrop />

            <div className="relative z-10 px-10 py-16">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-widest text-white/40">
                  Your Universe
                </p>

                <h1 className="text-4xl md:text-5xl font-semibold text-white">
                  Welcome back, {displayName}
                </h1>

                <p className="text-lg text-white/70 max-w-2xl">
                  This is your personal headquarters — where identity, people,
                  and experiences align.
                </p>

                <p className="text-xs text-white/40 uppercase tracking-wider">
                  Account: {user.type || "CONSUMER"}
                </p>
              </div>
            </div>
          </section>

          {/* YOUR CODE - Full redesigned component */}
          <CodeOverview 
            primaryCode={user.primaryCode}
            secondaryCode={user.secondaryCode}
            tertiaryCode={user.tertiaryCode}
          />

          {/* PERSONALITY BREAKDOWN */}
          <PersonalityBreakdown quizResults={user.quizResults} />

          {/* SOCIAL & MARKETPLACE GRID */}
          <section className="grid lg:grid-cols-2 gap-6">
            {/* SOCIAL */}
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

            {/* EXPERIENCES */}
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

          {/* COMPATIBILITY */}
          <CompatibilityChart userCode={user.primaryCode} />

          {/* MONTHLY INSIGHTS */}
          <MonthlyInsights code={user.primaryCode} />

          {/* TRUST */}
          <section className="flex items-center gap-3 text-sm text-white/40 py-8">
            <Shield className="w-4 h-4" />
            Your data, identity, and connections are protected by design.
          </section>
        </div>
      </div>
    </div>
  );
}