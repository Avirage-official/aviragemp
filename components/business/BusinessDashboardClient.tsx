"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Plus,
  Eye,
  MessageCircle,
  Layers,
  Sparkles,
  BadgeCheck,
  ChevronRight,
} from "lucide-react";
import * as React from "react";

/* -------------------------------------------------------------------------- */
/* TYPES                                                                      */
/* -------------------------------------------------------------------------- */

type ListingCard = {
  id: string;
  title: string;
  description: string;
  category: string | null;
  price: number | null;
  targetCodesCount: number;
  inquiryCount: number;
  createdAt: string;
};

type Props = {
  business: {
    businessName: string;
    description: string | null;
    category: string | null;
    contactEmail: string;
    contactPhone: string | null;
    website: string | null;
    subscriptionStatus: "TRIAL" | "ACTIVE" | "CANCELED" | string;
  };
  daysUntilTrialEnd: number | null;
  totalInquiries: number;
  activeListingsCount: number;
  listings: ListingCard[];
  TrialCTA: React.ReactNode;
};

/* -------------------------------------------------------------------------- */
/* PAGE                                                                       */
/* -------------------------------------------------------------------------- */

export function BusinessDashboardClient({
  business,
  daysUntilTrialEnd,
  totalInquiries,
  activeListingsCount,
  listings,
  TrialCTA,
}: Props) {
  const nextAction = getNextAction({
    totalInquiries,
    activeListingsCount,
    hasWebsite: !!business.website,
    hasDescription: !!business.description,
  });

  return (
    <div className="min-h-[calc(100vh-2rem)] px-4 md:px-8 py-8 text-white">
      {/* BACKGROUND — MATCHED */}
      <div className="fixed inset-0 -z-10 bg-[#0B0D12]" />
      <div className="fixed inset-0 -z-10 opacity-35">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full blur-[140px] bg-[#6EA8FF]/25" />
        <div className="absolute top-24 -left-40 h-[420px] w-[420px] rounded-full blur-[160px] bg-[#C6B7FF]/20" />
        <div className="absolute bottom-[-160px] left-1/3 h-[520px] w-[520px] rounded-full blur-[180px] bg-[#7EF0C8]/18" />
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* HERO */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-white/10 bg-[#12151D] backdrop-blur-xl p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10">
                <BadgeCheck className="w-4 h-4 text-[#7EF0C8]" />
                <span className="text-sm text-white/80">
                  {business.subscriptionStatus === "TRIAL"
                    ? "Trial mode"
                    : "Live"}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                {business.businessName}
              </h1>

              <p className="text-white/65">
                {totalInquiries > 0
                  ? `You have ${totalInquiries} open inquiry${
                      totalInquiries === 1 ? "" : "ies"
                    }.`
                  : activeListingsCount > 0
                  ? `Your storefront is live.`
                  : `Create your first listing to get discovered.`}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/business/listings/new"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#6EA8FF] text-black font-semibold hover:bg-[#7FB3FF] transition"
              >
                <Plus size={18} />
                New listing
              </Link>

              <Link
                href="/business/listings"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.10] transition font-semibold"
              >
                Manage listings
                <ChevronRight size={18} className="opacity-80" />
              </Link>
            </div>
          </div>

          {business.subscriptionStatus === "TRIAL" && daysUntilTrialEnd !== null && (
            <div className="mt-6 rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white/[0.05] border border-white/10">
              <div>
                <p className="font-semibold text-white/85">Trial active</p>
                <p className="text-sm text-white/60">
                  {daysUntilTrialEnd} days remaining
                </p>
              </div>
              {TrialCTA}
            </div>
          )}
        </motion.section>

        {/* KPI + NEXT ACTION */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
            <KpiCard
              icon={<Layers size={18} />}
              label="Active listings"
              value={activeListingsCount}
              accent="soft"
              link="/business/listings"
            />
            <KpiCard
              icon={<Eye size={18} />}
              label="Profile views"
              value="—"
              accent="soft"
            />
            <KpiCard
              icon={<MessageCircle size={18} />}
              label="Open inquiries"
              value={totalInquiries}
              accent="highlight"
              link="/business/inquiries"
            />
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#12151D] backdrop-blur-xl p-6">
            <div className="flex items-center gap-2 text-white/70">
              <Sparkles className="w-4 h-4 text-[#C6B7FF]" />
              <p className="text-sm">Next best action</p>
            </div>

            <div className="mt-3">
              <p className="text-lg font-semibold">{nextAction.title}</p>
              <p className="text-white/65 mt-2">{nextAction.description}</p>
            </div>

            <Link
              href={nextAction.href}
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#7EF0C8] hover:text-[#7EF0C8]/80 transition"
            >
              {nextAction.cta}
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>

        {/* LISTINGS */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your listings</h2>
            <Link
              href="/business/listings"
              className="text-sm text-white/65 hover:text-white transition inline-flex items-center gap-2"
            >
              Manage
              <ChevronRight size={16} />
            </Link>
          </div>

          {listings.length > 0 ? (
            <div className="grid gap-4">
              {listings.map((listing) => (
                <div
                  key={listing.id}
                  className="rounded-3xl p-6 bg-[#12151D] backdrop-blur-xl border border-white/10 hover:border-white/20 transition"
                >
                  <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold truncate">
                        {listing.title}
                      </h3>
                      <p className="text-sm text-white/65 line-clamp-2">
                        {listing.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        <MetaPill label={`🎯 ${listing.targetCodesCount} codes`} />
                        {listing.inquiryCount > 0 ? (
                          <MetaPill
                            label={`💬 ${listing.inquiryCount} inquiries`}
                            tone="alert"
                          />
                        ) : (
                          <MetaPill label="💬 No inquiries" tone="muted" />
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Link
                        href={`/business/listings/${listing.id}`}
                        className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/[0.10]"
                      >
                        View
                      </Link>
                      <Link
                        href={`/business/listings/${listing.id}/edit`}
                        className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/[0.10]"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </section>

        {/* PROFILE */}
        <section className="rounded-3xl p-6 md:p-8 bg-[#12151D] backdrop-blur-xl border border-white/10">
          <h2 className="text-xl font-semibold mb-6">Business profile</h2>

          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <Info label="Contact email" value={business.contactEmail} />
            {business.website && (
              <Info
                label="Website"
                value={
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#7EF0C8] hover:underline inline-flex items-center gap-1"
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

/* -------------------------------------------------------------------------- */
/* HELPERS                                                                    */
/* -------------------------------------------------------------------------- */

function KpiCard({
  icon,
  label,
  value,
  link,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  link?: string;
  accent: "soft" | "highlight";
}) {
  const card = (
    <div
      className={[
        "rounded-3xl p-6 border backdrop-blur-xl transition",
        accent === "highlight"
          ? "bg-[#6EA8FF]/10 border-[#6EA8FF]/30"
          : "bg-[#12151D] border-white/10",
        link ? "hover:border-white/20" : "",
      ].join(" ")}
    >
      <div className="flex items-center gap-2 text-white/70">
        {icon}
        <p className="text-sm">{label}</p>
      </div>
      <p className="text-3xl font-bold mt-2">{value}</p>
      {link && (
        <p className="text-xs text-[#7EF0C8] mt-2 font-semibold">View →</p>
      )}
    </div>
  );

  return link ? <Link href={link}>{card}</Link> : card;
}

function MetaPill({
  label,
  tone,
}: {
  label: string;
  tone?: "default" | "muted" | "alert";
}) {
  const cls =
    tone === "alert"
      ? "bg-[#C6B7FF]/12 border-[#C6B7FF]/25 text-[#C6B7FF]"
      : tone === "muted"
      ? "bg-white/[0.05] border-white/10 text-white/55"
      : "bg-white/[0.07] border-white/10 text-white/70";

  return (
    <span className={`text-xs px-3 py-1 rounded-full border ${cls}`}>
      {label}
    </span>
  );
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
    <div className="rounded-3xl p-12 text-center bg-[#12151D] border border-dashed border-white/15">
      <p className="text-lg font-semibold mb-2">No listings yet</p>
      <p className="text-white/65 mb-6">
        Create one and ETHOS can start matching you.
      </p>
      <Link
        href="/business/listings/new"
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#6EA8FF] text-black font-semibold hover:bg-[#7FB3FF]"
      >
        <Plus size={18} />
        Create listing
      </Link>
    </div>
  );
}

function getNextAction(input: {
  totalInquiries: number;
  activeListingsCount: number;
  hasWebsite: boolean;
  hasDescription: boolean;
}) {
  if (input.totalInquiries > 0)
    return {
      title: "Reply to inquiries",
      description: "Fast replies increase trust and visibility.",
      cta: "Go to inquiries",
      href: "/business/inquiries",
    };

  if (input.activeListingsCount === 0)
    return {
      title: "Create your first listing",
      description: "Publish an offer so users can discover you.",
      cta: "Create listing",
      href: "/business/listings/new",
    };

  return {
    title: "Refine your listings",
    description: "Small improvements compound over time.",
    cta: "Manage listings",
    href: "/business/listings",
  };
}
