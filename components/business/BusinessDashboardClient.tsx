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
  Tag,
  Globe,
  Mail,
  Calendar,
  Wand2,
  Settings,
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
    hasCategory: !!business.category,
  });

  const profileHealth = getProfileHealth({
    hasWebsite: !!business.website,
    hasDescription: !!business.description,
    hasCategory: !!business.category,
  });

  return (
    <div className="relative min-h-screen bg-[#FAFAFA] text-slate-900 overflow-hidden">
      {/* ETHOS LIGHT FIELD (NEVER BLACK) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* top wash */}
        <div className="absolute -top-48 left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full blur-[190px] bg-[#4F8CFF]/26" />
        <div className="absolute top-24 -left-48 h-[720px] w-[720px] rounded-full blur-[200px] bg-[#C7B9FF]/34" />
        <div className="absolute bottom-[-320px] right-[-220px] h-[820px] w-[820px] rounded-full blur-[210px] bg-[#7CF5C8]/34" />

        {/* subtle mesh shards (adds “fun” without noise) */}
        <div className="absolute inset-0 opacity-[0.35]">
          <div className="absolute top-28 right-[18%] h-32 w-32 rotate-12 rounded-[32px] bg-white/50 blur-[1px] border border-black/5" />
          <div className="absolute top-[34%] left-[12%] h-44 w-44 -rotate-6 rounded-[44px] bg-white/45 blur-[1px] border border-black/5" />
          <div className="absolute bottom-[14%] left-[42%] h-36 w-36 rotate-6 rounded-[36px] bg-white/40 blur-[1px] border border-black/5" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 sm:py-14 space-y-10">
        {/* TOP BAR */}
        <motion.header
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="space-y-1">
            <p className="text-sm text-slate-500">Business workspace</p>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              {business.businessName}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <StatusPill status={business.subscriptionStatus} />
              {business.category ? (
                <Pill tone="lav" icon={<Tag className="h-4 w-4" />} label={business.category} />
              ) : (
                <Pill tone="muted" icon={<Tag className="h-4 w-4" />} label="Add category" />
              )}
              {profileHealth.level === "excellent" ? (
                <Pill
                  tone="mint"
                  icon={<BadgeCheck className="h-4 w-4" />}
                  label="Profile ready"
                />
              ) : (
                <Pill
                  tone="blue"
                  icon={<Wand2 className="h-4 w-4" />}
                  label={`Boost profile (+${profileHealth.missingCount})`}
                />
              )}
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/business/listings/new"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#4F8CFF] text-white font-semibold shadow-sm hover:scale-[1.03] transition"
            >
              <Plus size={18} />
              New listing
            </Link>

            <Link
              href="/business/listings"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/70 backdrop-blur border border-black/10 font-semibold hover:bg-white transition"
            >
              Manage
              <ChevronRight size={18} />
            </Link>
          </div>
        </motion.header>

        {/* HERO PRESENCE */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-[40px] bg-white/78 backdrop-blur-xl border border-black/5 overflow-hidden"
        >
          {/* hero glow line */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#4F8CFF]/60 via-[#C7B9FF]/55 to-[#7CF5C8]/60" />

          <div className="p-6 sm:p-8 lg:p-10 grid lg:grid-cols-[1.25fr_0.75fr] gap-8">
            <div className="space-y-4">
              <p className="text-slate-600 text-lg leading-relaxed">
                {totalInquiries > 0
                  ? `You’ve got ${totalInquiries} open inquiry${totalInquiries === 1 ? "" : "ies"} — this is where momentum starts.`
                  : activeListingsCount > 0
                  ? "You’re live. Keep it sharp, keep it you."
                  : "You’re not behind. You’re building presence. Start with one listing that feels real."}
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <HeroAction
                  href={nextAction.href}
                  label={nextAction.cta}
                  accent="blue"
                  icon={<ArrowUpRight size={18} />}
                />
                <HeroAction
                  href="/business/inquiries"
                  label="Inquiries"
                  accent="mint"
                  icon={<MessageCircle size={18} />}
                />
                <HeroAction
                  href="/business/listings"
                  label="Listings"
                  accent="lav"
                  icon={<Layers size={18} />}
                />
                <HeroAction
                  href="/business/identity"
                  label="Business identity"
                  accent="ink"
                  icon={<Settings size={18} />}
                />
              </div>

              {business.subscriptionStatus === "TRIAL" && daysUntilTrialEnd !== null && (
                <div className="mt-6 rounded-[28px] bg-[#C7B9FF]/18 border border-[#C7B9FF]/35 px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="font-semibold">Trial active</p>
                    <p className="text-sm text-slate-600">
                      {daysUntilTrialEnd} day{daysUntilTrialEnd === 1 ? "" : "s"} remaining
                    </p>
                  </div>
                  {TrialCTA}
                </div>
              )}
            </div>

            {/* SIGNAL STACK */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              <SignalCard
                icon={<Layers className="h-4 w-4" />}
                label="Active listings"
                value={activeListingsCount}
                accent="blue"
                href="/business/listings"
              />
              <SignalCard
                icon={<MessageCircle className="h-4 w-4" />}
                label="Open inquiries"
                value={totalInquiries}
                accent="mint"
                href="/business/inquiries"
                pulse={totalInquiries > 0}
              />
              <SignalCard
                icon={<Eye className="h-4 w-4" />}
                label="Profile views"
                value="—"
                accent="lav"
              />
              <SignalCard
                icon={<Sparkles className="h-4 w-4" />}
                label="Next move"
                value={nextAction.short}
                accent="ink"
                href={nextAction.href}
                compact
              />
            </div>
          </div>
        </motion.section>

        {/* NEXT ACTION CARD (STRONGER, NOT A BORING BOX) */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[40px] bg-white/78 backdrop-blur-xl border border-black/5 overflow-hidden"
        >
          <div className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-slate-500">
                <Sparkles className="h-4 w-4 text-[#C7B9FF]" />
                <span className="text-sm">Next best action</span>
              </div>
              <h2 className="text-2xl font-semibold mt-2">{nextAction.title}</h2>
              <p className="text-slate-600 mt-2 max-w-2xl">{nextAction.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {profileHealth.missing.map((m) => (
                  <Pill
                    key={m}
                    tone="muted"
                    icon={<Wand2 className="h-4 w-4" />}
                    label={m}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href={nextAction.href}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4F8CFF] text-white font-semibold shadow-sm hover:scale-[1.03] transition"
              >
                {nextAction.cta}
                <ArrowUpRight size={16} />
              </Link>
              <Link
                href="/business/profile"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/70 backdrop-blur border border-black/10 font-semibold hover:bg-white transition"
              >
                Edit profile
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </motion.section>

        {/* LISTINGS (STRONGER, MORE “GALLERY” + CATEGORY/PRICE/TIME) */}
        <section className="space-y-5">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h3 className="text-2xl font-semibold">Your listings</h3>
              <p className="text-slate-600 mt-1">
                Keep them sharp. Keep them honest. ETHOS rewards clarity.
              </p>
            </div>

            <div className="flex sm:hidden gap-3">
              <Link
                href="/business/listings/new"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#4F8CFF] text-white font-semibold hover:scale-[1.03] transition"
              >
                <Plus size={18} />
                New
              </Link>
              <Link
                href="/business/listings"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/70 backdrop-blur border border-black/10 font-semibold hover:bg-white transition"
              >
                Manage
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>

          {listings.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((l) => (
                <motion.div
                  key={l.id}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="group rounded-[36px] bg-white/82 backdrop-blur-xl border border-black/5 overflow-hidden shadow-[0_1px_0_rgba(0,0,0,0.03)]"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-lg font-semibold leading-snug">
                        {l.title}
                      </h4>
                      <Link
                        href={`/business/listings/${l.id}/edit`}
                        className="shrink-0 inline-flex items-center gap-1 text-sm font-semibold text-[#4F8CFF] opacity-0 group-hover:opacity-100 transition"
                      >
                        Edit
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>

                    <p className="text-sm text-slate-600 mt-2 line-clamp-3">
                      {l.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {l.category ? (
                        <MetaPill
                          tone="lav"
                          label={l.category}
                          icon={<Tag className="h-3.5 w-3.5" />}
                        />
                      ) : (
                        <MetaPill
                          tone="muted"
                          label="No category"
                          icon={<Tag className="h-3.5 w-3.5" />}
                        />
                      )}

                      <MetaPill
                        tone="blue"
                        label={`${l.targetCodesCount} codes`}
                        icon={<Sparkles className="h-3.5 w-3.5" />}
                      />

                      {l.inquiryCount > 0 ? (
                        <MetaPill
                          tone="mint"
                          label={`${l.inquiryCount} inquiries`}
                          icon={<MessageCircle className="h-3.5 w-3.5" />}
                          pulse
                        />
                      ) : (
                        <MetaPill
                          tone="muted"
                          label="No inquiries"
                          icon={<MessageCircle className="h-3.5 w-3.5" />}
                        />
                      )}

                      <MetaPill
                        tone="ink"
                        label={formatDate(l.createdAt)}
                        icon={<Calendar className="h-3.5 w-3.5" />}
                      />

                      {typeof l.price === "number" ? (
                        <MetaPill
                          tone="ink"
                          label={`$${l.price}`}
                          icon={<span className="text-[11px] font-bold">$</span>}
                        />
                      ) : (
                        <MetaPill
                          tone="muted"
                          label="Price not set"
                          icon={<span className="text-[11px] font-bold">$</span>}
                        />
                      )}
                    </div>

                    <div className="mt-5">
                      <Link
                        href={`/marketplace/${l.id}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition"
                      >
                        Preview on ETHOS
                        <ArrowUpRight className="h-4 w-4 text-[#4F8CFF]" />
                      </Link>
                    </div>
                  </div>

                  {/* subtle bottom glow */}
                  <div className="h-[2px] bg-gradient-to-r from-[#4F8CFF]/40 via-[#C7B9FF]/35 to-[#7CF5C8]/40 opacity-0 group-hover:opacity-100 transition" />
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* BUSINESS PROFILE (RESTORED + STRONGER) */}
        <section className="grid lg:grid-cols-[1fr_1fr] gap-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[40px] bg-white/78 backdrop-blur-xl border border-black/5 p-6 sm:p-8"
          >
            <h3 className="text-xl font-semibold">Business profile</h3>
            <p className="text-slate-600 mt-2">
              This is what people trust before they message you.
            </p>

            <div className="mt-6 space-y-4">
              <InfoRow
                icon={<Mail className="h-4 w-4 text-slate-500" />}
                label="Email"
                value={business.contactEmail}
              />

              <InfoRow
                icon={<Tag className="h-4 w-4 text-slate-500" />}
                label="Category"
                value={business.category ?? <span className="text-slate-400">Not set</span>}
              />

              <InfoRow
                icon={<Globe className="h-4 w-4 text-slate-500" />}
                label="Website"
                value={
                  business.website ? (
                    <a
                      href={business.website}
                      className="text-[#4F8CFF] font-semibold hover:underline"
                    >
                      {business.website}
                    </a>
                  ) : (
                    <span className="text-slate-400">Not set</span>
                  )
                }
              />
            </div>

            <div className="mt-7 flex gap-3">
              <Link
                href="/business/profile"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/70 backdrop-blur border border-black/10 font-semibold hover:bg-white transition"
              >
                Edit profile
                <ChevronRight size={16} />
              </Link>

              <Link
                href="/business/identity"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C7B9FF]/28 border border-[#C7B9FF]/45 font-semibold hover:bg-[#C7B9FF]/35 transition"
              >
                Identity
                <ChevronRight size={16} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[40px] bg-white/78 backdrop-blur-xl border border-black/5 p-6 sm:p-8"
          >
            <h3 className="text-xl font-semibold">Presence score</h3>
            <p className="text-slate-600 mt-2">
              Not a rating. Just a guide to help you feel “complete” on ETHOS.
            </p>

            <div className="mt-6">
              <PresenceMeter value={profileHealth.score} />
            </div>

            <div className="mt-5 space-y-2">
              {profileHealth.checks.map((c) => (
                <PresenceCheck key={c.label} ok={c.ok} label={c.label} />
              ))}
            </div>

            <div className="mt-7">
              <Link
                href={profileHealth.primaryFixHref}
                className="inline-flex items-center gap-2 text-[#4F8CFF] font-semibold"
              >
                {profileHealth.primaryFixCta}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* UI COMPONENTS                                                              */
/* -------------------------------------------------------------------------- */

function StatusPill({ status }: { status: string }) {
  const isTrial = status === "TRIAL";
  const isActive = status === "ACTIVE";

  if (isTrial) {
    return (
      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#7CF5C8]/30 text-[#065f46] font-medium text-sm">
        <BadgeCheck className="h-4 w-4" />
        Trial
      </span>
    );
  }

  if (isActive) {
    return (
      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#4F8CFF]/18 text-[#1d4ed8] font-medium text-sm">
        <BadgeCheck className="h-4 w-4" />
        Live
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 text-slate-600 font-medium text-sm border border-black/10">
      <BadgeCheck className="h-4 w-4" />
      {status.toLowerCase()}
    </span>
  );
}

function Pill({
  label,
  icon,
  tone,
}: {
  label: string;
  icon?: React.ReactNode;
  tone: "blue" | "mint" | "lav" | "ink" | "muted";
}) {
  const cls =
    tone === "blue"
      ? "bg-[#4F8CFF]/14 text-[#1d4ed8] border-[#4F8CFF]/25"
      : tone === "mint"
      ? "bg-[#7CF5C8]/22 text-[#065f46] border-[#7CF5C8]/30"
      : tone === "lav"
      ? "bg-[#C7B9FF]/20 text-[#6b21a8] border-[#C7B9FF]/35"
      : tone === "ink"
      ? "bg-black/5 text-slate-700 border-black/10"
      : "bg-white/60 text-slate-600 border-black/10";

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium ${cls}`}>
      {icon}
      {label}
    </span>
  );
}

function HeroAction({
  href,
  label,
  icon,
  accent,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  accent: "blue" | "mint" | "lav" | "ink";
}) {
  const cls =
    accent === "blue"
      ? "bg-[#4F8CFF] text-white"
      : accent === "mint"
      ? "bg-[#7CF5C8]/45 text-[#065f46] border border-[#7CF5C8]/40"
      : accent === "lav"
      ? "bg-[#C7B9FF]/35 text-[#6b21a8] border border-[#C7B9FF]/40"
      : "bg-white/70 text-slate-800 border border-black/10";

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold hover:scale-[1.03] transition ${cls}`}
    >
      {icon}
      {label}
    </Link>
  );
}

function SignalCard({
  icon,
  label,
  value,
  accent,
  href,
  pulse,
  compact,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  accent: "blue" | "mint" | "lav" | "ink";
  href?: string;
  pulse?: boolean;
  compact?: boolean;
}) {
  const base =
    accent === "blue"
      ? "bg-white/82 border-black/5 shadow-[0_0_0_4px_rgba(79,140,255,0.10)]"
      : accent === "mint"
      ? "bg-white/82 border-black/5 shadow-[0_0_0_4px_rgba(124,245,200,0.10)]"
      : accent === "lav"
      ? "bg-white/82 border-black/5 shadow-[0_0_0_4px_rgba(199,185,255,0.10)]"
      : "bg-white/82 border-black/5";

  const inner = (
    <div className={`relative rounded-[28px] p-5 backdrop-blur-xl border ${base}`}>
      {pulse && (
        <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-2 ring-[#7CF5C8]/30 animate-pulse" />
      )}
      <div className="flex items-center gap-2 text-slate-500">
        {icon}
        <span className="text-sm">{label}</span>
      </div>

      <div className={`mt-2 ${compact ? "text-lg font-semibold text-slate-800" : "text-3xl font-semibold"}`}>
        {value}
      </div>
    </div>
  );

  return href ? <Link href={href}>{inner}</Link> : inner;
}

function MetaPill({
  label,
  icon,
  tone,
  pulse,
}: {
  label: string;
  icon?: React.ReactNode;
  tone: "blue" | "mint" | "lav" | "ink" | "muted";
  pulse?: boolean;
}) {
  const cls =
    tone === "blue"
      ? "bg-[#4F8CFF]/14 text-[#1d4ed8] border-[#4F8CFF]/25"
      : tone === "mint"
      ? "bg-[#7CF5C8]/22 text-[#065f46] border-[#7CF5C8]/30"
      : tone === "lav"
      ? "bg-[#C7B9FF]/20 text-[#6b21a8] border-[#C7B9FF]/35"
      : tone === "ink"
      ? "bg-black/5 text-slate-700 border-black/10"
      : "bg-white/60 text-slate-500 border-black/10";

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold ${cls} ${
        pulse ? "animate-pulse" : ""
      }`}
    >
      {icon}
      {label}
    </span>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5">{icon}</div>
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <div className="font-semibold text-slate-800">{value}</div>
      </div>
    </div>
  );
}

function PresenceMeter({ value }: { value: number }) {
  return (
    <div className="rounded-[28px] bg-black/5 border border-black/10 p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600 font-semibold">Completion</p>
        <p className="text-sm font-semibold text-slate-800">{value}%</p>
      </div>
      <div className="mt-3 h-3 rounded-full bg-white border border-black/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#4F8CFF] via-[#C7B9FF] to-[#7CF5C8]"
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="mt-3 text-sm text-slate-600">
        The goal is confidence — not perfection.
      </p>
    </div>
  );
}

function PresenceCheck({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white/70 border border-black/5 px-4 py-3">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <span
        className={`text-xs font-bold px-2 py-1 rounded-full ${
          ok
            ? "bg-[#7CF5C8]/35 text-[#065f46]"
            : "bg-[#C7B9FF]/25 text-[#6b21a8]"
        }`}
      >
        {ok ? "OK" : "FIX"}
      </span>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-[44px] bg-white/80 backdrop-blur-xl border border-dashed border-black/10 px-10 py-16 text-center">
      <p className="text-2xl font-semibold mb-3">No listings yet</p>
      <p className="text-slate-600 mb-8 max-w-xl mx-auto">
        Make one listing that feels like *you*. ETHOS doesn’t need more noise —
        it needs clarity.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/business/listings/new"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#4F8CFF] text-white font-semibold hover:scale-[1.03] transition"
        >
          <Plus size={18} />
          Create your first listing
        </Link>
        <Link
          href="/business/identity"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#C7B9FF]/35 border border-[#C7B9FF]/45 font-semibold hover:bg-[#C7B9FF]/45 transition"
        >
          Set identity
          <ChevronRight size={18} />
        </Link>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* HELPERS                                                                    */
/* -------------------------------------------------------------------------- */

function getNextAction(input: {
  totalInquiries: number;
  activeListingsCount: number;
  hasWebsite: boolean;
  hasDescription: boolean;
  hasCategory: boolean;
}) {
  if (input.totalInquiries > 0)
    return {
      title: "Reply to inquiries",
      description: "Fast replies build trust — and trust becomes visibility.",
      cta: "Go to inquiries",
      href: "/business/inquiries",
      short: "Reply now",
    };

  if (input.activeListingsCount === 0)
    return {
      title: "Create your first listing",
      description: "Start with one offer that feels real. Clarity wins here.",
      cta: "Create listing",
      href: "/business/listings/new",
      short: "Create",
    };

  if (!input.hasDescription || !input.hasCategory || !input.hasWebsite)
    return {
      title: "Complete your profile",
      description:
        "A complete profile converts curiosity into messages. Keep it simple, keep it you.",
      cta: "Edit profile",
      href: "/business/profile",
      short: "Polish",
    };

  return {
    title: "Refine your listings",
    description: "Small improvements compound. ETHOS notices consistency.",
    cta: "Manage listings",
    href: "/business/listings",
    short: "Refine",
  };
}

function getProfileHealth(input: {
  hasWebsite: boolean;
  hasDescription: boolean;
  hasCategory: boolean;
}) {
  const missing: string[] = [];
  if (!input.hasDescription) missing.push("Add description");
  if (!input.hasCategory) missing.push("Set category");
  if (!input.hasWebsite) missing.push("Add website");

  const score = 100 - missing.length * 18;

  const checks = [
    { label: "Description present", ok: input.hasDescription },
    { label: "Category set", ok: input.hasCategory },
    { label: "Website added", ok: input.hasWebsite },
  ];

  const level =
    missing.length === 0 ? "excellent" : missing.length === 1 ? "good" : "needs-work";

  const primaryFixHref =
    !input.hasDescription || !input.hasCategory || !input.hasWebsite
      ? "/business/profile"
      : "/business/listings";

  const primaryFixCta =
    missing.length === 0 ? "Refine listings" : "Fix profile gaps";

  return {
    missing,
    missingCount: missing.length,
    score: Math.max(45, Math.min(100, score)),
    checks,
    level,
    primaryFixHref,
    primaryFixCta,
  };
}

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  } catch {
    return "—";
  }
}