"use client";

import { Sparkles } from "lucide-react";

const CODE_DATA: Record<string, {
  name: string;
  tagline: string;
  description: string;
  emblem: string;
  traits: string[];
}> = {
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
  color 
}: { 
  code: string; 
  label: string;
  color: "primary" | "secondary" | "tertiary";
}) {
  const data = CODE_DATA[code];
  
  if (!data) return null;

  const colorClasses = {
    primary: {
      border: "border-[#4F8CFF]/30",
      glow: "from-[#4F8CFF]/10 via-[#C7B9FF]/10 to-[#7CF5C8]/10",
      badge: "bg-[#4F8CFF]/10 border-[#4F8CFF]/30 text-[#4F8CFF]",
      emblem: "from-[#4F8CFF]/20 to-[#7CF5C8]/20 border-[#4F8CFF]/30"
    },
    secondary: {
      border: "border-[#C7B9FF]/30",
      glow: "from-[#C7B9FF]/10 to-[#7CF5C8]/10",
      badge: "bg-[#C7B9FF]/10 border-[#C7B9FF]/30 text-[#C7B9FF]",
      emblem: "from-[#C7B9FF]/20 to-[#4F8CFF]/20 border-[#C7B9FF]/30"
    },
    tertiary: {
      border: "border-[#7CF5C8]/30",
      glow: "from-[#7CF5C8]/10 to-[#4F8CFF]/10",
      badge: "bg-[#7CF5C8]/10 border-[#7CF5C8]/30 text-[#7CF5C8]",
      emblem: "from-[#7CF5C8]/20 to-[#C7B9FF]/20 border-[#7CF5C8]/30"
    }
  };

  const classes = colorClasses[color];

  return (
    <div className="relative group">
      {/* Glow effect */}
      <div className={`absolute -inset-[1px] rounded-[28px] bg-gradient-to-br ${classes.glow} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700`} />
      
      {/* Card */}
      <div className={`relative rounded-[28px] bg-white/[0.03] backdrop-blur-2xl border ${classes.border} p-6 transition-all duration-300 group-hover:bg-white/[0.05]`}>
        <div className="flex items-start justify-between mb-4">
          {/* Emblem */}
          <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${classes.emblem} border flex items-center justify-center text-3xl`}>
            {data.emblem}
          </div>
          
          {/* Label badge */}
          <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border ${classes.badge} font-semibold`}>
            {label}
          </span>
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-[#FAFAFA] mb-1">{data.name}</h3>
        <p className="text-sm text-[#FAFAFA]/50 mb-3">{data.tagline}</p>
        <p className="text-sm text-[#FAFAFA]/70 leading-relaxed mb-4">{data.description}</p>
        
        {/* Traits */}
        <div className="flex flex-wrap gap-2">
          {data.traits.map(trait => (
            <span 
              key={trait} 
              className="text-[10px] px-2 py-1 rounded-full bg-[#FAFAFA]/5 text-[#FAFAFA]/60 border border-[#FAFAFA]/10"
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
  tertiaryCode 
}: { 
  primaryCode: string;
  secondaryCode?: string | null;
  tertiaryCode?: string | null;
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#4F8CFF]/10 via-[#C7B9FF]/10 to-[#7CF5C8]/10 border border-[#FAFAFA]/10 mb-4">
          <Sparkles className="h-4 w-4 text-[#4F8CFF]" />
          <span className="text-sm font-medium text-[#FAFAFA]/80">Your Mythical Identity</span>
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#4F8CFF] via-[#C7B9FF] to-[#7CF5C8] bg-clip-text text-transparent">
          Your Code
        </h2>
        <p className="text-[#FAFAFA]/50 text-sm max-w-2xl mx-auto">
          Your personality expressed through mythical archetypes
        </p>
      </div>

      {/* Primary Code - Full width */}
      <CodeCard code={primaryCode} label="Primary" color="primary" />

      {/* Secondary & Tertiary - Side by side */}
      {(secondaryCode || tertiaryCode) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {secondaryCode && (
            <CodeCard code={secondaryCode} label="Secondary" color="secondary" />
          )}
          {tertiaryCode && (
            <CodeCard code={tertiaryCode} label="Tertiary" color="tertiary" />
          )}
        </div>
      )}
    </div>
  );
}