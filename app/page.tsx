// app/business/profile/page.tsx
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { MYTHICAL_CODES, MythicalCodeKey } from "@/lib/mythicalCodes";
import { BusinessIdentityPanel } from "@/components/business/BusinessIdentityPanel";
import { Sparkles, Target, Info, Edit3 } from "lucide-react";
import Link from "next/link";

function isMythicalCodeKey(key: string): key is MythicalCodeKey {
  return key in MYTHICAL_CODES;
}

// This is the ONLY export - must be default
export default async function BusinessProfilePage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      businessProfile: true,
    },
  });

  if (!user?.businessProfile) {
    redirect("/business/dashboard");
  }

  const business = user.businessProfile;
  const hasCodes = Boolean(business.primaryCode);

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="h-6 w-6 text-[#C7B9FF]" />
              <h1 className="text-4xl font-bold text-white/95">
                Business Identity
              </h1>
            </div>
            <p className="text-base text-white/60">
              Your mythical codes shape how customers perceive and connect with your brand
            </p>
          </div>

          {hasCodes && (
            <Link
              href="/business/profile/edit"
              className="px-4 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/20 text-white/90 hover:text-white transition-all duration-200 flex items-center gap-2 group"
            >
              <Edit3 className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
              <span>Edit Identity</span>
            </Link>
          )}
        </div>

        {/* Info Box */}
        <div className="rounded-xl bg-[#4F8CFF]/5 border border-[#4F8CFF]/20 px-4 py-3 flex items-start gap-3">
          <Info className="h-4 w-4 text-[#4F8CFF] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-white/70 leading-relaxed">
            Your identity codes determine how you position your business, communicate with customers,
            and design your offerings. They're the foundation of your brand strategy.
          </p>
        </div>
      </div>

      {/* Main Content */}
      {!hasCodes ? (
        <EmptyState businessName={business.businessName} />
      ) : (
        <ActiveIdentity
          businessName={business.businessName}
          primaryCode={business.primaryCode!}
          secondaryCode={business.secondaryCode}
          tertiaryCode={business.tertiaryCode}
        />
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* EMPTY STATE                                                                */
/* -------------------------------------------------------------------------- */

function EmptyState({ businessName }: { businessName: string }) {
  return (
    <div className="space-y-6">
      {/* Empty State Card */}
      <div className="relative group">
        <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-br from-[#4F8CFF]/10 via-[#C7B9FF]/10 to-[#7CF5C8]/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
        
        <div className="relative rounded-[28px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] p-8 sm:p-12">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="inline-flex h-20 w-20 rounded-2xl bg-gradient-to-br from-[#C7B9FF]/20 via-[#4F8CFF]/20 to-[#7CF5C8]/20 border border-white/10 items-center justify-center mx-auto">
              <Target className="h-10 w-10 text-white/60" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white/95 mb-2">
                Your business identity awaits
              </h2>
              <p className="text-base text-white/60 leading-relaxed">
                Set your mythical codes to unlock personalized positioning guidance, 
                content strategies, and audience insights tailored to {businessName}.
              </p>
            </div>

            <div className="inline-flex px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20">
              <p className="text-sm text-yellow-200/90 font-medium">
                ⚠️ Identity not configured
              </p>
            </div>

            <Link
              href="/business/profile/edit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4F8CFF] hover:bg-[#4F8CFF]/90 text-white font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="h-5 w-5" />
              <span>Set Your Identity</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BenefitCard
          icon={<Sparkles className="h-5 w-5" />}
          label="Core Essence"
          description="Understand your business's natural strengths and blind spots"
        />
        <BenefitCard
          icon={<Target className="h-5 w-5" />}
          label="Nuanced Depth"
          description="Layer secondary traits that add complexity to your positioning"
        />
        <BenefitCard
          icon={<Info className="h-5 w-5" />}
          label="Unique Edge"
          description="Discover unexpected qualities that differentiate your brand"
        />
      </div>

      {/* Preview Section */}
      <PreviewSection />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* ACTIVE IDENTITY                                                            */
/* -------------------------------------------------------------------------- */

function ActiveIdentity({
  businessName,
  primaryCode,
  secondaryCode,
  tertiaryCode,
}: {
  businessName: string;
  primaryCode: string;
  secondaryCode: string | null;
  tertiaryCode: string | null;
}) {
  // Validate codes
  const validPrimary = isMythicalCodeKey(primaryCode) ? primaryCode : "lhumir";
  const validSecondary = secondaryCode && isMythicalCodeKey(secondaryCode) ? secondaryCode : null;
  const validTertiary = tertiaryCode && isMythicalCodeKey(tertiaryCode) ? tertiaryCode : null;

  return (
    <div className="space-y-8">
      {/* Identity Badges */}
      <div className="flex flex-wrap items-center gap-3">
        <IdentityBadge
          type="primary"
          label="Primary"
          codeName={MYTHICAL_CODES[validPrimary].label}
        />
        {validSecondary && (
          <IdentityBadge
            type="secondary"
            label="Secondary"
            codeName={MYTHICAL_CODES[validSecondary].label}
          />
        )}
        {validTertiary && (
          <IdentityBadge
            type="tertiary"
            label="Tertiary"
            codeName={MYTHICAL_CODES[validTertiary].label}
          />
        )}
      </div>

      {/* Identity Panel */}
      <BusinessIdentityPanel
        businessName={businessName}
        primaryKeyFallback={validPrimary}
        secondaryKey={validSecondary}
        tertiaryKey={validTertiary}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* UI COMPONENTS                                                              */
/* -------------------------------------------------------------------------- */

function BenefitCard({
  icon,
  label,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
}) {
  return (
    <div className="rounded-xl bg-white/[0.03] border border-white/[0.08] p-6 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-200">
      <div className="flex items-start gap-4">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#4F8CFF]/20 to-[#C7B9FF]/20 border border-white/10 flex items-center justify-center flex-shrink-0 text-white/80">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-white/90 mb-1">{label}</h3>
          <p className="text-sm text-white/60 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

function IdentityBadge({
  type,
  label,
  codeName,
}: {
  type: "primary" | "secondary" | "tertiary";
  label: string;
  codeName: string;
}) {
  const colors = {
    primary: {
      dot: "bg-[#C7B9FF]",
      bg: "bg-[#C7B9FF]/10",
      border: "border-[#C7B9FF]/30",
      text: "text-[#C7B9FF]",
    },
    secondary: {
      dot: "bg-[#4F8CFF]",
      bg: "bg-[#4F8CFF]/10",
      border: "border-[#4F8CFF]/30",
      text: "text-[#4F8CFF]",
    },
    tertiary: {
      dot: "bg-[#7CF5C8]",
      bg: "bg-[#7CF5C8]/10",
      border: "border-[#7CF5C8]/30",
      text: "text-[#7CF5C8]",
    },
  }[type];

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${colors.bg} border ${colors.border}`}
    >
      <div className={`h-2 w-2 rounded-full ${colors.dot}`} />
      <span className="text-xs font-medium text-white/70">{label}:</span>
      <span className={`text-sm font-semibold ${colors.text}`}>{codeName}</span>
    </div>
  );
}

function PreviewSection() {
  return (
    <div className="rounded-xl bg-white/[0.03] border border-white/[0.08] p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white/90 mb-2">
          What you'll unlock
        </h3>
        <p className="text-sm text-white/60">
          Here's a preview of the insights you'll receive once you configure your identity
        </p>
      </div>

      <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-6 opacity-60">
        <div className="space-y-4">
          <div className="h-4 w-3/4 bg-white/10 rounded animate-pulse" />
          <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-white/10 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}