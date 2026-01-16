"use client";

import Link from "next/link";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { Sparkles, MapPin, Users, Clock } from "lucide-react";

/* -------------------------------------------------------------------------- */
/* ETHOS MARKETPLACE - NEON PASTEL TECH VIBE                                  */
/* -------------------------------------------------------------------------- */

// All 20 Mythical Codes
const MYTHICAL_CODES = [
  "khoisan",
  "kayori",
  "sahen",
  "enzuka",
  "siyuane",
  "jaejin",
  "namsea",
  "shokunin",
  "khoruun",
  "lhumir",
  "yatevar",
  "tahiri",
  "karayni",
  "wohaka",
  "tjukari",
  "kinmora",
  "siljoa",
  "skenari",
  "ashkara",
  "alethir",
] as const;

type MythicalCode = (typeof MYTHICAL_CODES)[number];

// Mapping internal codes to display names
const CODE_LABELS: Record<MythicalCode, string> = {
  khoisan: "Earthlistener",
  kayori: "Fireweaver",
  sahen: "HorizonWalker",
  enzuka: "Shieldbearer",
  siyuane: "Kitsune",
  jaejin: "Harmonist",
  namsea: "Flowbinder",
  shokunin: "BladeSmith",
  khoruun: "SkyRider",
  lhumir: "StillMind",
  yatevar: "CycleKeeper",
  tahiri: "HeartBearer",
  karayni: "AncestorRoot",
  wohaka: "SonglineKeeper",
  tjukari: "Dreampath Navigator",
  kinmora: "TimeArchitect",
  siljoa: "FrostSentinel",
  skenari: "FutureGuardian",
  ashkara: "TruthForger",
  alethir: "Seeker",
};

type LensMode = "browse" | "codes" | "mood" | "location" | "saved";

type MoodLens =
  | "calm"
  | "reflective"
  | "social"
  | "expressive"
  | "grounded"
  | "exploratory";

type ExperienceTraits = {
  energy: number;
  social: number;
  structure: number;
  expression: number;
  nature: number;
  pace: number;
  introspection: number;
};

export type Experience = {
  id: string;
  title: string;
  description: string;
  location: string;
  city: string;
  category: "experience" | "retreat" | "workshop" | "event" | "service";
  duration: string;
  groupSize: string;
  bookingType: "INQUIRY" | "INSTANT";
  priceLabel: string;
  traits: ExperienceTraits;
  resonatesWith: MythicalCode[];
  tags: string[];
};

/* -------------------------------------------------------------------------- */
/* MOOD SCORING                                                               */
/* -------------------------------------------------------------------------- */

const MOOD_LENS_TRAITS: Record<MoodLens, Partial<Record<keyof ExperienceTraits, [number, number]>>> = {
  calm: { energy: [0, 35], pace: [0, 40], social: [0, 40] },
  reflective: { introspection: [65, 100], expression: [0, 45] },
  social: { social: [60, 100], energy: [50, 100] },
  expressive: { expression: [65, 100], energy: [55, 100] },
  grounded: { nature: [60, 100], pace: [0, 45] },
  exploratory: { energy: [55, 100], structure: [0, 45] },
};

function scoreMoodMatch(traits: ExperienceTraits, mood: MoodLens): number {
  const ranges = MOOD_LENS_TRAITS[mood];
  let score = 0;
  let checks = 0;

  (Object.keys(ranges) as (keyof ExperienceTraits)[]).forEach((key) => {
    const range = ranges[key];
    if (!range) return;
    checks++;
    const v = traits[key];
    if (v >= range[0] && v <= range[1]) score++;
  });

  return checks === 0 ? 0 : score / checks;
}

/* -------------------------------------------------------------------------- */
/* UI PRIMITIVES                                                              */
/* -------------------------------------------------------------------------- */

function TraitBar({ 
  label, 
  value, 
  color 
}: { 
  label: string; 
  value: number;
  color: "blue" | "mint" | "lavender";
}) {
  const colorClasses = {
    blue: "bg-[#4F8CFF]/20 [&>div]:bg-[#4F8CFF]",
    mint: "bg-[#7CF5C8]/20 [&>div]:bg-[#7CF5C8]",
    lavender: "bg-[#C7B9FF]/20 [&>div]:bg-[#C7B9FF]"
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-[10px] uppercase tracking-wider text-[#FAFAFA]/50 font-medium">
          {label}
        </span>
        <span className="text-[10px] text-[#FAFAFA]/70 font-mono">
          {value}
        </span>
      </div>
      <div className={clsx("h-1.5 w-full rounded-full overflow-hidden", colorClasses[color])}>
        <div 
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
    </div>
  );
}

function CodeBadge({ code }: { code: MythicalCode }) {
  const displayName = CODE_LABELS[code];
  
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C7B9FF]/10 border border-[#C7B9FF]/20 hover:bg-[#C7B9FF]/15 transition-colors">
      <Sparkles className="h-3 w-3 text-[#C7B9FF]" />
      <span className="text-xs font-medium text-[#C7B9FF]">
        {displayName}
      </span>
    </div>
  );
}

function PersonalityStrip({ traits }: { traits: ExperienceTraits }) {
  const traitRows = [
    { key: "energy" as const, label: "Energy", color: "blue" as const },
    { key: "social" as const, label: "Social", color: "mint" as const },
    { key: "structure" as const, label: "Structure", color: "lavender" as const },
    { key: "expression" as const, label: "Expression", color: "blue" as const },
  ];

  return (
    <div className="space-y-3 pt-4 border-t border-[#FAFAFA]/5">
      <p className="text-[10px] uppercase tracking-wider text-[#FAFAFA]/40 font-medium mb-2">
        Experience Personality
      </p>
      {traitRows.map((row) => (
        <TraitBar 
          key={row.key}
          label={row.label}
          value={traits[row.key]}
          color={row.color}
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* EXPERIENCE CARD                                                            */
/* -------------------------------------------------------------------------- */

function ExperienceCard({
  experience,
  lensMode,
  activeCode,
  activeMood,
  query,
  expanded,
  onToggleExpanded,
}: {
  experience: Experience;
  lensMode: LensMode;
  activeCode: MythicalCode | null;
  activeMood: MoodLens | null;
  query: string;
  expanded: boolean;
  onToggleExpanded: () => void;
}) {
  const resonates =
    activeCode !== null && experience.resonatesWith.includes(activeCode);

  const moodScore = activeMood
    ? scoreMoodMatch(experience.traits, activeMood)
    : 0;

  const emphasized = resonates || moodScore >= 0.6;

  return (
    <article
      className={clsx(
        "group relative rounded-2xl border transition-all duration-300",
        "bg-gradient-to-br from-[#111827] to-[#111827]/80 backdrop-blur-sm",
        emphasized 
          ? "border-[#7CF5C8]/30 shadow-lg shadow-[#7CF5C8]/5" 
          : "border-[#FAFAFA]/10 hover:border-[#4F8CFF]/30",
        expanded && "ring-1 ring-[#4F8CFF]/20"
      )}
    >
      {/* Resonance Pulse Indicator */}
      {resonates && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="relative">
            <div className="h-4 w-4 rounded-full bg-[#7CF5C8] shadow-lg shadow-[#7CF5C8]/50" />
            <div className="absolute inset-0 h-4 w-4 rounded-full bg-[#7CF5C8] animate-ping" />
          </div>
        </div>
      )}

      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold text-[#FAFAFA] leading-tight group-hover:text-[#4F8CFF] transition-colors">
              {experience.title}
            </h3>
            <span className={clsx(
              "text-xs px-2 py-1 rounded-full capitalize whitespace-nowrap flex-shrink-0",
              "bg-[#4F8CFF]/10 text-[#4F8CFF] border border-[#4F8CFF]/20"
            )}>
              {experience.category}
            </span>
          </div>
          
          <p className="text-sm text-[#FAFAFA]/60 leading-relaxed line-clamp-2">
            {experience.description}
          </p>
        </div>

        {/* Meta Info with Icons */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-1.5 text-xs text-[#FAFAFA]/50">
            <MapPin className="h-3.5 w-3.5 text-[#4F8CFF]" />
            <span>{experience.city}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#FAFAFA]/50">
            <Clock className="h-3.5 w-3.5 text-[#7CF5C8]" />
            <span>{experience.duration}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#FAFAFA]/50">
            <Users className="h-3.5 w-3.5 text-[#C7B9FF]" />
            <span>{experience.groupSize}</span>
          </div>
        </div>

        {/* Tags */}
        {experience.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {experience.tags.slice(0, 3).map((tag, i) => (
              <span 
                key={i}
                className="text-[10px] px-2 py-1 rounded-full bg-[#FAFAFA]/5 text-[#FAFAFA]/50 border border-[#FAFAFA]/10"
              >
                {tag}
              </span>
            ))}
            {experience.tags.length > 3 && (
              <span className="text-[10px] px-2 py-1 text-[#FAFAFA]/40">
                +{experience.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Mythical Code Badges */}
        {experience.resonatesWith.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {experience.resonatesWith.slice(0, 2).map((code) => (
              <CodeBadge key={code} code={code} />
            ))}
            {experience.resonatesWith.length > 2 && (
              <span className="text-xs text-[#FAFAFA]/40 self-center flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                +{experience.resonatesWith.length - 2} more
              </span>
            )}
          </div>
        )}

        {/* Personality Traits (Expanded State) */}
        {expanded && <PersonalityStrip traits={experience.traits} />}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-[#FAFAFA]/5">
          <span className="text-sm font-medium text-[#4F8CFF]">
            {experience.priceLabel}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleExpanded}
              className="text-xs text-[#FAFAFA]/50 hover:text-[#FAFAFA] transition-colors"
            >
              {expanded ? "Hide traits" : "View traits"}
            </button>
            <Link 
              href={`/marketplace/${experience.id}`}
              className="text-xs text-[#4F8CFF] hover:text-[#7CF5C8] transition-colors font-medium"
            >
              View details →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* MAIN CLIENT COMPONENT                                                      */
/* -------------------------------------------------------------------------- */

export default function MarketplaceClient({
  initialExperiences,
}: {
  initialExperiences: Experience[];
}) {
  const [mode, setMode] = useState<LensMode>("browse");
  const [activeCode, setActiveCode] = useState<MythicalCode | null>(null);
  const [activeMood, setActiveMood] = useState<MoodLens | null>(null);
  const [query, setQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const experiences = useMemo(() => {
    let list = [...initialExperiences];

    // Sort by code resonance
    if (activeCode) {
      list.sort(
        (a, b) =>
          Number(b.resonatesWith.includes(activeCode)) -
          Number(a.resonatesWith.includes(activeCode))
      );
    }

    // Sort by mood match
    if (activeMood) {
      list.sort(
        (a, b) =>
          scoreMoodMatch(b.traits, activeMood) -
          scoreMoodMatch(a.traits, activeMood)
      );
    }

    // Filter by search query
    if (query.trim()) {
      list = list.filter((e) =>
        [e.title, e.description, e.city, e.tags.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase())
      );
    }

    return list;
  }, [initialExperiences, activeCode, activeMood, query]);

  return (
  <div className="min-h-screen bg-[#111827] text-[#FAFAFA]">
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Page Header with Search */}
      <div className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#FAFAFA]">
              Marketplace
            </h1>
            <p className="text-sm text-[#FAFAFA]/50 mt-1">
              {experiences.length} {experiences.length === 1 ? 'experience' : 'experiences'} found
            </p>
          </div>
          
          {/* Search */}
          <input
            type="text"
            placeholder="Search experiences..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-4 py-2 rounded-xl bg-[#FAFAFA]/5 border border-[#FAFAFA]/10 text-sm text-[#FAFAFA] placeholder:text-[#FAFAFA]/30 focus:outline-none focus:border-[#4F8CFF]/50 focus:ring-2 focus:ring-[#4F8CFF]/20 transition-all min-w-[250px]"
          />
        </div>
      </div>
      </div>
      
      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {experiences.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex h-16 w-16 rounded-full bg-[#FAFAFA]/5 items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-[#FAFAFA]/20" />
            </div>
            <p className="text-[#FAFAFA]/40">No experiences found</p>
            <p className="text-sm text-[#FAFAFA]/30 mt-2">Try adjusting your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((exp) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                lensMode={mode}
                activeCode={activeCode}
                activeMood={activeMood}
                query={query}
                expanded={expandedId === exp.id}
                onToggleExpanded={() =>
                  setExpandedId(expandedId === exp.id ? null : exp.id)
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}