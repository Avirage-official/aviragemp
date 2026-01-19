// app/dashboard/codes/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { MYTHICAL_CODES } from "@/lib/mythicalCodes";
import { Sparkle, TrendingUp, Lightbulb, ArrowLeft, Heart, Target } from "lucide-react";
import Link from "next/link";

export default async function CodesPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: {
      primaryCode: true,
      secondaryCode: true,
      tertiaryCode: true,
      quizResults: true,
    },
  });

  if (!user || !user.primaryCode) {
    redirect("/onboarding");
  }

  const primaryData = MYTHICAL_CODES[user.primaryCode.toLowerCase() as keyof typeof MYTHICAL_CODES];
  const secondaryData = user.secondaryCode ? MYTHICAL_CODES[user.secondaryCode.toLowerCase() as keyof typeof MYTHICAL_CODES] : null;
  const tertiaryData = user.tertiaryCode ? MYTHICAL_CODES[user.tertiaryCode.toLowerCase() as keyof typeof MYTHICAL_CODES] : null;

  const quizResults = user.quizResults as any;

  return (
    <div className="min-h-screen bg-[#0B0D12] text-white">
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        {/* Back Button */}
        <Link 
          href="/dashboard"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Sparkle className="w-6 h-6 text-[#C7B9FF]" />
            <span className="text-sm uppercase tracking-wider text-white/60">Your Mythical Codes</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Your Personality Archetypes
          </h1>

          <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
            These codes represent the core patterns that shape how you move through the world. 
            Your primary code is your dominant energy, while secondary and tertiary codes influence your approach.
          </p>
        </div>

        {/* Primary Code - Hero Section */}
        {primaryData && (
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#C7B9FF]/10 to-transparent p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#C7B9FF]/5 via-transparent to-[#4F8CFF]/5" />
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-wider text-[#C7B9FF] font-semibold">Primary Code</span>
                  <h2 className="text-5xl sm:text-6xl font-bold">{primaryData.label}</h2>
                  <p className="text-xl text-white/70">{primaryData.essence}</p>
                </div>
              </div>

              {/* Strengths & Blind Spots Grid */}
              <div className="grid md:grid-cols-2 gap-6 pt-6">
                {/* Strengths */}
                <div className="space-y-4 rounded-2xl bg-[#7CF5C8]/5 border border-[#7CF5C8]/10 p-6">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#7CF5C8]" />
                    <h3 className="text-sm uppercase tracking-wider text-[#7CF5C8] font-semibold">Strengths</h3>
                  </div>
                  <ul className="space-y-2">
                    {primaryData.strengths.map((strength, i) => (
                      <li key={i} className="text-white/80 flex items-start gap-3 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7CF5C8] mt-2 flex-shrink-0" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Blind Spots */}
                <div className="space-y-4 rounded-2xl bg-[#FFB5E8]/5 border border-[#FFB5E8]/10 p-6">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-[#FFB5E8]" />
                    <h3 className="text-sm uppercase tracking-wider text-[#FFB5E8] font-semibold">Blind Spots</h3>
                  </div>
                  <ul className="space-y-2">
                    {primaryData.blindSpots.map((spot, i) => (
                      <li key={i} className="text-white/80 flex items-start gap-3 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFB5E8] mt-2 flex-shrink-0" />
                        <span>{spot}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Primary Advice */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-[#4F8CFF] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm uppercase tracking-wider text-[#4F8CFF] font-semibold mb-2">Core Guidance</h3>
                    <p className="text-white/80 leading-relaxed">{primaryData.primaryAdvice}</p>
                  </div>
                </div>
              </div>

              {/* Ideal Audience */}
              <div className="space-y-3">
                <h3 className="text-sm uppercase tracking-wider text-white/60 font-semibold">Ideal Audience</h3>
                <div className="flex flex-wrap gap-2">
                  {primaryData.idealAudience.map((audience, i) => (
                    <span 
                      key={i}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm font-medium"
                    >
                      {audience}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Secondary & Tertiary Codes */}
        {(secondaryData || tertiaryData) && (
          <div className="grid md:grid-cols-2 gap-6">
            {secondaryData && (
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.03] transition-all">
                <span className="text-xs uppercase tracking-wider text-[#4F8CFF] font-semibold">Secondary Code</span>
                <div className="mt-4 mb-3">
                  <h3 className="text-2xl font-bold">{secondaryData.label}</h3>
                  <p className="text-sm text-white/60 mt-1">{secondaryData.key}</p>
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-4">{secondaryData.essence}</p>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs text-white/60">{secondaryData.secondaryEffect}</p>
                </div>
              </div>
            )}

            {tertiaryData && (
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.03] transition-all">
                <span className="text-xs uppercase tracking-wider text-[#7CF5C8] font-semibold">Tertiary Code</span>
                <div className="mt-4 mb-3">
                  <h3 className="text-2xl font-bold">{tertiaryData.label}</h3>
                  <p className="text-sm text-white/60 mt-1">{tertiaryData.key}</p>
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-4">{tertiaryData.essence}</p>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs text-white/60">{tertiaryData.tertiaryEffect}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Brand Tone (if primary data exists) */}
        {primaryData?.brandTone && (
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
            <h2 className="text-2xl font-bold mb-6">Your Brand Tone</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wider text-white/50 mb-2">Voice</p>
                <p className="text-lg font-semibold capitalize">{primaryData.brandTone.voice}</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wider text-white/50 mb-2">Pace</p>
                <p className="text-lg font-semibold capitalize">{primaryData.brandTone.pace}</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wider text-white/50 mb-2">Posture</p>
                <p className="text-lg font-semibold capitalize">{primaryData.brandTone.posture}</p>
              </div>
            </div>
          </div>
        )}

        {/* Personality Breakdown (if quiz taken) */}
        {quizResults?.bigFive && (
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
            <h2 className="text-2xl font-bold mb-6">Big Five Personality Traits</h2>
            <div className="space-y-6">
              {Object.entries(quizResults.bigFive).map(([trait, score]: [string, any]) => (
                <div key={trait} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 capitalize font-medium">{trait}</span>
                    <span className="text-[#4F8CFF] font-semibold">{score}%</span>
                  </div>
                  <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#4F8CFF] to-[#7CF5C8] rounded-full transition-all duration-1000"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA to Explore Compatibility */}
        <div className="rounded-3xl border border-[#FFB5E8]/30 bg-gradient-to-br from-[#FFB5E8]/10 to-transparent p-8 text-center">
          <Heart className="w-12 h-12 text-[#FFB5E8] mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-3">Discover Your Matches</h3>
          <p className="text-white/70 mb-6 max-w-md mx-auto">
            See which codes you're most compatible with and understand the dynamics of your relationships.
          </p>
          <Link 
            href="/dashboard/compatibility"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFB5E8] text-black font-medium hover:bg-[#FFB5E8]/90 transition-all"
          >
            <Heart className="w-4 h-4" />
            View Compatibility Chart
          </Link>
        </div>
      </div>
    </div>
  );
}