"use client";

import React, { useEffect, useMemo, useState } from "react";
import { 
  Inbox, 
  ArrowLeft, 
  Send, 
  X, 
  Sparkles, 
  ChevronRight,
  Clock,
  User,
  Calendar,
  Users,
  TrendingUp,
  Zap,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/* -------------------------------------------------------------------------- */
/* TYPES                                                                      */
/* -------------------------------------------------------------------------- */

type BookingStatus = "INQUIRY" | "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

type Inquiry = {
  id: string;
  status: BookingStatus;
  inquiryMessage: string | null;
  businessResponse: string | null;
  amount: number | null;
  numberOfPeople: number | null;
  bookingDate: string | null;
  specialRequests: string | null;
  createdAt: string;
  user?: {
    name: string | null;
    primaryCode: string | null;
  } | null;
  listing?: {
    title: string;
  } | null;
};

type FormState = {
  response: string;
  status: string;
  amount: string;
};

/* -------------------------------------------------------------------------- */
/* ETHOS COLOR SYSTEM - NEON PASTEL TECH                                      */
/* -------------------------------------------------------------------------- */

const STATUS_CONFIG: Record<BookingStatus, {
  label: string;
  color: string;
  dot: string;
  gradient: string;
}> = {
  INQUIRY: {
    label: "New inquiry",
    color: "bg-[#4F8CFF]/10 border-[#4F8CFF]/25 text-[#4F8CFF]",
    dot: "bg-[#4F8CFF]",
    gradient: "from-[#4F8CFF]/20 to-[#4F8CFF]/5",
  },
  PENDING: {
    label: "In progress",
    color: "bg-[#C7B9FF]/10 border-[#C7B9FF]/25 text-[#C7B9FF]",
    dot: "bg-[#C7B9FF]",
    gradient: "from-[#C7B9FF]/20 to-[#C7B9FF]/5",
  },
  CONFIRMED: {
    label: "Confirmed",
    color: "bg-[#7CF5C8]/10 border-[#7CF5C8]/25 text-[#7CF5C8]",
    dot: "bg-[#7CF5C8]",
    gradient: "from-[#7CF5C8]/20 to-[#7CF5C8]/5",
  },
  COMPLETED: {
    label: "Completed",
    color: "bg-white/5 border-white/15 text-white/70",
    dot: "bg-white/50",
    gradient: "from-white/10 to-white/5",
  },
  CANCELLED: {
    label: "Cancelled",
    color: "bg-white/5 border-white/10 text-white/40",
    dot: "bg-white/30",
    gradient: "from-white/5 to-transparent",
  },
};

const QUICK_REPLIES = [
  "Thanks for reaching out! I'd be happy to help with this. Could you share a bit more detail about what you're looking for?",
  "This looks like a great fit. Let me walk you through how we typically approach this and what you can expect.",
  "Yes, absolutely doable. Here's what I'd recommend for timing and next steps to make this happen smoothly.",
  "Great question — let me break this down clearly so you have everything you need to make an informed decision.",
];

/* -------------------------------------------------------------------------- */
/* ANIMATION VARIANTS                                                         */
/* -------------------------------------------------------------------------- */

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.05 }
  }
};

const listItemVariant = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
};

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                                                             */
/* -------------------------------------------------------------------------- */

export default function BusinessInquiriesPage() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<Inquiry | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState<FormState>({
    response: "",
    status: "INQUIRY",
    amount: "",
  });

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/inquiries");
      const json = await res.json();
      setInquiries(json.inquiries || []);
    } finally {
      setLoading(false);
    }
  }

  function open(inquiry: Inquiry) {
    setActive(inquiry);
    setForm({
      response: inquiry.businessResponse || "",
      status: inquiry.status,
      amount: inquiry.amount?.toString() || "",
    });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!active) return;

    setSubmitting(true);
    try {
      await fetch("/api/inquiries/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: active.id,
          ...form,
        }),
      });

      setActive(null);
      load();
    } finally {
      setSubmitting(false);
    }
  }

  const stats = useMemo(() => {
    const open = inquiries.filter(i => 
      i.status === "INQUIRY" || i.status === "PENDING"
    ).length;
    const confirmed = inquiries.filter(i => i.status === "CONFIRMED").length;
    const completed = inquiries.filter(i => i.status === "COMPLETED").length;

    return { open, confirmed, completed, total: inquiries.length };
  }, [inquiries]);

  if (loading) {
    return <InquiriesSkeleton />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#111827] via-[#0f172a] to-[#111827]">
      {/* ------------------------------------------------------------------ */}
      {/* AMBIENT BACKGROUND                                                 */}
      {/* ------------------------------------------------------------------ */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: prefersReducedMotion ? 0.12 : [0.1, 0.15, 0.1],
            scale: prefersReducedMotion ? 1 : [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] right-[10%] h-[700px] w-[700px] rounded-full bg-[#4F8CFF] blur-[160px] opacity-12"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: prefersReducedMotion ? 0.1 : [0.08, 0.13, 0.08],
            scale: prefersReducedMotion ? 1 : [1, 1.12, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[30%] -left-[10%] h-[650px] w-[650px] rounded-full bg-[#C7B9FF] blur-[150px] opacity-10"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: prefersReducedMotion ? 0.08 : [0.06, 0.11, 0.06],
            scale: prefersReducedMotion ? 1 : [1, 1.08, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-[-15%] left-[35%] h-[720px] w-[720px] rounded-full bg-[#7CF5C8] blur-[170px] opacity-08"
        />

        {/* Subtle grain */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* CONTENT                                                            */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 py-8 sm:py-12">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-8"
        >
          {/* HEADER */}
          <motion.header variants={fadeInUp}>
            <GlassPanel>
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#4F8CFF]/20 to-[#C7B9FF]/20 backdrop-blur-xl border border-white/10 flex items-center justify-center">
                      <Inbox className="h-6 w-6 text-[#4F8CFF]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h1 className="text-3xl font-bold text-white/95">
                          Inquiries
                        </h1>
                        {stats.open > 0 && (
                          <div className="relative">
                            <div className="h-6 w-6 rounded-full bg-[#7CF5C8] flex items-center justify-center text-[10px] font-bold text-[#111827]">
                              {stats.open}
                            </div>
                            <div className="absolute inset-0 h-6 w-6 rounded-full bg-[#7CF5C8] animate-ping opacity-50" />
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-white/50">
                        Messages from personality-matched users
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <StatPill
                      icon={<AlertCircle className="h-4 w-4" />}
                      label="Open"
                      value={stats.open}
                      accent="blue"
                      pulse={stats.open > 0}
                    />
                    <StatPill
                      icon={<CheckCircle2 className="h-4 w-4" />}
                      label="Confirmed"
                      value={stats.confirmed}
                      accent="mint"
                    />
                    <StatPill
                      icon={<TrendingUp className="h-4 w-4" />}
                      label="Completed"
                      value={stats.completed}
                      accent="lav"
                    />
                  </div>
                </div>

                <button
                  onClick={() => router.push("/business/dashboard")}
                  className="group inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-white/80 font-medium text-sm backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:text-white"
                >
                  <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
                  Dashboard
                </button>
              </div>
            </GlassPanel>
          </motion.header>

          {/* MAIN LAYOUT */}
          <motion.div 
            variants={fadeInUp}
            className="grid grid-cols-1 xl:grid-cols-[440px_1fr] gap-6"
          >
            {/* INBOX LIST */}
            <section className="relative group">
              <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-br from-[#4F8CFF]/10 via-[#C7B9FF]/10 to-[#7CF5C8]/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
              
              <div className="relative rounded-[28px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] overflow-hidden">
                <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between bg-gradient-to-r from-white/[0.02] to-transparent">
                  <div className="flex items-center gap-2">
                    <Inbox className="h-4 w-4 text-[#4F8CFF]" />
                    <p className="text-sm font-medium text-white/80">Inbox</p>
                  </div>
                  <p className="text-xs text-white/40">{inquiries.length} total</p>
                </div>

                {inquiries.length === 0 ? (
                  <EmptyInbox />
                ) : (
                  <div className="max-h-[calc(100vh-24rem)] overflow-y-auto custom-scrollbar">
                    <motion.div 
                      variants={staggerContainer}
                      className="divide-y divide-white/[0.05]"
                    >
                      {inquiries.map((inquiry) => (
                        <InquiryListItem
                          key={inquiry.id}
                          inquiry={inquiry}
                          isActive={active?.id === inquiry.id}
                          onClick={() => open(inquiry)}
                        />
                      ))}
                    </motion.div>
                  </div>
                )}
              </div>
            </section>

            {/* DETAIL PANEL */}
            <section className="relative group min-h-[600px]">
              <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-br from-[#4F8CFF]/10 via-[#C7B9FF]/10 to-[#7CF5C8]/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
              
              <div className="relative h-full rounded-[28px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] overflow-hidden">
                <AnimatePresence mode="wait">
                  {!active ? (
                    <EmptyDetail key="empty" />
                  ) : (
                    <InquiryDetail
                      key={active.id}
                      inquiry={active}
                      form={form}
                      setForm={setForm}
                      onClose={() => setActive(null)}
                      onSubmit={submit}
                      submitting={submitting}
                    />
                  )}
                </AnimatePresence>
              </div>
            </section>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* GLASS PANEL                                                                */
/* -------------------------------------------------------------------------- */

function GlassPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative group">
      <div className="absolute -inset-[1px] rounded-[32px] bg-gradient-to-r from-[#4F8CFF]/0 via-[#C7B9FF]/0 to-[#7CF5C8]/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
      
      <div className="relative rounded-[32px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] p-6 sm:p-8">
        <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* STAT PILL                                                                  */
/* -------------------------------------------------------------------------- */

function StatPill({ 
  icon, 
  label, 
  value, 
  accent,
  pulse 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: number;
  accent: "blue" | "mint" | "lav";
  pulse?: boolean;
}) {
  const colors = {
    blue: "bg-[#4F8CFF]/10 border-[#4F8CFF]/25 text-[#4F8CFF]",
    mint: "bg-[#7CF5C8]/10 border-[#7CF5C8]/25 text-[#7CF5C8]",
    lav: "bg-[#C7B9FF]/10 border-[#C7B9FF]/25 text-[#C7B9FF]"
  }[accent];

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm ${colors}`}>
      <div className="relative">
        {icon}
        {pulse && (
          <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#7CF5C8] animate-pulse" />
        )}
      </div>
      <span className="text-sm font-semibold">{value}</span>
      <span className="text-xs opacity-70">{label}</span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* INQUIRY LIST ITEM                                                          */
/* -------------------------------------------------------------------------- */

function InquiryListItem({ 
  inquiry, 
  isActive, 
  onClick 
}: { 
  inquiry: Inquiry; 
  isActive: boolean; 
  onClick: () => void;
}) {
  const config = STATUS_CONFIG[inquiry.status];

  return (
    <motion.button
      variants={listItemVariant}
      onClick={onClick}
      className={`w-full text-left p-5 transition-all duration-300 relative group ${
        isActive 
          ? "bg-white/[0.06]" 
          : "hover:bg-white/[0.04]"
      }`}
    >
      {/* Active indicator */}
      {isActive && (
        <motion.div 
          layoutId="activeIndicator"
          className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#4F8CFF] to-[#7CF5C8] rounded-r-full"
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      )}

      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <User className="h-4 w-4 text-white/40 flex-shrink-0" />
              <p className="font-semibold text-white/90 truncate">
                {inquiry.user?.name || "Anonymous"}
              </p>
            </div>
            <p className="text-sm text-white/60 truncate pl-6">
              {inquiry.listing?.title}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className={`text-[10px] px-2.5 py-1 rounded-full border font-medium ${config.color}`}>
              {config.label}
            </div>
            <ChevronRight 
              size={16} 
              className={`text-white/30 transition-all duration-300 ${
                isActive ? "opacity-100 translate-x-0.5" : "opacity-0 group-hover:opacity-100"
              }`} 
            />
          </div>
        </div>

        <p className="text-sm text-white/50 line-clamp-2 pl-6">
          {inquiry.inquiryMessage || "No message provided"}
        </p>

        {/* Meta info */}
        <div className="flex flex-wrap gap-2 pl-6">
          {inquiry.user?.primaryCode && (
            <div className="text-[10px] px-2 py-1 rounded-md bg-[#C7B9FF]/10 text-[#C7B9FF] border border-[#C7B9FF]/20 font-medium">
              {inquiry.user.primaryCode}
            </div>
          )}
          {inquiry.numberOfPeople && (
            <div className="text-[10px] px-2 py-1 rounded-md bg-white/5 text-white/60 border border-white/10 flex items-center gap-1">
              <Users className="h-3 w-3" />
              {inquiry.numberOfPeople}
            </div>
          )}
          {inquiry.bookingDate && (
            <div className="text-[10px] px-2 py-1 rounded-md bg-white/5 text-white/60 border border-white/10 flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(inquiry.bookingDate).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
    </motion.button>
  );
}

/* -------------------------------------------------------------------------- */
/* INQUIRY DETAIL                                                             */
/* -------------------------------------------------------------------------- */

function InquiryDetail({
  inquiry,
  form,
  setForm,
  onClose,
  onSubmit,
  submitting
}: {
  inquiry: Inquiry;
  form: FormState;
  setForm: (form: FormState) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  submitting: boolean;
}) {
  const config = STATUS_CONFIG[inquiry.status];

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onSubmit={onSubmit}
      className="h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex-shrink-0 px-6 sm:px-8 py-6 border-b border-white/[0.08] bg-gradient-to-r from-white/[0.02] to-transparent">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-white/95 truncate mb-1">
              {inquiry.listing?.title}
            </h2>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <User className="h-4 w-4" />
              <span>from {inquiry.user?.name || "Anonymous"}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex-shrink-0 rounded-xl p-2 hover:bg-white/10 transition-colors"
          >
            <X size={20} className="text-white/70" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-6 sm:px-8 py-6 space-y-6">
        {/* Original Message */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Inbox className="h-4 w-4 text-[#4F8CFF]" />
            <p className="text-sm font-medium text-white/70">Original message</p>
          </div>
          
          <div className="relative group">
            <div className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-r ${config.gradient} opacity-50 blur-sm`} />
            <div className="relative rounded-2xl bg-[#0B0D12] border border-white/10 p-5">
              <p className="text-sm text-white/80 leading-relaxed whitespace-pre-line">
                {inquiry.inquiryMessage || "No message provided."}
              </p>
            </div>
          </div>
        </div>

        {/* Inquiry Details */}
        {(inquiry.specialRequests || inquiry.numberOfPeople || inquiry.bookingDate) && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-white/70">Details</p>
            <div className="grid gap-3">
              {inquiry.numberOfPeople && (
                <DetailRow
                  icon={<Users className="h-4 w-4" />}
                  label="Number of people"
                  value={inquiry.numberOfPeople}
                />
              )}
              {inquiry.bookingDate && (
                <DetailRow
                  icon={<Calendar className="h-4 w-4" />}
                  label="Preferred date"
                  value={new Date(inquiry.bookingDate).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                />
              )}
              {inquiry.specialRequests && (
                <DetailRow
                  icon={<Sparkles className="h-4 w-4" />}
                  label="Special requests"
                  value={inquiry.specialRequests}
                />
              )}
            </div>
          </div>
        )}

        {/* Quick Replies */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-[#7CF5C8]" />
            <p className="text-sm font-medium text-white/70">Quick replies</p>
          </div>
          <div className="grid gap-2">
            {QUICK_REPLIES.map((text, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setForm({ 
                  ...form, 
                  response: form.response 
                    ? `${form.response}\n\n${text}` 
                    : text 
                })}
                className="text-left text-xs px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 text-white/70 hover:text-white/90 group"
              >
                <span className="line-clamp-2 group-hover:line-clamp-none transition-all">
                  {text}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Response Textarea */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium text-white/70">
            <Send className="h-4 w-4" />
            Your response
          </label>
          <textarea
            required
            rows={6}
            value={form.response}
            onChange={(e) => setForm({ ...form, response: e.target.value })}
            className="w-full rounded-2xl bg-[#0B0D12] border border-white/15 p-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#4F8CFF]/50 focus:bg-[#0B0D12] transition-colors resize-none"
            placeholder="Write a clear, helpful response that builds trust..."
          />
        </div>

        {/* Status & Amount */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">
              Update status
            </label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full rounded-xl bg-[#0B0D12] border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#4F8CFF]/50 transition-colors"
            >
              {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                <option key={key} value={key}>
                  {config.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">
              Amount (optional)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                $
              </span>
              <input
                type="number"
                step="0.01"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="w-full rounded-xl bg-[#0B0D12] border border-white/15 pl-8 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#4F8CFF]/50 transition-colors"
                placeholder="99.00"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 px-6 sm:px-8 py-6 border-t border-white/[0.08] bg-gradient-to-r from-white/[0.01] to-transparent">
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-white/70 font-medium text-sm hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-br from-[#4F8CFF] to-[#3b6bd8] text-white font-semibold text-sm shadow-lg shadow-[#4F8CFF]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#4F8CFF]/35 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Send size={16} className="transition-transform group-hover:translate-x-0.5" />
            {submitting ? "Sending..." : "Send response"}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </motion.form>
  );
}

/* -------------------------------------------------------------------------- */
/* DETAIL ROW                                                                 */
/* -------------------------------------------------------------------------- */

function DetailRow({ 
  icon, 
  label, 
  value 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string | number;
}) {
  return (
    <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
      <div className="flex-shrink-0 text-white/40 mt-0.5">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-white/50 mb-0.5">{label}</p>
        <p className="text-sm text-white/85">{value}</p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* EMPTY STATES                                                               */
/* -------------------------------------------------------------------------- */

function EmptyInbox() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-12 text-center"
    >
      <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-[#4F8CFF]/10 to-[#C7B9FF]/10 flex items-center justify-center mb-4">
        <Inbox className="h-10 w-10 text-[#4F8CFF]" />
      </div>
      <h3 className="text-lg font-semibold text-white/80 mb-2">
        No inquiries yet
      </h3>
      <p className="text-sm text-white/50 max-w-xs mx-auto">
        When someone reaches out about your listings, they'll appear here
      </p>
    </motion.div>
  );
}

function EmptyDetail() {
  return (
    <motion.div
      key="empty"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex items-center justify-center p-8"
    >
      <div className="text-center max-w-sm">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center mb-4">
          <Sparkles className="h-8 w-8 text-white/30" />
        </div>
        <h3 className="text-lg font-semibold text-white/70 mb-2">
          Select an inquiry
        </h3>
        <p className="text-sm text-white/40">
          Choose a message from the list to read and respond
        </p>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* LOADING SKELETON                                                           */
/* -------------------------------------------------------------------------- */

function InquiriesSkeleton() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#111827] via-[#0f172a] to-[#111827]">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-[20%] right-[10%] h-[700px] w-[700px] rounded-full bg-[#4F8CFF] blur-[160px] opacity-10 animate-pulse" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 py-8 sm:py-12 space-y-8">
        {/* Header skeleton */}
        <div className="rounded-[32px] bg-white/[0.03] border border-white/[0.08] p-6 sm:p-8">
          <div className="flex justify-between gap-6">
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-white/5 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-8 w-48 rounded-full bg-white/10 animate-pulse" />
                  <div className="h-4 w-64 rounded-full bg-white/5 animate-pulse" />
                </div>
              </div>
              <div className="flex gap-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-9 w-28 rounded-full bg-white/5 animate-pulse" />
                ))}
              </div>
            </div>
            <div className="h-11 w-32 rounded-2xl bg-white/5 animate-pulse" />
          </div>
        </div>

        {/* Content skeleton */}
        <div className="grid grid-cols-1 xl:grid-cols-[440px_1fr] gap-6">
          <div className="rounded-[28px] bg-white/[0.03] border border-white/[0.08] p-6 space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="space-y-3 animate-pulse">
                <div className="h-6 w-3/4 rounded-full bg-white/10" />
                <div className="h-4 w-full rounded-full bg-white/5" />
                <div className="flex gap-2">
                  <div className="h-6 w-16 rounded-md bg-white/5" />
                  <div className="h-6 w-16 rounded-md bg-white/5" />
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-[28px] bg-white/[0.03] border border-white/[0.08] p-8">
            <div className="space-y-4 animate-pulse">
              <div className="h-8 w-2/3 rounded-full bg-white/10" />
              <div className="h-32 rounded-2xl bg-white/5" />
              <div className="h-48 rounded-2xl bg-white/5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* CUSTOM SCROLLBAR STYLES                                                    */
/* -------------------------------------------------------------------------- */

const styles = `
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.15);
}
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}