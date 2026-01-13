"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

/* -------------------------------------------------------------------------- */
/* MYTHICAL CODES (shared vocabulary)                                          */
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
/* TYPES (PRISMA-SAFE)                                                         */
/* -------------------------------------------------------------------------- */

type ExperienceTraits = {
  energy: number;        // calm ←→ intense
  social: number;        // solo ←→ group
  structure: number;     // guided ←→ open
  expression: number;    // reflective ←→ expressive
  nature: number;        // indoor ←→ nature
  pace: number;          // slow ←→ fast
  introspection: number; // surface ←→ deep
};

type Category =
  | "experience"
  | "retreat"
  | "workshop"
  | "event"
  | "service";

/* -------------------------------------------------------------------------- */
/* UI PRIMITIVES                                                               */
/* -------------------------------------------------------------------------- */

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <h2 className="text-lg font-medium text-white">{title}</h2>
      {description && (
        <p className="mt-2 text-sm text-white/60 max-w-2xl">
          {description}
        </p>
      )}
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Slider({
  label,
  left,
  right,
  value,
  hint,
  onChange,
}: {
  label: string;
  left: string;
  right: string;
  value: number;
  hint?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs text-white/60">
        <span>{left}</span>
        <span>{right}</span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        step={5}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-white"
      />

      <div className="mt-1 text-center text-xs text-white/40">
        {label}: {value}
        {hint && <span className="block mt-1">{hint}</span>}
      </div>
    </div>
  );
}

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
        "rounded-full border px-4 py-2 text-sm capitalize transition",
        active
          ? "bg-white text-black border-white"
          : "border-white/20 text-white/70 hover:text-white hover:border-white/30"
      )}
    >
      {children}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* PAGE                                                                        */
/* -------------------------------------------------------------------------- */

export default function CreateMarketplaceListingPage() {
  const router = useRouter();

  /* BASIC INFO */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("experience");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");

  /* EXPERIENCE PERSONALITY */
  const [traits, setTraits] = useState<ExperienceTraits>({
    energy: 50,
    social: 50,
    structure: 50,
    expression: 50,
    nature: 50,
    pace: 50,
    introspection: 50,
  });

  /* MYTHICAL CODE RESONANCE */
  const [resonatesWith, setResonatesWith] = useState<MythicalCode[]>([]);

  /* HOST INTENT (NEW — IMPORTANT) */
  const [hostIntent, setHostIntent] = useState("");

  /* UI STATE */
  const [isSubmitting, setIsSubmitting] = useState(false);

  function toggleCode(code: MythicalCode) {
    setResonatesWith((prev) =>
      prev.includes(code)
        ? prev.filter((c) => c !== code)
        : [...prev, code]
    );
  }

  async function handleSubmit() {
    if (!title || !description) {
      alert("Title and description are required.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/listings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          category,
          city,
          location,
          traits,
          targetCodes: resonatesWith,
          hostIntent,
          bookingType: "INQUIRY",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create listing");
      }

      router.push("/marketplace");
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="mx-auto max-w-4xl px-6 py-12 space-y-10">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-semibold">
            Create an experience
          </h1>
          <p className="mt-4 text-white/60 max-w-2xl">
            Ethos listings are not advertisements.
            They describe how an experience <em>feels</em>, so people can
            self-select calmly and honestly.
          </p>
        </div>

        {/* EXPERIENCE DETAILS */}
        <Section
          title="Experience details"
          description="Describe what actually happens. Avoid promises, hype, or pressure."
        >
          <div className="space-y-5">
            <input
              placeholder="Experience title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg bg-black/40 border border-white/15 px-4 py-3 text-white outline-none"
            />

            <textarea
              placeholder="Describe the flow, tone, and expectations of the experience."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="w-full rounded-lg bg-black/40 border border-white/15 px-4 py-3 text-white outline-none"
            />

            <div className="flex flex-wrap gap-3">
              {(
                ["experience", "retreat", "workshop", "event", "service"] as Category[]
              ).map((c) => (
                <Pill
                  key={c}
                  active={category === c}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </Pill>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="rounded-lg bg-black/40 border border-white/15 px-4 py-3 text-white outline-none"
              />
              <input
                placeholder="Location (optional)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="rounded-lg bg-black/40 border border-white/15 px-4 py-3 text-white outline-none"
              />
            </div>
          </div>
        </Section>

        {/* EXPERIENCE PERSONALITY */}
        <Section
          title="Experience personality"
          description="These sliders describe the experience itself — not the attendee."
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Slider label="Energy" left="Calm" right="Intense"
              value={traits.energy}
              onChange={(v) => setTraits({ ...traits, energy: v })} />
            <Slider label="Social" left="Solo" right="Group"
              value={traits.social}
              onChange={(v) => setTraits({ ...traits, social: v })} />
            <Slider label="Structure" left="Guided" right="Open"
              value={traits.structure}
              onChange={(v) => setTraits({ ...traits, structure: v })} />
            <Slider label="Expression" left="Reflective" right="Expressive"
              value={traits.expression}
              onChange={(v) => setTraits({ ...traits, expression: v })} />
            <Slider label="Nature" left="Indoor" right="Nature"
              value={traits.nature}
              onChange={(v) => setTraits({ ...traits, nature: v })} />
            <Slider label="Pace" left="Slow" right="Fast"
              value={traits.pace}
              onChange={(v) => setTraits({ ...traits, pace: v })} />
            <Slider label="Introspection" left="Light" right="Deep"
              value={traits.introspection}
              onChange={(v) => setTraits({ ...traits, introspection: v })} />
          </div>
        </Section>

        {/* HOST INTENT */}
        <Section
          title="Host intention"
          description="Why does this experience exist? What do you hope people leave with?"
        >
          <textarea
            placeholder="This experience exists because…"
            value={hostIntent}
            onChange={(e) => setHostIntent(e.target.value)}
            rows={4}
            className="w-full rounded-lg bg-black/40 border border-white/15 px-4 py-3 text-white outline-none"
          />
        </Section>

        {/* CODE RESONANCE */}
        <Section
          title="Mythical code resonance (optional)"
          description="Select codes that may feel comfortable with this experience. This does not target users."
        >
          <div className="flex flex-wrap gap-3">
            {MYTHICAL_CODES.map((code) => (
              <Pill
                key={code}
                active={resonatesWith.includes(code)}
                onClick={() => toggleCode(code)}
              >
                {code}
              </Pill>
            ))}
          </div>

          <p className="mt-4 text-xs text-white/45 max-w-2xl">
            Ethos never assigns people to experiences.
            These signals are descriptive, optional, and always reversible.
          </p>
        </Section>

        {/* SUBMIT */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="rounded-full bg-white px-8 py-3 text-black font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {isSubmitting ? "Creating…" : "Create experience"}
          </button>
        </div>

        {/* FOOTER ETHICS */}
        <div className="pt-8 border-t border-white/10 text-xs text-white/40 max-w-3xl">
          Ethos listings describe experiences, not people.
          No ranking. No pressure. No behavioural targeting.
        </div>
      </main>
    </div>
  );
}
