"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import clsx from "clsx";

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

const [activeCode, setActiveCode] = useState<MythicalCode | null>(null);

/* -------------------------------------------------------------------------- */
/* MOCK DATA (UI-first, replace later with API)                                */
/* -------------------------------------------------------------------------- */

const MOCK_EXPERIENCES = [
  {
    id: "exp-1",
    title: "Silent Coastal Walk",
    description:
      "A slow, unguided coastal walk designed for presence, quiet attention, and environmental attunement.",
    location: "Coast",
    city: "Remote",
    traits: {
      energy: 20,
      social: 10,
      structure: 30,
      expression: 20,
      nature: 95,
      pace: 25,
      introspection: 90,
    },
    resonatesWith: ["khoisan", "lhumir", "tjukari"] as MythicalCode[],

  },
  {
    id: "exp-2",
    title: "Collective Rhythm Workshop",
    description:
      "A communal rhythm and movement session focused on shared energy, expression, and connection.",
    location: "Studio",
    city: "Urban",
    traits: {
      energy: 80,
      social: 85,
      structure: 60,
      expression: 90,
      nature: 20,
      pace: 75,
      introspection: 25,
    },
    resonatesWith: ["kayori", "tahiri"] as MythicalCode[],
  },
  {
    id: "exp-3",
    title: "Philosophical Walking Dialogue",
    description:
      "A guided walking conversation exploring meaning, inquiry, and reflective thought.",
    location: "Park",
    city: "Urban",
    traits: {
      energy: 45,
      social: 40,
      structure: 55,
      expression: 50,
      nature: 60,
      pace: 40,
      introspection: 85,
    },
    resonatesWith: ["alethir", "yatevar"] as MythicalCode[],
  },
  {
    id: "exp-4",
    title: "Steppe Horizon Ride",
    description:
      "A wide-space ride designed for autonomy, long-horizon thinking, and the calm confidence of movement.",
    location: "Open Plains",
    city: "Regional",
    traits: {
      energy: 55,
      social: 20,
      structure: 25,
      expression: 35,
      nature: 85,
      pace: 55,
      introspection: 55,
    },
    resonatesWith: ["khoruun", "sahen"] as MythicalCode[],
  },
  {
    id: "exp-5",
    title: "Precision Craft Session",
    description:
      "A quiet, structured craft session for people who enjoy detail, repetition, and the satisfaction of refinement.",
    location: "Workshop",
    city: "Urban",
    traits: {
      energy: 35,
      social: 25,
      structure: 85,
      expression: 25,
      nature: 15,
      pace: 30,
      introspection: 60,
    },
    resonatesWith: ["shokunin", "siyuane"] as MythicalCode[],
  },
] as const;

type Experience = (typeof MOCK_EXPERIENCES)[number];

/* -------------------------------------------------------------------------- */
/* LENS MODEL                                                                  */
/* -------------------------------------------------------------------------- */

type LensMode = "browse" | "codes" | "mood" | "location";

type MoodLens =
  | "calm"
  | "reflective"
  | "social"
  | "expressive"
  | "grounded"
  | "exploratory";

/**
 * Mood lenses are USER-SELECTED. They do not filter; they re-order + accent.
 * They map to trait ranges that describe the *experience demand/feel*.
 */
const MOOD_LENS_TRAITS: Record<
  MoodLens,
  Partial<Record<keyof Experience["traits"], [number, number]>>
> = {
  calm: {
    energy: [0, 35],
    pace: [0, 40],
    social: [0, 40],
  },
  reflective: {
    introspection: [65, 100],
    expression: [0, 45],
  },
  social: {
    social: [60, 100],
    energy: [50, 100],
  },
  expressive: {
    expression: [65, 100],
    energy: [55, 100],
  },
  grounded: {
    nature: [60, 100],
    pace: [0, 45],
  },
  exploratory: {
    energy: [55, 100],
    structure: [0, 45],
  },
};

function scoreMoodMatch(traits: Experience["traits"], mood: MoodLens): number {
  const ranges = MOOD_LENS_TRAITS[mood];
  let score = 0;
  let checks = 0;

  (Object.keys(ranges) as (keyof Experience["traits"])[]).forEach((key) => {
    const value = traits[key];
    const range = ranges[key];
    if (!range || value === undefined) return;

    const [min, max] = range;
    checks += 1;
    if (value >= min && value <= max) score += 1;
  });

  return checks === 0 ? 0 : score / checks; // 0..1
}

/* -------------------------------------------------------------------------- */
/* UI COMPONENTS                                                              */
/* -------------------------------------------------------------------------- */

function MarketplaceNav({
  mode,
  setMode,
}: {
  mode: LensMode;
  setMode: (m: LensMode) => void;
}) {
  const items: { id: LensMode; label: string }[] = [
    { id: "browse", label: "Browse" },
    { id: "codes", label: "Codes" },
    { id: "mood", label: "Mood" },
    { id: "location", label: "Location" },
  ];

  return (
    <nav className="sticky top-0 z-20 border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-6">
          <span className="text-sm font-medium text-white/90">Marketplace</span>

          <div className="flex items-center gap-5">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => setMode(item.id)}
                className={clsx(
                  "text-sm transition",
                  mode === item.id
                    ? "text-white"
                    : "text-white/50 hover:text-white/80"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-white/40">
          Lenses reorder + highlight — nothing is ranked.
        </div>
      </div>
    </nav>
  );
}

function TraitBar({ value }: { value: number }) {
  return (
    <div className="h-1 w-full rounded bg-white/10">
      <div
        className="h-1 rounded bg-white/70"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function PersonalityStrip({ traits }: { traits: Experience["traits"] }) {
  return (
    <div className="mt-4 space-y-2">
      <div>
        <div className="mb-1 flex justify-between text-[11px] text-white/45">
          <span>Energy</span>
          <span>{traits.energy}</span>
        </div>
        <TraitBar value={traits.energy} />
      </div>

      <div>
        <div className="mb-1 flex justify-between text-[11px] text-white/45">
          <span>Social</span>
          <span>{traits.social}</span>
        </div>
        <TraitBar value={traits.social} />
      </div>

      <div>
        <div className="mb-1 flex justify-between text-[11px] text-white/45">
          <span>Structure</span>
          <span>{traits.structure}</span>
        </div>
        <TraitBar value={traits.structure} />
      </div>

      <div>
        <div className="mb-1 flex justify-between text-[11px] text-white/45">
          <span>Expression</span>
          <span>{traits.expression}</span>
        </div>
        <TraitBar value={traits.expression} />
      </div>
    </div>
  );
}

function ExperienceCard({
  experience,
  lensMode,
  activeCode,
  activeMood,
}: {
  experience: Experience;
  lensMode: LensMode;
  activeCode: string | null;
  activeMood: MoodLens | null;
}) {
  const resonates =
  activeCode !== null && experience.resonatesWith.includes(activeCode);
  const moodScore = activeMood ? scoreMoodMatch(experience.traits, activeMood) : 0;
  const moodAligned = activeMood ? moodScore >= 0.6 : false;

  const href = (() => {
    const params = new URLSearchParams();
    params.set("lens", lensMode);
    if (activeCode) params.set("code", activeCode);
    if (activeMood) params.set("mood", activeMood);
    return `/marketplace/${experience.id}?${params.toString()}`;
  })();

  return (
    <Link
      href={href}
      className={clsx(
        "group rounded-2xl border bg-white/5 p-6 transition",
        "border-white/10 hover:border-white/20 hover:bg-white/[0.07]",
        (resonates || moodAligned) && "ring-1 ring-white/20",
        moodAligned && "border-white/35"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-lg font-medium text-white">{experience.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-white/60">
            {experience.description}
          </p>

          <div className="mt-3 text-xs text-white/45">
            {experience.city} · {experience.location}
          </div>
        </div>

        <div className="shrink-0 text-xs text-white/45">
          {resonates && (
            <div className="rounded-full border border-white/15 bg-white/5 px-3 py-1">
              Resonates (code lens)
            </div>
          )}
          {!resonates && moodAligned && (
            <div className="rounded-full border border-white/15 bg-white/5 px-3 py-1">
              Emphasised (mood lens)
            </div>
          )}
        </div>
      </div>

      <PersonalityStrip traits={experience.traits} />

      {(activeMood || activeCode) && (
        <div className="mt-4 text-xs text-white/45">
          {activeCode && resonates && (
            <span>
              Often resonates with <span className="text-white">{activeCode}</span>
            </span>
          )}
          {activeMood && (
            <span className={clsx(activeCode && resonates && "ml-2")}>
              {activeMood && (
                <>
                  <span className="text-white/60">·</span>{" "}
                  Viewing through <span className="text-white">{activeMood}</span>
                  {activeMood ? (
                    <span className="text-white/40">
                      {" "}
                      (match {Math.round(moodScore * 100)}%)
                    </span>
                  ) : null}
                </>
              )}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* PAGE                                                                        */
/* -------------------------------------------------------------------------- */

export default function MarketplacePage() {
  const [mode, setMode] = useState<LensMode>("browse");

  // Lenses (user-selected)
  const [activeCode, setActiveCode] = useState<MythicalCode | null>(null);
  const [activeMood, setActiveMood] = useState<MoodLens | null>(null);

  // Light location lens (UI-first)
  const [activeCity, setActiveCity] = useState<string | null>(null);

  const experiences = useMemo(() => {
    // Base list
    let list: Experience[] = [...MOCK_EXPERIENCES];

    // Location lens: reorder by city match (no filtering)
    if (activeCity) {
      list.sort((a, b) => {
        const aScore = a.city === activeCity ? 1 : 0;
        const bScore = b.city === activeCity ? 1 : 0;
        return bScore - aScore;
      });
    }

    // Code lens: reorder by resonance (no filtering)
    if (activeCode) {
      list.sort((a, b) => {
        const aScore = a.resonatesWith.includes(activeCode) ? 1 : 0;
        const bScore = b.resonatesWith.includes(activeCode) ? 1 : 0;
        return bScore - aScore;
      });
    }

    // Mood lens: reorder by trait-range score (no filtering)
    if (activeMood) {
      list.sort((a, b) => {
        const aScore = scoreMoodMatch(a.traits, activeMood);
        const bScore = scoreMoodMatch(b.traits, activeMood);
        return bScore - aScore;
      });
    }

    return list;
  }, [activeCity, activeCode, activeMood]);

  const availableCities = useMemo(() => {
    const set = new Set<string>();
    MOCK_EXPERIENCES.forEach((e) => set.add(e.city));
    return Array.from(set);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <MarketplaceNav mode={mode} setMode={setMode} />

      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="mb-14 max-w-3xl">
          <h1 className="text-3xl font-semibold">
            Explore experiences through different lenses
          </h1>
          <p className="mt-4 text-white/60">
            Ethos doesn’t rank or recommend. You choose a lens (code, mood, or
            location) — we only change emphasis.
          </p>
        </div>

        {/* LENS PANELS */}
        {mode === "codes" && (
          <section className="mb-10">
            <div className="mb-3 text-sm text-white/70">
              Choose a Mythical Code lens (optional). Nothing disappears — we only
              emphasise resonance.
            </div>
             <div className="flex flex-wrap gap-3">
              {MYTHICAL_CODES.map((code) => (
                <button
                key={code}
                onClick={() =>
                  setActiveCode(activeCode === code ? null : code)
                }
                className={clsx(
                  "rounded-full border px-4 py-2 text-sm transition capitalize",
                  activeCode === code
                  ? "bg-white text-black border-white"
                  : "border-white/20 text-white/70 hover:text-white hover:border-white/30"
                )}
                >
                     {code}
        </button>
      ))}
      </div>

            {activeCode && (
      <p className="mt-4 text-xs text-white/50">
        Viewing through:{" "}
        <span className="text-white capitalize">{activeCode}</span>
      </p>
    )}
  </section>
)}

        {mode === "mood" && (
          <section className="mb-10">
            <div className="mb-3 text-sm text-white/70">
              Choose a mood lens (optional). This is not a filter — it only changes
              ordering and emphasis.
            </div>
            <div className="flex flex-wrap gap-3">
              {(
                [
                  "calm",
                  "reflective",
                  "social",
                  "expressive",
                  "grounded",
                  "exploratory",
                ] as MoodLens[]
              ).map((mood) => (
                <button
                  key={mood}
                  onClick={() => setActiveMood(activeMood === mood ? null : mood)}
                  className={clsx(
                    "rounded-full border px-4 py-2 text-sm transition capitalize",
                    activeMood === mood
                      ? "bg-white text-black border-white"
                      : "border-white/20 text-white/70 hover:text-white hover:border-white/30"
                  )}
                >
                  {mood}
                </button>
              ))}
            </div>

            {activeMood && (
              <p className="mt-4 text-xs text-white/50">
                Viewing through: <span className="text-white">{activeMood}</span>
              </p>
            )}
          </section>
        )}

        {mode === "location" && (
          <section className="mb-10">
            <div className="mb-3 text-sm text-white/70">
              Choose a location lens (optional). Nothing disappears — we only
              emphasise what matches.
            </div>
            <div className="flex flex-wrap gap-3">
              {availableCities.map((city) => (
                <button
                  key={city}
                  onClick={() => setActiveCity(activeCity === city ? null : city)}
                  className={clsx(
                    "rounded-full border px-4 py-2 text-sm transition",
                    activeCity === city
                      ? "bg-white text-black border-white"
                      : "border-white/20 text-white/70 hover:text-white hover:border-white/30"
                  )}
                >
                  {city}
                </button>
              ))}
            </div>

            {activeCity && (
              <p className="mt-4 text-xs text-white/50">
                Viewing through: <span className="text-white">{activeCity}</span>
              </p>
            )}
          </section>
        )}

        {/* GRID */}
        <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {experiences.map((exp) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              lensMode={mode}
              activeCode={activeCode}
              activeMood={activeMood}
            />
          ))}
        </section>

        {/* Footer Ethics */}
        <div className="mt-20 border-t border-white/10 pt-8 text-xs text-white/40 max-w-3xl">
          Ethos does not rank or recommend experiences. Lenses are user-selected
          and only change emphasis. Any resonance shown is descriptive and optional.
        </div>
      </main>
    </div>
  );
}
