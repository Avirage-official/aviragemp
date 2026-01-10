const CODE_DATA: Record<string, {
  name: string;
  tagline: string;
  description: string;
  emblem: string;
  traits: string[];
}> = {
  "khoisan": {
    name: "Earthlistener",
    tagline: "Grounded Awareness",
    description: "Deep connection to environment, present-moment awareness, attuned to natural rhythms and cycles. You sense what others miss.",
    emblem: "🦁",
    traits: ["Environmental awareness", "Present-focused", "Observant"]
  },
  "kayori": {
    name: "Fireweaver",
    tagline: "Dynamic Catalyst",
    description: "High energy, creative spark, natural connector. You ignite passion and bring people together through warmth and enthusiasm.",
    emblem: "🔥",
    traits: ["Energetic", "Social catalyst", "Passionate"]
  },
  "sahen": {
    name: "HorizonWalker",
    tagline: "Boundless Explorer",
    description: "Always seeking what's beyond, driven by curiosity and possibility. You thrive on new experiences and broadening perspectives.",
    emblem: "🌅",
    traits: ["Adventurous", "Curious", "Open-minded"]
  },
  "enzuka": {
    name: "Shieldbearer",
    tagline: "Protective Strength",
    description: "Natural guardian and protector. You create safety for others through reliability, loyalty, and steadfast presence.",
    emblem: "🛡️",
    traits: ["Protective", "Loyal", "Reliable"]
  },
  "siyuane": {
    name: "Kitsune",
    tagline: "Playful Wisdom",
    description: "Clever adaptability with a touch of mischief. You navigate complexity with intelligence and keep things light.",
    emblem: "🦊",
    traits: ["Adaptable", "Clever", "Playful"]
  },
  "jaejin": {
    name: "Harmonist",
    tagline: "Balance Keeper",
    description: "Natural mediator who seeks equilibrium. You bring calm to chaos and help others find middle ground.",
    emblem: "⚖️",
    traits: ["Balanced", "Diplomatic", "Calm"]
  },
  "namsea": {
    name: "Flowbinder",
    tagline: "Fluid Grace",
    description: "Move through life with natural ease. You adapt seamlessly to change and help others navigate transitions.",
    emblem: "🌊",
    traits: ["Flexible", "Graceful", "Adaptive"]
  },
  "shokunin": {
    name: "BladeSmith",
    tagline: "Precision Mastery",
    description: "Dedicated craftsperson who pursues excellence through discipline. You refine your skills with focused determination.",
    emblem: "🐉",
    traits: ["Disciplined", "Perfectionist", "Skilled"]
  },
  "khoruun": {
    name: "SkyRider",
    tagline: "Soaring Vision",
    description: "See possibilities from above, thinking big and moving fast. You inspire others to reach higher.",
    emblem: "🦅",
    traits: ["Visionary", "Ambitious", "Free-spirited"]
  },
  "lhumir": {
    name: "StillMind",
    tagline: "Inner Clarity",
    description: "Deep contemplation and inner clarity. You find meaning in stillness and help others discover their own depth.",
    emblem: "🏔️",
    traits: ["Contemplative", "Introspective", "Meaning-seeking"]
  },
  "yatevar": {
    name: "CycleKeeper",
    tagline: "Rhythmic Wisdom",
    description: "Understand natural patterns and rhythms. You honor cycles of growth, rest, and renewal.",
    emblem: "🌙",
    traits: ["Patient", "Rhythmic", "Wise"]
  },
  "tahiri": {
    name: "HeartBearer",
    tagline: "Emotional Depth",
    description: "Lead with heart and emotional intelligence. You create space for authentic connection and vulnerability.",
    emblem: "❤️",
    traits: ["Empathetic", "Authentic", "Nurturing"]
  },
  "karayni": {
    name: "AncestorRoot",
    tagline: "Heritage Guardian",
    description: "Connected to lineage and tradition. You honor the past while building bridges to the future.",
    emblem: "🌳",
    traits: ["Traditional", "Connected", "Respectful"]
  },
  "wohaka": {
    name: "SonglineKeeper",
    tagline: "Story Weaver",
    description: "Keeper of stories and collective memory. You connect people through shared narrative and meaning.",
    emblem: "🎵",
    traits: ["Storyteller", "Connector", "Creative"]
  },
  "tjukari": {
    name: "Dreampath Navigator",
    tagline: "Visionary Guide",
    description: "Navigate between inner and outer worlds. You help others understand their dreams and intuitions.",
    emblem: "✨",
    traits: ["Intuitive", "Imaginative", "Insightful"]
  },
  "kinmora": {
    name: "TimeArchitect",
    tagline: "Strategic Builder",
    description: "Think long-term and build systematically. You create structures that stand the test of time.",
    emblem: "⏳",
    traits: ["Strategic", "Patient", "Systematic"]
  },
  "siljoa": {
    name: "FrostSentinel",
    tagline: "Clear Boundaries",
    description: "Clarity through distance. You maintain perspective and help others see situations objectively.",
    emblem: "❄️",
    traits: ["Objective", "Discerning", "Clear"]
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
    tagline: "Authentic Integrity",
    description: "Committed to truth and authenticity. You cut through illusion to reveal what's real.",
    emblem: "⚔️",
    traits: ["Honest", "Direct", "Principled"]
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
        <p className="text-gray-500">Code data not found</p>
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