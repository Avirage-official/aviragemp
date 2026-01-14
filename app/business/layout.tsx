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
} from "lucide-react";

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
  if (!user.businessProfile) redirect("/onboarding/business");

  const business = user.businessProfile;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-6 mb-8">
          <div className="min-w-0">
            <p className="text-xs text-white/50">Business</p>
            <h1 className="text-xl font-semibold tracking-tight truncate">
              {business.businessName}
            </h1>
            <p className="text-sm text-white/60 truncate">
              {business.category}
            </p>
          </div>

          <Link
            href="/business/listings/new"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-white text-black font-medium hover:bg-white/90 transition"
          >
            <PlusCircle size={18} />
            New Listing
          </Link>
        </div>

        {/* Shell */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-8 h-fit border border-white/10 rounded-2xl p-4 bg-white/[0.02]">
            <nav className="space-y-2">
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

            <div className="mt-5 pt-5 border-t border-white/10 space-y-3">
              <div className="text-xs text-white/50">Identity</div>
              <div className="flex flex-wrap gap-2">
                {business.primaryCode && <Pill label={`Primary: ${business.primaryCode}`} />}
                {business.secondaryCode && (
                  <Pill label={`Secondary: ${business.secondaryCode}`} />
                )}
                {business.tertiaryCode && <Pill label={`Tertiary: ${business.tertiaryCode}`} />}
                {!business.primaryCode && !business.secondaryCode && !business.tertiaryCode && (
                  <div className="text-sm text-white/60">Codes not set yet.</div>
                )}
              </div>

              <div className="text-xs text-white/50 mt-4">Subscription</div>
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm">
                  <span className="text-white/60">Status:</span>{" "}
                  <span className="font-medium">{business.subscriptionStatus}</span>
                </div>
                <div className="text-xs text-white/50">
                  Tier: {business.subscriptionTier}
                </div>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}

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
      className="flex items-center gap-3 rounded-xl px-3 py-2 border border-white/10 hover:border-white/20 hover:bg-white/[0.03] transition"
    >
      <span className="text-white/70">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}

function Pill({ label }: { label: string }) {
  return (
    <span className="text-xs px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03] text-white/70">
      {label}
    </span>
  );
}
