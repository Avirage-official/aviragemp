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
    <div className="min-h-screen px-4 md:px-8 py-8 text-[#FAFAFA]">
      {/* BACKGROUND — OPTION 2 LOCKED */}
      <div className="fixed inset-0 -z-10 bg-[#111827]" />
      <div className="fixed inset-0 -z-10">
        <div className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full blur-[200px] bg-[#4F8CFF]/20" />
        <div className="absolute top-32 -left-48 h-[480px] w-[480px] rounded-full blur-[220px] bg-[#C7B9FF]/18" />
        <div className="absolute bottom-[-200px] left-1/3 h-[600px] w-[600px] rounded-full blur-[240px] bg-[#7CF5C8]/16" />
      </div>

      <div className="max-w-6xl mx-auto space-y-10">
        {/* HERO */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row md:justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10">
                <BadgeCheck className="w-4 h-4 text-[#7CF5C8]" />
                <span className="text-sm text-white/80">
                  {business.subscriptionStatus === "TRIAL" ? "Trial mode" : "Live"}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                {business.businessName}
              </h1>

              <p className="text-white/65">
                {totalInquiries > 0
                  ? `You have ${totalInquiries} open inquiry${totalInquiries === 1 ? "" : "ies"}.`
                  : activeListingsCount > 0
                  ? "Your storefront is live."
                  : "Create your first listing to get discovered."}
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                href="/business/listings/new"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#4F8CFF] text-black font-semibold hover:opacity-90 transition"
              >
                <Plus size={18} />
                New listing
              </Link>

              <Link
                href="/business/listings"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.1] transition font-semibold"
              >
                Manage
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>

          {business.subscriptionStatus === "TRIAL" && daysUntilTrialEnd !== null && (
            <div className="mt-6 rounded-2xl p-5 bg-white/[0.05] border border-white/10 flex justify-between items-center">
              <div>
                <p className="font-semibold">Trial active</p>
                <p className="text-sm text-white/60">
                  {daysUntilTrialEnd} days remaining
                </p>
              </div>
              {TrialCTA}
            </div>
          )}
        </motion.section>

        {/* KPIs */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KpiCard icon={<Layers size={18} />} label="Active listings" value={activeListingsCount} />
          <KpiCard icon={<Eye size={18} />} label="Profile views" value="—" />
          <KpiCard
            icon={<MessageCircle size={18} />}
            label="Open inquiries"
            value={totalInquiries}
            highlight
            link="/business/inquiries"
          />
        </section>

        {/* NEXT ACTION */}
        <section className="rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl p-6">
          <div className="flex items-center gap-2 text-white/70">
            <Sparkles className="w-4 h-4 text-[#C7B9FF]" />
            <p className="text-sm">Next best action</p>
          </div>

          <h3 className="text-lg font-semibold mt-3">{nextAction.title}</h3>
          <p className="text-white/65 mt-2">{nextAction.description}</p>

          <Link
            href={nextAction.href}
            className="inline-flex items-center gap-2 mt-4 text-[#7CF5C8] font-semibold"
          >
            {nextAction.cta}
            <ArrowUpRight size={16} />
          </Link>
        </section>

        {/* LISTINGS */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Your listings</h2>

          {listings.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-4">
              {listings.map((l) => (
                <div
                  key={l.id}
                  className="rounded-3xl p-6 bg-white/[0.04] border border-white/10 backdrop-blur-xl"
                >
                  <h3 className="font-semibold">{l.title}</h3>
                  <p className="text-sm text-white/65 line-clamp-2 mt-1">
                    {l.description}
                  </p>

                  <div className="flex gap-2 mt-3">
                    <MetaPill label={`🎯 ${l.targetCodesCount} codes`} />
                    {l.inquiryCount > 0 ? (
                      <MetaPill label={`💬 ${l.inquiryCount}`} alert />
                    ) : (
                      <MetaPill label="💬 None" muted />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* PROFILE */}
        <section className="rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Business profile</h2>
          <Info label="Email" value={business.contactEmail} />
          {business.website && (
            <Info
              label="Website"
              value={
                <a href={business.website} className="text-[#7CF5C8] underline">
                  {business.website}
                </a>
              }
            />
          )}
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
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  link?: string;
  highlight?: boolean;
}) {
  const card = (
    <div
      className={`rounded-3xl p-6 border backdrop-blur-xl ${
        highlight
          ? "bg-[#4F8CFF]/10 border-[#4F8CFF]/30"
          : "bg-white/[0.04] border-white/10"
      }`}
    >
      <div className="flex items-center gap-2 text-white/70">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );

  return link ? <Link href={link}>{card}</Link> : card;
}

function MetaPill({
  label,
  alert,
  muted,
}: {
  label: string;
  alert?: boolean;
  muted?: boolean;
}) {
  return (
    <span
      className={`text-xs px-3 py-1 rounded-full border ${
        alert
          ? "bg-[#C7B9FF]/15 border-[#C7B9FF]/30 text-[#C7B9FF]"
          : muted
          ? "bg-white/[0.04] border-white/10 text-white/50"
          : "bg-white/[0.06] border-white/10 text-white/70"
      }`}
    >
      {label}
    </span>
  );
}

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="mb-3">
      <p className="text-white/50">{label}</p>
      <div className="text-white/80">{value}</div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-3xl p-12 text-center bg-white/[0.04] border border-dashed border-white/15">
      <p className="font-semibold mb-2">No listings yet</p>
      <p className="text-white/65 mb-6">
        Create one and ETHOS can start matching you.
      </p>
      <Link
        href="/business/listings/new"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#4F8CFF] text-black font-semibold"
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
    description: "Small improvements compound.",
    cta: "Manage listings",
    href: "/business/listings",
  };
}
