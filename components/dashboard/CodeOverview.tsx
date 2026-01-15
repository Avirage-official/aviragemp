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

export function CodeOverview({ code }: { code: string }) {
  const data = CODE_DATA[code];
  
  if (!data) {
    return (
      <div className="bg-white rounded-lg p-8 shadow">
        <p className="text-gray-500">Code data not found for: {code}</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg p-8 shadow">
      <div className="text-6xl mb-4">{data.emblem}</div>
      <h1 className="text-3xl font-bold mb-2">{data.name}</h1>
      <p className="text-xl text-gray-600 mb-4">{data.tagline}</p>
      <p className="text-gray-700 leading-relaxed mb-6">{data.description}</p>
      
      <div className="flex gap-2 flex-wrap">
        {data.traits.map(trait => (
          <span 
            key={trait} 
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
          >
            {trait}
          </span>
        ))}
      </div>
    </div>
  );
}