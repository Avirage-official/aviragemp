"use client";

import Link from "next/link";
import clsx from "clsx";
import { useMemo, useState, useEffect, useRef } from "react";

/* -------------------------------------------------------------------------- */
/* ETHOS MARKETPLACE (UI-FIRST)                                               */
/* - No ranking language (no "top", "best", "trending")                        */
/* - No recommendations                                                       */
/* - No infinite grid                                                         */
/* - Lenses reorder + softly emphasize; content never disappears              */
/* - Listing cards communicate "experience personality" visually              */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/* MYTHICAL CODES                                                             */
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

/* -------------------------------------------------------------------------- */
/* TYPES                                                                      */
/* -------------------------------------------------------------------------- */

type LensMode = "browse" | "codes" | "mood" | "location" | "saved";

type MoodLens =
  | "calm"
  | "reflective"
  | "social"
  | "expressive"
  | "grounded"
  | "exploratory";

type ExperienceTraits = {
  energy: number; // calm ←→ intense
  social: number; // solo ←→ group
  structure: number; // guided ←→ open-ended
  expression: number; // reflective ←→ expressive
  nature: number; // indoor ←→ nature-bound
  pace: number; // slow ←→ fast
  introspection: number; // surface ←→ deep
};

type Experience = {
  id: string;
  title: string;
  description: string;
  location: string;
  city: string;
  category: "experience" | "retreat" | "workshop" | "event" | "service";
  duration: string; // e.g. "2h", "Half-day"
  groupSize: string; // e.g. "Solo", "2–6", "8–20"
  bookingType: "INQUIRY" | "INSTANT"; // UI-first: we still show inquiry-first language
  priceLabel: string; // e.g. "$120", "From $60", "Contact"
  traits: ExperienceTraits;
  resonatesWith: MythicalCode[];
  tags: string[]; // editorial descriptors (not category)
};

/* -------------------------------------------------------------------------- */
/* MOCK DATA (UI-first, replace later with API)                               */
/* IMPORTANT: Do NOT `as const` this array. It causes TS "never" issues on     */
/* `.includes()` due to tuple inference.                                      */
/* -------------------------------------------------------------------------- */

const MOCK_EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    title: "Silent Coastal Walk",
    description:
      "A slow, unguided coastal walk designed for presence, quiet attention, and environmental attunement.",
    location: "Coast",
    city: "Remote",
    category: "experience",
    duration: "2–3h",
    groupSize: "Solo / quiet pairs",
    bookingType: "INQUIRY",
    priceLabel: "Contact",
    traits: {
      energy: 20,
      social: 10,
      structure: 30,
      expression: 15,
      nature: 95,
      pace: 25,
      introspection: 90,
    },
    resonatesWith: ["khoisan", "lhumir", "tjukari"],
    tags: ["quiet", "presence", "nature-led", "low-pressure"],
  },
  {
    id: "exp-2",
    title: "Collective Rhythm Workshop",
    description:
      "A communal rhythm and movement session focused on shared energy, expression, and connection.",
    location: "Studio",
    city: "Urban",
    category: "workshop",
    duration: "90m",
    groupSize: "10–25",
    bookingType: "INQUIRY",
    priceLabel: "From $45",
    traits: {
      energy: 80,
      social: 85,
      structure: 60,
      expression: 90,
      nature: 20,
      pace: 75,
      introspection: 25,
    },
    resonatesWith: ["kayori", "tahiri"],
    tags: ["music", "movement", "collective", "expressive"],
  },
  {
    id: "exp-3",
    title: "Philosophical Walking Dialogue",
    description:
      "A guided walking conversation exploring meaning, inquiry, and reflective thought.",
    location: "Park",
    city: "Urban",
    category: "service",
    duration: "60–90m",
    groupSize: "1–2",
    bookingType: "INQUIRY",
    priceLabel: "$85",
    traits: {
      energy: 45,
      social: 35,
      structure: 55,
      expression: 45,
      nature: 60,
      pace: 40,
      introspection: 85,
    },
    resonatesWith: ["alethir", "yatevar"],
    tags: ["meaning", "dialogue", "guided", "reflective"],
  },
  {
    id: "exp-4",
    title: "Horizon Ride (Wide Space)",
    description:
      "A wide-space ride designed for autonomy, long-horizon thinking, and calm confidence of movement.",
    location: "Open Plains",
    city: "Regional",
    category: "experience",
    duration: "Half-day",
    groupSize: "2–6",
    bookingType: "INQUIRY",
    priceLabel: "From $120",
    traits: {
      energy: 55,
      social: 25,
      structure: 25,
      expression: 30,
      nature: 85,
      pace: 55,
      introspection: 55,
    },
    resonatesWith: ["khoruun", "sahen"],
    tags: ["freedom", "space", "movement", "self-directed"],
  },
  {
    id: "exp-5",
    title: "Precision Craft Session",
    description:
      "A quiet, structured craft session for people who enjoy detail, repetition, and refinement.",
    location: "Workshop",
    city: "Urban",
    category: "workshop",
    duration: "2h",
    groupSize: "4–10",
    bookingType: "INQUIRY",
    priceLabel: "$60",
    traits: {
      energy: 35,
      social: 25,
      structure: 85,
      expression: 20,
      nature: 10,
      pace: 30,
      introspection: 65,
    },
    resonatesWith: ["shokunin", "siyuane"],
    tags: ["craft", "structured", "quiet", "quality"],
  },
  {
    id: "exp-6",
    title: "Deep Stillness Session",
    description:
      "A contemplative, guided stillness practice focused on clarity, meaning, and gentle discipline.",
    location: "Retreat House",
    city: "Regional",
    category: "retreat",
    duration: "Half-day",
    groupSize: "6–14",
    bookingType: "INQUIRY",
    priceLabel: "Contact",
    traits: {
      energy: 15,
      social: 30,
      structure: 70,
      expression: 15,
      nature: 55,
      pace: 15,
      introspection: 95,
    },
    resonatesWith: ["lhumir", "yatevar"],
    tags: ["stillness", "meaning", "gentle-guidance", "calm"],
  },
  {
    id: "exp-7",
    title: "Warm Hospitality Table",
    description:
      "A hosted evening designed for warmth, care, conversation, and shared presence—without performance.",
    location: "Home Dining",
    city: "Urban",
    category: "event",
    duration: "3h",
    groupSize: "6–12",
    bookingType: "INQUIRY",
    priceLabel: "From $55",
    traits: {
      energy: 55,
      social: 75,
      structure: 55,
      expression: 70,
      nature: 10,
      pace: 45,
      introspection: 40,
    },
    resonatesWith: ["tahiri", "kayori"],
    tags: ["hospitality", "warm", "social", "gentle"],
  },
];

/* -------------------------------------------------------------------------- */
/* DISCOVERY LENSES                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Mood lenses are user-selected and descriptive.
 * They do NOT filter. They reorder + highlight softly.
 */
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
    checks += 1;

    const v = traits[key];
    if (v >= range[0] && v <= range[1]) score += 1;
  });

  return checks === 0 ? 0 : score / checks;
}

/* -------------------------------------------------------------------------- */
/* SMALL UI PRIMITIVES                                                        */
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
  density = "compact",
}: {
  traits: ExperienceTraits;
  density?: "compact" | "full";
}) {
  const rows: Array<{ k: keyof ExperienceTraits; label: string }> = [
    { k: "energy", label: "Energy" },
    { k: "social", label: "Social" },
    { k: "structure", label: "Structure" },
    { k: "expression", label: "Expression" },
  ];

  return (
    <div className={clsx("mt-4", density === "full" ? "space-y-3" : "space-y-2")}>
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
/* MARKETPLACE NAV (permanent)                                                 */
/* -------------------------------------------------------------------------- */

function MarketplaceNav({
  mode,
  setMode,
  lensSummary,
}: {
  mode: LensMode;
  setMode: (m: LensMode) => void;
  lensSummary: string;
}) {
  const items: Array<{ id: LensMode; label: string; hint: string }> = [
    { id: "browse", label: "Browse", hint: "Calm, neutral entry" },
    { id: "codes", label: "Codes", hint: "View through a code lens" },
    { id: "mood", label: "Mood", hint: "View through a feeling lens" },
    { id: "location", label: "Location", hint: "View through place" },
    { id: "saved", label: "Saved", hint: "Private shortlist" },
  ];

  return (
    <nav className="sticky top-0 z-20 border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-7">
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium text-white/90">Marketplace</span>
            <span className="text-[11px] text-white/45">A marketplace of ways of experiencing the world.</span>
          </div>

          <div className="flex items-center gap-5">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => setMode(item.id)}
                className={clsx(
                  "text-sm transition",
                  mode === item.id ? "text-white" : "text-white/50 hover:text-white/80"
                )}
                title={item.hint}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden md:block text-xs text-white/40">
          {lensSummary || "Lenses reorder + highlight — nothing is ranked."}
        </div>
      </div>
    </nav>
  );
}

/* -------------------------------------------------------------------------- */
/* SEARCH + COLLECTIONS (editorial, not ranking)                               */
/* -------------------------------------------------------------------------- */

type CollectionKey =
  | "new-noteworthy"
  | "quiet-favourites"
  | "unexpected-pairings"
  | "nature-led"
  | "structured-craft";

const COLLECTIONS: Array<{
  key: CollectionKey;
  label: string;
  description: string;
  match: (e: Experience) => boolean;
}> = [
  {
    key: "new-noteworthy",
    label: "New & Noteworthy",
    description: "Freshly added experiences. Not “better”, just new.",
    match: (e) => ["exp-6", "exp-7"].includes(e.id),
  },
  {
    key: "quiet-favourites",
    label: "Quiet Favourites",
    description: "Low-pressure experiences with gentle pacing.",
    match: (e) => e.traits.energy <= 35 && e.traits.pace <= 45,
  },
  {
    key: "unexpected-pairings",
    label: "Unexpected Pairings",
    description: "Mixes you wouldn’t search for directly.",
    match: (e) => e.tags.includes("movement") || e.tags.includes("dialogue"),
  },
  {
    key: "nature-led",
    label: "Nature-led",
    description: "Place is part of the experience.",
    match: (e) => e.traits.nature >= 70,
  },
  {
    key: "structured-craft",
    label: "Structured Craft",
    description: "Precision, repetition, refinement.",
    match: (e) => e.traits.structure >= 70 && e.tags.includes("craft"),
  },
];

function SearchBar({
  query,
  setQuery,
  onClear,
}: {
  query: string;
  setQuery: (v: string) => void;
  onClear: () => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-center gap-3">
        <div className="text-white/50">⌕</div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, tag, place, or feeling…"
          className="w-full bg-transparent text-sm text-white/90 placeholder:text-white/35 outline-none"
        />
        {query.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs text-white/50 hover:text-white/80 transition"
          >
            Clear
          </button>
        )}
      </div>
      <div className="mt-2 text-xs text-white/40">
        No ranking. Search simply narrows what you’re looking at.
      </div>
    </div>
  );
}

function CollectionRow({
  activeCollection,
  setActiveCollection,
}: {
  activeCollection: CollectionKey | null;
  setActiveCollection: (v: CollectionKey | null) => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="mb-3 flex items-start justify-between gap-6">
        <div>
          <div className="text-sm text-white/80">Editorial collections</div>
          <div className="text-xs text-white/40 mt-1">
            These are not exhaustive. They are gentle starting points.
          </div>
        </div>
        {activeCollection && (
          <button
            onClick={() => setActiveCollection(null)}
            className="text-xs text-white/50 hover:text-white/80 transition"
          >
            Clear collection
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {COLLECTIONS.map((c) => (
          <Pill
            key={c.key}
            active={activeCollection === c.key}
            onClick={() => setActiveCollection(activeCollection === c.key ? null : c.key)}
          >
            {c.label}
          </Pill>
        ))}
      </div>

      {activeCollection && (
        <div className="mt-3 text-xs text-white/45">
          {COLLECTIONS.find((c) => c.key === activeCollection)?.description}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* EXPERIENCE CARD                                                             */
/* -------------------------------------------------------------------------- */

function ExperienceCard({
  experience,
  lensMode,
  activeCode,
  activeMood,
  activeCity,
  query,
  activeCollection,
}: {
  experience: Experience;
  lensMode: LensMode;
  activeCode: MythicalCode | null;
  activeMood: MoodLens | null;
  activeCity: string | null;
  query: string;
  activeCollection: CollectionKey | null;
}) {
  // Code resonance
  const resonates =
    activeCode !== null && experience.resonatesWith.includes(activeCode);

  // Mood emphasis
  const moodScore = activeMood ? scoreMoodMatch(experience.traits, activeMood) : 0;
  const moodAligned = activeMood ? moodScore >= 0.6 : false;

  // Location emphasis
  const locationAligned = activeCity ? experience.city === activeCity : false;

  // Collection emphasis (not a filter; just styling + ordering happens elsewhere)
  const collectionAligned = activeCollection
    ? COLLECTIONS.find((c) => c.key === activeCollection)?.match(experience) ?? false
    : false;

  // Search "hit" (used for subtle emphasis)
  const q = query.trim().toLowerCase();
  const searchHit =
    q.length === 0
      ? false
      : [
          experience.title,
          experience.description,
          experience.location,
          experience.city,
          experience.category,
          experience.duration,
          experience.groupSize,
          experience.tags.join(" "),
          experience.resonatesWith.join(" "),
        ]
          .join(" ")
          .toLowerCase()
          .includes(q);

  // Build detail URL with context
  const href = (() => {
    const params = new URLSearchParams();
    params.set("lens", lensMode);
    if (activeCode) params.set("code", activeCode);
    if (activeMood) params.set("mood", activeMood);
    if (activeCity) params.set("city", activeCity);
    if (activeCollection) params.set("collection", activeCollection);
    if (q) params.set("q", q);
    return `/marketplace/${experience.id}?${params.toString()}`;
  })();

  const emphasized = resonates || moodAligned || locationAligned || collectionAligned || searchHit;

  return (
    <Link
      href={href}
      className={clsx(
        "group rounded-2xl border bg-white/5 p-6 transition",
        "border-white/10 hover:border-white/25 hover:bg-white/[0.07]",
        emphasized && "ring-1 ring-white/20",
        // soft emphasis differences
        moodAligned && "border-white/35",
        resonates && "ring-white/30"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-lg font-medium text-white">{experience.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-white/60">
            {experience.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <MiniMeta label="City" value={experience.city} />
            <MiniMeta label="Place" value={experience.location} />
            <MiniMeta label="Duration" value={experience.duration} />
            <MiniMeta label="Group" value={experience.groupSize} />
          </div>
        </div>

        <div className="shrink-0 text-right">
          <div className="text-xs text-white/45">{experience.priceLabel}</div>
          <div className="mt-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] text-white/60 capitalize">
            {experience.category}
          </div>
        </div>
      </div>

      {/* Experience Personality (Ethos signature) */}
      <PersonalityStrip traits={experience.traits} />

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {experience.tags.slice(0, 4).map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-white/55"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Soft indicators (assistive, not authoritative) */}
      {(activeCode || activeMood || activeCity || activeCollection || q) && (
        <div className="mt-4 text-xs text-white/45">
          {activeCode && resonates && (
            <span>
              Often resonates with <span className="text-white">{activeCode}</span>
            </span>
          )}

          {activeMood && (
            <span className={clsx(activeCode && resonates && "ml-2")}>
              <span className="text-white/60">·</span>{" "}
              Mood lens: <span className="text-white">{activeMood}</span>{" "}
              <span className="text-white/40">(match {Math.round(moodScore * 100)}%)</span>
            </span>
          )}

          {activeCity && (
            <span className={clsx((activeCode && resonates) || activeMood ? "ml-2" : "")}>
              <span className="text-white/60">·</span>{" "}
              Place lens: <span className="text-white">{activeCity}</span>
              {locationAligned ? <span className="text-white/40"> (here)</span> : null}
            </span>
          )}

          {activeCollection && (
            <span className={clsx((activeCode && resonates) || activeMood || activeCity ? "ml-2" : "")}>
              <span className="text-white/60">·</span>{" "}
              Collection: <span className="text-white">{COLLECTIONS.find((c) => c.key === activeCollection)?.label}</span>
            </span>
          )}

          {q && (
            <span className={clsx((activeCode && resonates) || activeMood || activeCity || activeCollection ? "ml-2" : "")}>
              <span className="text-white/60">·</span>{" "}
              Search: <span className="text-white/70">{q}</span>
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

  // User-selected lenses
  const [activeCode, setActiveCode] = useState<MythicalCode | null>(null);
  const [activeMood, setActiveMood] = useState<MoodLens | null>(null);
  const [activeCity, setActiveCity] = useState<string | null>(null);

  // Editorial collection (browse mode)
  const [activeCollection, setActiveCollection] = useState<CollectionKey | null>(null);

  // Search (neutral; not ranking)
  const [query, setQuery] = useState("");

  // Saved (UI-only local)
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const savedRef = useRef<Set<string>>(new Set());

  // Keep savedRef in sync (so we can do O(1) lookups)
  useEffect(() => {
    savedRef.current = new Set(savedIds);
  }, [savedIds]);

  const lensSummary = useMemo(() => {
    const parts: string[] = [];
    if (activeCode) parts.push(`Code: ${activeCode}`);
    if (activeMood) parts.push(`Mood: ${activeMood}`);
    if (activeCity) parts.push(`Place: ${activeCity}`);
    if (activeCollection) parts.push(`Collection: ${COLLECTIONS.find((c) => c.key === activeCollection)?.label}`);
    if (query.trim()) parts.push(`Search: ${query.trim()}`);
    return parts.join(" · ");
  }, [activeCode, activeMood, activeCity, activeCollection, query]);

  const availableCities = useMemo(() => {
    const set = new Set<string>();
    MOCK_EXPERIENCES.forEach((e) => set.add(e.city));
    return Array.from(set);
  }, []);

  const clearLenses = () => {
    setActiveCode(null);
    setActiveMood(null);
    setActiveCity(null);
    setActiveCollection(null);
    setQuery("");
  };

  const toggleSaved = (id: string) => {
    setSavedIds((prev) => {
      const exists = prev.includes(id);
      if (exists) return prev.filter((x) => x !== id);
      return [...prev, id];
    });
  };

  // SEARCH NARROWING (not ranking) - keeps list relevant for now
  const searchFiltered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MOCK_EXPERIENCES;

    return MOCK_EXPERIENCES.filter((e) => {
      const blob = [
        e.title,
        e.description,
        e.location,
        e.city,
        e.category,
        e.duration,
        e.groupSize,
        e.tags.join(" "),
        e.resonatesWith.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return blob.includes(q);
    });
  }, [query]);

  // Apply ordering + emphasis without filtering out content (except search narrowing above)
  const experiences = useMemo(() => {
    let list: Experience[] = [...searchFiltered];

    // Collections are editorial entry points (browse mode). They reorder with soft priority.
    if (activeCollection) {
      const collection = COLLECTIONS.find((c) => c.key === activeCollection);
      if (collection) {
        list.sort((a, b) => Number(collection.match(b)) - Number(collection.match(a)));
      }
    }

    // Location lens reorder
    if (activeCity) {
      list.sort((a, b) => Number(b.city === activeCity) - Number(a.city === activeCity));
    }

    // Code lens reorder
    if (activeCode) {
      list.sort(
        (a, b) =>
          Number(b.resonatesWith.includes(activeCode)) -
          Number(a.resonatesWith.includes(activeCode))
      );
    }

    // Mood lens reorder (trait-based)
    if (activeMood) {
      list.sort((a, b) => scoreMoodMatch(b.traits, activeMood) - scoreMoodMatch(a.traits, activeMood));
    }

    // Saved mode reorder (saved first)
    if (mode === "saved") {
      list.sort((a, b) => Number(savedRef.current.has(b.id)) - Number(savedRef.current.has(a.id)));
      // In saved mode we still show all, but saved rise to top; copy stays calm.
    }

    return list;
  }, [searchFiltered, activeCollection, activeCity, activeCode, activeMood, mode]);

  // Display slice to avoid “infinite grid” feel
  const [visibleCount, setVisibleCount] = useState(9);
  useEffect(() => {
    // Reset pagination when lenses change
    setVisibleCount(9);
  }, [mode, activeCode, activeMood, activeCity, activeCollection, query]);

  const visibleExperiences = useMemo(() => experiences.slice(0, visibleCount), [experiences, visibleCount]);

  return (
    <div className="min-h-screen bg-black text-white">
      <MarketplaceNav mode={mode} setMode={setMode} lensSummary={lensSummary} />

      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Header */}
        <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-semibold">
              Discover experiences without being pushed.
            </h1>
            <p className="mt-4 text-white/60 max-w-2xl">
              Ethos isn’t a catalogue. It’s guided discovery: identity → intention → experience.
              You choose how the world is arranged.
            </p>

            {/* Lens summary + clear */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/55">
                {lensSummary || "No lens selected"}
              </div>
              {(activeCode || activeMood || activeCity || activeCollection || query.trim()) && (
                <button
                  onClick={clearLenses}
                  className="text-xs text-white/50 hover:text-white/80 transition"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-1 space-y-4">
            <SearchBar query={query} setQuery={setQuery} onClear={() => setQuery("")} />
            {mode === "browse" && (
              <CollectionRow
                activeCollection={activeCollection}
                setActiveCollection={setActiveCollection}
              />
            )}
          </div>
        </div>

        {/* LENS PANELS */}
        <div className="mb-10">
          {mode === "codes" && (
            <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="mb-3 text-sm text-white/80">
                Mythical Code lens
              </div>
              <div className="text-xs text-white/45 mb-4 max-w-3xl">
                This does not label you. It doesn’t recommend. It simply highlights experiences
                that often feel comfortable to people who share similar patterns.
              </div>

              <div className="flex flex-wrap gap-3">
                {MYTHICAL_CODES.map((code) => (
                  <Pill
                    key={code}
                    active={activeCode === code}
                    onClick={() => setActiveCode(activeCode === code ? null : code)}
                  >
                    {code}
                  </Pill>
                ))}
              </div>

              {activeCode && (
                <div className="mt-4 text-xs text-white/50">
                  Viewing through: <span className="text-white capitalize">{activeCode}</span>
                </div>
              )}
            </section>
          )}

          {mode === "mood" && (
            <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="mb-3 text-sm text-white/80">Mood lens</div>
              <div className="text-xs text-white/45 mb-4 max-w-3xl">
                Mood lenses are temporary. They describe what you want to feel — not who you are.
                Nothing disappears; we only change emphasis.
              </div>

              <div className="flex flex-wrap gap-3">
                {(
                  ["calm", "reflective", "social", "expressive", "grounded", "exploratory"] as MoodLens[]
                ).map((mood) => (
                  <Pill
                    key={mood}
                    active={activeMood === mood}
                    onClick={() => setActiveMood(activeMood === mood ? null : mood)}
                  >
                    {mood}
                  </Pill>
                ))}
              </div>

              {activeMood && (
                <div className="mt-4 text-xs text-white/50">
                  Viewing through: <span className="text-white capitalize">{activeMood}</span>
                </div>
              )}
            </section>
          )}

          {mode === "location" && (
            <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="mb-3 text-sm text-white/80">Place lens</div>
              <div className="text-xs text-white/45 mb-4 max-w-3xl">
                A calm way to browse without categories-first pressure. Nothing disappears.
              </div>

              <div className="flex flex-wrap gap-3">
                {availableCities.map((city) => (
                  <Pill
                    key={city}
                    active={activeCity === city}
                    onClick={() => setActiveCity(activeCity === city ? null : city)}
                  >
                    {city}
                  </Pill>
                ))}
              </div>

              {activeCity && (
                <div className="mt-4 text-xs text-white/50">
                  Viewing through: <span className="text-white">{activeCity}</span>
                </div>
              )}
            </section>
          )}

          {mode === "saved" && (
            <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="mb-2 text-sm text-white/80">Saved</div>
              <div className="text-xs text-white/45">
                Saving is private. It doesn’t mean commitment. No pressure.
              </div>
            </section>
          )}
        </div>

        {/* RESULTS HEADER */}
        <div className="mb-6 flex items-end justify-between gap-6">
          <div>
            <div className="text-sm text-white/70">
              {experiences.length} experiences visible
            </div>
            <div className="text-xs text-white/40 mt-1">
              No rankings. No “best”. You’re just changing emphasis.
            </div>
          </div>

          <div className="text-xs text-white/45">
            Showing {Math.min(visibleCount, experiences.length)} / {experiences.length}
          </div>
        </div>

        {/* GRID (not infinite; pagination-style) */}
        {experiences.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-10 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <div className="text-white/80">Nothing matched that search.</div>
            <div className="text-white/45 text-sm mt-2">
              Try fewer words — or clear the search to return to browsing.
            </div>
            <button
              onClick={() => setQuery("")}
              className="mt-6 rounded-full bg-white px-5 py-2 text-sm text-black hover:opacity-90 transition"
            >
              Clear search
            </button>
          </div>
        ) : (
          <>
            <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {visibleExperiences.map((exp) => (
                <div key={exp.id} className="relative">
                  <ExperienceCard
                    experience={exp}
                    lensMode={mode}
                    activeCode={activeCode}
                    activeMood={activeMood}
                    activeCity={activeCity}
                    query={query}
                    activeCollection={activeCollection}
                  />

                  {/* Save button (UI-only) */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSaved(exp.id);
                    }}
                    className={clsx(
                      "absolute right-4 top-4 rounded-full border px-3 py-2 text-xs transition",
                      savedRef.current.has(exp.id)
                        ? "border-white/25 bg-white text-black"
                        : "border-white/15 bg-black/40 text-white/70 hover:text-white hover:border-white/25"
                    )}
                    title="Save privately"
                  >
                    {savedRef.current.has(exp.id) ? "Saved" : "Save"}
                  </button>
                </div>
              ))}
            </section>

            {/* Load more (anti-infinite-grid) */}
            {visibleCount < experiences.length && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => setVisibleCount((c) => Math.min(experiences.length, c + 6))}
                  className="rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm text-white/80 hover:text-white hover:border-white/25 transition"
                >
                  Show more
                </button>
              </div>
            )}
          </>
        )}

        {/* ETHICS FOOTER */}
        <div className="mt-20 border-t border-white/10 pt-8 text-xs text-white/40 max-w-3xl">
          Ethos does not rank or recommend experiences. Lenses are user-selected and only change emphasis.
          Resonance indicators are descriptive and optional.
        </div>
      </main>
    </div>
  );
}
