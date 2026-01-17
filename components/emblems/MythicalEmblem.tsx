// All 20 Mythical Codes with their display names and descriptions
export const MYTHICAL_CODES = [
  {
    key: "khoisan",
    label: "Earthlistener",
    description: "Deeply attuned to human and environmental signals. Present, observant, and naturally intuitive.",
  },
  {
    key: "kayori",
    label: "Fireweaver",
    description: "High energy and passionate transformation. Catalysts who ignite change and inspire action.",
  },
  {
    key: "sahen",
    label: "HorizonWalker",
    description: "Exploration and adventure. Boundary-pushers who thrive in the unknown.",
  },
  {
    key: "enzuka",
    label: "Shieldbearer",
    description: "Protection and loyalty. Defenders of community and sacred space.",
  },
  {
    key: "siyuane",
    label: "Kitsune",
    description: "Clever, playful, and adaptable. Masters of transformation and creative problem-solving.",
  },
  {
    key: "jaejin",
    label: "Harmonist",
    description: "Balance and mediation. Peace-seekers who bridge divides and create unity.",
  },
  {
    key: "namsea",
    label: "Flowbinder",
    description: "Fluidity and natural rhythm. Moving with ease through change and transition.",
  },
  {
    key: "shokunin",
    label: "BladeSmith",
    description: "Mastery and craftsmanship. Precision and dedication to excellence.",
  },
  {
    key: "khoruun",
    label: "SkyRider",
    description: "Freedom and elevation. Independent spirits who need space to soar.",
  },
  {
    key: "lhumir",
    label: "StillMind",
    description: "Contemplation and inner clarity. Deep thinkers who seek meaning through reflection.",
  },
  {
    key: "yatevar",
    label: "CycleKeeper",
    description: "Ritual and cyclical thinking. Operating across long arcs of time with symbolic depth.",
  },
  {
    key: "tahiri",
    label: "HeartBearer",
    description: "Warmth and emotional generosity. Leading with care, honor, and deep connection.",
  },
  {
    key: "karayni",
    label: "AncestorRoot",
    description: "Tradition and heritage. Honoring the past while building bridges to the future.",
  },
  {
    key: "wohaka",
    label: "SonglineKeeper",
    description: "Story and cultural preservation. Maintaining collective memory through narrative.",
  },
  {
    key: "tjukari",
    label: "DreampathNavigator",
    description: "Intuition and vision. Walking the dream paths with spiritual guidance.",
  },
  {
    key: "kinmora",
    label: "TimeArchitect",
    description: "Strategic planning and long-term vision. Building frameworks that endure.",
  },
  {
    key: "siljoa",
    label: "FrostSentinel",
    description: "Resilience and clarity. Maintaining perspective and seeing through illusions.",
  },
  {
    key: "skenari",
    label: "FutureGuardian",
    description: "Innovation and protection of tomorrow. Anticipating needs and preparing ahead.",
  },
  {
    key: "ashkara",
    label: "TruthForger",
    description: "Authenticity and honesty. Cutting through illusion to reveal what's real.",
  },
  {
    key: "alethir",
    label: "Seeker",
    description: "Curiosity and discovery. Lifelong learners driven by questions and exploration.",
  },
] as const;

export type MythicalCode = (typeof MYTHICAL_CODES)[number];

export function getCodeByKey(key: string) {
  return MYTHICAL_CODES.find((code) => code.key === key);
}

export function getCodeLabel(key: string) {
  return getCodeByKey(key)?.label ?? key;
}