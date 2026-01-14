"use client";

import * as React from "react";
import Link from "next/link";
import { MYTHICAL_CODES, MythicalCodeKey } from "@/lib/mythicalCodes";

type Props = {
  businessName: string;
  primaryKeyFallback: MythicalCodeKey; // if business has primary, pass it; otherwise pass first key
  secondaryKey: MythicalCodeKey | null;
  tertiaryKey: MythicalCodeKey | null;
};

export function BusinessIdentityPanel({
  businessName,
  primaryKeyFallback,
  secondaryKey,
  tertiaryKey,
}: Props) {
  const [activeKey, setActiveKey] = React.useState<MythicalCodeKey>(primaryKeyFallback);

  const active = MYTHICAL_CODES[activeKey];

  const allKeys = React.useMemo(
    () => Object.keys(MYTHICAL_CODES) as MythicalCodeKey[],
    []
  );

  const badges = React.useMemo(() => {
    const arr: { label: string; key: MythicalCodeKey }[] = [];
    if (primaryKeyFallback) arr.push({ label: "Primary", key: primaryKeyFallback });
    if (secondaryKey) arr.push({ label: "Secondary", key: secondaryKey });
    if (tertiaryKey) arr.push({ label: "Tertiary", key: tertiaryKey });
    return arr;
  }, [primaryKeyFallback, secondaryKey, tertiaryKey]);

  return (
    <div className="space-y-10">
      {/* Top controls */}
      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="min-w-0">
            <p className="text-xs text-white/50">Business</p>
            <h2 className="text-xl font-semibold truncate">{businessName}</h2>

            {badges.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-3">
                {badges.map((b) => (
                  <button
                    key={b.label}
                    onClick={() => setActiveKey(b.key)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition ${
                      activeKey === b.key
                        ? "border-white/30 bg-white/[0.10] text-white"
                        : "border-white/10 bg-white/[0.03] text-white/70 hover:border-white/20"
                    }`}
                    title={`View ${b.label}: ${b.key}`}
                    type="button"
                  >
                    {b.label}: {MYTHICAL_CODES[b.key].label}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-white/60 mt-3">
                No assigned codes yet — exploring read-only.
              </p>
            )}
          </div>

          {/* Explorer */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <label className="text-xs text-white/50">Explore code</label>
            <select
              value={activeKey}
              onChange={(e) => setActiveKey(e.target.value as MythicalCodeKey)}
              className="h-11 rounded-xl border border-white/10 bg-black/40 px-4 text-sm text-white outline-none focus:border-white/25"
            >
              {allKeys.map((k) => (
                <option key={k} value={k}>
                  {MYTHICAL_CODES[k].label} — ({k})
                </option>
              ))}
            </select>

            <Link
              href="/onboarding/business"
              className="h-11 inline-flex items-center justify-center rounded-xl px-4 border border-white/15 hover:bg-white/5 transition text-sm"
            >
              Edit identity
            </Link>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section
        className="rounded-[32px] p-10 border border-white/10"
        style={{
          background: active.colorMood.surface,
          color: "#0f172a",
        }}
      >
        <p className="text-xs uppercase tracking-widest opacity-60">Identity signal</p>
        <h3 className="text-4xl font-bold mt-2">{active.label}</h3>
        <p className="text-xl mt-6 max-w-3xl">{active.essence}</p>

        <div className="grid md:grid-cols-3 gap-8 mt-10">
          <InsightBlock title="Core Strengths" items={active.strengths} />
          <InsightBlock title="Blind Spots" items={active.blindSpots} subtle />
          <InsightBlock title="Ideal Audience" items={active.idealAudience} />
        </div>
      </section>

      {/* Perception */}
      <section className="grid md:grid-cols-2 gap-6">
        <Panel title="How users experience you">
          <ul className="space-y-2">
            {active.positioningGuidance.map((g) => (
              <li key={g}>• {g}</li>
            ))}
          </ul>
        </Panel>

        <Panel title="Who may not resonate">
          <ul className="space-y-2 text-white/70">
            {active.strugglesWith.map((s) => (
              <li key={s}>• {s}</li>
            ))}
          </ul>
        </Panel>
      </section>

      {/* Brand expression */}
      <section className="grid md:grid-cols-3 gap-6">
        <Panel title="Brand tone">
          <div className="space-y-1 text-sm">
            <div>
              <span className="opacity-60">Voice:</span>{" "}
              <span className="capitalize">{active.brandTone.voice}</span>
            </div>
            <div>
              <span className="opacity-60">Pace:</span>{" "}
              <span className="capitalize">{active.brandTone.pace}</span>
            </div>
            <div>
              <span className="opacity-60">Posture:</span>{" "}
              <span className="capitalize">{active.brandTone.posture}</span>
            </div>
          </div>
        </Panel>

        <Panel title="Color energy">
          <div className="flex gap-3 mt-2">
            <ColorSwatch color={active.colorMood.primary} />
            <ColorSwatch color={active.colorMood.accent} />
            <ColorSwatch color={active.colorMood.surface} />
          </div>
        </Panel>

        <Panel title="Content direction">
          <ul className="space-y-1 text-sm">
            {active.contentAngles.map((c) => (
              <li key={c}>• {c}</li>
            ))}
          </ul>
        </Panel>
      </section>

      {/* Guidance */}
      <section className="grid md:grid-cols-3 gap-6">
        <Panel title="Offering style">
          <ul className="space-y-1 text-sm">
            {active.offeringStyle.map((o) => (
              <li key={o}>• {o}</li>
            ))}
          </ul>
        </Panel>

        <Panel title="Primary advice">
          <p className="text-white/80">{active.primaryAdvice}</p>
        </Panel>

        <Panel title="Modifiers">
          <div className="space-y-3 text-sm text-white/80">
            <div>
              <p className="text-white/50">Secondary effect</p>
              <p>{active.secondaryEffect}</p>
            </div>
            <div>
              <p className="text-white/50">Tertiary effect</p>
              <p>{active.tertiaryEffect}</p>
            </div>
          </div>
        </Panel>
      </section>
    </div>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h4 className="font-semibold mb-3">{title}</h4>
      <div className="text-white/80">{children}</div>
    </div>
  );
}

function InsightBlock({
  title,
  items,
  subtle,
}: {
  title: string;
  items: readonly string[];
  subtle?: boolean;
}) {
  return (
    <div>
      <h4 className={`font-semibold mb-3 ${subtle ? "opacity-70" : ""}`}>
        {title}
      </h4>
      <ul className="space-y-1 text-sm">
        {items.map((i) => (
          <li key={i}>– {i}</li>
        ))}
      </ul>
    </div>
  );
}

function ColorSwatch({ color }: { color: string }) {
  return (
    <div
      className="w-8 h-8 rounded-full border border-white/20"
      style={{ backgroundColor: color }}
      title={color}
    />
  );
}
