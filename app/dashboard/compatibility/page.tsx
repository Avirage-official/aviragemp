// app/dashboard/compatibility/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Heart, Sparkles, TrendingUp, ArrowLeft, Users } from "lucide-react";
import Link from "next/link";

/* ============================================================================
   COMPATIBILITY PAGE — Who you vibe with
   Dark theme, visual matching system
   ============================================================================ */

const COMPATIBILITY_MATRIX: Record<string, {
  high: { code: string; reason: string }[];
  medium: { code: string; reason: string }[];
  growth: { code: string; reason: string }[];
}> = {
  "stillmind": {
    high: [
      { code: "earthlistener", reason: "Both value depth and grounded wisdom" },
      { code: "waveborn", reason: "Complementary introspection and emotional flow" },
      { code: "stonebound", reason: "Shared appreciation for stability and meaning" }
    ],
    medium: [
      { code: "skyweaver", reason: "Balance between contemplation and vision" },
      { code: "fireweaver", reason: "Stillness meets transformative energy" }
    ],
    growth: [
      { code: "stillmind", reason: "Too much introspection, need external energy" }
    ]
  },
  "earthlistener": {
    high: [
      { code: "stillmind", reason: "Shared grounded approach to life" },
      { code: "stonebound", reason: "Both value reliability and consistency" },
      { code: "waveborn", reason: "Earth nurtures water's flow" }
    ],
    medium: [
      { code: "skyweaver", reason: "Grounding for visionary ideas" },
      { code: "fireweaver", reason: "Earth tempers fire's intensity" }
    ],
    growth: [
      { code: "earthlistener", reason: "May lack spontaneity together" }
    ]
  },
  "fireweaver": {
    high: [
      { code: "skyweaver", reason: "Fire ignites vision into action" },
      { code: "waveborn", reason: "Fire and water create steam—powerful transformation" },
      { code: "stonebound", reason: "Fire forges stone into something new" }
    ],
    medium: [
      { code: "stillmind", reason: "Fire disrupts stillness—growth through contrast" },
      { code: "earthlistener", reason: "Passionate energy meets grounded wisdom" }
    ],
    growth: [
      { code: "fireweaver", reason: "Too much intensity, risk of burnout" }
    ]
  },
  "skyweaver": {
    high: [
      { code: "fireweaver", reason: "Vision meets execution" },
      { code: "waveborn", reason: "Sky and water create endless horizons" },
      { code: "earthlistener", reason: "Vision grounded in practicality" }
    ],
    medium: [
      { code: "stillmind", reason: "Contemplation deepens vision" },
      { code: "stonebound", reason: "Sky needs foundation to build upon" }
    ],
    growth: [
      { code: "skyweaver", reason: "Lost in ideas without grounding" }
    ]
  },
  "waveborn": {
    high: [
      { code: "earthlistener", reason: "Water nourishes earth" },
      { code: "skyweaver", reason: "Flow meets infinite possibility" },
      { code: "stillmind", reason: "Emotional depth meets inner clarity" }
    ],
    medium: [
      { code: "fireweaver", reason: "Water cools fire's intensity" },
      { code: "stonebound", reason: "Water shapes stone over time" }
    ],
    growth: [
      { code: "waveborn", reason: "Too much emotion without boundaries" }
    ]
  },
  "stonebound": {
    high: [
      { code: "earthlistener", reason: "Both provide stability and foundation" },
      { code: "stillmind", reason: "Strength meets wisdom" },
      { code: "fireweaver", reason: "Stone forged by fire becomes stronger" }
    ],
    medium: [
      { code: "skyweaver", reason: "Foundation for visionary ideas" },
      { code: "waveborn", reason: "Stability for emotional flow" }
    ],
    growth: [
      { code: "stonebound", reason: "May become too rigid together" }
    ]
  }
};

const CODE_COLORS: Record<string, string> = {
  "stillmind": "#C7B9FF",
  "earthlistener": "#7CF5C8",
  "fireweaver": "#FF6B6B",
  "skyweaver": "#4F8CFF",
  "waveborn": "#4ECDC4",
  "stonebound": "#95A99C"
};

const CODE_NAMES: Record<string, string> = {
  "stillmind": "StillMind",
  "earthlistener": "EarthListener",
  "fireweaver": "FireWeaver",
  "skyweaver": "SkyWeaver",
  "waveborn": "WaveBorn",
  "stonebound": "StoneBound"
};

export default async function CompatibilityPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: {
      primaryCode: true,
      name: true,
      username: true,
    },
  });

  if (!user || !user.primaryCode) {
    redirect("/onboarding");
  }

  const userCodeKey = user.primaryCode.toLowerCase();
  const compatibility = COMPATIBILITY_MATRIX[userCodeKey] || COMPATIBILITY_MATRIX["stillmind"];
  const userColor = CODE_COLORS[userCodeKey] || CODE_COLORS["stillmind"];

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
            <Heart className="w-6 h-6 text-[#FFB5E8]" />
            <span className="text-sm uppercase tracking-wider text-white/60">Compatibility</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold">
            Your Matches
          </h1>

          <p className="text-lg text-white/70 max-w-2xl">
            Understanding compatibility isn't about finding someone identical to you. 
            It's about complementary energies, shared values, and growth potential.
          </p>
        </div>

        {/* Your Code Badge */}
        <div 
          className="rounded-3xl border p-6 inline-flex items-center gap-4"
          style={{ 
            borderColor: `${userColor}40`,
            backgroundColor: `${userColor}10`
          }}
        >
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
            style={{ backgroundColor: `${userColor}20` }}
          >
            {(user.name || user.username || "?")[0].toUpperCase()}
          </div>
          <div>
            <p className="text-sm text-white/60">Your Primary Code</p>
            <p className="text-2xl font-bold" style={{ color: userColor }}>
              {CODE_NAMES[userCodeKey] || user.primaryCode}
            </p>
          </div>
        </div>

        {/* High Compatibility */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#7CF5C8]" />
            <h2 className="text-2xl font-bold">High Compatibility</h2>
          </div>
          
          <p className="text-white/60">
            These codes naturally harmonize with yours. Relationships feel easy, understood, and mutually supportive.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {compatibility.high.map((match, i) => {
              const matchColor = CODE_COLORS[match.code] || "#4F8CFF";
              return (
                <div 
                  key={i}
                  className="rounded-3xl border p-6 hover:scale-105 transition-transform"
                  style={{ 
                    borderColor: `${matchColor}40`,
                    backgroundColor: `${matchColor}05`
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                      style={{ 
                        backgroundColor: `${matchColor}20`,
                        color: matchColor
                      }}
                    >
                      {CODE_NAMES[match.code]?.[0] || "?"}
                    </div>
                    <h3 className="font-bold" style={{ color: matchColor }}>
                      {CODE_NAMES[match.code] || match.code}
                    </h3>
                  </div>
                  <p className="text-sm text-white/70">{match.reason}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Medium Compatibility */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-[#FFD97D]" />
            <h2 className="text-2xl font-bold">Balanced Dynamics</h2>
          </div>
          
          <p className="text-white/60">
            These connections require more intentionality but offer rich learning opportunities. You complement each other's blind spots.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {compatibility.medium.map((match, i) => {
              const matchColor = CODE_COLORS[match.code] || "#FFD97D";
              return (
                <div 
                  key={i}
                  className="rounded-3xl border border-white/10 bg-white/[0.02] p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                      style={{ 
                        backgroundColor: `${matchColor}20`,
                        color: matchColor
                      }}
                    >
                      {CODE_NAMES[match.code]?.[0] || "?"}
                    </div>
                    <h3 className="font-bold" style={{ color: matchColor }}>
                      {CODE_NAMES[match.code] || match.code}
                    </h3>
                  </div>
                  <p className="text-sm text-white/70">{match.reason}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Growth Relationships */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-[#FFB5E8]" />
            <h2 className="text-2xl font-bold">Growth Relationships</h2>
          </div>
          
          <p className="text-white/60">
            These pairings might create friction but also catalyze deep personal growth. Approach with awareness and communication.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {compatibility.growth.map((match, i) => {
              const matchColor = CODE_COLORS[match.code] || "#FFB5E8";
              return (
                <div 
                  key={i}
                  className="rounded-3xl border border-white/10 bg-white/[0.02] p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                      style={{ 
                        backgroundColor: `${matchColor}20`,
                        color: matchColor
                      }}
                    >
                      {CODE_NAMES[match.code]?.[0] || "?"}
                    </div>
                    <h3 className="font-bold" style={{ color: matchColor }}>
                      {CODE_NAMES[match.code] || match.code}
                    </h3>
                  </div>
                  <p className="text-sm text-white/70">{match.reason}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Important Note */}
        <div className="rounded-3xl border border-[#4F8CFF]/30 bg-[#4F8CFF]/5 p-8">
          <h3 className="text-xl font-bold mb-3 text-[#4F8CFF]">Remember</h3>
          <p className="text-white/80">
            Compatibility is a guide, not a rulebook. Real relationships are built on communication, 
            shared values, and mutual growth—not just archetypal alignment. Use this as a lens to 
            understand dynamics, not to limit who you connect with.
          </p>
        </div>
      </div>
    </div>
  );
}