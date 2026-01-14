// app/business/listings/[id]/page.tsx
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, PauseCircle, PlayCircle } from "lucide-react";

export default async function ListingViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { businessProfile: true },
  });
  if (!user) redirect("/onboarding");
  if (!user.businessProfile) redirect("/onboarding/business");

  const listing = await prisma.listing.findUnique({
    where: { id },
    include: {
      business: true,
      bookings: {
        orderBy: { createdAt: "desc" },
        take: 8,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              username: true,
              email: true,
              avatar: true,
              primaryCode: true,
              secondaryCode: true,
              city: true,
              country: true,
            },
          },
        },
      },
    },
  });

  if (!listing) return notFound();
  if (listing.businessId !== user.businessProfile.id) return notFound();

  const openInquiries = listing.bookings.filter((b) =>
    ["INQUIRY", "PENDING"].includes(b.status)
  ).length;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <Link
              href="/business/listings"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15 hover:bg-white/5 transition text-sm"
            >
              <ArrowLeft size={16} />
              Listings
            </Link>

            <span
              className={`text-[11px] px-2 py-0.5 rounded-full border ${
                listing.isActive
                  ? "border-green-500/30 bg-green-500/10 text-green-200"
                  : "border-white/10 bg-white/[0.03] text-white/60"
              }`}
            >
              {listing.isActive ? "Active" : "Paused"}
            </span>

            {openInquiries > 0 && (
              <span className="text-[11px] px-2 py-0.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-200">
                {openInquiries} open inquiry{openInquiries > 1 ? "ies" : ""}
              </span>
            )}
          </div>

          <h1 className="text-3xl font-semibold tracking-tight truncate">
            {listing.title}
          </h1>
          <p className="text-white/60 mt-2">
            {listing.category}
            {listing.subcategory ? ` • ${listing.subcategory}` : ""}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link
            href={`/business/listings/${listing.id}/edit`}
            className="inline-flex items-center justify-center px-5 py-2 rounded-xl border border-white/15 hover:bg-white/5 transition text-sm"
          >
            Edit
          </Link>

          <form
            action={async () => {
              "use server";
              // Server Actions would be ideal, but we’re not assuming you want them.
              // Keeping UI consistent: the manager already uses /api/listings/toggle.
            }}
          />

          <Link
            href="/business/inquiries"
            className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition text-sm"
          >
            Inquiries <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-6">
        {/* Content */}
        <div className="border border-white/10 rounded-2xl bg-white/[0.02] p-6 space-y-6">
          <Section title="Description">
            <p className="text-white/80 whitespace-pre-line">
              {listing.description}
            </p>
          </Section>

          <Section title="Offering details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <Info
                label="Price"
                value={
                  listing.price != null
                    ? `${listing.currency} ${listing.price} (${listing.pricingType})`
                    : "—"
                }
              />
              <Info label="Booking type" value={listing.bookingType} />
              <Info label="Duration" value={listing.duration || "—"} />
              <Info label="Group size" value={listing.groupSize || "—"} />
              <Info label="City" value={listing.city || "—"} />
              <Info label="Location" value={listing.location || "—"} />
            </div>
          </Section>

          <Section title="Targeting">
            <div className="flex flex-wrap gap-2">
              {(listing.targetCodes || []).length > 0 ? (
                listing.targetCodes.map((c) => (
                  <Pill key={c}>{c}</Pill>
                ))
              ) : (
                <span className="text-sm text-white/60">—</span>
              )}
            </div>
          </Section>

          <Section title="Editorial tags">
            <div className="flex flex-wrap gap-2">
              {(listing.tags || []).length > 0 ? (
                listing.tags.map((t) => <Pill key={t}>{t}</Pill>)
              ) : (
                <span className="text-sm text-white/60">—</span>
              )}
            </div>
          </Section>

          <Section title="Experience personality (traits)">
            {listing.traits ? (
              <pre className="text-xs text-white/70 bg-black border border-white/10 rounded-xl p-4 overflow-x-auto">
                {JSON.stringify(listing.traits, null, 2)}
              </pre>
            ) : (
              <p className="text-sm text-white/60">—</p>
            )}
            <p className="text-xs text-white/40 mt-2">
              (This is currently stored as JSON. We can make this a visual
              “signature chart” later.)
            </p>
          </Section>
        </div>

        {/* Right rail: recent inquiries */}
        <div className="border border-white/10 rounded-2xl bg-white/[0.02] p-6">
          <h2 className="text-lg font-semibold">Recent inquiries</h2>
          <p className="text-sm text-white/60 mt-1">
            Quick context from the last few messages.
          </p>

          <div className="mt-5 space-y-3">
            {listing.bookings.length > 0 ? (
              listing.bookings.map((b) => (
                <div
                  key={b.id}
                  className="rounded-xl border border-white/10 p-4 bg-white/[0.02]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">
                        {b.user?.name || b.user?.username || "Anonymous"}
                        <span className="text-white/50 font-normal">
                          {" "}
                          • {b.status}
                        </span>
                      </p>
                      <p className="text-xs text-white/60 mt-1 line-clamp-2">
                        {b.inquiryMessage || "No message provided."}
                      </p>
                    </div>
                    <span className="text-[11px] px-2 py-0.5 rounded-full border border-white/10 text-white/60">
                      {new Date(b.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3 text-[11px] text-white/50">
                    {b.user?.primaryCode && (
                      <span className="px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.03]">
                        {b.user.primaryCode}
                      </span>
                    )}
                    {b.user?.secondaryCode && (
                      <span className="px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.03]">
                        {b.user.secondaryCode}
                      </span>
                    )}
                    {b.numberOfPeople != null && (
                      <span className="px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.03]">
                        {b.numberOfPeople} ppl
                      </span>
                    )}
                    {b.bookingDate && (
                      <span className="px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.03]">
                        {new Date(b.bookingDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-white/15 p-6 text-sm text-white/60">
                No inquiries yet for this listing.
              </div>
            )}
          </div>

          <div className="mt-6">
            <Link
              href="/business/inquiries"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15 hover:bg-white/5 transition text-sm"
            >
              Open inbox <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-white/80">{title}</h3>
      <div className="border border-white/10 rounded-xl p-4 bg-black">
        {children}
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-white/50">{label}</p>
      <p className="text-sm text-white/80 mt-1">{value}</p>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-white/70">
      {children}
    </span>
  );
}
