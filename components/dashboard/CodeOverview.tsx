"use client";

import { Sparkles } from "lucide-react";

const CODE_DATA: Record<
  string,
  {
    name: string;
    tagline: string;
    description: string;
    emblem: string;
    traits: string[];
  }
> = {
   "khoisan": {
    name: "Earthlistener",
    tagline: "Grounded Observer",
    description: "Deeply connected to nature and present-moment awareness. You notice subtle shifts in energy and environment that others miss.",
    emblem: "🌿",
    traits: ["Observant", "Grounded", "Present"]
  },
  "kayori": {
    name: "Fireweaver",
    tagline: "Energetic Catalyst",
    description: "High energy and passionate about transformation. You energize communities through emotion, rhythm, and shared meaning.",
    emblem: "🔥",
    traits: ["Passionate", "Energetic", "Transformative"]
  },
  "sahen": {
    name: "HorizonWalker",
    tagline: "Enduring Explorer",
    description: "Built on endurance and self-reliance. You thrive on long journeys and are steady when others rush.",
    emblem: "🌅",
    traits: ["Enduring", "Self-reliant", "Steady"]
  },
  "enzuka": {
    name: "Shieldbearer",
    tagline: "Protective Guardian",
    description: "Natural protector who creates safety for others. You defend what matters and build secure foundations.",
    emblem: "🛡️",
    traits: ["Protective", "Loyal", "Defensive"]
  },
  "siyuane": {
    name: "Kitsune",
    tagline: "Clever Adapter",
    description: "Quick-witted and adaptable. You navigate complexity with playful intelligence and strategic thinking.",
    emblem: "🦊",
    traits: ["Clever", "Playful", "Adaptable"]
  },
  "jaejin": {
    name: "Harmonist",
    tagline: "Peaceful Mediator",
    description: "Seek balance and harmony in all things. You mediate conflicts and find middle ground between opposing forces.",
    emblem: "⚖️",
    traits: ["Balanced", "Peaceful", "Mediating"]
  },
  "namsea": {
    name: "Flowbinder",
    tagline: "Fluid Navigator",
    description: "Adapt fluidly to change and prioritize relational balance. You move with circumstances rather than against them.",
    emblem: "🌊",
    traits: ["Fluid", "Flexible", "Relational"]
  },
  "shokunin": {
    name: "BladeSmith",
    tagline: "Master Craftsperson",
    description: "Devoted to precision, discipline, and mastery of craft. Quality is a moral standard, not just a feature.",
    emblem: "⚔️",
    traits: ["Precise", "Disciplined", "Masterful"]
  },
  "khoruun": {
    name: "SkyRider",
    tagline: "Free Spirit",
    description: "Value freedom, independence, and wide-horizon thinking. You need space, autonomy, and room to soar.",
    emblem: "🦅",
    traits: ["Free", "Independent", "Visionary"]
  },
  "lhumir": {
    name: "StillMind",
    tagline: "Inner Clarity",
    description: "Deep contemplation and inner clarity. You seek meaning through reflection and philosophical inquiry.",
    emblem: "🏔️",
    traits: ["Contemplative", "Introspective", "Meaning-seeking"]
  },
  "yatevar": {
    name: "CycleKeeper",
    tagline: "Ritual Guardian",
    description: "Grounded in cyclical thinking and ritual precision. You operate across long arcs of time with symbolic depth.",
    emblem: "🌙",
    traits: ["Cyclical", "Ritualistic", "Timeless"]
  },
  "tahiri": {
    name: "HeartBearer",
    tagline: "Emotional Anchor",
    description: "Defined by warmth, hospitality, and emotional generosity. You lead with care, honor, and deep connection.",
    emblem: "❤️",
    traits: ["Warm", "Caring", "Generous"]
  },
  "karayni": {
    name: "AncestorRoot",
    tagline: "Heritage Keeper",
    description: "Connected to tradition and ancestral wisdom. You honor the past while building bridges to the future.",
    emblem: "🌳",
    traits: ["Traditional", "Rooted", "Wise"]
  },
  "wohaka": {
    name: "SonglineKeeper",
    tagline: "Story Weaver",
    description: "Preserve and share cultural stories. You maintain collective memory through narrative and oral tradition.",
    emblem: "📖",
    traits: ["Storytelling", "Preserving", "Cultural"]
  },
  "tjukari": {
    name: "Dreampath Navigator",
    tagline: "Intuitive Voyager",
    description: "Navigate through intuition and vision. You walk the dream paths and trust spiritual guidance.",
    emblem: "✨",
    traits: ["Intuitive", "Visionary", "Spiritual"]
  },
  "kinmora": {
    name: "TimeArchitect",
    tagline: "Strategic Planner",
    description: "Master of long-term vision and strategic planning. You build frameworks that stand the test of time.",
    emblem: "⏳",
    traits: ["Strategic", "Planning", "Structured"]
  },
  "siljoa": {
    name: "FrostSentinel",
    tagline: "Resilient Watcher",
    description: "Embody resilience, endurance, and clarity. You maintain perspective and see through illusions.",
    emblem: "❄️",
    traits: ["Resilient", "Clear", "Enduring"]
  },
  "skenari": {
    name: "FutureGuardian",
    tagline: "Forward Protector",
    description: "Think ahead to protect what matters. You anticipate needs and prepare for what's coming.",
    emblem: "🔮",
    traits: ["Forward-thinking", "Protective", "Prepared"]
  },
  "ashkara": {
    name: "TruthForger",
    tagline: "Authentic Seeker",
    description: "Committed to truth and authenticity. You cut through illusion to reveal what's real.",
    emblem: "⚡",
    traits: ["Honest", "Direct", "Authentic"]
  },
  "alethir": {
    name: "Seeker",
    tagline: "Eternal Student",
    description: "Forever learning and questioning. You pursue knowledge and understanding with endless curiosity.",
    emblem: "📚",
    traits: ["Curious", "Analytical", "Knowledge-seeking"]
  }
};

function CodeCard({
  code,
  label,
  accent,
}: {
  code: string;
  label: "Primary" | "Secondary" | "Tertiary";
  accent: "blue" | "lavender" | "mint";
}) {
  const data = CODE_DATA[code];
  if (!data) return null;

  const ACCENT = {
    blue: {
      ring: "ring-[#4F8CFF]/30",
      bg: "from-[#4F8CFF]/10 to-[#4F8CFF]/5",
      badge: "bg-[#4F8CFF]/10 text-[#4F8CFF]",
    },
    lavender: {
      ring: "ring-[#C7B9FF]/30",
      bg: "from-[#C7B9FF]/10 to-[#C7B9FF]/5",
      badge: "bg-[#C7B9FF]/10 text-[#6B5FD2]",
    },
    mint: {
      ring: "ring-[#7CF5C8]/30",
      bg: "from-[#7CF5C8]/10 to-[#7CF5C8]/5",
      badge: "bg-[#7CF5C8]/10 text-[#0E7C63]",
    },
  }[accent];

  return (
    <div className="relative rounded-[28px] bg-white ring-1 ring-black/5 shadow-sm transition hover:shadow-md">
      <div
        className={`absolute inset-0 rounded-[28px] bg-gradient-to-br ${ACCENT.bg}`}
      />
      <div className="relative p-7">
        <div className="flex items-start justify-between mb-5">
          <div className="w-14 h-14 rounded-2xl bg-white ring-1 ring-black/10 flex items-center justify-center text-3xl">
            {data.emblem}
          </div>
          <span
            className={`text-[11px] font-semibold uppercase tracking-wide px-3 py-1 rounded-full ${ACCENT.badge}`}
          >
            {label}
          </span>
        </div>

        <h3 className="text-2xl font-semibold text-black mb-1">
          {data.name}
        </h3>
        <p className="text-sm text-black/50 mb-3">{data.tagline}</p>
        <p className="text-sm text-black/70 leading-relaxed mb-4">
          {data.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {data.traits.map((trait) => (
            <span
              key={trait}
              className="text-[11px] px-3 py-1 rounded-full bg-black/5 text-black/70"
            >
              {trait}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CodeOverview({
  primaryCode,
  secondaryCode,
  tertiaryCode,
}: {
  primaryCode: string;
  secondaryCode?: string | null;
  tertiaryCode?: string | null;
}) {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 text-black">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Your Mythical Identity</span>
        </div>
        <h2 className="text-4xl font-semibold text-black">Your Code</h2>
        <p className="text-black/50 max-w-xl mx-auto">
          Your personality expressed through symbolic archetypes
        </p>
      </div>

      {/* Primary */}
      <CodeCard code={primaryCode} label="Primary" accent="blue" />

      {/* Secondary / Tertiary */}
      {(secondaryCode || tertiaryCode) && (
        <div className="grid md:grid-cols-2 gap-8">
          {secondaryCode && (
            <CodeCard
              code={secondaryCode}
              label="Secondary"
              accent="lavender"
            />
          )}
          {tertiaryCode && (
            <CodeCard
              code={tertiaryCode}
              label="Tertiary"
              accent="mint"
            />
          )}
        </div>
      )}
    </div>
  );
}
