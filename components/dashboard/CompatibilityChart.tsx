const COMPATIBILITY: Record<string, {
  high: string[];
  medium: string[];
  low: string[];
}> = {
  "lhumir": {
    high: ["tjukari", "ashkara", "yatevar"],
    medium: ["sahen", "khoisan", "alethir", "kinmora"],
    low: ["kayori", "khoruun"]
  },
  "kayori": {
    high: ["wohaka", "sahen", "tahiri"],
    medium: ["khoruun", "siyuane", "enzuka"],
    low: ["lhumir", "siljoa"]
  },
  "sahen": {
    high: ["khoruun", "alethir", "kayori"],
    medium: ["siyuane", "lhumir", "tjukari"],
    low: ["kinmora", "enzuka"]
  },
  "enzuka": {
    high: ["tahiri", "karayni", "yatevar"],
    medium: ["wohaka", "shokunin", "namsea"],
    low: ["sahen", "khoruun"]
  },
  "siyuane": {
    high: ["namsea", "jaejin", "wohaka"],
    medium: ["kayori", "sahen", "tjukari"],
    low: ["shokunin", "ashkara"]
  },
  "jaejin": {
    high: ["namsea", "tahiri", "yatevar"],
    medium: ["siyuane", "khoisan", "alethir"],
    low: ["ashkara", "khoruun"]
  },
  "namsea": {
    high: ["siyuane", "jaejin", "wohaka"],
    medium: ["kayori", "tjukari", "tahiri"],
    low: ["shokunin", "siljoa"]
  },
  "shokunin": {
    high: ["kinmora", "ashkara", "siljoa"],
    medium: ["enzuka", "yatevar", "alethir"],
    low: ["siyuane", "namsea"]
  },
  "khoruun": {
    high: ["sahen", "kayori", "skenari"],
    medium: ["khoisan", "tjukari", "wohaka"],
    low: ["enzuka", "jaejin"]
  },
  "yatevar": {
    high: ["lhumir", "karayni", "jaejin"],
    medium: ["enzuka", "shokunin", "tjukari"],
    low: ["khoruun", "kayori"]
  },
  "tahiri": {
    high: ["enzuka", "wohaka", "jaejin"],
    medium: ["kayori", "namsea", "karayni"],
    low: ["ashkara", "siljoa"]
  },
  "karayni": {
    high: ["yatevar", "wohaka", "enzuka"],
    medium: ["khoisan", "tahiri", "kinmora"],
    low: ["khoruun", "skenari"]
  },
  "wohaka": {
    high: ["kayori", "tahiri", "karayni"],
    medium: ["siyuane", "namsea", "tjukari"],
    low: ["siljoa", "ashkara"]
  },
  "tjukari": {
    high: ["lhumir", "alethir", "yatevar"],
    medium: ["sahen", "siyuane", "namsea"],
    low: ["shokunin", "enzuka"]
  },
  "kinmora": {
    high: ["shokunin", "skenari", "alethir"],
    medium: ["lhumir", "ashkara", "karayni"],
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
    medium: ["lhumir", "ashkara", "siljoa"],
    low: ["enzuka", "tahiri"]
  },
  "khoisan": {
    high: ["yatevar", "karayni", "jaejin"],
    medium: ["lhumir", "sahen", "khoruun"],
    low: ["shokunin", "skenari"]
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