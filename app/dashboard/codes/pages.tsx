// app/dashboard/codes/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Sparkle, TrendingUp, Users, Lightbulb, ArrowLeft } from "lucide-react";
import Link from "next/link";

/* ============================================================================
   YOUR CODES PAGE — Full personality breakdown
   Dark theme with neon accents
   ============================================================================ */

const CODE_DATA: Record<string, {
  name: string;
  tagline: string;
  description: string;
  emblem: string;
  traits: string[];
  strengths: string[];
  challenges: string[];
}> = {
  "stillmind": {
    name: "StillMind",
    tagline: "Inner Clarity Through Contemplation",
    description: "You find wisdom in stillness. Where others seek answers externally, you turn inward. Your contemplative nature allows you to see patterns and meanings that escape the restless mind.",
    emblem: "🏔️",
    traits: ["Contemplative", "Introspective", "Meaning-seeking"],
    strengths: ["Deep thinking", "Self-awareness", "Philosophical insight", "Patience"],
    challenges: ["Overthinking", "Isolation", "Analysis paralysis"]
  },
  "earthlistener": {
    name: "EarthListener",
    tagline: "Grounded Wisdom Keeper",
    description: "You are deeply attuned to the natural rhythms of life. Your presence is calming, your insights are practical, and you help others find their footing when they feel unmoored.",
    emblem: "🌿",
    traits: ["Grounded", "Nurturing", "Practical"],
    strengths: ["Stability", "Common sense", "Reliability", "Healing presence"],
    challenges: ["Resistance to change", "Overcommitting to others"]
  },
  "fireweaver": {
    name: "FireWeaver",
    tagline: "Transformative Energy Catalyst",
    description: "You bring heat, light, and transformation wherever you go. Your passion is infectious, your energy undeniable. You burn away what no longer serves and forge new possibilities.",
    emblem: "🔥",
    traits: ["Passionate", "Dynamic", "Transformative"],
    strengths: ["Motivation", "Leadership", "Courage", "Inspiration"],
    challenges: ["Burnout", "Impulsiveness", "Intensity"]
  },
  "skyweaver": {
    name: "SkyWeaver",
    tagline: "Visionary Dreamer",
    description: "Your mind soars above the mundane. You see possibilities others miss, connections others don't make. You weave ideas from the ether into tangible inspiration.",
    emblem: "☁️",
    traits: ["Visionary", "Creative", "Idealistic"],
    strengths: ["Innovation", "Big-picture thinking", "Imagination", "Optimism"],
    challenges: ["Impracticality", "Disconnection from reality"]
  },
  "waveborn": {
    name: "WaveBorn",
    tagline: "Fluid Emotional Navigator",
    description: "You flow with life's currents rather than resisting them. Your emotional intelligence is profound, allowing you to navigate complexity with grace and adapt to any situation.",
    emblem: "🌊",
    traits: ["Adaptive", "Empathetic", "Intuitive"],
    strengths: ["Emotional intelligence", "Flexibility", "Compassion", "Intuition"],
    challenges: ["Overwhelm", "Boundary issues", "Mood fluctuations"]
  },
  "stonebound": {
    name: "StoneBound",
    tagline: "Unshakeable Foundation",
    description: "You are the rock others lean on. Your consistency, loyalty, and strength provide stability in turbulent times. You build slowly but what you build lasts.",
    emblem: "⛰️",
    traits: ["Reliable", "Loyal", "Enduring"],
    strengths: ["Dependability", "Perseverance", "Integrity", "Discipline"],
    challenges: ["Stubbornness", "Rigidity", "Difficulty expressing emotion"]
  }
  // Add remaining codes as needed
};

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

  const primaryData = CODE_DATA[user.primaryCode.toLowerCase()] || CODE_DATA["stillmind"];
  const secondaryData = user.secondaryCode ? CODE_DATA[user.secondaryCode.toLowerCase()] : null;
  const tertiaryData = user.tertiaryCode ? CODE_DATA[user.tertiaryCode.toLowerCase()] : null;

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

          <h1 className="text-4xl sm:text-5xl font-bold">
            Your Personality Archetypes
          </h1>

          <p className="text-lg text-white/70 max-w-2xl">
            These codes represent the core patterns that shape how you move through the world. 
            Your primary code is your dominant energy, while secondary and tertiary codes influence your approach.
          </p>
        </div>

        {/* Primary Code - Hero Section */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#C7B9FF]/10 to-transparent p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#C7B9FF]/5 via-transparent to-[#4F8CFF]/5" />
          
          <div className="relative z-10 space-y-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider text-[#C7B9FF]">Primary Code</span>
                <h2 className="text-5xl sm:text-6xl font-bold">{primaryData.name}</h2>
                <p className="text-xl text-white/70">{primaryData.tagline}</p>
              </div>
              <div className="text-6xl">{primaryData.emblem}</div>
            </div>

            <p className="text-lg text-white/80 leading-relaxed max-w-3xl">
              {primaryData.description}
            </p>

            {/* Core Traits */}
            <div className="space-y-3">
              <h3 className="text-sm uppercase tracking-wider text-white/60">Core Traits</h3>
              <div className="flex flex-wrap gap-2">
                {primaryData.traits.map((trait, i) => (
                  <span 
                    key={i}
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/80"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Strengths & Challenges Grid */}
            <div className="grid md:grid-cols-2 gap-6 pt-4">
              {/* Strengths */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#7CF5C8]" />
                  <h3 className="text-sm uppercase tracking-wider text-[#7CF5C8]">Strengths</h3>
                </div>
                <ul className="space-y-2">
                  {primaryData.strengths.map((strength, i) => (
                    <li key={i} className="text-white/70 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7CF5C8]" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenges */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-[#FFB5E8]" />
                  <h3 className="text-sm uppercase tracking-wider text-[#FFB5E8]">Growth Areas</h3>
                </div>
                <ul className="space-y-2">
                  {primaryData.challenges.map((challenge, i) => (
                    <li key={i} className="text-white/70 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFB5E8]" />
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary & Tertiary Codes */}
        {(secondaryData || tertiaryData) && (
          <div className="grid md:grid-cols-2 gap-6">
            {secondaryData && (
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
                <span className="text-xs uppercase tracking-wider text-[#4F8CFF]">Secondary Code</span>
                <div className="flex items-center gap-4 mt-4 mb-3">
                  <div className="text-4xl">{secondaryData.emblem}</div>
                  <div>
                    <h3 className="text-2xl font-bold">{secondaryData.name}</h3>
                    <p className="text-sm text-white/60">{secondaryData.tagline}</p>
                  </div>
                </div>
                <p className="text-white/70 text-sm">{secondaryData.description}</p>
              </div>
            )}

            {tertiaryData && (
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
                <span className="text-xs uppercase tracking-wider text-[#7CF5C8]">Tertiary Code</span>
                <div className="flex items-center gap-4 mt-4 mb-3">
                  <div className="text-4xl">{tertiaryData.emblem}</div>
                  <div>
                    <h3 className="text-2xl font-bold">{tertiaryData.name}</h3>
                    <p className="text-sm text-white/60">{tertiaryData.tagline}</p>
                  </div>
                </div>
                <p className="text-white/70 text-sm">{tertiaryData.description}</p>
              </div>
            )}
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
                    <span className="text-white/80 capitalize">{trait}</span>
                    <span className="text-[#4F8CFF] font-medium">{score}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#4F8CFF] to-[#7CF5C8] rounded-full transition-all"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA to Explore Compatibility */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#4F8CFF]/10 to-transparent p-8 text-center">
          <Users className="w-12 h-12 text-[#4F8CFF] mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Discover Your Matches</h3>
          <p className="text-white/70 mb-6 max-w-md mx-auto">
            See which codes you're most compatible with and understand the dynamics of your relationships.
          </p>
          <Link 
            href="/dashboard/compatibility"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4F8CFF] text-black font-medium hover:bg-[#4F8CFF]/90 transition-all"
          >
            View Compatibility Chart
          </Link>
        </div>
      </div>
    </div>
  );
}