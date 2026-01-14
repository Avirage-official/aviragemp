// app/business/profile/page.tsx
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import {
  MYTHICAL_CODES,
  MythicalCodeKey,
} from "@/lib/mythicalCodes";

export default async function BusinessProfilePage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { businessProfile: true },
  });

  if (!user || !user.businessProfile)
    redirect("/onboarding/business");

const business = user.businessProfile;

const primaryRaw = business.primaryCode;
const secondaryRaw = business.secondaryCode;
const tertiaryRaw = business.tertiaryCode;

// HARD GUARD — REQUIRED FOR SERVER COMPONENTS
if (!primaryRaw || !(primaryRaw in MYTHICAL_CODES)) {
  redirect("/onboarding/business");
}

const primary = primaryRaw as MythicalCodeKey;
const secondary =
  secondaryRaw && secondaryRaw in MYTHICAL_CODES
    ? (secondaryRaw as MythicalCodeKey)
    : null;

const tertiary =
  tertiaryRaw && tertiaryRaw in MYTHICAL_CODES
    ? (tertiaryRaw as MythicalCodeKey)
    : null;

const primaryCode = MYTHICAL_CODES[primary];


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
        className="rounded-[32px] p-10"
        style={{
          background: primaryCode.colorMood.surface,
          color: "#0f172a",
        }}
      >
        <p className="text-xs uppercase tracking-widest opacity-60">
          Primary Identity
        </p>

        <h2 className="text-4xl font-bold mt-2">
          {primaryCode.label}
        </h2>

        <p className="text-xl mt-6 max-w-3xl">
          {primaryCode.essence}
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-10">
          <InsightBlock
            title="Core Strengths"
            items={[...primaryCode.strengths]}
          />
          <InsightBlock
            title="Blind Spots"
            items={[...primaryCode.blindSpots]}
            subtle
          />
          <InsightBlock
            title="Ideal Audience"
            items={[...primaryCode.idealAudience]}
          />
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
              <span className="capitalize">
                {primaryCode.brandTone.voice}
              </span>
            </div>
            <div>
              <span className="opacity-60">Pace:</span>{" "}
              <span className="capitalize">
                {primaryCode.brandTone.pace}
              </span>
            </div>
            <div>
              <span className="opacity-60">Posture:</span>{" "}
              <span className="capitalize">
                {primaryCode.brandTone.posture}
              </span>
            </div>
          </div>
        </Panel>

        <Panel title="Color energy">
          <div className="flex gap-3 mt-2">
            <ColorSwatch color={primaryCode.colorMood.primary} />
            <ColorSwatch color={primaryCode.colorMood.accent} />
            <ColorSwatch color={primaryCode.colorMood.surface} />
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

      {/* MODIFIERS */}
      {(secondary || tertiary) && (
        <section className="space-y-6">
          <h3 className="text-xl font-semibold">
            Identity Modulation
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {secondary && (
              <Panel title="Secondary influence">
                <p>{primaryCode.secondaryEffect}</p>
              </Panel>
            )}
            {tertiary && (
              <Panel title="Tertiary influence">
                <p>{primaryCode.tertiaryEffect}</p>
              </Panel>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* COMPONENTS                                                                 */
/* -------------------------------------------------------------------------- */

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
      <h4
        className={`font-semibold mb-3 ${
          subtle ? "opacity-70" : ""
        }`}
      >
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
