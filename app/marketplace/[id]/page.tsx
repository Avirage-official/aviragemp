"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import clsx from "clsx";

/* -------------------------------------------------------------------------- */
/* TYPES (PRISMA-SAFE SHAPE)                                                   */
/* -------------------------------------------------------------------------- */

type ExperienceTraits = {
  energy: number;
  social: number;
  structure: number;
  expression: number;
  nature: number;
  pace: number;
  introspection: number;
};

type HostProfile = {
  name: string;
  ethos: string;
  approach: string[];
  values: string[];
};

type ExperienceTimelineStep = {
  phase: string;
  description: string;
};

type Experience = {
  id: string;
  title: string;
  description: string;
  location: string;
  city: string;
  traits: ExperienceTraits;
  resonatesWith: string[];
  whatToExpect: string[];
  whatHappensNext: string;
  host: HostProfile;
  timeline: ExperienceTimelineStep[];
};

/* -------------------------------------------------------------------------- */
/* MOCK DATA (DROP-IN REPLACED BY PRISMA LATER)                                */
/* -------------------------------------------------------------------------- */

const MOCK_EXPERIENCES: Experience[] = [
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
      introspection: 90,
    },
    resonatesWith: ["khoisan", "lhumir", "tjukari"],
    whatToExpect: [
      "Minimal facilitation",
      "Extended periods of silence",
      "Outdoor terrain and weather exposure",
      "No performance or sharing requirement",
    ],
    whatHappensNext:
      "After you send an inquiry, the host will respond with timing options, practical details, and any preparation guidance.",
    host: {
      name: "Coastal Presence Collective",
      ethos:
        "We design experiences that prioritise slowness, autonomy, and respect for place.",
      approach: [
        "Non-directive facilitation",
        "Environmental attunement",
        "Low-intervention presence",
      ],
      values: ["Autonomy", "Care for place", "Quiet integrity"],
    },
    timeline: [
      {
        phase: "Arrival",
        description:
          "Participants arrive independently and orient themselves to the coastline at their own pace.",
      },
      {
        phase: "Walking phase",
        description:
          "A loosely shared time window where individuals move quietly along the coast, following natural curiosity.",
      },
      {
        phase: "Pause & presence",
        description:
          "Natural stopping points emerge — sitting, observing, or standing still.",
      },
      {
        phase: "Closing",
        description:
          "The experience ends without a formal closing circle. Departure is self-directed.",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* UI HELPERS                                                                  */
/* -------------------------------------------------------------------------- */

function TraitBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs text-white/50 mb-1">
        <span>{label}</span>
        <span>{value}</span>
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
/* INQUIRY MODAL (REFLECTIVE, NON-TRANSACTIONAL)                               */
/* -------------------------------------------------------------------------- */

function InquiryModal({
  open,
  onClose,
  experienceTitle,
}: {
  open: boolean;
  onClose: () => void;
  experienceTitle: string;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur">
      <div className="w-full max-w-lg rounded-2xl bg-black border border-white/15 p-8">
        <h3 className="text-lg font-medium mb-4">
          Start a conversation
        </h3>
        <p className="text-sm text-white/60 mb-6">
          This is not a booking. It’s a quiet first step to ask questions,
          clarify fit, or express interest in <b>{experienceTitle}</b>.
        </p>

        <textarea
          placeholder="What made you curious about this experience?"
          className="w-full h-32 rounded-lg bg-white/5 border border-white/15 p-4 text-sm text-white placeholder:text-white/40 focus:outline-none"
        />

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-white/60 hover:text-white"
          >
            Cancel
          </button>
          <button
            className="px-5 py-2 rounded-lg bg-white text-black text-sm font-medium hover:opacity-90"
          >
            Send inquiry
          </button>
        </div>
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

  const lens = searchParams.get("lens");
  const codeLens = searchParams.get("code");

  const experience = useMemo(
    () => MOCK_EXPERIENCES.find((e) => e.id === params.id),
    [params.id]
  );

  const [showResonance, setShowResonance] = useState(false);
  const [showInquiry, setShowInquiry] = useState(false);

  if (!experience) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-white/60">
          This experience is no longer available.
        </p>
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
          <h1 className="text-3xl font-semibold">
            {experience.title}
          </h1>
          <p className="text-white/60 mt-4 leading-relaxed">
            {experience.description}
          </p>
        </div>

        {/* FEEL */}
        <section className="mb-16">
          <h2 className="text-lg font-medium mb-6">
            How this experience tends to feel
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TraitBar label="Energy demand" value={experience.traits.energy} />
            <TraitBar label="Social density" value={experience.traits.social} />
            <TraitBar label="Structure" value={experience.traits.structure} />
            <TraitBar label="Expressiveness" value={experience.traits.expression} />
            <TraitBar label="Nature involvement" value={experience.traits.nature} />
            <TraitBar label="Pace" value={experience.traits.pace} />
          </div>
        </section>

        {/* EXPECT */}
        <section className="mb-16">
          <h2 className="text-lg font-medium mb-6">
            What people often notice
          </h2>

          <ul className="space-y-3 text-white/70">
            {experience.whatToExpect.map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>

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
                rhythms and environments:
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

        {/* TIMELINE */}
        <section className="mb-16">
          <h2 className="text-lg font-medium mb-6">
            How a session unfolds
          </h2>

          <div className="space-y-6 max-w-3xl">
            {experience.timeline.map((step, i) => (
              <div key={i}>
                <div className="text-sm font-medium">{step.phase}</div>
                <p className="text-sm text-white/60 mt-1">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* HOST */}
        <section className="mb-16">
          <h2 className="text-lg font-medium mb-4">
            Hosted by
          </h2>

          <div className="max-w-3xl text-white/60 text-sm space-y-4">
            <p>{experience.host.ethos}</p>

            <div>
              <div className="text-white/80 mb-1">Approach</div>
              <ul className="list-disc list-inside">
                {experience.host.approach.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-white/80 mb-1">Values</div>
              <div className="flex flex-wrap gap-2">
                {experience.host.values.map((v) => (
                  <span
                    key={v}
                    className="px-3 py-1 rounded-full border border-white/20 text-xs"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* NEXT */}
        <section className="mb-24">
          <h2 className="text-lg font-medium mb-4">
            What happens next
          </h2>
          <p className="text-white/60 max-w-2xl">
            {experience.whatHappensNext}
          </p>

          <button
            onClick={() => setShowInquiry(true)}
            className="mt-8 px-6 py-3 rounded-lg bg-white text-black text-sm font-medium hover:opacity-90 transition"
          >
            Send inquiry
          </button>
        </section>

        {/* FOOTER */}
        <div className="border-t border-white/10 pt-8 text-xs text-white/40 max-w-xl">
          Ethos does not rank or recommend experiences. Any resonance shown is
          descriptive and optional.
        </div>
      </main>

      <InquiryModal
        open={showInquiry}
        onClose={() => setShowInquiry(false)}
        experienceTitle={experience.title}
      />
    </div>
  );
}
