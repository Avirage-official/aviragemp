// app/business/dashboard/page.tsx
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SubscriptionButton } from "@/components/business/SubscriptionButton";
import { ArrowUpRight, Plus, Eye, MessageCircle, Layers } from "lucide-react";

export default async function BusinessDashboard() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      businessProfile: {
        include: {
          listings: {
            where: { isActive: true },
            orderBy: { createdAt: "desc" },
            include: {
              bookings: {
                where: { status: { in: ["INQUIRY", "PENDING"] } },
              },
            },
          },
        },
      },
    },
  });

  if (!user) redirect("/onboarding");

  /**
   * ✅ Forward-safe:
   * If businessProfile is missing, redirect to onboarding WITH returnTo.
   * This prevents confusing loops and makes post-create stable.
   */
  if (!user.businessProfile) {
    redirect("/onboarding/business?returnTo=/business/dashboard");
  }

  const business = user.businessProfile;

  const daysUntilTrialEnd = business.subscriptionEndsAt
    ? Math.ceil(
        (business.subscriptionEndsAt.getTime() - Date.now()) /
          (1000 * 60 * 60 * 24)
      )
    : null;

  const totalInquiries =
    business.listings.reduce((sum, l) => sum + (l.bookings?.length || 0), 0) ||
    0;

  return (
    <div className="space-y-12">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
          <p className="text-white/60 mt-1">Your business activity at a glance</p>
        </div>

        <Link
          href="/business/listings/new"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-500 text-white font-medium hover:bg-indigo-400 transition shadow-sm"
        >
          <Plus size={18} />
          New listing
        </Link>
      </header>

      {/* Trial Banner */}
      {business.subscriptionStatus === "TRIAL" && daysUntilTrialEnd !== null && (
        <div className="rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-yellow-400/10 border border-yellow-300/20">
          <div>
            <p className="font-semibold text-yellow-200">Trial period active</p>
            <p className="text-sm text-yellow-100/70 mt-1">
              {daysUntilTrialEnd} days remaining
            </p>
          </div>
          <SubscriptionButton />
        </div>
      )}

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<Layers size={18} />}
          label="Active listings"
          value={business.listings.length}
        />
        <StatCard icon={<Eye size={18} />} label="Profile views" value="—" subtle />
        <StatCard
          icon={<MessageCircle size={18} />}
          label="Open inquiries"
          value={totalInquiries}
          highlight
          link="/business/inquiries"
        />
      </section>

      {/* Listings */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Your listings</h3>
          <Link
            href="/business/listings"
            className="text-sm text-indigo-300 hover:text-indigo-200 transition"
          >
            Manage →
          </Link>
        </div>

        {business.listings.length > 0 ? (
          <div className="space-y-4">
            {business.listings.map((listing) => {
              const inquiryCount = listing.bookings?.length || 0;

              return (
                <div
                  key={listing.id}
                  className="rounded-2xl p-6 bg-white/[0.06] backdrop-blur border border-white/10 hover:border-indigo-400/40 transition"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="min-w-0 space-y-2">
                      <h4 className="text-lg font-semibold truncate">
                        {listing.title}
                      </h4>
                      <p className="text-sm text-white/60 line-clamp-2">
                        {listing.description}
                      </p>

                      <div className="flex flex-wrap gap-4 text-xs text-white/50 mt-3">
                        <span>📁 {listing.category}</span>
                        {listing.price && <span>💰 ${listing.price}</span>}
                        <span>🎯 {listing.targetCodes.length} codes</span>
                        {inquiryCount > 0 && (
                          <span className="text-indigo-300">
                            💬 {inquiryCount} inquiry{inquiryCount > 1 ? "ies" : ""}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        href={`/business/listings/${listing.id}`}
                        className="text-sm px-4 py-2 rounded-lg border border-white/20 hover:bg-white/[0.08] transition"
                      >
                        View
                      </Link>
                      <Link
                        href={`/business/listings/${listing.id}/edit`}
                        className="text-sm px-4 py-2 rounded-lg border border-white/20 hover:bg-white/[0.08] transition"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>

      {/* Business Info */}
      <section className="rounded-2xl p-8 space-y-6 bg-white/[0.06] backdrop-blur border border-white/10">
        <h3 className="text-xl font-semibold">Business profile</h3>

        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <Info label="Contact email" value={business.contactEmail} />
          {business.contactPhone && <Info label="Phone" value={business.contactPhone} />}
          {business.website && (
            <Info
              label="Website"
              value={
                <a
                  href={business.website}
                  target="_blank"
                  className="text-indigo-300 hover:underline inline-flex items-center gap-1"
                >
                  {business.website}
                  <ArrowUpRight size={14} />
                </a>
              }
            />
          )}
          {business.description && <Info label="Description" value={business.description} />}
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* UI HELPERS                                                                 */
/* -------------------------------------------------------------------------- */

function StatCard({
  icon,
  label,
  value,
  highlight,
  subtle,
  link,
}: {
  icon?: React.ReactNode;
  label: string;
  value: number | string;
  highlight?: boolean;
  subtle?: boolean;
  link?: string;
}) {
  const card = (
    <div
      className={`rounded-2xl p-6 border backdrop-blur ${
        highlight
          ? "bg-indigo-500/10 border-indigo-400/30"
          : subtle
          ? "bg-white/[0.04] border-white/10"
          : "bg-white/[0.06] border-white/10"
      }`}
    >
      <div className="flex items-center gap-2 text-white/60">
        {icon}
        <p className="text-sm">{label}</p>
      </div>
      <p className="text-3xl font-bold mt-2">{value}</p>
      {link && <p className="text-xs text-indigo-300 mt-2">View →</p>}
    </div>
  );

  return link ? <Link href={link}>{card}</Link> : card;
}

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-white/50">{label}</p>
      <div className="mt-1 text-white/80">{value}</div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl p-12 text-center bg-white/[0.04] border border-dashed border-white/15">
      <p className="text-lg font-semibold mb-2">No listings yet</p>
      <p className="text-white/60 mb-6">Your listings are how users discover you.</p>
      <Link
        href="/business/listings/new"
        className="inline-block px-6 py-3 rounded-xl bg-indigo-500 text-white font-medium hover:bg-indigo-400 transition"
      >
        Create your first listing
      </Link>
    </div>
  );
}
