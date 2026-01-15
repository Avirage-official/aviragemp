"use client";

import { Heart } from "lucide-react";

const COMPATIBILITY: Record<string, {
  high: string[];
  medium: string[];
  low: string[];
}> = {
  "khoisan": {
    high: ["yatevar", "karayni", "jaejin"],
    medium: ["lhumir", "sahen", "namsea"],
    low: ["kayori", "skenari"]
  },
  "kayori": {
    high: ["tahiri", "wohaka", "siyuane"],
    medium: ["tjukari", "sahen", "enzuka"],
    low: ["lhumir", "khoisan"]
  },
  "sahen": {
    high: ["khoruun", "alethir", "skenari"],
    medium: ["kayori", "tjukari", "khoisan"],
    low: ["tahiri", "jaejin"]
  },
  "enzuka": {
    high: ["tahiri", "karayni", "jaejin"],
    medium: ["kayori", "shokunin", "wohaka"],
    low: ["khoruun", "siyuane"]
  },
  "siyuane": {
    high: ["kayori", "namsea", "tjukari"],
    medium: ["alethir", "wohaka", "sahen"],
    low: ["shokunin", "enzuka"]
  },
  "jaejin": {
    high: ["khoisan", "tahiri", "namsea"],
    medium: ["enzuka", "karayni", "lhumir"],
    low: ["ashkara", "kayori"]
  },
  "namsea": {
    high: ["jaejin", "siyuane", "tjukari"],
    medium: ["khoisan", "wohaka", "tahiri"],
    low: ["shokunin", "kinmora"]
  },
  "shokunin": {
    high: ["kinmora", "ashkara", "siljoa"],
    medium: ["lhumir", "alethir", "skenari"],
    low: ["namsea", "siyuane"]
  },
  "khoruun": {
    high: ["sahen", "skenari", "alethir"],
    medium: ["tjukari", "khoisan", "kinmora"],
    low: ["enzuka", "tahiri"]
  },
  "lhumir": {
    high: ["tjukari", "ashkara", "yatevar"],
    medium: ["khoisan", "alethir", "shokunin"],
    low: ["kayori", "siyuane"]
  },
  "yatevar": {
    high: ["khoisan", "lhumir", "karayni"],
    medium: ["wohaka", "tjukari", "ashkara"],
    low: ["skenari", "kayori"]
  },
  "tahiri": {
    high: ["kayori", "enzuka", "jaejin"],
    medium: ["wohaka", "namsea", "karayni"],
    low: ["ashkara", "khoruun"]
  },
  "karayni": {
    high: ["khoisan", "yatevar", "wohaka"],
    medium: ["enzuka", "tahiri", "jaejin"],
    low: ["skenari", "siyuane"]
  },
  "wohaka": {
    high: ["kayori", "karayni", "yatevar"],
    medium: ["tahiri", "tjukari", "siyuane"],
    low: ["ashkara", "shokunin"]
  },
  "tjukari": {
    high: ["lhumir", "alethir", "yatevar"],
    medium: ["sahen", "siyuane", "namsea"],
    low: ["shokunin", "enzuka"]
  },
  "kinmora": {
    high: ["shokunin", "skenari", "alethir"],
    medium: ["lhumir", "ashkara", "siljoa"],
    low: ["sahen", "kayori"]
  },
  "siljoa": {
    high: ["shokunin", "ashkara", "skenari"],
    medium: ["alethir", "kinmora", "lhumir"],
    low: ["kayori", "wohaka"]
  },
  "skenari": {
    high: ["kinmora", "khoruun", "siljoa"],
    medium: ["alethir", "shokunin", "ashkara"],
    low: ["karayni", "tahiri"]
  },
  "ashkara": {
    high: ["lhumir", "siljoa", "alethir"],
    medium: ["shokunin", "kinmora", "skenari"],
    low: ["siyuane", "wohaka"]
  },
  "alethir": {
    high: ["tjukari", "sahen", "kinmora"],
    medium: ["lhumir", "ashkara", "khoruun"],
    low: ["enzuka", "tahiri"]
  }
};

const CODE_NAMES: Record<string, string> = {
  "khoisan": "Earthlistener",
  "kayori": "Fireweaver",
  "sahen": "HorizonWalker",
  "enzuka": "Shieldbearer",
  "siyuane": "Kitsune",
  "jaejin": "Harmonist",
  "namsea": "Flowbinder",
  "shokunin": "BladeSmith",
  "khoruun": "SkyRider",
  "lhumir": "StillMind",
  "yatevar": "CycleKeeper",
  "tahiri": "HeartBearer",
  "karayni": "AncestorRoot",
  "wohaka": "SonglineKeeper",
  "tjukari": "Dreampath Navigator",
  "kinmora": "TimeArchitect",
  "siljoa": "FrostSentinel",
  "skenari": "FutureGuardian",
  "ashkara": "TruthForger",
  "alethir": "Seeker"
};

function CodeBadge({ 
  code, 
  type 
}: { 
  code: string; 
  type: "high" | "medium" | "low";
}) {
  const styles = {
    high: "bg-[#7CF5C8]/10 border-[#7CF5C8]/30 text-[#7CF5C8] hover:bg-[#7CF5C8]/20",
    medium: "bg-[#4F8CFF]/10 border-[#4F8CFF]/30 text-[#4F8CFF] hover:bg-[#4F8CFF]/20",
    low: "bg-[#FAFAFA]/5 border-[#FAFAFA]/20 text-[#FAFAFA]/60 hover:bg-[#FAFAFA]/10"
  };

  return (
    <span className={`px-3 py-2 rounded-xl border text-xs font-medium transition-all duration-300 ${styles[type]}`}>
      {CODE_NAMES[code]}
    </span>
  );
}

export function CompatibilityChart({ userCode }: { userCode: string }) {
  const compat = COMPATIBILITY[userCode] || { high: [], medium: [], low: [] };
  
  return (
    <div className="relative group">
      {/* Glow */}
      <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-br from-[#7CF5C8]/10 via-[#4F8CFF]/10 to-[#C7B9FF]/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
      
      {/* Card */}
      <div className="relative rounded-[28px] bg-white/[0.03] backdrop-blur-2xl border border-[#FAFAFA]/10 p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7CF5C8]/20 to-[#4F8CFF]/20 border border-[#7CF5C8]/30 flex items-center justify-center">
            <Heart className="h-6 w-6 text-[#7CF5C8]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#FAFAFA]">Code Compatibility</h3>
            <p className="text-xs text-[#FAFAFA]/50">Natural affinities with other codes</p>
          </div>
        </div>
        
        <p className="text-sm text-[#FAFAFA]/60 mb-6 leading-relaxed">
          Based on complementary traits and values
        </p>
        
        <div className="space-y-6">
          {/* High Compatibility */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">✓</span>
              <h4 className="text-sm font-semibold text-[#7CF5C8]">High Compatibility</h4>
            </div>
            <div className="flex gap-2 flex-wrap">
              {compat.high.map(code => (
                <CodeBadge key={code} code={code} type="high" />
              ))}
            </div>
          </div>
          
          {/* Medium Compatibility */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">~</span>
              <h4 className="text-sm font-semibold text-[#4F8CFF]">Medium Compatibility</h4>
            </div>
            <div className="flex gap-2 flex-wrap">
              {compat.medium.map(code => (
                <CodeBadge key={code} code={code} type="medium" />
              ))}
            </div>
          </div>
          
          {/* Growth Relationships */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">◇</span>
              <h4 className="text-sm font-semibold text-[#FAFAFA]/60">Growth Relationships</h4>
            </div>
            <div className="flex gap-2 flex-wrap">
              {compat.low.map(code => (
                <CodeBadge key={code} code={code} type="low" />
              ))}
            </div>
            <p className="text-xs text-[#FAFAFA]/40 mt-3">
              Different approaches that challenge and expand your perspective
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}