// app/dashboard/compatibility/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { MYTHICAL_CODES } from "@/lib/mythicalCodesData";
import { ArrowLeft, Heart, Users, Sparkle } from "lucide-react";
import Link from "next/link";

/* ============================================================================
   COMPATIBILITY PAGE — Code matching system
   Shows which codes work well together based on traits
   ============================================================================ */

// Simplified compatibility based on general archetype patterns
const COMPATIBILITY: Record<string, {
  high: string[];
  balanced: string[];
  growth: string[];
}> = {
  khoisan: {
    high: ["lhumir", "tjukari", "wohaka"],
    balanced: ["tahiri", "karayni", "namsea"],
    growth: ["kayori", "siyuane", "kinmora"]
  },
  kayori: {
    high: ["sahen", "ashkara", "kinmora"],
    balanced: ["skenari", "enzuka", "shokunin"],
    growth: ["lhumir", "yatevar", "khoisan"]
  },
  sahen: {
    high: ["kayori", "khoruun", "skenari"],
    balanced: ["tjukari", "alethir", "ashkara"],
    growth: ["yatevar", "wohaka", "jaejin"]
  },
  enzuka: {
    high: ["karayni", "wohaka", "tahiri"],
    balanced: ["shokunin", "siljoa", "lhumir"],
    growth: ["kayori", "siyuane", "namsea"]
  },
  siyuane: {
    high: ["alethir", "namsea", "skenari"],
    balanced: ["khoruun", "ashkara", "tjukari"],
    growth: ["enzuka", "yatevar", "karayni"]
  },
  jaejin: {
    high: ["namsea", "tahiri", "wohaka"],
    balanced: ["lhumir", "tjukari", "khoisan"],
    growth: ["kayori", "ashkara", "kinmora"]
  },
  namsea: {
    high: ["siyuane", "jaejin", "tjukari"],
    balanced: ["khoisan", "alethir", "tahiri"],
    growth: ["shokunin", "enzuka", "kinmora"]
  },
  shokunin: {
    high: ["kinmora", "siljoa", "enzuka"],
    balanced: ["lhumir", "yatevar", "karayni"],
    growth: ["siyuane", "namsea", "khoruun"]
  },
  khoruun: {
    high: ["sahen", "tjukari", "skenari"],
    balanced: ["siyuane", "alethir", "kayori"],
    growth: ["jaejin", "tahiri", "wohaka"]
  },
  lhumir: {
    high: ["khoisan", "yatevar", "tjukari"],
    balanced: ["jaejin", "shokunin", "alethir"],
    growth: ["kayori", "khoruun", "skenari"]
  },
  yatevar: {
    high: ["lhumir", "wohaka", "karayni"],
    balanced: ["shokunin", "siljoa", "tjukari"],
    growth: ["kayori", "sahen", "siyuane"]
  },
  tahiri: {
    high: ["jaejin", "karayni", "enzuka"],
    balanced: ["khoisan", "wohaka", "namsea"],
    growth: ["kinmora", "ashkara", "siljoa"]
  },
  karayni: {
    high: ["tahiri", "yatevar", "wohaka"],
    balanced: ["enzuka", "shokunin", "lhumir"],
    growth: ["siyuane", "skenari", "alethir"]
  },
  wohaka: {
    high: ["karayni", "yatevar", "khoisan"],
    balanced: ["tahiri", "jaejin", "enzuka"],
    growth: ["kayori", "kinmora", "ashkara"]
  },
  tjukari: {
    high: ["lhumir", "khoisan", "namsea"],
    balanced: ["khoruun", "sahen", "alethir"],
    growth: ["shokunin", "kinmora", "siljoa"]
  },
  kinmora: {
    high: ["shokunin", "skenari", "siljoa"],
    balanced: ["ashkara", "kayori", "enzuka"],
    growth: ["tjukari", "jaejin", "wohaka"]
  },
  siljoa: {
    high: ["kinmora", "shokunin", "ashkara"],
    balanced: ["enzuka", "yatevar", "alethir"],
    growth: ["tahiri", "namsea", "tjukari"]
  },
  skenari: {
    high: ["kinmora", "sahen", "khoruun"],
    balanced: ["kayori", "siyuane", "ashkara"],
    growth: ["lhumir", "yatevar", "wohaka"]
  },
  ashkara: {
    high: ["kayori", "siljoa", "kinmora"],
    balanced: ["sahen", "skenari", "alethir"],
    growth: ["jaejin", "tahiri", "khoisan"]
  },
  alethir: {
    high: ["siyuane", "tjukari", "namsea"],
    balanced: ["sahen", "khoruun", "lhumir"],
    growth: ["karayni", "enzuka", "shokunin"]
  }
};

const CODE_COLORS: Record<string, string> = {
  khoisan: "emerald",
  kayori: "orange",
  sahen: "sky",
  enzuka: "amber",
  siyuane: "purple",
  jaejin: "rose",
  namsea: "cyan",
  shokunin: "slate",
  khoruun: "indigo",
  lhumir: "gray",
  yatevar: "violet",
  tahiri: "red",
  karayni: "yellow",
  wohaka: "teal",
  tjukari: "blue",
  kinmora: "zinc",
  siljoa: "cyan",
  skenari: "lime",
  ashkara: "orange",
  alethir: "purple"
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
    },
  });

  if (!user || !user.primaryCode) {
    redirect("/onboarding");
  }

  const userCodeKey = user.primaryCode.toLowerCase();
  const userCodeData = MYTHICAL_CODES.find(c => c.key === userCodeKey);
  const compatibility = COMPATIBILITY[userCodeKey] || {
    high: [],
    balanced: [],
    growth: []
  };

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
            <span className="text-sm uppercase tracking-wider text-white/60">Code Compatibility</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Your Compatibility Matches
          </h1>

          <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
            Discover which codes naturally align with yours. Compatibility isn't about perfection—it's about understanding different energies.
          </p>
        </div>

        {/* Your Code Badge */}
        {userCodeData && (
          <div className="rounded-3xl border border-[#C7B9FF]/30 bg-gradient-to-br from-[#C7B9FF]/10 to-transparent p-8 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10">
              <Users className="w-5 h-5 text-[#C7B9FF]" />
              <div className="text-left">
                <p className="text-xs text-white/50">Your Code</p>
                <p className="text-lg font-bold">{userCodeData.label}</p>
              </div>
            </div>
          </div>
        )}

        {/* High Compatibility */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Sparkle className="w-5 h-5 text-[#7CF5C8]" />
            <h2 className="text-2xl font-bold">High Compatibility</h2>
          </div>
          <p className="text-white/60">These codes naturally complement your energy and values.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {compatibility.high.map((codeKey) => {
              const code = MYTHICAL_CODES.find(c => c.key === codeKey);
              if (!code) return null;
              return (
                <div 
                  key={code.key}
                  className="rounded-2xl border border-[#7CF5C8]/20 bg-[#7CF5C8]/5 p-6 hover:bg-[#7CF5C8]/10 transition-all"
                >
                  <h3 className="text-lg font-bold text-white mb-1">{code.label}</h3>
                  <p className="text-sm text-white/70">{code.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Balanced Dynamics */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-[#4F8CFF]" />
            <h2 className="text-2xl font-bold">Balanced Dynamics</h2>
          </div>
          <p className="text-white/60">These codes bring different but complementary perspectives.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {compatibility.balanced.map((codeKey) => {
              const code = MYTHICAL_CODES.find(c => c.key === codeKey);
              if (!code) return null;
              return (
                <div 
                  key={code.key}
                  className="rounded-2xl border border-[#4F8CFF]/20 bg-[#4F8CFF]/5 p-6 hover:bg-[#4F8CFF]/10 transition-all"
                >
                  <h3 className="text-lg font-bold text-white mb-1">{code.label}</h3>
                  <p className="text-sm text-white/70">{code.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Growth Relationships */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Sparkle className="w-5 h-5 text-[#FFB5E8]" />
            <h2 className="text-2xl font-bold">Growth Relationships</h2>
          </div>
          <p className="text-white/60">These codes challenge you in healthy ways and expand your perspective.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {compatibility.growth.map((codeKey) => {
              const code = MYTHICAL_CODES.find(c => c.key === codeKey);
              if (!code) return null;
              return (
                <div 
                  key={code.key}
                  className="rounded-2xl border border-[#FFB5E8]/20 bg-[#FFB5E8]/5 p-6 hover:bg-[#FFB5E8]/10 transition-all"
                >
                  <h3 className="text-lg font-bold text-white mb-1">{code.label}</h3>
                  <p className="text-sm text-white/70">{code.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Important Note */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
          <h3 className="text-lg font-bold mb-3">Remember</h3>
          <p className="text-white/70 leading-relaxed">
            Compatibility is a guide, not a rulebook. Any two codes can form deep, meaningful connections with awareness and effort. 
            These groupings simply highlight natural affinities and potential growth areas.
          </p>
        </div>
      </div>
    </div>
  );
}