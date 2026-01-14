// app/business/profile/page.tsx
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { MYTHICAL_CODES, MythicalCodeKey } from "@/lib/mythicalCodes";
import { BusinessIdentityPanel } from "@/components/business/BusinessIdentityPanel";
import { 
  Sparkles, 
  ArrowRight, 
  Edit3, 
  Info,
  TrendingUp,
  Target,
  Zap
} from "lucide-react";

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

  // Empty state when codes are not set
  if (!primary) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        {/* Ambient Background */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute top-[10%] right-[15%] h-[600px] w-[600px] rounded-full bg-[#C7B9FF] blur-[160px] opacity-[0.12] animate-pulse" />
          <div className="absolute bottom-[15%] left-[20%] h-[700px] w-[700px] rounded-full bg-[#4F8CFF] blur-[180px] opacity-[0.08]" />
        </div>

        <div className="space-y-8">
          {/* Hero Header */}
          <div className="relative group">
            <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-r from-[#C7B9FF]/10 via-[#4F8CFF]/10 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
            
            <div className="relative rounded-[28px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
              
              <div className="relative px-8 py-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#C7B9FF]/20 to-[#4F8CFF]/20 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-8 w-8 text-[#C7B9FF]" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold text-white/95 mb-2">
                      Business Identity
                    </h1>
                    <p className="text-base text-white/60 max-w-2xl leading-relaxed">
                      Your identity shapes how you're discovered, felt, and remembered across the ETHOS ecosystem
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#4F8CFF]/5 border border-[#4F8CFF]/20 px-5 py-4 flex items-start gap-3">
                  <Info className="h-5 w-5 text-[#4F8CFF] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white/70 leading-relaxed">
                    Set your identity codes to unlock the complete ETHOS dictionary: tone, positioning, content angles, and offering style tailored to your essence.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Empty State Card */}
          <div className="relative group">
            <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-br from-[#C7B9FF]/5 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
            
            <div className="relative rounded-[28px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
              
              <div className="relative px-8 py-12">
                <div className="text-center max-w-2xl mx-auto space-y-6">
                  {/* Icon */}
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#C7B9FF]/20 to-[#4F8CFF]/20 border border-white/10">
                    <Target className="h-10 w-10 text-[#C7B9FF]" />
                  </div>

                  {/* Status */}
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                      <span className="h-2 w-2 rounded-full bg-white/40" />
                      <span className="text-sm font-medium text-white/70">Identity not configured</span>
                    </div>

                    <h2 className="text-2xl font-bold text-white/90">
                      Define your business essence
                    </h2>
                    
                    <p className="text-white/60 leading-relaxed max-w-lg mx-auto">
                      Your identity codes determine how users perceive your brand, which audiences you naturally attract, and how your offerings are positioned in the marketplace.
                    </p>
                  </div>

                  {/* Benefits Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                    <BenefitCard
                      icon={<Zap className="h-5 w-5" />}
                      label="Core essence"
                      description="Your primary identity defines your foundational energy"
                    />
                    <BenefitCard
                      icon={<Target className="h-5 w-5" />}
                      label="Nuanced depth"
                      description="Secondary adds layers of complexity and appeal"
                    />
                    <BenefitCard
                      icon={<TrendingUp className="h-5 w-5" />}
                      label="Unique edge"
                      description="Tertiary reveals what makes you unexpected"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8 pt-6 border-t border-white/[0.08]">
                    <Link
                      href="/business/profile/edit"
                      className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-br from-[#C7B9FF] to-[#9b7fd8] text-white font-semibold text-sm shadow-lg shadow-[#C7B9FF]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#C7B9FF]/35 hover:scale-[1.02] min-w-[200px]"
                    >
                      <Sparkles size={18} className="transition-transform group-hover:rotate-12 duration-300" />
                      Set your identity
                      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1 duration-300" />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>

                    <Link
                      href="/business/dashboard"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white/70 font-medium text-sm backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:text-white min-w-[200px]"
                    >
                      Back to dashboard
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="relative group">
            <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-br from-[#4F8CFF]/5 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
            
            <div className="relative rounded-[28px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
              
              <div className="relative">
                <div className="px-8 py-6 border-b border-white/[0.08] bg-gradient-to-r from-[#4F8CFF]/5 to-transparent">
                  <div className="flex items-center gap-3">
                    <div className="text-[#4F8CFF]">
                      <Info className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white/90">
                        Preview: Example identity
                      </h3>
                      <p className="text-sm text-white/50">
                        See how the identity system works before setting your codes
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <BusinessIdentityPanel
                    businessName={business.businessName ?? "Your business"}
                    primaryKeyFallback={Object.keys(MYTHICAL_CODES)[0] as MythicalCodeKey}
                    secondaryKey={null}
                    tertiaryKey={null}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active state with codes configured
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Ambient Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-[10%] right-[15%] h-[600px] w-[600px] rounded-full bg-[#C7B9FF] blur-[160px] opacity-[0.12]" />
        <div className="absolute bottom-[15%] left-[20%] h-[700px] w-[700px] rounded-full bg-[#4F8CFF] blur-[180px] opacity-[0.08]" />
        <div className="absolute top-[40%] left-[50%] h-[500px] w-[500px] rounded-full bg-[#7CF5C8] blur-[140px] opacity-[0.06]" />
      </div>

      <div className="space-y-8">
        {/* Hero Header */}
        <div className="relative group">
          <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-r from-[#C7B9FF]/10 via-[#4F8CFF]/10 to-[#7CF5C8]/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
          
          <div className="relative rounded-[28px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
            
            <div className="relative px-8 py-10">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-start gap-4 flex-1">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#C7B9FF]/20 to-[#4F8CFF]/20 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-8 w-8 text-[#C7B9FF]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h1 className="text-4xl font-bold text-white/95 mb-2">
                      Business Identity
                    </h1>
                    <p className="text-base text-white/60 leading-relaxed">
                      How your business is felt, interpreted, and remembered inside the ETHOS ecosystem
                    </p>

                    {/* Identity Pills */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {primary && (
                        <IdentityBadge 
                          label="Primary" 
                          code={primary}
                          color="lav"
                        />
                      )}
                      {secondary && (
                        <IdentityBadge 
                          label="Secondary" 
                          code={secondary}
                          color="blue"
                        />
                      )}
                      {tertiary && (
                        <IdentityBadge 
                          label="Tertiary" 
                          code={tertiary}
                          color="mint"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <Link
                  href="/business/profile/edit"
                  className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white/70 font-medium text-sm backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:text-white flex-shrink-0"
                >
                  <Edit3 size={16} className="transition-transform group-hover:rotate-12 duration-300" />
                  Edit identity
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Identity Panel */}
        <BusinessIdentityPanel
          businessName={business.businessName ?? "Your business"}
          primaryKeyFallback={primary}
          secondaryKey={secondary}
          tertiaryKey={tertiary}
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* UI COMPONENTS                                                              */
/* -------------------------------------------------------------------------- */

function BenefitCard({
  icon,
  label,
  description
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
}) {
  return (
    <div className="rounded-xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-4 text-center space-y-2">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#C7B9FF]/20 to-[#4F8CFF]/20 border border-white/10 text-[#C7B9FF]">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-white/90">{label}</p>
        <p className="text-xs text-white/50 leading-relaxed mt-1">{description}</p>
      </div>
    </div>
  );
}

function IdentityBadge({ 
  label, 
  code,
  color 
}: { 
  label: string; 
  code: MythicalCodeKey;
  color: "lav" | "blue" | "mint";
}) {
  const colors = {
    lav: {
      bg: "from-[#C7B9FF]/10 to-[#C7B9FF]/5",
      border: "border-[#C7B9FF]/25",
      text: "text-[#C7B9FF]",
      dot: "bg-[#C7B9FF]"
    },
    blue: {
      bg: "from-[#4F8CFF]/10 to-[#4F8CFF]/5",
      border: "border-[#4F8CFF]/25",
      text: "text-[#4F8CFF]",
      dot: "bg-[#4F8CFF]"
    },
    mint: {
      bg: "from-[#7CF5C8]/10 to-[#7CF5C8]/5",
      border: "border-[#7CF5C8]/25",
      text: "text-[#7CF5C8]",
      dot: "bg-[#7CF5C8]"
    }
  }[color];

  const codeData = MYTHICAL_CODES[code];

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r ${colors.bg} border ${colors.border}`}>
      <span className={`h-2 w-2 rounded-full ${colors.dot}`} />
      <span className="text-xs text-white/50 font-medium">{label}:</span>
      <span className={`text-xs font-semibold ${colors.text}`}>
        {codeData.label}
      </span>
    </div>
  );
}