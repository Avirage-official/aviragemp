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

export function CompatibilityChart({ userCode }: { userCode: string }) {
  const compat = COMPATIBILITY[userCode] || { high: [], medium: [], low: [] };
  
  return (
    <div className="bg-white rounded-lg p-8 shadow">
      <h2 className="text-2xl font-bold mb-6">Code Compatibility</h2>
      <p className="text-gray-600 mb-6">
        Natural affinities with other codes based on complementary traits and values
      </p>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
            <span className="text-xl">✓</span>
            High Compatibility
          </h3>
          <div className="flex gap-2 flex-wrap">
            {compat.high.map(code => (
              <span 
                key={code} 
                className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-medium"
              >
                {CODE_NAMES[code]}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold text-yellow-700 mb-3 flex items-center gap-2">
            <span className="text-xl">~</span>
            Medium Compatibility
          </h3>
          <div className="flex gap-2 flex-wrap">
            {compat.medium.map(code => (
              <span 
                key={code} 
                className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg"
              >
                {CODE_NAMES[code]}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span className="text-xl">◇</span>
            Growth Relationships
          </h3>
          <div className="flex gap-2 flex-wrap">
            {compat.low.map(code => (
              <span 
                key={code} 
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg"
              >
                {CODE_NAMES[code]}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Different approaches that can challenge and expand your perspective
          </p>
        </div>
      </div>
    </div>
  );
}