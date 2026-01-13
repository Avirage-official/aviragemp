import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { SubscriptionButton } from "@/components/business/SubscriptionButton";
import { ArrowUpRight, Plus } from "lucide-react";

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
                where: {
                  status: { in: ["INQUIRY", "PENDING"] },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!user) redirect("/onboarding");
  if (!user.businessProfile) redirect("/onboarding/business");

  const business = user.businessProfile;

  const daysUntilTrialEnd = business.subscriptionEndsAt
    ? Math.ceil(
        (business.subscriptionEndsAt.getTime() - Date.now()) /
          (1000 * 60 * 60 * 24)
      )
    : null;

  const totalInquiries =
    business.listings?.reduce(
      (sum, l) => sum + (l.bookings?.length || 0),
      0
    ) || 0;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              {business.businessName}
            </h1>
            <p className="text-white/60 mt-2">
              {business.category}
            </p>
          </div>

          <a
            href="/business/listings/new"
            className="inline-flex items-center gap-2 px-5 py-3 bg-white text-black rounded-xl font-medium hover:bg-white/90 transition"
          >
            <Plus size={18} />
            New Listing
          </a>
        </header>

        {/* Trial Banner */}
        {business.subscriptionStatus === "TRIAL" && daysUntilTrialEnd !== null && (
          <div className="border border-yellow-500/20 bg-yellow-500/5 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="font-semibold text-yellow-300">
                Free Trial Active
              </p>
              <p className="text-sm text-yellow-200/70 mt-1">
                {daysUntilTrialEnd} days remaining
              </p>
            </div>
            <SubscriptionButton />
          </div>
        )}

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard label="Active Listings" value={business.listings.length} />
          <StatCard label="Profile Views" value="—" />
          <StatCard
            label="New Inquiries"
            value={totalInquiries}
            highlight
            link="/business/inquiries"
          />
        </section>

        {/* Listings */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Listings</h2>

          {business.listings.length > 0 ? (
            <div className="space-y-4">
              {business.listings.map((listing) => (
                <div
                  key={listing.id}
                  className="border border-white/10 rounded-2xl p-6 hover:border-white/20 transition"
                >
                  <div className="flex flex-col md:flex-row md:justify-between gap-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">
                        {listing.title}
                      </h3>
                      <p className="text-sm text-white/60 line-clamp-2">
                        {listing.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-xs text-white/50 mt-3">
                        <span>📁 {listing.category}</span>
                        {listing.price && <span>💰 ${listing.price}</span>}
                        <span>🎯 {listing.targetCodes.length} codes</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href={`/business/listings/${listing.id}`}
                        className="text-sm px-4 py-2 rounded-lg border border-white/15 hover:bg-white/5 transition"
                      >
                        View
                      </a>
                      <a
                        href={`/business/listings/${listing.id}/edit`}
                        className="text-sm px-4 py-2 rounded-lg border border-white/15 hover:bg-white/5 transition"
                      >
                        Edit
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </section>

        {/* Business Info */}
        <section className="border border-white/10 rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-semibold">Business Info</h2>

          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <Info label="Email" value={business.contactEmail} />
            {business.contactPhone && (
              <Info label="Phone" value={business.contactPhone} />
            )}
            {business.website && (
              <Info
                label="Website"
                value={
                  <a
                    href={business.website}
                    target="_blank"
                    className="text-blue-400 hover:underline inline-flex items-center gap-1"
                  >
                    {business.website}
                    <ArrowUpRight size={14} />
                  </a>
                }
              />
            )}
            {business.description && (
              <Info label="Description" value={business.description} />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------- UI helpers ---------- */

function StatCard({
  label,
  value,
  highlight,
  link,
}: {
  label: string;
  value: number | string;
  highlight?: boolean;
  link?: string;
}) {
  const card = (
    <div
      className={`rounded-2xl p-6 border ${
        highlight
          ? "border-blue-500/30 bg-blue-500/5"
          : "border-white/10"
      }`}
    >
      <p className="text-sm text-white/60">{label}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
      {link && (
        <p className="text-xs text-blue-400 mt-2">View →</p>
      )}
    </div>
  );

  return link ? <a href={link}>{card}</a> : card;
}

function Info({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <p className="text-white/50">{label}</p>
      <div className="mt-1">{value}</div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="border border-dashed border-white/15 rounded-2xl p-12 text-center">
      <p className="text-lg font-semibold mb-2">No listings yet</p>
      <p className="text-white/60 mb-6">
        Create your first listing to reach personality-matched users.
      </p>
      <a
        href="/business/listings/new"
        className="inline-block px-6 py-3 bg-white text-black rounded-xl font-medium hover:bg-white/90 transition"
      >
        Create Listing
      </a>
    </div>
  );
}
