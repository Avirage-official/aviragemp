/* -------------------------------------------------------------------------- */
/* BUSINESS IDENTITY – MYTHICAL CODES (PART 1)                                 */
/* -------------------------------------------------------------------------- */

export type BrandTone = {
  voice: "grounded" | "expressive" | "stoic";
  pace: "slow" | "moderate" | "dynamic";
  posture: "invitational" | "commanding" | "reserved";
};

export type ColorMood = {
  primary: string;
  accent: string;
  surface: string;
};

export type BusinessInsight = {
  key: string;
  label: string;
  essence: string;

  strengths: string[];
  blindSpots: string[];

  idealAudience: string[];
  strugglesWith: string[];

  brandTone: BrandTone;
  colorMood: ColorMood;

  positioningGuidance: string[];
  contentAngles: string[];
  offeringStyle: string[];

  primaryAdvice: string;
  secondaryEffect: string;
  tertiaryEffect: string;
};


export const MYTHICAL_CODES = {
  khoisan: {
    key: "khoisan",
    label: "Earthlistener",
    essence:
      "Businesses that feel present, observant, and deeply attuned to human and environmental signals. They don’t push — they notice.",

    strengths: [
      "Exceptional sensitivity to customer needs",
      "Natural trust-building without urgency or pressure",
      "Strong adaptability to subtle market and emotional shifts",
      "Feels human, calm, and safe to engage with",
    ],
    blindSpots: [
      "May under-communicate value or outcomes",
      "Can resist scaling systems and visibility",
      "Risk of being overlooked in loud marketplaces",
    ],

    idealAudience: [
      "Mindful consumers",
      "Nature-oriented users",
      "Burnt-out professionals seeking calm",
      "People who value presence over hype",
    ],
    strugglesWith: [
      "High-pressure sales cultures",
      "Urgency-driven or transactional audiences",
      "Markets obsessed with speed and dominance",
    ],

    brandTone: {
      voice: "grounded",
      pace: "slow",
      posture: "invitational",
    },
    colorMood: {
      primary: "#2E7D6B",
      accent: "#A7E8D5",
      surface: "#F2FAF7",
    },

    positioningGuidance: [
      "Lead with presence, not promises",
      "Emphasize care, listening, and attentiveness",
      "Let silence and space be part of the brand",
    ],
    contentAngles: [
      "Behind-the-scenes process and intention",
      "Slow storytelling and reflection",
      "Nature, rhythm, and seasonal metaphors",
    ],
    offeringStyle: [
      "Small-group or one-on-one experiences",
      "High-touch, low-volume offerings",
      "Experiences that prioritize atmosphere over scale",
    ],

    primaryAdvice:
      "Your strength is perception. Design experiences that make people feel quietly understood.",
    secondaryEffect:
      "Secondary codes add texture, but grounding and presence must remain dominant.",
    tertiaryEffect:
      "Tertiary traits should never override your calm, observant signal.",
  },

  kayori: {
    key: "kayori",
    label: "Fireweaver",
    essence:
      "Businesses that energize communities through emotion, rhythm, and shared meaning. They gather people, not just customers.",

    strengths: [
      "High emotional resonance and memorability",
      "Strong community formation and loyalty",
      "Natural ability to generate momentum and participation",
      "Brand feels alive and expressive",
    ],
    blindSpots: [
      "Risk of emotional overload",
      "May overwhelm quieter or introverted audiences",
      "Energy can scatter without grounding systems",
    ],

    idealAudience: [
      "Community-driven users",
      "Expressive personalities",
      "Experience-seekers and creatives",
      "People who value belonging and shared emotion",
    ],
    strugglesWith: [
      "Minimalist, efficiency-only users",
      "Highly transactional or detached audiences",
    ],

    brandTone: {
      voice: "expressive",
      pace: "dynamic",
      posture: "commanding",
    },
    colorMood: {
      primary: "#E63946",
      accent: "#FFD166",
      surface: "#FFF4E6",
    },

    positioningGuidance: [
      "Invite participation, not passive consumption",
      "Create rituals around your offering",
      "Let people feel seen as part of something bigger",
    ],
    contentAngles: [
      "Stories, music, rhythm, and celebration",
      "User-generated content and shared moments",
      "Collective language: we, us, together",
    ],
    offeringStyle: [
      "Group-based experiences",
      "Recurring gatherings or events",
      "Emotionally immersive offerings",
    ],

    primaryAdvice:
      "Your business thrives when people feel something together — design for shared emotion.",
    secondaryEffect:
      "Secondary codes refine how and where energy is expressed.",
    tertiaryEffect:
      "Tertiary traits should stabilize and focus, not mute, your fire.",
  },

  sahen: {
    key: "sahen",
    label: "HorizonWalker",
    essence:
      "Businesses built on endurance, self-reliance, and long-horizon trust. They are steady when others rush.",

    strengths: [
      "Strong independence and internal clarity",
      "Resilience in unstable or slow markets",
      "Clear long-term positioning",
      "Low susceptibility to trends or hype",
    ],
    blindSpots: [
      "May appear distant or emotionally unavailable",
      "Low urgency signaling",
      "Can under-invest in relationship warmth",
    ],

    idealAudience: [
      "Self-directed users",
      "Long-term planners",
      "People seeking stability and reliability",
    ],
    strugglesWith: [
      "High-touch emotional service expectations",
      "Fast-turnover, impulse-driven markets",
    ],

    brandTone: {
      voice: "stoic",
      pace: "moderate",
      posture: "reserved",
    },
    colorMood: {
      primary: "#5A6C7D",
      accent: "#E0C097",
      surface: "#F6F7F8",
    },

    positioningGuidance: [
      "Emphasize durability and reliability",
      "Avoid hype or exaggerated claims",
      "Signal patience and long-term commitment",
    ],
    contentAngles: [
      "Long-form insights and explanations",
      "Timeless positioning statements",
      "Lessons learned over time",
    ],
    offeringStyle: [
      "Subscription or long-term engagements",
      "Low-frequency, high-trust offerings",
      "Services built for consistency, not spikes",
    ],

    primaryAdvice:
      "Your value compounds over time. Signal patience, endurance, and reliability.",
    secondaryEffect:
      "Secondary codes soften or humanize your stoicism.",
    tertiaryEffect:
      "Tertiary traits add warmth without compromising stability.",
  },
  enzuka: {
    key: "enzuka",
    label: "Shieldbearer",
    essence:
      "Businesses that project strength, protection, and dependable leadership. They make people feel defended, guided, and secure.",

    strengths: [
      "Clear leadership presence and authority",
      "Strong trust through protection and reliability",
      "Excellent in high-stakes or responsibility-heavy domains",
      "Ability to hold boundaries and make decisive calls",
    ],
    blindSpots: [
      "Can feel intimidating or rigid",
      "May over-prioritize control over empathy",
      "Risk of burnout from carrying too much responsibility",
    ],

    idealAudience: [
      "Users seeking safety and structure",
      "Clients in high-risk or high-responsibility contexts",
      "People who value leadership and decisiveness",
    ],
    strugglesWith: [
      "Highly informal or anti-structure audiences",
      "Markets that reject authority or hierarchy",
    ],

    brandTone: {
      voice: "grounded",
      pace: "moderate",
      posture: "commanding",
    },
    colorMood: {
      primary: "#1F3D2B",
      accent: "#C9A44C",
      surface: "#F5F3EC",
    },

    positioningGuidance: [
      "Lead with protection, not dominance",
      "Signal responsibility before ambition",
      "Make boundaries explicit and reassuring",
    ],
    contentAngles: [
      "Safety, preparedness, and foresight",
      "Leadership lessons and decision-making frameworks",
      "Behind-the-scenes responsibility and care",
    ],
    offeringStyle: [
      "Structured services with clear safeguards",
      "High-accountability offerings",
      "Roles as protector, guide, or steward",
    ],

    primaryAdvice:
      "Your strength is guardianship. Let people feel safe placing trust in you.",
    secondaryEffect:
      "Secondary codes soften or humanize your authority.",
    tertiaryEffect:
      "Tertiary traits should add warmth, not erode strength.",
  },

  siyuane: {
    key: "siyuane",
    label: "Kitsune",
    essence:
      "Businesses defined by disciplined mastery, quiet intelligence, and refined execution. Excellence speaks louder than promotion.",

    strengths: [
      "Exceptional craftsmanship and precision",
      "Strong respect for process and mastery",
      "High credibility through consistency and quality",
      "Quiet confidence that attracts discerning users",
    ],
    blindSpots: [
      "May appear distant or unapproachable",
      "Low tolerance for improvisation",
      "Can under-market exceptional work",
    ],

    idealAudience: [
      "Detail-oriented users",
      "Professionals who value mastery",
      "Clients seeking refined, high-quality outcomes",
    ],
    strugglesWith: [
      "Chaotic or fast-and-loose markets",
      "Audiences driven purely by novelty",
    ],

    brandTone: {
      voice: "grounded",
      pace: "slow",
      posture: "reserved",
    },
    colorMood: {
      primary: "#2F2F2F",
      accent: "#C7B299",
      surface: "#FAFAF8",
    },

    positioningGuidance: [
      "Let quality demonstrate value",
      "Emphasize mastery and lineage of skill",
      "Avoid loud or exaggerated claims",
    ],
    contentAngles: [
      "Process, repetition, and refinement",
      "Before/after craftsmanship stories",
      "Quiet excellence and discipline",
    ],
    offeringStyle: [
      "High-quality, precision-driven services",
      "Apprenticeship or mastery-based offerings",
      "Limited, carefully curated outputs",
    ],

    primaryAdvice:
      "Your power is mastery. Trust that excellence, repeated, becomes visible.",
    secondaryEffect:
      "Secondary codes introduce warmth or accessibility.",
    tertiaryEffect:
      "Tertiary traits allow selective experimentation without dilution.",
  },

  jaejin: {
    key: "jaejin",
    label: "Harmonist",
    essence:
      "Businesses that prioritize balance, social harmony, and smooth relational flow. They reduce friction and maintain equilibrium.",

    strengths: [
      "Strong emotional intelligence in group settings",
      "Excellent conflict avoidance and resolution",
      "Reliable, respectful brand presence",
      "Ability to read and respond to social nuance",
    ],
    blindSpots: [
      "May avoid necessary confrontation",
      "Can suppress bold differentiation",
      "Risk of prioritizing harmony over growth",
    ],

    idealAudience: [
      "Group-oriented users",
      "Clients valuing stability and respect",
      "Communities seeking low-friction interaction",
    ],
    strugglesWith: [
      "Highly competitive or confrontational markets",
      "Audiences seeking disruption or shock value",
    ],

    brandTone: {
      voice: "grounded",
      pace: "moderate",
      posture: "invitational",
    },
    colorMood: {
      primary: "#6B7C85",
      accent: "#D9CFC1",
      surface: "#F7F8F9",
    },

    positioningGuidance: [
      "Signal reliability and emotional safety",
      "Design experiences that reduce tension",
      "Let respect and consistency lead",
    ],
    contentAngles: [
      "Guidance on balance and cooperation",
      "Social etiquette and shared norms",
      "Stories of smooth collaboration",
    ],
    offeringStyle: [
      "Well-structured, relationship-first services",
      "Group-friendly experiences",
      "Offerings that prioritize continuity",
    ],

    primaryAdvice:
      "Your strength is harmony. Growth comes from maintaining balance, not breaking it.",
    secondaryEffect:
      "Secondary codes introduce assertiveness or individuality.",
    tertiaryEffect:
      "Tertiary traits allow controlled disruption when required.",
  },namsea: {
    key: "namsea",
    label: "Flowbinder",
    essence:
      "Businesses that adapt fluidly to change, prioritize relational balance, and move with circumstances rather than against them.",

    strengths: [
      "High adaptability in changing markets",
      "Strong relational intelligence and flexibility",
      "Low resistance to uncertainty and transition",
      "Creates ease and approachability for users",
    ],
    blindSpots: [
      "May lack firm boundaries",
      "Can struggle with decisive positioning",
      "Risk of being perceived as vague",
    ],

    idealAudience: [
      "Users navigating transitions",
      "Relational, people-first clients",
      "Audiences valuing flexibility over rigidity",
    ],
    strugglesWith: [
      "Highly structured or rule-bound markets",
      "Audiences demanding certainty and precision",
    ],

    brandTone: {
      voice: "grounded",
      pace: "moderate",
      posture: "invitational",
    },
    colorMood: {
      primary: "#4A7C85",
      accent: "#9ED9C8",
      surface: "#F1FBFA",
    },

    positioningGuidance: [
      "Emphasize adaptability and responsiveness",
      "Frame change as a natural process",
      "Avoid rigid promises; highlight flexibility",
    ],
    contentAngles: [
      "Stories of adaptation and resilience",
      "Relational balance and flow metaphors",
      "Guidance through uncertainty",
    ],
    offeringStyle: [
      "Flexible service models",
      "Customizable experiences",
      "Offerings that evolve with user needs",
    ],

    primaryAdvice:
      "Your strength is flow. Design offerings that move with people, not against them.",
    secondaryEffect:
      "Secondary codes introduce structure or intensity where needed.",
    tertiaryEffect:
      "Tertiary traits help anchor flow without restricting it.",
  },

  shokunin: {
    key: "shokunin",
    label: "BladeSmith",
    essence:
      "Businesses devoted to precision, discipline, and mastery of craft. Quality is a moral standard, not a feature.",

    strengths: [
      "Extreme attention to detail",
      "High trust through consistency and precision",
      "Clear devotion to craft and improvement",
      "Strong long-term credibility",
    ],
    blindSpots: [
      "Low tolerance for experimentation",
      "Can appear inflexible or slow-moving",
      "May undervalue marketing and visibility",
    ],

    idealAudience: [
      "Craft-focused professionals",
      "Users seeking excellence and precision",
      "Clients who value process over speed",
    ],
    strugglesWith: [
      "Fast-trend or novelty-driven markets",
      "Audiences seeking rapid iteration",
    ],

    brandTone: {
      voice: "stoic",
      pace: "slow",
      posture: "reserved",
    },
    colorMood: {
      primary: "#1C1C1C",
      accent: "#BFA36F",
      surface: "#F8F7F4",
    },

    positioningGuidance: [
      "Let precision and consistency speak",
      "Avoid shortcuts or exaggerated claims",
      "Position mastery as an ongoing practice",
    ],
    contentAngles: [
      "Process deep-dives",
      "Before-and-after refinement",
      "Lessons from repetition and discipline",
    ],
    offeringStyle: [
      "Craft-driven services",
      "Limited, high-quality outputs",
      "Offerings centered on mastery and refinement",
    ],

    primaryAdvice:
      "Your reputation is built blade by blade. Precision compounds trust.",
    secondaryEffect:
      "Secondary codes soften rigidity or add accessibility.",
    tertiaryEffect:
      "Tertiary traits introduce selective experimentation without loss of quality.",
  },

  khoruun: {
    key: "khoruun",
    label: "SkyRider",
    essence:
      "Businesses shaped by freedom, independence, and wide-horizon thinking. They value space, autonomy, and resilience.",

    strengths: [
      "High independence and self-reliance",
      "Comfort with uncertainty and movement",
      "Strong resilience in sparse or volatile markets",
      "Appeals to freedom-seeking users",
    ],
    blindSpots: [
      "May resist collaboration",
      "Low attachment to systems and routines",
      "Risk of fragmentation or inconsistency",
    ],

    idealAudience: [
      "Independent thinkers",
      "Explorers and nonconformists",
      "Users seeking autonomy and flexibility",
    ],
    strugglesWith: [
      "Highly interdependent or rigid systems",
      "Audiences requiring constant support",
    ],

    brandTone: {
      voice: "stoic",
      pace: "dynamic",
      posture: "reserved",
    },
    colorMood: {
      primary: "#5C7A99",
      accent: "#D6E2F0",
      surface: "#F5F8FC",
    },

    positioningGuidance: [
      "Emphasize freedom and autonomy",
      "Avoid restrictive language or framing",
      "Signal resilience and adaptability",
    ],
    contentAngles: [
      "Stories of independence and movement",
      "Wide-horizon thinking and exploration",
      "Resilience in changing conditions",
    ],
    offeringStyle: [
      "Modular or self-directed offerings",
      "Low-constraint service models",
      "Experiences emphasizing freedom of choice",
    ],

    primaryAdvice:
      "Your strength is freedom. Design offerings that give people space to move.",
    secondaryEffect:
      "Secondary codes introduce cohesion or relational grounding.",
    tertiaryEffect:
      "Tertiary traits help stabilize autonomy without confinement.",
  },lhumir: {
    key: "lhumir",
    label: "StillMind",
    essence:
      "Businesses centered on clarity, contemplation, and meaning. They reduce noise and create calm, focused experiences.",

    strengths: [
      "Exceptional clarity and focus",
      "Strong trust through calm presence",
      "Deep meaning-driven positioning",
      "High credibility in reflective spaces",
    ],
    blindSpots: [
      "Can appear distant or minimal",
      "Low urgency signaling",
      "May under-communicate value",
    ],

    idealAudience: [
      "Reflective users",
      "Purpose-driven clients",
      "Audiences seeking calm and depth",
    ],
    strugglesWith: [
      "Fast-paced, hype-driven markets",
      "Emotionally loud environments",
    ],

    brandTone: {
      voice: "quiet",
      pace: "slow",
      posture: "centered",
    },
    colorMood: {
      primary: "#6B7280",
      accent: "#CBD5E1",
      surface: "#F8FAFC",
    },

    positioningGuidance: [
      "Reduce noise in your messaging",
      "Emphasize clarity over persuasion",
      "Let silence and space do work",
    ],
    contentAngles: [
      "Reflection-led insights",
      "Minimal, thoughtful storytelling",
      "Meaning-first narratives",
    ],
    offeringStyle: [
      "Low-friction experiences",
      "Minimalist service design",
      "Offerings that reward patience",
    ],

    primaryAdvice:
      "Your power is stillness. Create spaces where clarity emerges naturally.",
    secondaryEffect:
      "Secondary codes introduce warmth or engagement when needed.",
    tertiaryEffect:
      "Tertiary traits add motion without disrupting calm.",
  },

  yatevar: {
    key: "yatevar",
    label: "CycleKeeper",
    essence:
      "Businesses grounded in cyclical thinking, layered meaning, and ritual precision. They operate across long arcs of time.",

    strengths: [
      "Exceptional pattern recognition",
      "Deep symbolic and philosophical depth",
      "Strong long-term coherence",
      "High trust among meaning-driven audiences",
    ],
    blindSpots: [
      "Can feel complex or inaccessible",
      "Low tolerance for simplification",
      "Risk of over-intellectualization",
    ],

    idealAudience: [
      "Philosophical thinkers",
      "Ritual-oriented users",
      "Clients seeking depth and tradition",
    ],
    strugglesWith: [
      "Transactional or surface-level markets",
      "Audiences demanding immediacy",
    ],

    brandTone: {
      voice: "ceremonial",
      pace: "measured",
      posture: "reverent",
    },
    colorMood: {
      primary: "#5B3E96",
      accent: "#E6D9FF",
      surface: "#F6F2FB",
    },

    positioningGuidance: [
      "Emphasize continuity and cycles",
      "Frame offerings as part of a larger arc",
      "Avoid oversimplification",
    ],
    contentAngles: [
      "Layered explanations",
      "Symbolic storytelling",
      "Ritual and cyclical metaphors",
    ],
    offeringStyle: [
      "Ritualized user journeys",
      "Long-term engagement models",
      "Offerings that deepen over time",
    ],

    primaryAdvice:
      "Your strength is continuity. Design for cycles, not moments.",
    secondaryEffect:
      "Secondary codes help translate depth into accessibility.",
    tertiaryEffect:
      "Tertiary traits introduce entry points for broader audiences.",
  },

  tahiri: {
    key: "tahiri",
    label: "HeartBearer",
    essence:
      "Businesses defined by warmth, hospitality, and emotional generosity. They lead with care, honor, and connection.",

    strengths: [
      "Strong emotional trust and loyalty",
      "High relational warmth",
      "Powerful word-of-mouth resonance",
      "Deep community bonds",
    ],
    blindSpots: [
      "Can overextend emotionally",
      "Difficulty setting boundaries",
      "Risk of burnout",
    ],

    idealAudience: [
      "Relationship-oriented users",
      "Community-driven clients",
      "Audiences valuing warmth and care",
    ],
    strugglesWith: [
      "Highly transactional environments",
      "Cold or efficiency-only cultures",
    ],

    brandTone: {
      voice: "warm",
      pace: "moderate",
      posture: "welcoming",
    },
    colorMood: {
      primary: "#C44536",
      accent: "#F2B8A0",
      surface: "#FFF1EC",
    },

    positioningGuidance: [
      "Lead with generosity and care",
      "Frame offerings as acts of service",
      "Emphasize relationship over transaction",
    ],
    contentAngles: [
      "Human stories",
      "Community highlights",
      "Expressions of care and gratitude",
    ],
    offeringStyle: [
      "High-touch services",
      "Community-centered experiences",
      "Offerings built around hospitality",
    ],

    primaryAdvice:
      "Your strength is care. Protect it with clear boundaries.",
    secondaryEffect:
      "Secondary codes help structure generosity.",
    tertiaryEffect:
      "Tertiary traits prevent emotional overreach.",
  },

} as const;
export type MythicalCodeKey = keyof typeof MYTHICAL_CODES;
export type MythicalCode = (typeof MYTHICAL_CODES)[MythicalCodeKey];
