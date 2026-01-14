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
    <div className="min-h-screen bg-gradient-to-br from-[#0b0f1a] via-[#0e1324] to-[#0b0f1a] text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-6 mb-10">
          <div className="min-w-0">
            <p className="text-xs text-indigo-300/80">Business workspace</p>
            <h1 className="text-xl font-semibold tracking-tight truncate">
              {business.businessName}
            </h1>
            <p className="text-sm text-white/60 truncate">
              {business.category}
            </p>
          </div>

          <Link
            href="/business/listings/new"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-indigo-500 text-white font-medium hover:bg-indigo-400 transition shadow-sm"
          >
            <PlusCircle size={18} />
            New Listing
          </Link>
        </div>

        {/* Shell */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-8 h-fit rounded-2xl p-4 bg-white/[0.06] backdrop-blur border border-white/10">
            <nav className="space-y-1">
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

            {/* Identity */}
            <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
              <div className="text-xs uppercase tracking-wide text-white/40">
                Identity
              </div>

              <div className="flex flex-wrap gap-2">
                {business.primaryCode && (
                  <Pill label={`Primary · ${business.primaryCode}`} />
                )}
                {business.secondaryCode && (
                  <Pill label={`Secondary · ${business.secondaryCode}`} />
                )}
                {business.tertiaryCode && (
                  <Pill label={`Tertiary · ${business.tertiaryCode}`} />
                )}
                {!business.primaryCode &&
                  !business.secondaryCode &&
                  !business.tertiaryCode && (
                    <div className="text-sm text-white/50">
                      No codes assigned yet
                    </div>
                  )}
              </div>

              {/* Subscription */}
              <div className="pt-4 space-y-1">
                <div className="text-xs uppercase tracking-wide text-white/40">
                  Subscription
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">
                    {business.subscriptionStatus}
                  </span>
                  <span className="text-white/40">
                    {business.subscriptionTier}
                  </span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="min-w-0 space-y-10">{children}</main>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* UI HELPERS                                                                 */
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
      className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/[0.08] transition"
    >
      <span className="text-indigo-300">{icon}</span>
      {label}
    </Link>
  );
}

function Pill({ label }: { label: string }) {
  return (
    <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-400/20">
      {label}
    </span>
  );
}
