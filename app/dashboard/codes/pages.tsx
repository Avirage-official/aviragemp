// app/dashboard/codes/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Sparkle, TrendingUp, Users, Lightbulb, ArrowLeft, Heart } from "lucide-react";
import Link from "next/link";

/* ============================================================================
   YOUR CODES PAGE — Full personality breakdown with all 20 codes
   Premium dark theme with comprehensive archetypal data
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
  "northstar": {
    name: "NorthStar",
    tagline: "Guiding Light Navigator",
    description: "You are the compass others turn to when lost. Your clarity of purpose and unwavering direction help others find their own path through uncertainty.",
    emblem: "⭐",
    traits: ["Purposeful", "Guiding", "Clear-minded"],
    strengths: ["Vision", "Leadership", "Strategic thinking", "Reliability"],
    challenges: ["Rigidity", "Impatience with ambiguity"]
  },
  "echoheart": {
    name: "EchoHeart",
    tagline: "Empathic Resonance Keeper",
    description: "You feel what others feel before they speak. Your emotional attunement allows you to hold space for deep healing and authentic connection.",
    emblem: "💫",
    traits: ["Empathetic", "Intuitive", "Compassionate"],
    strengths: ["Emotional intelligence", "Deep listening", "Healing presence", "Authenticity"],
    challenges: ["Emotional overwhelm", "Boundary issues"]
  },
  "sparkmaker": {
    name: "SparkMaker",
    tagline: "Creative Ignition Catalyst",
    description: "You bring ideas to life. Where others see limitations, you see possibilities. Your creative energy ignites innovation and inspires others to think differently.",
    emblem: "✨",
    traits: ["Creative", "Innovative", "Energetic"],
    strengths: ["Ideation", "Inspiration", "Quick thinking", "Enthusiasm"],
    challenges: ["Scattered focus", "Following through"]
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
  "neonmuse": {
    name: "NeonMuse",
    tagline: "Electric Inspiration Source",
    description: "You are pure creative electricity. Your vibrant energy and bold ideas light up every space. You inspire others to embrace their own unique expression.",
    emblem: "💡",
    traits: ["Expressive", "Bold", "Inspiring"],
    strengths: ["Creativity", "Charisma", "Originality", "Confidence"],
    challenges: ["Seeking validation", "Burnout"]
  },
  "tidekeeper": {
    name: "TideKeeper",
    tagline: "Rhythmic Flow Guardian",
    description: "You understand the natural ebb and flow of life. Your patience and timing allow you to work with life's rhythms rather than against them.",
    emblem: "🌊",
    traits: ["Patient", "Rhythmic", "Intuitive"],
    strengths: ["Timing", "Patience", "Flow state", "Adaptability"],
    challenges: ["Passivity", "Waiting too long"]
  },
  "ironreader": {
    name: "IronReader",
    tagline: "Pattern Recognition Master",
    description: "You see through complexity to underlying truth. Your analytical mind detects patterns invisible to others, giving you strategic advantage in any situation.",
    emblem: "🔍",
    traits: ["Analytical", "Perceptive", "Strategic"],
    strengths: ["Pattern recognition", "Logic", "Strategy", "Problem-solving"],
    challenges: ["Overthinking", "Emotional disconnection"]
  },
  "pathfinder": {
    name: "PathFinder",
    tagline: "Trailblazing Pioneer",
    description: "You forge new paths where none exist. Your courage to venture into the unknown creates opportunities for those who follow.",
    emblem: "🧭",
    traits: ["Adventurous", "Courageous", "Independent"],
    strengths: ["Innovation", "Courage", "Independence", "Exploration"],
    challenges: ["Loneliness", "Recklessness"]
  },
  "otherseer": {
    name: "OtherSeer",
    tagline: "Perspective Shifter",
    description: "You see what others cannot - the hidden dimensions, the alternative viewpoints, the possibilities beyond conventional thinking.",
    emblem: "👁️",
    traits: ["Perceptive", "Alternative", "Insightful"],
    strengths: ["Unique perspective", "Insight", "Innovation", "Questioning"],
    challenges: ["Feeling misunderstood", "Isolation"]
  },
  "lumenward": {
    name: "LumenWard",
    tagline: "Light Protection Keeper",
    description: "You safeguard what is precious - hope, truth, beauty. Your protective energy creates safe spaces for vulnerable growth.",
    emblem: "🛡️",
    traits: ["Protective", "Nurturing", "Principled"],
    strengths: ["Protection", "Loyalty", "Integrity", "Care"],
    challenges: ["Overprotectiveness", "Carrying others' burdens"]
  },
  "ashcaller": {
    name: "AshCaller",
    tagline: "Phoenix Transformation Agent",
    description: "You understand that growth comes through fire. You help others release what no longer serves and rise renewed from the ashes.",
    emblem: "🔥",
    traits: ["Transformative", "Intense", "Regenerative"],
    strengths: ["Transformation", "Resilience", "Intensity", "Catalyst for change"],
    challenges: ["Destructive tendencies", "Intensity"]
  },
  "horizonkin": {
    name: "HorizonKin",
    tagline: "Boundless Explorer",
    description: "You are drawn to the edge of the known world. Your expansive mindset and adventurous spirit constantly push boundaries.",
    emblem: "🌅",
    traits: ["Expansive", "Adventurous", "Curious"],
    strengths: ["Exploration", "Growth mindset", "Curiosity", "Openness"],
    challenges: ["Restlessness", "Lack of roots"]
  },
  "stonebound": {
    name: "StoneBound",
    tagline: "Unshakeable Foundation",
    description: "You are the rock others lean on. Your consistency, loyalty, and strength provide stability in turbulent times. You build slowly but what you build lasts.",
    emblem: "⛰️",
    traits: ["Reliable", "Loyal", "Enduring"],
    strengths: ["Dependability", "Perseverance", "Integrity", "Discipline"],
    challenges: ["Stubbornness", "Rigidity", "Difficulty expressing emotion"]
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
  "quietforge": {
    name: "QuietForge",
    tagline: "Silent Strength Builder",
    description: "Your power is in quiet persistence. While others seek attention, you build mastery through dedicated practice and unwavering commitment.",
    emblem: "🔨",
    traits: ["Persistent", "Dedicated", "Humble"],
    strengths: ["Mastery", "Dedication", "Humility", "Skill-building"],
    challenges: ["Being overlooked", "Lack of recognition"]
  },
  "brightsignal": {
    name: "BrightSignal",
    tagline: "Beacon of Possibility",
    description: "You radiate optimism and possibility. Your hopeful energy uplifts others and reminds them what's possible even in dark times.",
    emblem: "🌟",
    traits: ["Optimistic", "Uplifting", "Hopeful"],
    strengths: ["Positivity", "Inspiration", "Hope", "Energy"],
    challenges: ["Toxic positivity", "Denying darkness"]
  },
  "deepthread": {
    name: "DeepThread",
    tagline: "Connection Weaver",
    description: "You see the invisible threads connecting all things. Your ability to recognize and honor these connections creates profound meaning and belonging.",
    emblem: "🕸️",
    traits: ["Connective", "Integrative", "Holistic"],
    strengths: ["Seeing connections", "Integration", "Systems thinking", "Meaning-making"],
    challenges: ["Complexity overwhelm", "Difficulty simplifying"]
  },
  "mythwalker": {
    name: "MythWalker",
    tagline: "Story Keeper Sage",
    description: "You understand that we are all living myths. Your ability to see life as story helps others find meaning in their own journey.",
    emblem: "📖",
    traits: ["Narrative", "Wise", "Meaning-seeking"],
    strengths: ["Storytelling", "Wisdom", "Meaning-making", "Perspective"],
    challenges: ["Living in metaphor", "Abstracting reality"]
  }
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

  const primaryData = CODE_DATA[user.primaryCode.toLowerCase()] || {
    name: user.primaryCode,
    tagline: "Your Unique Archetype",
    description: "Your primary code represents your dominant archetypal energy.",
    emblem: "✨",
    traits: ["Unique", "Authentic", "Individual"],
    strengths: ["Your authentic self"],
    challenges: ["Discovering your full potential"]
  };
  
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

          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Your Personality Archetypes
          </h1>

          <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
            These codes represent the core patterns that shape how you move through the world. 
            Your primary code is your dominant energy, while secondary and tertiary codes influence your approach.
          </p>
        </div>

        {/* Primary Code - Hero Section */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#C7B9FF]/10 to-transparent p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#C7B9FF]/5 via-transparent to-[#4F8CFF]/5" />
          
          <div className="relative z-10 space-y-6">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-wider text-[#C7B9FF] font-semibold">Primary Code</span>
                <h2 className="text-5xl sm:text-6xl font-bold">{primaryData.name}</h2>
                <p className="text-xl text-white/70">{primaryData.tagline}</p>
              </div>
              <div className="text-6xl" aria-label="Code emblem">{primaryData.emblem}</div>
            </div>

            <p className="text-lg text-white/80 leading-relaxed max-w-3xl">
              {primaryData.description}
            </p>

            {/* Core Traits */}
            <div className="space-y-3 pt-4">
              <h3 className="text-sm uppercase tracking-wider text-white/60 font-semibold">Core Traits</h3>
              <div className="flex flex-wrap gap-2">
                {primaryData.traits.map((trait, i) => (
                  <span 
                    key={i}
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/80 font-medium"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Strengths & Challenges Grid */}
            <div className="grid md:grid-cols-2 gap-6 pt-6">
              {/* Strengths */}
              <div className="space-y-4 rounded-2xl bg-[#7CF5C8]/5 border border-[#7CF5C8]/10 p-6">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#7CF5C8]" />
                  <h3 className="text-sm uppercase tracking-wider text-[#7CF5C8] font-semibold">Strengths</h3>
                </div>
                <ul className="space-y-2">
                  {primaryData.strengths.map((strength, i) => (
                    <li key={i} className="text-white/80 flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7CF5C8] mt-2 flex-shrink-0" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenges */}
              <div className="space-y-4 rounded-2xl bg-[#FFB5E8]/5 border border-[#FFB5E8]/10 p-6">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-[#FFB5E8]" />
                  <h3 className="text-sm uppercase tracking-wider text-[#FFB5E8] font-semibold">Growth Areas</h3>
                </div>
                <ul className="space-y-2">
                  {primaryData.challenges.map((challenge, i) => (
                    <li key={i} className="text-white/80 flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFB5E8] mt-2 flex-shrink-0" />
                      <span>{challenge}</span>
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
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.03] transition-all">
                <span className="text-xs uppercase tracking-wider text-[#4F8CFF] font-semibold">Secondary Code</span>
                <div className="flex items-center gap-4 mt-4 mb-3">
                  <div className="text-4xl">{secondaryData.emblem}</div>
                  <div>
                    <h3 className="text-2xl font-bold">{secondaryData.name}</h3>
                    <p className="text-sm text-white/60">{secondaryData.tagline}</p>
                  </div>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{secondaryData.description}</p>
              </div>
            )}

            {tertiaryData && (
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.03] transition-all">
                <span className="text-xs uppercase tracking-wider text-[#7CF5C8] font-semibold">Tertiary Code</span>
                <div className="flex items-center gap-4 mt-4 mb-3">
                  <div className="text-4xl">{tertiaryData.emblem}</div>
                  <div>
                    <h3 className="text-2xl font-bold">{tertiaryData.name}</h3>
                    <p className="text-sm text-white/60">{tertiaryData.tagline}</p>
                  </div>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{tertiaryData.description}</p>
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