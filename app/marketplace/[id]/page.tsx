"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import clsx from "clsx";

/* -------------------------------------------------------------------------- */
/* MOCK DATA (shared shape with marketplace page)                              */
/* -------------------------------------------------------------------------- */

const MOCK_EXPERIENCES = [
  {
    id: "exp-1",
    title: "Silent Coastal Walk",
    description:
      "A slow, unguided coastal walk designed for presence, quiet attention, and environmental attunement. Participants move independently while sharing a common rhythm of place.",
    location: "Coast",
    city: "Remote",
    traits: {
      energy: 20,
      social: 10,
      structure: 30,
      expression: 20,
      nature: 95,
      pace: 25,
      introspection: 90
    },
    resonatesWith: ["khoisan", "lhumir", "tjukari"],
    whatToExpect: [
      "Minimal facilitation",
      "Extended periods of silence",
      "Outdoor terrain and weather exposure",
      "No performance or sharing requirement"
    ],
    whatHappensNext:
      "After you send an inquiry, the host will respond with timing options, practical details, and any preparation guidance."
  },
  {
    id: "exp-2",
    title: "Collective Rhythm Workshop",
    description:
      "A communal rhythm and movement session focused on shared energy, expression, and collective presence. No prior experience required.",
    location: "Studio",
    city: "Urban",
    traits: {
      energy: 80,
      social: 85,
      structure: 60,
      expression: 90,
      nature: 20,
      pace: 75,
      introspection: 25
    },
    resonatesWith: ["kayori", "tahiri"],
    whatToExpect: [
      "Group-based movement",
      "Guided rhythm exercises",
      "Expressive participation encouraged",
      "Shared closing reflection"
    ],
    whatHappensNext:
      "The facilitator will reply with session dates, group size, and any accessibility considerations."
  }
];

/* -------------------------------------------------------------------------- */
/* UI Helpers                                                                  */
/* -------------------------------------------------------------------------- */

function TraitBar({
  label,
  value
}: {
  label: string;
  value: number;
}) {
  return (
    <div>
      <div className="flex justify-between text-xs text-white/50 mb-1">
        <span>{label}</span>
      </div>
      <div className="h-1 w-full bg-white/10 rounded">
        <div
          className="h-1 bg-white/70 rounded"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* PAGE                                                                        */
/* -------------------------------------------------------------------------- */

export default function MarketplaceDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const lens = searchParams.get("lens"); // browse | codes | mood | location
  const codeLens = searchParams.get("code"); // mythical code if any

  const experience = useMemo(
    () => MOCK_EXPERIENCES.find((e) => e.id === params.id),
    [params.id]
  );

  const [showResonance, setShowResonance] = useState(false);

  if (!experience) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-white/60">This experience is no longer available.</p>
      </div>
    );
  }

  const resonates =
    codeLens && experience.resonatesWith.includes(codeLens);

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="max-w-5xl mx-auto px-6 py-14">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="text-sm text-white/60 hover:text-white mb-10"
        >
          ← Back to marketplace
        </button>

        {/* Context */}
        {(lens || codeLens) && (
          <div className="mb-6 text-xs text-white/50">
            Viewing through{" "}
            <span className="text-white">
              {lens}
              {codeLens && ` · ${codeLens}`}
            </span>
          </div>
        )}

        {/* Header */}
        <div className="max-w-3xl mb-14">
          <h1 className="text-3xl font-semibold">{experience.title}</h1>
          <p className="text-white/60 mt-4 leading-relaxed">
            {experience.description}
          </p>
        </div>

        {/* Core Question 1: Can I imagine myself here? */}
        <section className="mb-16">
          <h2 className="text-lg font-medium mb-6">
            How this experience tends to feel
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TraitBar label="Energy demand" value={experience.traits.energy} />
            <TraitBar label="Social density" value={experience.traits.social} />
            <TraitBar
              label="Structure"
              value={experience.traits.structure}
            />
            <TraitBar
              label="Expressiveness"
              value={experience.traits.expression}
            />
            <TraitBar
              label="Nature involvement"
              value={experience.traits.nature}
            />
            <TraitBar label="Pace" value={experience.traits.pace} />
          </div>
        </section>

        {/* Core Question 2: Does this fit how I want to feel? */}
        <section className="mb-16">
          <h2 className="text-lg font-medium mb-6">
            What people often notice
          </h2>

          <ul className="space-y-3 text-white/70">
            {experience.whatToExpect.map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>

          {/* Code Resonance (collapsed, optional) */}
          <div className="mt-8">
            <button
              onClick={() => setShowResonance(!showResonance)}
              className="text-sm text-white/60 hover:text-white"
            >
              {showResonance
                ? "Hide resonance context"
                : "View resonance context"}
            </button>

            {showResonance && (
              <div className="mt-4 text-sm text-white/60 max-w-xl">
                This experience often resonates with people who value similar
                rhythms and environments to:
                <div className="mt-2 flex flex-wrap gap-2">
                  {experience.resonatesWith.map((code) => (
                    <span
                      key={code}
                      className={clsx(
                        "px-3 py-1 rounded-full border text-xs",
                        code === codeLens && resonates
                          ? "bg-white text-black"
                          : "border-white/20 text-white/70"
                      )}
                    >
                      {code}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Core Question 3: What happens if I reach out? */}
        <section className="mb-24">
          <h2 className="text-lg font-medium mb-4">What happens next</h2>
          <p className="text-white/60 max-w-2xl">
            {experience.whatHappensNext}
          </p>

          <button className="mt-8 px-6 py-3 rounded-lg bg-white text-black text-sm font-medium hover:opacity-90 transition">
            Send inquiry
          </button>
        </section>

        {/* Footer Ethics */}
        <div className="border-t border-white/10 pt-8 text-xs text-white/40 max-w-xl">
          Ethos does not rank or recommend experiences. Any resonance shown is
          descriptive and optional.
        </div>
      </main>
    </div>
  );
}
