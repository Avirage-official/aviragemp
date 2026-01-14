"use client";

import Link from "next/link";
import clsx from "clsx";
import { useMemo, useState, useEffect, useRef, useId } from "react";

/* -------------------------------------------------------------------------- */
/* ETHOS MARKETPLACE (UI-FIRST, FORWARD-ONLY)                                 */
/* -------------------------------------------------------------------------- */

const MYTHICAL_CODES = [
  "khoisan",
  "kayori",
  "alethir",
  "lhumir",
  "tjukari",
  "shokunin",
  "siyuane",
  "khoruun",
  "sahen",
  "tahiri",
  "yatevar",
] as const;

type MythicalCode = (typeof MYTHICAL_CODES)[number];

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

const MOOD_LENS_TRAITS: Record<
  MoodLens,
  Partial<Record<keyof ExperienceTraits, [number, number]>>
> = {
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

function Pill({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "rounded-full border px-4 py-2 text-sm transition capitalize",
        active
          ? "bg-white text-black border-white"
          : "border-white/20 text-white/70 hover:text-white hover:border-white/30"
      )}
    >
      {children}
    </button>
  );
}

function MiniMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 text-xs text-white/45">
      <span className="text-white/35">{label}</span>
      <span className="text-white/70">{value}</span>
    </div>
  );
}

function TraitBar({ value }: { value: number }) {
  return (
    <div className="h-1 w-full rounded bg-white/10">
      <div
        className="h-1 rounded bg-white/70"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}

function PersonalityStrip({
  traits,
}: {
  traits: ExperienceTraits;
}) {
  const rows: Array<{ k: keyof ExperienceTraits; label: string }> = [
    { k: "energy", label: "Energy" },
    { k: "social", label: "Social" },
    { k: "structure", label: "Structure" },
    { k: "expression", label: "Expression" },
  ];

  return (
    <div className="space-y-3 mt-4">
      {rows.map((row) => (
        <div key={row.k}>
          <div className="mb-1 flex justify-between text-[11px] text-white/45">
            <span>{row.label}</span>
            <span>{traits[row.k]}</span>
          </div>
          <TraitBar value={traits[row.k]} />
        </div>
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
  activeCity,
  query,
  activeCollection,
  isSaved,
  onToggleSaved,
  expanded,
  onToggleExpanded,
}: {
  experience: Experience;
  lensMode: LensMode;
  activeCode: MythicalCode | null;
  activeMood: MoodLens | null;
  activeCity: string | null;
  query: string;
  activeCollection: string | null;
  isSaved: boolean;
  onToggleSaved: () => void;
  expanded: boolean;
  onToggleExpanded: () => void;
}) {
  const panelId = useId();

  const resonates =
    activeCode !== null && experience.resonatesWith.includes(activeCode);

  const moodScore = activeMood
    ? scoreMoodMatch(experience.traits, activeMood)
    : 0;

  const searchHit =
    query.length > 0 &&
    [
      experience.title,
      experience.description,
      experience.city,
      experience.location,
      experience.tags.join(" "),
    ]
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase());

  const emphasized = resonates || moodScore >= 0.6 || searchHit;

  const href = `/marketplace/${experience.id}`;

  return (
    <article
      className={clsx(
        "rounded-2xl border bg-white/5 transition",
        emphasized && "ring-1 ring-white/15",
        expanded && "bg-white/[0.07] border-white/25"
      )}
    >
      <div className="p-6">
        <h3 className="text-lg font-medium">{experience.title}</h3>
        <p className="mt-2 text-sm text-white/60 line-clamp-2">
          {experience.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <MiniMeta label="City" value={experience.city} />
          <MiniMeta label="Duration" value={experience.duration} />
          <MiniMeta label="Group" value={experience.groupSize} />
        </div>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs text-white/50">{experience.priceLabel}</span>
          <Link href={href} className="text-xs underline">
            Open →
          </Link>
        </div>

        {expanded && <PersonalityStrip traits={experience.traits} />}
      </div>

      <button
        onClick={onToggleExpanded}
        className="w-full border-t border-white/10 text-xs py-3 text-white/50 hover:text-white"
      >
        {expanded ? "Collapse" : "View details"}
      </button>
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

    if (activeCode) {
      list.sort(
        (a, b) =>
          Number(b.resonatesWith.includes(activeCode)) -
          Number(a.resonatesWith.includes(activeCode))
      );
    }

    if (activeMood) {
      list.sort(
        (a, b) =>
          scoreMoodMatch(b.traits, activeMood) -
          scoreMoodMatch(a.traits, activeMood)
      );
    }

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
    <div className="min-h-screen bg-black text-white p-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {experiences.map((exp) => (
          <ExperienceCard
            key={exp.id}
            experience={exp}
            lensMode={mode}
            activeCode={activeCode}
            activeMood={activeMood}
            activeCity={null}
            query={query}
            activeCollection={null}
            isSaved={false}
            onToggleSaved={() => {}}
            expanded={expandedId === exp.id}
            onToggleExpanded={() =>
              setExpandedId(expandedId === exp.id ? null : exp.id)
            }
          />
        ))}
      </div>
    </div>
  );
}
