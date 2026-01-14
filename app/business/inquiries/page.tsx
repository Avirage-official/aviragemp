"use client";

import { useEffect, useState } from "react";
import { Inbox, ArrowLeft, Send, X } from "lucide-react";
import { useRouter } from "next/navigation";

type Inquiry = any;

const STATUS_STYLE: Record<string, string> = {
  INQUIRY: "border-blue-500/30 bg-blue-500/10 text-blue-200",
  PENDING: "border-yellow-500/30 bg-yellow-500/10 text-yellow-200",
  CONFIRMED: "border-green-500/30 bg-green-500/10 text-green-200",
  COMPLETED: "border-white/20 bg-white/5 text-white/70",
  CANCELLED: "border-red-500/30 bg-red-500/10 text-red-200",
};

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

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white/60">
        Loading inquiries…
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Inbox</h1>
          <p className="text-white/60 mt-1">
            People reaching out — respond calmly, no pressure.
          </p>
        </div>

        <button
          onClick={() => router.push("/business/dashboard")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15 hover:bg-white/5 transition text-sm"
        >
          <ArrowLeft size={16} />
          Dashboard
        </button>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-6">
        {/* Inbox list */}
        <div className="border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden">
          {inquiries.length === 0 ? (
            <div className="p-10 text-center text-white/60">
              <Inbox size={40} className="mx-auto mb-4 opacity-60" />
              No inquiries yet.
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {inquiries.map((i) => (
                <button
                  key={i.id}
                  onClick={() => open(i)}
                  className={`w-full text-left p-5 hover:bg-white/[0.03] transition ${
                    active?.id === i.id ? "bg-white/[0.04]" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium truncate">
                        {i.user?.name || "Anonymous"}
                        <span className="text-white/50 font-normal">
                          {" "}→ {i.listing?.title}
                        </span>
                      </p>
                      <p className="text-sm text-white/60 line-clamp-1 mt-1">
                        {i.inquiryMessage || "No message provided"}
                      </p>
                    </div>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full border ${STATUS_STYLE[i.status]}`}
                    >
                      {i.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3 text-[11px] text-white/50">
                    {i.user?.primaryCode && (
                      <span className="px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.03]">
                        {i.user.primaryCode}
                      </span>
                    )}
                    {i.numberOfPeople && (
                      <span className="px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.03]">
                        {i.numberOfPeople} people
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detail / response */}
        <div className="border border-white/10 rounded-2xl bg-white/[0.02] p-6">
          {!active ? (
            <div className="h-full flex items-center justify-center text-white/50">
              Select an inquiry to view and respond.
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-6">
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
                  className="rounded-lg p-2 hover:bg-white/5"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Customer message */}
              <div className="border border-white/10 rounded-xl p-4 bg-white/[0.03]">
                <p className="text-xs text-white/50 mb-2">Message</p>
                <p className="text-sm text-white/80 whitespace-pre-line">
                  {active.inquiryMessage || "No message provided."}
                </p>
              </div>

              {/* Response */}
              <div>
                <label className="text-sm text-white/70">
                  Your response
                </label>
                <textarea
                  required
                  rows={6}
                  value={form.response}
                  onChange={(e) =>
                    setForm({ ...form, response: e.target.value })
                  }
                  className="mt-2 w-full rounded-xl bg-black border border-white/15 p-4 text-white focus:outline-none focus:border-white/30"
                  placeholder="Write a calm, human response…"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-white/70">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value })
                    }
                    className="mt-2 w-full rounded-xl bg-black border border-white/15 p-3 text-white"
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
                    className="mt-2 w-full rounded-xl bg-black border border-white/15 p-3 text-white"
                    placeholder="99.00"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 disabled:opacity-60 transition"
                >
                  <Send size={16} />
                  {submitting ? "Sending…" : "Send response"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
