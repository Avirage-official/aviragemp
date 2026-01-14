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
      {/* Neon backdrop (subtle, business-safe) */}
      <div className="fixed inset-0 -z-10 bg-[#0B0D12]" />
      <div className="fixed inset-0 -z-10 opacity-40">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full blur-3xl bg-[#4F8CFF]/25" />
        <div className="absolute top-16 -left-24 h-96 w-96 rounded-full blur-3xl bg-[#C7B9FF]/18" />
        <div className="absolute bottom-[-140px] left-1/3 h-[520px] w-[520px] rounded-full blur-3xl bg-[#7CF5C8]/14" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-black/70" />
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* HERO / STATUS */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15">
                <BadgeCheck className="w-4 h-4 text-[#7CF5C8]" />
                <span className="text-sm text-white/85">
                  {business.subscriptionStatus === "TRIAL"
                    ? "Trial mode · set up & test"
                    : "Live · ready for customers"}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                {business.businessName}
              </h1>

              <p className="text-white/70">
                {totalInquiries > 0
                  ? `You’ve got ${totalInquiries} open inquiry${
                      totalInquiries === 1 ? "" : "ies"
                    }. Fast replies increase visibility.`
                  : activeListingsCount > 0
                  ? `Your storefront is live. Keep momentum by refining listings.`
                  : `Let’s publish your first listing and get discovery started.`}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/business/listings/new"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-black font-semibold hover:scale-[1.02] transition"
              >
                <Plus size={18} />
                New listing
              </Link>

              <Link
                href="/business/listings"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/10 border border-white/15 hover:bg-white/15 transition font-semibold"
              >
                Manage listings
                <ChevronRight size={18} className="opacity-80" />
              </Link>
            </div>
          </div>

          {/* Trial Banner (unchanged behavior) */}
          {business.subscriptionStatus === "TRIAL" && daysUntilTrialEnd !== null && (
            <div className="mt-6 rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-yellow-400/10 border border-yellow-300/20">
              <div>
                <p className="font-semibold text-yellow-200">Trial period active</p>
                <p className="text-sm text-yellow-100/70 mt-1">
                  {daysUntilTrialEnd} day{daysUntilTrialEnd === 1 ? "" : "s"} remaining
                </p>
              </div>
              {TrialCTA}
            </div>
          )}
        </motion.section>

        {/* KPI + NEXT ACTION */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
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
              value={"—"}
              accent="soft"
              hint="Coming soon"
            />
            <KpiCard
              icon={<MessageCircle size={18} />}
              label="Open inquiries"
              value={totalInquiries}
              accent="highlight"
              link="/business/inquiries"
              hint={totalInquiries > 0 ? "Reply now" : "No pending messages"}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6"
          >
            <div className="flex items-center gap-2 text-white/70">
              <Sparkles className="w-4 h-4 text-[#C7B9FF]" />
              <p className="text-sm">Next best action</p>
            </div>

            <div className="mt-3">
              <p className="text-lg font-semibold">{nextAction.title}</p>
              <p className="text-white/65 mt-2">{nextAction.description}</p>
            </div>

            <Link
              href={nextAction.href}
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#7CF5C8] hover:text-[#7CF5C8]/80 transition"
            >
              {nextAction.cta}
              <ArrowUpRight size={16} />
            </Link>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/65">
              <p className="font-medium text-white/80 mb-1">Pro tip</p>
              <p>
                Businesses with <span className="text-white/85 font-semibold">2+ listings</span> usually
                show up more often in discovery.
              </p>
            </div>
          </motion.div>
        </section>

        {/* LISTINGS CONTROL PANEL */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your listings</h2>
            <Link
              href="/business/listings"
              className="text-sm text-white/70 hover:text-white transition inline-flex items-center gap-2"
            >
              Manage
              <ChevronRight size={16} />
            </Link>
          </div>

          {listings.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {listings.map((listing, idx) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 + idx * 0.03 }}
                  className="rounded-3xl p-6 bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-white/20 transition"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="min-w-0 space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg font-semibold truncate">{listing.title}</h3>

                        {/* Status pill (always active in your query) */}
                        <span className="shrink-0 text-xs px-2.5 py-1 rounded-full bg-[#7CF5C8]/10 border border-[#7CF5C8]/25 text-[#7CF5C8]">
                          Active
                        </span>
                      </div>

                      <p className="text-sm text-white/65 line-clamp-2">
                        {listing.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        <MetaPill label={listing.category ? `📁 ${listing.category}` : "📁 —"} />
                        <MetaPill label={listing.price ? `💰 $${listing.price}` : "💰 —"} />
                        <MetaPill label={`🎯 ${listing.targetCodesCount} codes`} />
                        {listing.inquiryCount > 0 ? (
                          <MetaPill
                            label={`💬 ${listing.inquiryCount} inquiry${
                              listing.inquiryCount === 1 ? "" : "ies"
                            }`}
                            tone="alert"
                          />
                        ) : (
                          <MetaPill label="💬 No open inquiries" tone="muted" />
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        href={`/business/listings/${listing.id}`}
                        className="text-sm px-4 py-2 rounded-xl border border-white/15 hover:bg-white/10 transition"
                      >
                        View
                      </Link>
                      <Link
                        href={`/business/listings/${listing.id}/edit`}
                        className="text-sm px-4 py-2 rounded-xl border border-white/15 hover:bg-white/10 transition"
                      >
                        Edit
                      </Link>

                      {listing.inquiryCount > 0 && (
                        <Link
                          href="/business/inquiries"
                          className="text-sm px-4 py-2 rounded-xl bg-white text-black font-semibold hover:scale-[1.02] transition"
                        >
                          Reply
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </motion.section>

        {/* BUSINESS PROFILE (REFERENCE) */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="rounded-3xl p-6 md:p-8 bg-white/[0.04] backdrop-blur-xl border border-white/10"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Business profile</h2>
            <span className="text-xs text-white/50">Reference</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-sm mt-6">
            <Info label="Contact email" value={business.contactEmail} />
            {business.contactPhone && <Info label="Phone" value={business.contactPhone} />}
            {business.website && (
              <Info
                label="Website"
                value={
                  <a
                    href={business.website}
                    target="_blank"
                    className="text-[#7CF5C8] hover:underline inline-flex items-center gap-1"
                    rel="noreferrer"
                  >
                    {business.website}
                    <ArrowUpRight size={14} />
                  </a>
                }
              />
            )}
            {business.description && <Info label="Description" value={business.description} />}
          </div>
        </motion.section>
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
  hint,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  link?: string;
  hint?: string;
  accent: "soft" | "highlight";
}) {
  const card = (
    <div
      className={[
        "rounded-3xl p-6 border backdrop-blur-xl transition",
        accent === "highlight"
          ? "bg-[#4F8CFF]/10 border-[#4F8CFF]/25"
          : "bg-white/[0.04] border-white/10",
        link ? "hover:border-white/20 hover:bg-white/[0.06]" : "",
      ].join(" ")}
    >
      <div className="flex items-center gap-2 text-white/70">
        {icon}
        <p className="text-sm">{label}</p>
      </div>

      <p className="text-3xl font-bold mt-2">{value}</p>

      {hint && <p className="text-xs text-white/55 mt-2">{hint}</p>}
      {link && <p className="text-xs text-[#7CF5C8] mt-2 font-semibold">View →</p>}
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
      ? "bg-[#C7B9FF]/12 border-[#C7B9FF]/25 text-[#C7B9FF]"
      : tone === "muted"
      ? "bg-white/5 border-white/10 text-white/55"
      : "bg-white/7 border-white/10 text-white/70";

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
    <div className="rounded-3xl p-12 text-center bg-white/[0.04] border border-dashed border-white/15">
      <p className="text-lg font-semibold mb-2">No listings yet</p>
      <p className="text-white/65 mb-6">
        Listings are how users discover you. Your first one takes ~2 minutes.
      </p>
      <Link
        href="/business/listings/new"
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white text-black font-semibold hover:scale-[1.02] transition"
      >
        <Plus size={18} />
        Create your first listing
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
  const { totalInquiries, activeListingsCount, hasWebsite, hasDescription } = input;

  if (totalInquiries > 0) {
    return {
      title: "Reply to inquiries",
      description:
        "Fast replies build trust and increase your placement in discovery. Clear one message and you’ll feel the lift immediately.",
      cta: "Go to inquiries",
      href: "/business/inquiries",
    };
  }

  if (activeListingsCount === 0) {
    return {
      title: "Create your first listing",
      description:
        "Your listing is your storefront. Publish one offer and ETHOS can start matching you to aligned users.",
      cta: "Create listing",
      href: "/business/listings/new",
    };
  }

  if (!hasWebsite || !hasDescription) {
    return {
      title: "Complete your profile",
      description:
        "A complete profile increases credibility. Add a website + short description so customers feel safe contacting you.",
      cta: "Review profile",
      href: "/business/dashboard", // later: link to profile editor if you have it
    };
  }

  if (activeListingsCount < 2) {
    return {
      title: "Add a second listing",
      description:
        "More offerings = more surfaces for matching. A second listing often boosts discovery significantly.",
      cta: "Create another listing",
      href: "/business/listings/new",
    };
  }

  return {
    title: "Refine your best listing",
    description:
      "Small improvements compound. Tighten your title, add clarity to your description, and keep your targeting sharp.",
    cta: "Manage listings",
    href: "/business/listings",
  };
}