"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Inbox, ArrowLeft, Send, X, Sparkles, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type Inquiry = any;

/* -------------------------------------------------------------------------- */
/* STATUS COLORS — NEON PASTEL TECH                                            */
/* -------------------------------------------------------------------------- */

const STATUS_STYLE: Record<string, string> = {
  INQUIRY:
    "border-[#6EA8FF]/30 bg-[#6EA8FF]/10 text-[#6EA8FF]",
  PENDING:
    "border-[#C6B7FF]/30 bg-[#C6B7FF]/10 text-[#C6B7FF]",
  CONFIRMED:
    "border-[#7EF0C8]/30 bg-[#7EF0C8]/10 text-[#7EF0C8]",
  COMPLETED:
    "border-white/10 bg-white/[0.04] text-white/60",
  CANCELLED:
    "border-white/10 bg-white/[0.03] text-white/45",
};

const QUICK_REPLIES = [
  "Thanks for reaching out — happy to help. Could you share a bit more detail?",
  "This looks like a good fit. Here’s how we usually approach this…",
  "Yes, that’s possible. Let me outline timing and next steps.",
  "Great question. I’ll break this down clearly for you.",
];

export default function BusinessInquiriesPage() {
  const router = useRouter();

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<Inquiry | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
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

  const openCount = useMemo(
    () =>
      inquiries.reduce((sum, i) => {
        if (i.status === "INQUIRY" || i.status === "PENDING") return sum + 1;
        return sum;
      }, 0),
    [inquiries]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0D12] flex items-center justify-center text-white/60">
        Loading inquiries…
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-2rem)] px-4 md:px-8 py-8 text-white">
      {/* ------------------------------------------------------------------ */}
      {/* BACKGROUND — NEON PASTEL TECH                                      */}
      {/* ------------------------------------------------------------------ */}
      <div className="fixed inset-0 -z-10 bg-[#0B0D12]" />
      <div className="fixed inset-0 -z-10 opacity-35">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full blur-[140px] bg-[#6EA8FF]/25" />
        <div className="absolute top-24 -left-40 h-[420px] w-[420px] rounded-full blur-[160px] bg-[#C6B7FF]/20" />
        <div className="absolute bottom-[-160px] left-1/3 h-[520px] w-[520px] rounded-full blur-[180px] bg-[#7EF0C8]/18" />
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* ------------------------------------------------------------------ */}
        {/* HEADER / HERO                                                      */}
        {/* ------------------------------------------------------------------ */}
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl border border-white/10 bg-[#12151D] backdrop-blur-xl p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10">
                <Sparkles className="w-4 h-4 text-[#7EF0C8]" />
                <span className="text-sm text-white/85">
                  Inbox · {openCount} open
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Business inquiries
              </h1>

              <p className="text-white/65">
                Messages from aligned users. Respond clearly and you’ll build trust fast.
              </p>
            </div>

            <button
              onClick={() => router.push("/business/dashboard")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.10] transition text-sm font-semibold"
            >
              <ArrowLeft size={16} />
              Dashboard
            </button>
          </div>
        </motion.header>

        {/* ------------------------------------------------------------------ */}
        {/* MAIN LAYOUT                                                        */}
        {/* ------------------------------------------------------------------ */}
        <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-6">
          {/* ------------------------------ */}
          {/* INBOX LIST                     */}
          {/* ------------------------------ */}
          <section className="rounded-3xl border border-white/10 bg-[#12151D] backdrop-blur-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
              <p className="text-sm text-white/70">Inbox</p>
              <p className="text-xs text-white/50">{inquiries.length} total</p>
            </div>

            {inquiries.length === 0 ? (
              <div className="p-10 text-center text-white/60">
                <Inbox size={40} className="mx-auto mb-4 opacity-60" />
                No inquiries yet.
                <div className="text-xs text-white/45 mt-2">
                  When someone reaches out, it’ll appear here.
                </div>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {inquiries.map((i) => {
                  const isActive = active?.id === i.id;

                  return (
                    <button
                      key={i.id}
                      onClick={() => open(i)}
                      className={`w-full text-left p-5 transition relative ${
                        isActive
                          ? "bg-[#161A23]"
                          : "hover:bg-white/[0.05]"
                      }`}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#6EA8FF] rounded-r-full" />
                      )}

                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-semibold truncate">
                            {i.user?.name || "Anonymous"}
                            <span className="text-white/50 font-normal">
                              {" "}→ {i.listing?.title}
                            </span>
                          </p>
                          <p className="text-sm text-white/60 line-clamp-1 mt-1">
                            {i.inquiryMessage || "No message provided"}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[11px] px-2 py-0.5 rounded-full border ${STATUS_STYLE[i.status]}`}
                          >
                            {i.status}
                          </span>
                          <ChevronRight size={16} className="text-white/35" />
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-3 text-[11px] text-white/50">
                        {i.user?.primaryCode && (
                          <span className="px-2 py-0.5 rounded-full border border-white/10 bg-black/40">
                            {i.user.primaryCode}
                          </span>
                        )}
                        {i.numberOfPeople && (
                          <span className="px-2 py-0.5 rounded-full border border-white/10 bg-black/40">
                            {i.numberOfPeople} people
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          {/* ------------------------------ */}
          {/* DETAIL / RESPONSE              */}
          {/* ------------------------------ */}
          <section className="rounded-3xl border border-white/10 bg-[#12151D] backdrop-blur-xl p-6 md:p-8">
            <AnimatePresence mode="wait">
              {!active ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-[520px] flex items-center justify-center text-white/50 text-center px-6"
                >
                  <div>
                    <p className="font-semibold text-white/70">Select a message</p>
                    <p className="text-sm mt-2">
                      Choose an inquiry to read and respond.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key={active.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  onSubmit={submit}
                  className="space-y-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold">
                        {active.listing?.title}
                      </h2>
                      <p className="text-sm text-white/60 mt-1">
                        from {active.user?.name || "Anonymous"}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActive(null)}
                      className="rounded-xl p-2 hover:bg-white/10 transition"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* MESSAGE */}
                  <div className="rounded-2xl p-[1px] bg-gradient-to-r from-[#6EA8FF]/50 via-[#C6B7FF]/40 to-[#7EF0C8]/50">
                    <div className="rounded-2xl bg-[#0B0D12] border border-white/10 p-5">
                      <p className="text-xs text-white/50 mb-2">Message</p>
                      <p className="text-sm text-white/85 whitespace-pre-line">
                        {active.inquiryMessage || "No message provided."}
                      </p>
                    </div>
                  </div>

                  {/* QUICK REPLIES */}
                  <div className="space-y-2">
                    <p className="text-xs text-white/50">
                      Quick replies (optional)
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {QUICK_REPLIES.map((txt) => (
                        <button
                          key={txt}
                          type="button"
                          onClick={() =>
                            setForm((f) => ({
                              ...f,
                              response: f.response
                                ? `${f.response}\n\n${txt}`
                                : txt,
                            }))
                          }
                          className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-black/40 hover:bg-white/[0.12] transition text-white/70"
                        >
                          {txt.slice(0, 28)}…
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* RESPONSE */}
                  <div>
                    <label className="text-sm text-white/70">
                      Your response
                    </label>
                    <textarea
                      required
                      rows={7}
                      value={form.response}
                      onChange={(e) =>
                        setForm({ ...form, response: e.target.value })
                      }
                      className="mt-2 w-full rounded-2xl bg-[#0B0D12] border border-white/15 p-4 text-white focus:outline-none focus:border-[#6EA8FF]/50"
                      placeholder="Write a clear, calm response…"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-white/70">Status</label>
                      <select
                        value={form.status}
                        onChange={(e) =>
                          setForm({ ...form, status: e.target.value })
                        }
                        className="mt-2 w-full rounded-2xl bg-[#0B0D12] border border-white/15 p-3 text-white"
                      >
                        {Object.keys(STATUS_STYLE).map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-sm text-white/70">
                        Amount (optional)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={form.amount}
                        onChange={(e) =>
                          setForm({ ...form, amount: e.target.value })
                        }
                        className="mt-2 w-full rounded-2xl bg-[#0B0D12] border border-white/15 p-3 text-white"
                        placeholder="99.00"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#6EA8FF] text-black font-semibold hover:bg-[#7FB3FF] disabled:opacity-60 transition"
                    >
                      <Send size={16} />
                      {submitting ? "Sending…" : "Send response"}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </section>
        </div>
      </div>
    </div>
  );
}
