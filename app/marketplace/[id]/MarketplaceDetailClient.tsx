"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import clsx from "clsx";

export type ListingDetailView = {
  id: string;
  title: string;
  description: string;
  location: string;
  city: string;
  category: string;
  price: number | null;
  pricingType: string;
  bookingType: "INQUIRY" | "INSTANT";
  targetCodes: string[];
  business: {
    businessName: string;
    description: string;
    website: string | null;
    primaryCode: string | null;
    secondaryCode: string | null;
    tertiaryCode: string | null;
  };
  editorial: {
    traits: {
      energy: number;
      social: number;
      structure: number;
      expression: number;
      nature: number;
      pace: number;
      introspection: number;
    };
    whatToExpect: string[];
    whatHappensNext: string;
    host: {
      name: string;
      ethos: string;
      approach: string[];
      values: string[];
    };
    timeline: { phase: string; description: string }[];
  };
};

function clamp01(n: number) {
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(100, n));
}

function TraitBar({ label, value }: { label: string; value: number }) {
  const v = clamp01(value);
  return (
    <div>
      <div className="flex justify-between text-xs text-white/50 mb-1">
        <span>{label}</span>
        <span>{v}</span>
      </div>
      <div className="h-1 w-full bg-white/10 rounded">
        <div className="h-1 bg-white/70 rounded" style={{ width: `${v}%` }} />
      </div>
    </div>
  );
}

function InquiryModal({
  open,
  onClose,
  experienceTitle,
  listingId,
}: {
  open: boolean;
  onClose: () => void;
  experienceTitle: string;
  listingId: string;
}) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  async function send() {
    setSending(true);
    setError(null);

    try {
      const res = await fetch("/api/inquiries/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId,
          message: message.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error ?? "Failed to send inquiry.");
        setSending(false);
        return;
      }

      setSent(true);
      setSending(false);
      // Optional: auto-close after short beat; leaving manual keeps it calm.
    } catch {
      setError("An error occurred. Please try again.");
      setSending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur">
      <div className="w-full max-w-lg rounded-2xl bg-black border border-white/15 p-8">
        <h3 className="text-lg font-medium mb-4">Start a conversation</h3>

        {!sent ? (
          <>
            <p className="text-sm text-white/60 mb-6">
              This is not a booking. It’s a quiet first step to ask questions,
              clarify fit, or express interest in <b>{experienceTitle}</b>.
            </p>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What made you curious about this experience?"
              className="w-full h-32 rounded-lg bg-white/5 border border-white/15 p-4 text-sm text-white placeholder:text-white/40 focus:outline-none"
            />

            {error && <p className="mt-3 text-sm text-red-300">{error}</p>}

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm text-white/60 hover:text-white"
                disabled={sending}
              >
                Cancel
              </button>
              <button
                onClick={send}
                disabled={sending}
                className="px-5 py-2 rounded-lg bg-white text-black text-sm font-medium hover:opacity-90 disabled:opacity-60"
              >
                {sending ? "Sending..." : "Send inquiry"}
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-white/70">
              Sent. The host will reply with timing options and details so you
              can decide if it fits.
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-lg bg-white text-black text-sm font-medium hover:opacity-90"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function MarketplaceDetailClient({
  view,
  lens,
  codeLens,
}: {
  view: ListingDetailView;
  lens: string | null;
  codeLens: string | null;
}) {
  const router = useRouter();

  const [showResonance, setShowResonance] = useState(false);
  const [showInquiry, setShowInquiry] = useState(false);

  const resonates = useMemo(() => {
    if (!codeLens) return false;
    // In this detail view we treat "targetCodes" as resonance (descriptive, optional).
    return view.targetCodes.includes(codeLens);
  }, [codeLens, view.targetCodes]);

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
              {lens ?? "browse"}
              {codeLens && ` · ${codeLens}`}
            </span>
          </div>
        )}

        {/* Header */}
        <div className="max-w-3xl mb-14">
          <h1 className="text-3xl font-semibold">{view.title}</h1>
          <p className="text-white/60 mt-4 leading-relaxed">{view.description}</p>
        </div>

        {/* FEEL */}
        <section className="mb-16">
          <h2 className="text-lg font-medium mb-6">
            How this experience tends to feel
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TraitBar label="Energy demand" value={view.editorial.traits.energy} />
            <TraitBar label="Social density" value={view.editorial.traits.social} />
            <TraitBar label="Structure" value={view.editorial.traits.structure} />
            <TraitBar label="Expressiveness" value={view.editorial.traits.expression} />
            <TraitBar label="Nature involvement" value={view.editorial.traits.nature} />
            <TraitBar label="Pace" value={view.editorial.traits.pace} />
          </div>
        </section>

        {/* EXPECT */}
        <section className="mb-16">
          <h2 className="text-lg font-medium mb-6">What people often notice</h2>

          <ul className="space-y-3 text-white/70">
            {view.editorial.whatToExpect.map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>

          <div className="mt-8">
            <button
              onClick={() => setShowResonance(!showResonance)}
              className="text-sm text-white/60 hover:text-white"
            >
              {showResonance ? "Hide resonance context" : "View resonance context"}
            </button>

            {showResonance && (
              <div className="mt-4 text-sm text-white/60 max-w-xl">
                This experience often resonates with people who value similar
                rhythms and environments:
                <div className="mt-2 flex flex-wrap gap-2">
                  {view.targetCodes.map((code) => (
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
          <h2 className="text-lg font-medium mb-6">How a session unfolds</h2>

          <div className="space-y-6 max-w-3xl">
            {view.editorial.timeline.map((step, i) => (
              <div key={i}>
                <div className="text-sm font-medium">{step.phase}</div>
                <p className="text-sm text-white/60 mt-1">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HOST */}
        <section className="mb-16">
          <h2 className="text-lg font-medium mb-4">Hosted by</h2>

          <div className="max-w-3xl text-white/60 text-sm space-y-4">
            <p>{view.editorial.host.ethos}</p>

            <div>
              <div className="text-white/80 mb-1">Approach</div>
              <ul className="list-disc list-inside">
                {view.editorial.host.approach.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-white/80 mb-1">Values</div>
              <div className="flex flex-wrap gap-2">
                {view.editorial.host.values.map((v) => (
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
          <h2 className="text-lg font-medium mb-4">What happens next</h2>
          <p className="text-white/60 max-w-2xl">{view.editorial.whatHappensNext}</p>

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
        experienceTitle={view.title}
        listingId={view.id}
      />
    </div>
  );
}