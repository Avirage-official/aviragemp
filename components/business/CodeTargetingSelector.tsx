"use client";

const CODES = [
  { id: "khoisan", name: "Earthlistener", traits: "Environmental awareness, present-moment focus" },
  { id: "kayori", name: "Fireweaver", traits: "High energy, passionate, transformative" },
  { id: "sahen", name: "HorizonWalker", traits: "Exploration, adventure, boundary-pushing" },
  { id: "enzuka", name: "Shieldbearer", traits: "Protection, loyalty, community defense" },
  { id: "siyuane", name: "Kitsune", traits: "Clever, playful, adaptable" },
  { id: "jaejin", name: "Harmonist", traits: "Balance, mediation, peace-seeking" },
  { id: "namsea", name: "Flowbinder", traits: "Fluidity, flexibility, natural rhythm" },
  { id: "shokunin", name: "BladeSmith", traits: "Mastery, craftsmanship, precision" },
  { id: "khoruun", name: "SkyRider", traits: "Freedom, elevation, perspective" },
  { id: "lhumir", name: "StillMind", traits: "Contemplation, introspection, meaning-seeking" },
  { id: "yatevar", name: "CycleKeeper", traits: "Rhythm, seasons, natural patterns" },
  { id: "tahiri", name: "HeartBearer", traits: "Emotional depth, compassion, connection" },
  { id: "karayni", name: "AncestorRoot", traits: "Tradition, heritage, grounding" },
  { id: "wohaka", name: "SonglineKeeper", traits: "Story, memory, cultural preservation" },
  { id: "tjukari", name: "Dreampath Navigator", traits: "Intuition, vision, spiritual journey" },
  { id: "kinmora", name: "TimeArchitect", traits: "Planning, structure, long-term vision" },
  { id: "siljoa", name: "FrostSentinel", traits: "Resilience, endurance, clarity" },
  { id: "skenari", name: "FutureGuardian", traits: "Innovation, progress, protection of tomorrow" },
  { id: "ashkara", name: "TruthForger", traits: "Honesty, authenticity, direct communication" },
  { id: "alethir", name: "Seeker", traits: "Curiosity, learning, discovery" }
];

export function CodeTargetingSelector({
  selectedCodes,
  onChange
}: {
  selectedCodes: string[];
  onChange: (codes: string[]) => void;
}) {
  function toggleCode(codeId: string) {
    if (selectedCodes.includes(codeId)) {
      onChange(selectedCodes.filter(c => c !== codeId));
    } else {
      onChange([...selectedCodes, codeId]);
    }
  }

  function selectAll() {
    onChange(CODES.map(c => c.id));
  }

  function clearAll() {
    onChange([]);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-600">
          Selected: {selectedCodes.length} / {CODES.length} codes
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={selectAll}
            className="text-sm text-blue-600 hover:underline"
          >
            Select All
          </button>
          <span className="text-gray-300">|</span>
          <button
            type="button"
            onClick={clearAll}
            className="text-sm text-blue-600 hover:underline"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto p-2 border rounded-lg">
        {CODES.map(code => (
          <label
            key={code.id}
            className={`flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer transition ${
              selectedCodes.includes(code.id)
                ? "bg-blue-50 border-blue-600"
                : "border-gray-200 hover:border-blue-300"
            }`}
          >
            <input
              type="checkbox"
              checked={selectedCodes.includes(code.id)}
              onChange={() => toggleCode(code.id)}
              className="mt-1"
            />
            <div className="flex-1">
              <p className="font-semibold text-sm">{code.name}</p>
              <p className="text-xs text-gray-600 mt-1">{code.traits}</p>
            </div>
          </label>
        ))}
      </div>

      <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>💡 Tip:</strong> Not sure which codes to target? Think about who would benefit most from your offering. Select 3-8 codes for best results.
        </p>
      </div>
    </div>
  );
}