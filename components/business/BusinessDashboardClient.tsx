"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
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
  TrendingUp,
  Zap,
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
/* ANIMATION VARIANTS                                                         */
/* -------------------------------------------------------------------------- */

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const scaleOnHover = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }
};

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                                                             */
/* -------------------------------------------------------------------------- */

export function BusinessDashboardClient(props: Props) {
  const {
    business,
    daysUntilTrialEnd,
    totalInquiries,
    activeListingsCount,
    listings,
    TrialCTA,
  } = props;

  const prefersReducedMotion = useReducedMotion();

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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#111827] via-[#0f172a] to-[#111827]">
      {/* ------------------------------------------------------------------ */}
      {/* AMBIENT BACKGROUND - ETHOS ENERGY FIELD                            */}
      {/* ------------------------------------------------------------------ */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        {/* Primary glow - Electric Blue */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: prefersReducedMotion ? 0.15 : [0.12, 0.18, 0.12],
            scale: prefersReducedMotion ? 1 : [1, 1.1, 1],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-[30%] left-[10%] h-[800px] w-[800px] rounded-full bg-[#4F8CFF] blur-[180px] opacity-15"
        />
        
        {/* Secondary glow - Lavender */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: prefersReducedMotion ? 0.12 : [0.1, 0.16, 0.1],
            scale: prefersReducedMotion ? 1 : [1, 1.15, 1],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-[20%] right-[5%] h-[700px] w-[700px] rounded-full bg-[#C7B9FF] blur-[160px] opacity-12"
        />
        
        {/* Tertiary glow - Mint Green */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: prefersReducedMotion ? 0.1 : [0.08, 0.14, 0.08],
            scale: prefersReducedMotion ? 1 : [1, 1.12, 1],
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute bottom-[-20%] left-[40%] h-[750px] w-[750px] rounded-full bg-[#7CF5C8] blur-[170px] opacity-10"
        />

        {/* Subtle grain texture */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* CONTENT CONTAINER                                                  */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-10 sm:space-y-12"
        >
          {/* HEADER */}
          <motion.header variants={fadeInUp} className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#4F8CFF]/20 to-[#C7B9FF]/20 backdrop-blur-xl border border-white/10 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-[#4F8CFF]" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/40 uppercase tracking-wider">Business Workspace</p>
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent">
                      {business.businessName}
                    </h1>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <StatusPill status={business.subscriptionStatus} />
                  <Pill
                    tone={business.category ? "lav" : "muted"}
                    icon={<Tag className="h-3.5 w-3.5" />}
                    label={business.category ?? "Add category"}
                  />
                  <Pill
                    tone={profileHealth.level === "excellent" ? "mint" : "blue"}
                    icon={
                      profileHealth.level === "excellent" ? (
                        <BadgeCheck className="h-3.5 w-3.5" />
                      ) : (
                        <Wand2 className="h-3.5 w-3.5" />
                      )
                    }
                    label={
                      profileHealth.level === "excellent"
                        ? "Profile ready"
                        : `Boost profile (+${profileHealth.missingCount})`
                    }
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <PrimaryCTA href="/business/listings/new" icon={<Plus size={18} />}>
                  New listing
                </PrimaryCTA>
                <SecondaryCTA href="/business/listings">
                  Manage <ChevronRight size={16} />
                </SecondaryCTA>
              </div>
            </div>
          </motion.header>

          {/* HERO PANEL */}
          <motion.div variants={fadeInUp}>
            <GlassPanel>
              <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12">
                {/* Left Column - Main Content */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-2xl sm:text-3xl font-semibold leading-tight text-white/95">
                      {totalInquiries > 0
                        ? `${totalInquiries} open inquir${totalInquiries === 1 ? "y" : "ies"} waiting`
                        : activeListingsCount > 0
                        ? "Your presence is live"
                        : "Ready to launch your first offer"}
                    </h2>
                    <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-xl">
                      {totalInquiries > 0
                        ? "Momentum starts with response. Turn interest into connection."
                        : activeListingsCount > 0
                        ? "Presence compounds. Every interaction builds trust."
                        : "You're not late. Start with one authentic offer."}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <HeroAction
                      href={nextAction.href}
                      accent="blue"
                      icon={<ArrowUpRight size={18} />}
                      label={nextAction.cta}
                    />
                    <HeroAction
                      href="/business/inquiries"
                      accent="mint"
                      icon={<MessageCircle size={18} />}
                      label="Inquiries"
                      badge={totalInquiries > 0 ? totalInquiries : undefined}
                    />
                    <HeroAction
                      href="/business/listings"
                      accent="lav"
                      icon={<Layers size={18} />}
                      label="Listings"
                    />
                    <HeroAction
                      href="/business/identity"
                      accent="ink"
                      icon={<Settings size={18} />}
                      label="Identity"
                    />
                  </div>

                  {business.subscriptionStatus === "TRIAL" && daysUntilTrialEnd !== null && (
                    <TrialBanner daysLeft={daysUntilTrialEnd}>
                      {TrialCTA}
                    </TrialBanner>
                  )}
                </div>

                {/* Right Column - Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                  <SignalCard
                    icon={<Layers className="h-5 w-5" />}
                    label="Active listings"
                    value={activeListingsCount}
                    accent="blue"
                    href="/business/listings"
                  />
                  <SignalCard
                    icon={<MessageCircle className="h-5 w-5" />}
                    label="Open inquiries"
                    value={totalInquiries}
                    accent="mint"
                    href="/business/inquiries"
                    pulse={totalInquiries > 0}
                  />
                  <SignalCard
                    icon={<TrendingUp className="h-5 w-5" />}
                    label="Profile views"
                    value="—"
                    accent="lav"
                    subtext="Coming soon"
                  />
                  <SignalCard
                    icon={<Zap className="h-5 w-5" />}
                    label="Next move"
                    value={nextAction.short}
                    accent="ink"
                    href={nextAction.href}
                    compact
                  />
                </div>
              </div>
            </GlassPanel>
          </motion.div>

          {/* LISTINGS GRID */}
          <motion.section variants={fadeInUp} className="space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <h3 className="text-2xl sm:text-3xl font-semibold text-white/95">
                  Your listings
                </h3>
                <p className="mt-2 text-base text-white/50">
                  ETHOS rewards clarity, not volume
                </p>
              </div>
              {listings.length > 0 && (
                <Link
                  href="/business/listings"
                  className="hidden sm:flex items-center gap-2 text-sm font-medium text-[#4F8CFF] hover:text-[#6BA4FF] transition-colors"
                >
                  View all
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              )}
            </div>

            {listings.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {listings.map((listing, index) => (
                  <motion.div
                    key={listing.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.1,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    <ListingCard listing={listing} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* GLASS PRIMITIVES                                                           */
/* -------------------------------------------------------------------------- */

function GlassPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative group">
      {/* Glow effect on hover */}
      <div className="absolute -inset-[1px] rounded-[32px] bg-gradient-to-r from-[#4F8CFF]/0 via-[#C7B9FF]/0 to-[#7CF5C8]/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
      
      <div className="relative rounded-[32px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] p-8 sm:p-10 shadow-2xl shadow-black/20">
        {/* Inner subtle gradient */}
        <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}

function GlassCard({ children, href }: { children: React.ReactNode; href?: string }) {
  const content = (
    <div className="relative group h-full">
      {/* Hover glow */}
      <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-br from-[#4F8CFF]/20 via-[#C7B9FF]/15 to-[#7CF5C8]/20 opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500" />
      
      <div className="relative h-full rounded-[28px] bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] overflow-hidden transition-all duration-300 group-hover:border-white/[0.15] group-hover:bg-white/[0.06]">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative">{children}</div>
        
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#4F8CFF]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  );

  if (href) {
    return <Link href={href} className="block h-full">{content}</Link>;
  }

  return content;
}

/* -------------------------------------------------------------------------- */
/* STATUS & PILLS                                                             */
/* -------------------------------------------------------------------------- */

function StatusPill({ status }: { status: string }) {
  const config = {
    TRIAL: {
      bg: "bg-[#C7B9FF]/10",
      border: "border-[#C7B9FF]/30",
      text: "text-[#C7B9FF]",
      label: "Trial",
      icon: <Sparkles className="h-3 w-3" />
    },
    ACTIVE: {
      bg: "bg-[#7CF5C8]/10",
      border: "border-[#7CF5C8]/30",
      text: "text-[#7CF5C8]",
      label: "Active",
      icon: <BadgeCheck className="h-3 w-3" />
    },
    CANCELED: {
      bg: "bg-white/5",
      border: "border-white/20",
      text: "text-white/50",
      label: "Canceled",
      icon: null
    }
  }[status] || {
    bg: "bg-white/5",
    border: "border-white/20",
    text: "text-white/50",
    label: status,
    icon: null
  };

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${config.bg} ${config.border} border backdrop-blur-sm`}>
      {config.icon}
      <span className={`text-xs font-semibold ${config.text}`}>{config.label}</span>
    </div>
  );
}

function Pill({ 
  tone, 
  icon, 
  label 
}: { 
  tone: "blue" | "mint" | "lav" | "muted"; 
  icon: React.ReactNode; 
  label: string;
}) {
  const styles = {
    blue: "bg-[#4F8CFF]/10 border-[#4F8CFF]/25 text-[#4F8CFF]",
    mint: "bg-[#7CF5C8]/10 border-[#7CF5C8]/25 text-[#7CF5C8]",
    lav: "bg-[#C7B9FF]/10 border-[#C7B9FF]/25 text-[#C7B9FF]",
    muted: "bg-white/5 border-white/10 text-white/50"
  }[tone];

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border backdrop-blur-sm ${styles} transition-all duration-300 hover:scale-105`}>
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* HERO ACTIONS                                                               */
/* -------------------------------------------------------------------------- */

function HeroAction({ 
  href, 
  accent, 
  icon, 
  label,
  badge
}: { 
  href: string; 
  accent: "blue" | "mint" | "lav" | "ink"; 
  icon: React.ReactNode; 
  label: string;
  badge?: number;
}) {
  const styles = {
    blue: "bg-[#4F8CFF]/10 border-[#4F8CFF]/30 text-[#4F8CFF] hover:bg-[#4F8CFF]/15 hover:border-[#4F8CFF]/40",
    mint: "bg-[#7CF5C8]/10 border-[#7CF5C8]/30 text-[#7CF5C8] hover:bg-[#7CF5C8]/15 hover:border-[#7CF5C8]/40",
    lav: "bg-[#C7B9FF]/10 border-[#C7B9FF]/30 text-[#C7B9FF] hover:bg-[#C7B9FF]/15 hover:border-[#C7B9FF]/40",
    ink: "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20 hover:text-white/90"
  }[accent];

  return (
    <Link
      href={href}
      className={`relative group inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl border backdrop-blur-xl font-medium text-sm transition-all duration-300 ${styles}`}
    >
      <span className="relative z-10 flex items-center gap-2.5">
        {icon}
        {label}
      </span>
      {badge && badge > 0 && (
        <span className="relative z-10 flex items-center justify-center h-5 w-5 rounded-full bg-[#7CF5C8] text-[#111827] text-[10px] font-bold">
          {badge > 9 ? "9+" : badge}
        </span>
      )}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* TRIAL BANNER                                                               */
/* -------------------------------------------------------------------------- */

function TrialBanner({ 
  daysLeft, 
  children 
}: { 
  daysLeft: number; 
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative group"
    >
      <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-[#C7B9FF]/30 via-[#7CF5C8]/20 to-[#4F8CFF]/30 opacity-75 blur-md" />
      
      <div className="relative rounded-3xl bg-gradient-to-br from-[#C7B9FF]/8 to-[#4F8CFF]/5 border border-[#C7B9FF]/20 backdrop-blur-xl p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#C7B9FF] animate-pulse" />
              <p className="text-sm font-semibold text-white/90">Trial active</p>
            </div>
            <p className="text-sm text-white/60">
              {daysLeft} day{daysLeft === 1 ? "" : "s"} remaining to maintain access
            </p>
          </div>
          {children}
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* SIGNAL CARDS                                                               */
/* -------------------------------------------------------------------------- */

function SignalCard({
  icon,
  label,
  value,
  accent,
  href,
  pulse,
  compact,
  subtext
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  accent: "blue" | "mint" | "lav" | "ink";
  href?: string;
  pulse?: boolean;
  compact?: boolean;
  subtext?: string;
}) {
  const accentColors = {
    blue: { 
      bg: "bg-[#4F8CFF]/5", 
      icon: "text-[#4F8CFF]",
      border: "border-[#4F8CFF]/15",
      hover: "hover:border-[#4F8CFF]/25"
    },
    mint: { 
      bg: "bg-[#7CF5C8]/5", 
      icon: "text-[#7CF5C8]",
      border: "border-[#7CF5C8]/15",
      hover: "hover:border-[#7CF5C8]/25"
    },
    lav: { 
      bg: "bg-[#C7B9FF]/5", 
      icon: "text-[#C7B9FF]",
      border: "border-[#C7B9FF]/15",
      hover: "hover:border-[#C7B9FF]/25"
    },
    ink: { 
      bg: "bg-white/3", 
      icon: "text-white/70",
      border: "border-white/10",
      hover: "hover:border-white/20"
    }
  }[accent];

  const content = (
    <div className={`group relative h-full rounded-2xl ${accentColors.bg} border ${accentColors.border} backdrop-blur-xl p-5 transition-all duration-300 ${href ? `cursor-pointer ${accentColors.hover}` : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <div className={`${accentColors.icon} transition-transform duration-300 ${href ? 'group-hover:scale-110' : ''}`}>
              {icon}
            </div>
            {pulse && (
              <div className="relative">
                <div className="h-2 w-2 rounded-full bg-[#7CF5C8]" />
                <div className="absolute inset-0 h-2 w-2 rounded-full bg-[#7CF5C8] animate-ping" />
              </div>
            )}
          </div>
          
          <div>
            <p className="text-xs font-medium text-white/50 mb-1">{label}</p>
            <p className={`font-bold text-white/95 ${compact ? 'text-lg' : 'text-2xl'}`}>
              {value}
            </p>
            {subtext && (
              <p className="text-xs text-white/40 mt-1">{subtext}</p>
            )}
          </div>
        </div>
        
        {href && (
          <ChevronRight className="h-4 w-4 text-white/30 transition-all duration-300 group-hover:text-white/60 group-hover:translate-x-0.5" />
        )}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href} className="block h-full">{content}</Link>;
  }

  return content;
}

/* -------------------------------------------------------------------------- */
/* LISTING CARD                                                               */
/* -------------------------------------------------------------------------- */

function ListingCard({ listing }: { listing: ListingCard }) {
  return (
    <GlassCard href={`/business/listings/${listing.id}/edit`}>
      <div className="p-6 space-y-5">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <h4 className="text-lg font-semibold text-white/95 leading-snug line-clamp-2 group-hover:text-white transition-colors">
              {listing.title}
            </h4>
            <ArrowUpRight className="h-5 w-5 text-[#4F8CFF] flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>

          <p className="text-sm text-white/50 leading-relaxed line-clamp-3">
            {listing.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <MetaPill
            tone={listing.category ? "lav" : "muted"}
            label={listing.category ?? "No category"}
            icon={<Tag className="h-3 w-3" />}
          />
          <MetaPill
            tone="blue"
            label={`${listing.targetCodesCount} codes`}
            icon={<Sparkles className="h-3 w-3" />}
          />
          <MetaPill
            tone={listing.inquiryCount > 0 ? "mint" : "muted"}
            label={listing.inquiryCount > 0 ? `${listing.inquiryCount} inquiries` : "No inquiries"}
            icon={<MessageCircle className="h-3 w-3" />}
            pulse={listing.inquiryCount > 0}
          />
        </div>

        <div className="pt-3 border-t border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/40">
              {formatDate(listing.createdAt)}
            </span>
            <span className="text-xs font-medium text-[#4F8CFF] opacity-0 group-hover:opacity-100 transition-opacity">
              Edit listing →
            </span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

/* -------------------------------------------------------------------------- */
/* META PILL                                                                  */
/* -------------------------------------------------------------------------- */

function MetaPill({
  tone,
  label,
  icon,
  pulse
}: {
  tone: "blue" | "mint" | "lav" | "muted";
  label: string;
  icon: React.ReactNode;
  pulse?: boolean;
}) {
  const styles = {
    blue: "bg-[#4F8CFF]/8 text-[#4F8CFF]",
    mint: "bg-[#7CF5C8]/8 text-[#7CF5C8]",
    lav: "bg-[#C7B9FF]/8 text-[#C7B9FF]",
    muted: "bg-white/5 text-white/40"
  }[tone];

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium ${styles}`}>
      <div className="relative">
        {icon}
        {pulse && (
          <div className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-[#7CF5C8] animate-pulse" />
        )}
      </div>
      {label}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* CTA BUTTONS                                                                */
/* -------------------------------------------------------------------------- */

function PrimaryCTA({ 
  href, 
  icon, 
  children 
}: { 
  href: string; 
  icon: React.ReactNode; 
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-br from-[#4F8CFF] to-[#3b6bd8] text-white font-semibold text-sm shadow-lg shadow-[#4F8CFF]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#4F8CFF]/35 hover:scale-[1.02]"
    >
      <span className="relative z-10 flex items-center gap-2">
        {icon}
        {children}
      </span>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Link>
  );
}

function SecondaryCTA({ 
  href, 
  children 
}: { 
  href: string; 
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white/80 font-medium text-sm backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:text-white"
    >
      {children}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* EMPTY STATE                                                                */
/* -------------------------------------------------------------------------- */

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group"
    >
      <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-[#4F8CFF]/10 via-[#C7B9FF]/10 to-[#7CF5C8]/10 blur-xl" />
      
      <div className="relative rounded-3xl bg-white/[0.02] border border-white/10 border-dashed backdrop-blur-xl p-12 text-center">
        <div className="mx-auto max-w-md space-y-6">
          <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-[#4F8CFF]/10 to-[#C7B9FF]/10 flex items-center justify-center">
            <Layers className="h-10 w-10 text-[#4F8CFF]" />
          </div>
          
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-white/90">
              Create your first listing
            </h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Start with one clear offer. ETHOS connects you with people who resonate with what you do.
            </p>
          </div>

          <PrimaryCTA href="/business/listings/new" icon={<Plus size={18} />}>
            Create listing
          </PrimaryCTA>
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* HELPERS (unchanged)                                                        */
/* -------------------------------------------------------------------------- */

function getNextAction({
  totalInquiries,
  activeListingsCount,
  hasWebsite,
  hasDescription,
  hasCategory
}: {
  totalInquiries: number;
  activeListingsCount: number;
  hasWebsite: boolean;
  hasDescription: boolean;
  hasCategory: boolean;
}) {
  if (totalInquiries > 0) {
    return {
      cta: "Respond to inquiries",
      short: "Reply",
      href: "/business/inquiries"
    };
  }
  if (activeListingsCount === 0) {
    return {
      cta: "Create your first listing",
      short: "Launch",
      href: "/business/listings/new"
    };
  }
  if (!hasDescription || !hasCategory || !hasWebsite) {
    return {
      cta: "Complete your profile",
      short: "Profile",
      href: "/business/identity"
    };
  }
  return {
    cta: "Create another listing",
    short: "Expand",
    href: "/business/listings/new"
  };
}

function getProfileHealth({
  hasWebsite,
  hasDescription,
  hasCategory
}: {
  hasWebsite: boolean;
  hasDescription: boolean;
  hasCategory: boolean;
}) {
  const missing = [
    !hasWebsite && "website",
    !hasDescription && "description",
    !hasCategory && "category"
  ].filter(Boolean);

  return {
    level: missing.length === 0 ? "excellent" : "incomplete",
    missingCount: missing.length
  };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays}d ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}w ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}