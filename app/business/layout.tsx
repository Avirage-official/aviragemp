// app/business/layout.tsx
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import {
  LayoutDashboard,
  PlusCircle,
  Inbox,
  Sparkles,
  Store,
  UserRound,
  TrendingUp,
} from "lucide-react";
import { MainNav } from "@/components/navigation/MainNav";

export default async function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { businessProfile: true },
  });

  if (!user) redirect("/onboarding");

  /**
   * ✅ Forward-safe gating:
   * - If businessProfile is missing, we DO NOT hard crash into a loop.
   * - We redirect to onboarding with a return URL, so user can finish and come back.
   * - This prevents the "stuck" feeling when creation just happened but hasn't appeared in the next request.
   */
  if (!user.businessProfile) {
    redirect("/onboarding/business?returnTo=/business/dashboard");
  }

  const business = user.businessProfile;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111827] via-[#0f172a] to-[#111827]">
      {/* ------------------------------------------------------------------ */}
      {/* GLOBAL NAVIGATION                                                  */}
      {/* ------------------------------------------------------------------ */}
      <MainNav />

      {/* ------------------------------------------------------------------ */}
      {/* AMBIENT BACKGROUND                                                 */}
      {/* ------------------------------------------------------------------ */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-[30%] right-[10%] h-[800px] w-[800px] rounded-full bg-[#C7B9FF] blur-[180px] opacity-[0.08] animate-pulse" />
        <div className="absolute bottom-[-20%] left-[40%] h-[750px] w-[750px] rounded-full bg-[#4F8CFF] blur-[170px] opacity-[0.06]" />
        
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* MAIN CONTENT                                                       */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 py-8">
        {/* TOP BAR */}
        <div className="mb-8">
          <div className="relative group">
            <div className="absolute -inset-[1px] rounded-[24px] bg-gradient-to-r from-[#C7B9FF]/10 via-[#4F8CFF]/10 to-transparent opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500" />
            
            <div className="relative rounded-[24px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] px-6 sm:px-8 py-6">
              <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
              
              <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#C7B9FF]/20 to-[#4F8CFF]/20 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <Store className="h-5 w-5 text-[#C7B9FF]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-[#C7B9FF] font-medium uppercase tracking-wider">
                        Business Workspace
                      </p>
                      <h1 className="text-2xl font-bold text-white/95 truncate">
                        {business.businessName}
                      </h1>
                    </div>
                  </div>
                  <p className="text-sm text-white/50 ml-[52px] capitalize">
                    {business.category}
                  </p>
                </div>

                <Link
                  href="/business/listings/new"
                  className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-br from-[#C7B9FF] to-[#9b7fd8] text-white font-semibold text-sm shadow-lg shadow-[#C7B9FF]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#C7B9FF]/35 hover:scale-[1.02] flex-shrink-0"
                >
                  <PlusCircle size={18} className="transition-transform group-hover:rotate-90 duration-300" />
                  New Listing
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* LAYOUT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8">
          {/* SIDEBAR */}
          <aside className="lg:sticky lg:top-[calc(80px+2rem)] h-fit space-y-4">
            {/* Navigation Card */}
            <div className="relative group">
              <div className="absolute -inset-[1px] rounded-[24px] bg-gradient-to-br from-[#4F8CFF]/5 via-[#C7B9FF]/5 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
              
              <div className="relative rounded-[24px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] p-4">
                <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
                
                <nav className="relative space-y-1">
                  <NavItem
                    href="/business/dashboard"
                    icon={<LayoutDashboard size={18} />}
                    label="Dashboard"
                  />
                  <NavItem
                    href="/business/listings"
                    icon={<Store size={18} />}
                    label="Listings"
                  />
                  <NavItem
                    href="/business/listings/new"
                    icon={<Sparkles size={18} />}
                    label="Create Listing"
                  />
                  <NavItem
                    href="/business/inquiries"
                    icon={<Inbox size={18} />}
                    label="Inquiries"
                  />
                  <NavItem
                    href="/business/profile"
                    icon={<UserRound size={18} />}
                    label="Business Identity"
                  />
                </nav>
              </div>
            </div>

            {/* Identity Card */}
            <div className="relative group">
              <div className="absolute -inset-[1px] rounded-[24px] bg-gradient-to-br from-[#C7B9FF]/5 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
              
              <div className="relative rounded-[24px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] p-5">
                <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
                
                <div className="relative space-y-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-[#C7B9FF]" />
                    <p className="text-xs uppercase tracking-wider text-white/50 font-semibold">
                      Identity
                    </p>
                  </div>

                  <div className="space-y-2">
                    {business.primaryCode && (
                      <IdentityPill label="Primary" value={business.primaryCode} />
                    )}
                    {business.secondaryCode && (
                      <IdentityPill label="Secondary" value={business.secondaryCode} />
                    )}
                    {business.tertiaryCode && (
                      <IdentityPill label="Tertiary" value={business.tertiaryCode} />
                    )}
                    {!business.primaryCode &&
                      !business.secondaryCode &&
                      !business.tertiaryCode && (
                        <Link
                          href="/business/profile/edit"
                          className="block text-xs text-white/40 hover:text-[#C7B9FF] transition-colors"
                        >
                          + Set your identity
                        </Link>
                      )}
                  </div>

                  {/* Subscription Status */}
                  <div className="pt-4 border-t border-white/[0.08] space-y-2">
                    <p className="text-xs uppercase tracking-wider text-white/50 font-semibold">
                      Subscription
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <StatusBadge status={business.subscriptionStatus} />
                      <span className="text-white/40 capitalize">
                        {business.subscriptionTier}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* UI COMPONENTS                                                              */
/* -------------------------------------------------------------------------- */

function NavItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/[0.05] transition-all duration-300"
    >
      <span className="text-[#C7B9FF] transition-transform group-hover:scale-110 duration-300">
        {icon}
      </span>
      <span className="transition-transform group-hover:translate-x-0.5 duration-300">
        {label}
      </span>
    </Link>
  );
}

function IdentityPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-[#C7B9FF]/5 to-transparent border border-[#C7B9FF]/10 px-3 py-2">
      <span className="text-xs text-white/50 font-medium">{label}</span>
      <span className="text-xs text-[#C7B9FF] font-semibold capitalize">
        {value}
      </span>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const configs = {
    TRIAL: {
      label: "Trial",
      bg: "bg-[#4F8CFF]/10",
      border: "border-[#4F8CFF]/25",
      text: "text-[#4F8CFF]"
    },
    ACTIVE: {
      label: "Active",
      bg: "bg-[#7CF5C8]/10",
      border: "border-[#7CF5C8]/25",
      text: "text-[#7CF5C8]"
    },
    PAST_DUE: {
      label: "Past Due",
      bg: "bg-red-500/10",
      border: "border-red-500/25",
      text: "text-red-400"
    },
    CANCELLED: {
      label: "Cancelled",
      bg: "bg-white/5",
      border: "border-white/10",
      text: "text-white/40"
    }
  };

  const statusConfig = configs[status as keyof typeof configs] || configs.TRIAL;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${statusConfig.bg} ${statusConfig.border} border text-xs font-semibold ${statusConfig.text}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {statusConfig.label}
    </span>
  );
}