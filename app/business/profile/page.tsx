// app/business/profile/page.tsx
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { MYTHICAL_CODES, MythicalCodeKey } from "@/lib/mythicalCodes";
import { BusinessIdentityPanel } from "@/components/business/BusinessIdentityPanel";

function isMythicalCodeKey(v: unknown): v is MythicalCodeKey {
  return typeof v === "string" && v in MYTHICAL_CODES;
}

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

  const primary = isMythicalCodeKey(primaryRaw) ? primaryRaw : null;
  const secondary = isMythicalCodeKey(secondaryRaw) ? secondaryRaw : null;
  const tertiary = isMythicalCodeKey(tertiaryRaw) ? tertiaryRaw : null;

  // 🚫 IMPORTANT FIX:
  // DO NOT redirect to onboarding when codes are missing.
  // Render a clean state instead, so Business Identity stops looking like onboarding.
  if (!primary) {
    return (
      <div className="space-y-10">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Business Identity
          </h1>
          <p className="text-white/60 max-w-2xl">
            Your identity panel becomes available once your business codes are set.
          </p>
        </header>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <p className="text-sm text-white/60">Status</p>
              <p className="text-xl font-semibold">Codes not assigned yet</p>
              <p className="text-white/60 max-w-xl">
                Set your primary (and optional secondary/tertiary) codes to unlock
                the full ETHOS identity dictionary: tone, positioning, content angles,
                and offering style.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/onboarding/business"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 bg-white text-black font-medium hover:bg-white/90 transition"
              >
                Set business identity
              </Link>

              <Link
                href="/business/dashboard"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 border border-white/15 hover:bg-white/5 transition"
              >
                Back to dashboard
              </Link>
            </div>
          </div>
        </section>

        {/* Optional: still allow read-only exploration even before assignment */}
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          <h2 className="text-xl font-semibold">Explore the codes (read-only)</h2>
          <p className="text-white/60 mt-2">
            You can preview how ETHOS would interpret different codes — without saving anything.
          </p>

          <div className="mt-6">
            <BusinessIdentityPanel
              businessName={business.businessName ?? "Your business"}
              primaryKeyFallback={Object.keys(MYTHICAL_CODES)[0] as MythicalCodeKey}
              secondaryKey={null}
              tertiaryKey={null}
            />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Business Identity
        </h1>
        <p className="text-white/60 max-w-2xl">
          This is how your business is felt, interpreted, and remembered inside the ETHOS ecosystem.
        </p>
      </header>

      <BusinessIdentityPanel
        businessName={business.businessName ?? "Your business"}
        primaryKeyFallback={primary}
        secondaryKey={secondary}
        tertiaryKey={tertiary}
      />
    </div>
  );
}
