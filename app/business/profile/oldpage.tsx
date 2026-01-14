// app/business/profile/page.tsx
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import type React from "react";
import { MYTHICAL_CODES, type MythicalCodeKey } from "@/lib/mythicalCodes";

export default async function BusinessProfilePage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { businessProfile: true },
  });

  if (!user || !user.businessProfile) redirect("/onboarding/business");

  const business = user.businessProfile;

  const primaryRaw = business.primaryCode;
  const secondaryRaw = business.secondaryCode;
  const tertiaryRaw = business.tertiaryCode;

  // HARD GUARD — REQUIRED FOR SERVER COMPONENTS
  // If the business has no valid primary code, they haven't completed identity setup.
  if (!primaryRaw || !(primaryRaw in MYTHICAL_CODES)) {
    redirect("/onboarding/business");
  }

  const primary = primaryRaw as MythicalCodeKey;

  const secondary: MythicalCodeKey | null =
    secondaryRaw && secondaryRaw in MYTHICAL_CODES
      ? (secondaryRaw as MythicalCodeKey)
      : null;

  const tertiary: MythicalCodeKey | null =
    tertiaryRaw && tertiaryRaw in MYTHICAL_CODES
      ? (tertiaryRaw as MythicalCodeKey)
      : null;

  const primaryCode = MYTHICAL_CODES[primary];
  const secondaryCode = secondary ? MYTHICAL_CODES[secondary] : null;
  const tertiaryCode = tertiary ? MYTHICAL_CODES[tertiary] : null;

  const allCodes = Object.values(MYTHICAL_CODES);

  return (
    <div className="space-y-16">
      {/* HEADER */}
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Business Identity
        </h1>
        <p className="text-white/60 max-w-2xl">
          This is not a label. This is how your business is felt, interpreted,
          and remembered inside the ETHOS ecosystem.
        </p>
      </header>

      {/* PRIMARY IDENTITY */}
      <section
        className="rounded-[32px] p-10 border border-black/10"
        style={{
          background: primaryCode.colorMood.surface,
          color: "#0f172a",
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-widest opacity-60">
              Primary Identity
            </p>

            <h2 className="text-4xl font-bold mt-2">{primaryCode.label}</h2>

            <p className="text-xl mt-6 max-w-3xl">{primaryCode.essence}</p>
          </div>

          {/* Color DNA */}
          <div className="flex items-center gap-3">
            <ColorSwatch
              color={primaryCode.colorMood.primary}
              label="Primary"
              darkText
            />
            <ColorSwatch
              color={primaryCode.colorMood.accent}
              label="Accent"
              darkText
            />
            <ColorSwatch
              color={primaryCode.colorMood.surface}
              label="Surface"
              darkText
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-10">
          <InsightBlock title="Core Strengths" items={primaryCode.strengths} />
          <InsightBlock
            title="Blind Spots"
            items={primaryCode.blindSpots}
            subtle
          />
          <InsightBlock title="Ideal Audience" items={primaryCode.idealAudience} />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <DarkChip title="Primary advice">{primaryCode.primaryAdvice}</DarkChip>
          <DarkChip title="Offering style">
            <ul className="space-y-1 text-sm">
              {primaryCode.offeringStyle.map((o) => (
                <li key={o}>• {o}</li>
              ))}
            </ul>
          </DarkChip>
        </div>
      </section>

      {/* PERCEPTION MAP */}
      <section className="grid md:grid-cols-2 gap-8">
        <Panel title="How users experience you">
          <ul className="space-y-2">
            {primaryCode.positioningGuidance.map((g) => (
              <li key={g}>• {g}</li>
            ))}
          </ul>
        </Panel>

        <Panel title="Who may not resonate">
          <ul className="space-y-2 text-white/70">
            {primaryCode.strugglesWith.map((s) => (
              <li key={s}>• {s}</li>
            ))}
          </ul>
        </Panel>
      </section>

      {/* BRAND EXPRESSION */}
      <section className="grid md:grid-cols-3 gap-6">
        <Panel title="Brand tone">
          <div className="space-y-1 text-sm">
            <div>
              <span className="opacity-60">Voice:</span>{" "}
              <span className="capitalize">{primaryCode.brandTone.voice}</span>
            </div>
            <div>
              <span className="opacity-60">Pace:</span>{" "}
              <span className="capitalize">{primaryCode.brandTone.pace}</span>
            </div>
            <div>
              <span className="opacity-60">Posture:</span>{" "}
              <span className="capitalize">
                {primaryCode.brandTone.posture}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-xs text-white/50 mb-2">Suggested copy feel</p>
            <div className="flex flex-wrap gap-2">
              <Tag text={primaryCode.brandTone.voice} />
              <Tag text={primaryCode.brandTone.pace} />
              <Tag text={primaryCode.brandTone.posture} />
            </div>
          </div>
        </Panel>

        <Panel title="Color energy">
          <div className="flex gap-3 mt-2">
            <ColorSwatch color={primaryCode.colorMood.primary} label="Primary" />
            <ColorSwatch color={primaryCode.colorMood.accent} label="Accent" />
            <ColorSwatch color={primaryCode.colorMood.surface} label="Surface" />
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 text-sm text-white/70 space-y-1">
            <div className="flex items-center justify-between">
              <span className="opacity-60">Primary</span>
              <code className="text-xs">{primaryCode.colorMood.primary}</code>
            </div>
            <div className="flex items-center justify-between">
              <span className="opacity-60">Accent</span>
              <code className="text-xs">{primaryCode.colorMood.accent}</code>
            </div>
            <div className="flex items-center justify-between">
              <span className="opacity-60">Surface</span>
              <code className="text-xs">{primaryCode.colorMood.surface}</code>
            </div>
          </div>
        </Panel>

        <Panel title="Content direction">
          <ul className="space-y-1 text-sm">
            {primaryCode.contentAngles.map((c) => (
              <li key={c}>• {c}</li>
            ))}
          </ul>
        </Panel>
      </section>

      {/* MODULATION (SECONDARY / TERTIARY) */}
      {(secondaryCode || tertiaryCode) && (
        <section className="space-y-6">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold">Identity Modulation</h3>
              <p className="text-white/60 mt-1">
                Secondary and tertiary codes influence your expression — without
                replacing your primary signature.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {secondaryCode && (
              <Panel
                title={`Secondary influence — ${secondaryCode.label}`}
                kicker={`Key: ${secondaryCode.key}`}
              >
                <p className="text-white/80">{secondaryCode.essence}</p>

                <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                  <div>
                    <p className="text-xs text-white/50 mb-2">
                      How it modulates your primary
                    </p>
                    <p className="text-white/80">{primaryCode.secondaryEffect}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Tag text={secondaryCode.brandTone.voice} />
                    <Tag text={secondaryCode.brandTone.pace} />
                    <Tag text={secondaryCode.brandTone.posture} />
                  </div>
                </div>
              </Panel>
            )}

            {tertiaryCode && (
              <Panel
                title={`Tertiary influence — ${tertiaryCode.label}`}
                kicker={`Key: ${tertiaryCode.key}`}
              >
                <p className="text-white/80">{tertiaryCode.essence}</p>

                <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                  <div>
                    <p className="text-xs text-white/50 mb-2">
                      How it modulates your primary
                    </p>
                    <p className="text-white/80">{primaryCode.tertiaryEffect}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Tag text={tertiaryCode.brandTone.voice} />
                    <Tag text={tertiaryCode.brandTone.pace} />
                    <Tag text={tertiaryCode.brandTone.posture} />
                  </div>
                </div>
              </Panel>
            )}
          </div>
        </section>
      )}

      {/* EXPLORE OTHER IDENTITIES (READ-ONLY) */}
      <section className="space-y-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h3 className="text-xl font-semibold">Explore other identities</h3>
            <p className="text-white/60 mt-1">
              Read-only reference. Useful when choosing target codes or refining
              positioning.
            </p>
          </div>
          <div className="text-xs text-white/50">
            Total: {allCodes.length}
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {allCodes.map((code) => (
            <details
              key={code.key}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:border-white/20 transition"
            >
              <summary className="cursor-pointer list-none">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs text-white/50 uppercase tracking-wide">
                      {code.key}
                    </p>
                    <p className="text-lg font-semibold truncate">
                      {code.label}
                    </p>
                    <p className="text-sm text-white/60 line-clamp-2 mt-1">
                      {code.essence}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/20"
                      style={{ backgroundColor: code.colorMood.primary }}
                      title={code.colorMood.primary}
                    />
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/20"
                      style={{ backgroundColor: code.colorMood.accent }}
                      title={code.colorMood.accent}
                    />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Tag text={code.brandTone.voice} />
                  <Tag text={code.brandTone.pace} />
                  <Tag text={code.brandTone.posture} />
                </div>
              </summary>

              <div className="mt-5 pt-5 border-t border-white/10 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <MiniList title="Strengths" items={code.strengths} />
                  <MiniList title="Blind spots" items={code.blindSpots} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <MiniList title="Ideal audience" items={code.idealAudience} />
                  <MiniList title="Struggles with" items={code.strugglesWith} />
                </div>

                <div>
                  <p className="text-xs text-white/50 mb-2">Content angles</p>
                  <ul className="space-y-1 text-sm text-white/80">
                    {code.contentAngles.map((c) => (
                      <li key={c}>• {c}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs text-white/50 mb-2">Offering style</p>
                  <ul className="space-y-1 text-sm text-white/80">
                    {code.offeringStyle.map((o) => (
                      <li key={o}>• {o}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* COMPONENTS                                                                 */
/* -------------------------------------------------------------------------- */

function Panel({
  title,
  kicker,
  children,
}: {
  title: string;
  kicker?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-3">
        {kicker && <p className="text-xs text-white/50 mb-1">{kicker}</p>}
        <h4 className="font-semibold">{title}</h4>
      </div>
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

function MiniList({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  return (
    <div>
      <p className="text-xs text-white/50 mb-2">{title}</p>
      <ul className="space-y-1 text-sm text-white/80">
        {items.map((i) => (
          <li key={i}>• {i}</li>
        ))}
      </ul>
    </div>
  );
}

function Tag({ text }: { text: string }) {
  return (
    <span className="text-xs px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03] text-white/70 capitalize">
      {text}
    </span>
  );
}

function DarkChip({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-black/10 border border-black/10 p-5">
      <p className="text-xs uppercase tracking-widest opacity-60 mb-2">
        {title}
      </p>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function ColorSwatch({
  color,
  label,
  darkText,
}: {
  color: string;
  label?: string;
  darkText?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-9 h-9 rounded-full border border-white/20"
        style={{ backgroundColor: color }}
        title={color}
      />
      {label && (
        <div className={`text-xs ${darkText ? "opacity-70" : "text-white/60"}`}>
          <div className="font-medium">{label}</div>
          <div className="opacity-70">{color}</div>
        </div>
      )}
    </div>
  );
}
