"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  PauseCircle,
  PlayCircle,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import { useRouter } from "next/navigation";

type ListingRow = {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string | null;
  price?: number | null;
  currency: string;
  pricingType: string;
  city?: string | null;
  location?: string | null;
  isActive: boolean;
  targetCodesCount: number;
  tagsCount: number;
  duration?: string | null;
  groupSize?: string | null;
  createdAt: string;
  updatedAt: string;
  openInquiries: number;
  signals: number;
};

export default function ListingsManagerClient({
  listings,
}: {
  listings: ListingRow[];
}) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"ALL" | "ACTIVE" | "PAUSED">("ALL");
  const [sort, setSort] = useState<"UPDATED" | "CREATED" | "INQUIRIES">(
    "UPDATED"
  );
  const [busyId, setBusyId] = useState<string | null>(null);

  const stats = useMemo(() => {
    const active = listings.filter((l) => l.isActive).length;
    const paused = listings.length - active;
    const inquiries = listings.reduce((s, l) => s + (l.openInquiries || 0), 0);
    return { active, paused, inquiries, total: listings.length };
  }, [listings]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();

    let rows = listings.filter((l) => {
      const matchesText =
        !needle ||
        l.title.toLowerCase().includes(needle) ||
        l.description.toLowerCase().includes(needle) ||
        l.category.toLowerCase().includes(needle) ||
        (l.subcategory || "").toLowerCase().includes(needle);

      const matchesStatus =
        status === "ALL"
          ? true
          : status === "ACTIVE"
          ? l.isActive
          : !l.isActive;

      return matchesText && matchesStatus;
    });

    rows = rows.sort((a, b) => {
      if (sort === "INQUIRIES") return (b.openInquiries || 0) - (a.openInquiries || 0);
      if (sort === "CREATED")
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return rows;
  }, [listings, q, status, sort]);

  async function toggleActive(listingId: string, nextActive: boolean) {
    setBusyId(listingId);
    try {
      const res = await fetch("/api/listings/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId, isActive: nextActive }),
      });
      if (!res.ok) {
        alert("Could not update listing status.");
        return;
      }
      router.refresh();
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Listings</h1>
          <p className="text-white/60 mt-1">
            Maintain what you offer. Keep it aligned, clear, and human.
          </p>
        </div>

        <Link
          href="/business/listings/new"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition text-sm"
        >
          <Plus size={16} />
          New Listing
        </Link>
      </div>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Stat label="Total" value={stats.total} />
        <Stat label="Active" value={stats.active} highlight />
        <Stat label="Paused" value={stats.paused} />
        <Stat label="Open Inquiries" value={stats.inquiries} link="/business/inquiries" />
      </section>

      {/* Controls */}
      <div className="border border-white/10 rounded-2xl bg-white/[0.02] p-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_auto_auto] gap-3 items-center">
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black px-3 py-2">
            <Search size={16} className="text-white/50" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search listings…"
              className="w-full bg-transparent outline-none text-sm text-white placeholder:text-white/40"
            />
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black px-3 py-2">
            <Filter size={16} className="text-white/50" />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="bg-transparent outline-none text-sm text-white"
            >
              <option value="ALL">All</option>
              <option value="ACTIVE">Active</option>
              <option value="PAUSED">Paused</option>
            </select>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black px-3 py-2">
            <span className="text-xs text-white/50">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              className="bg-transparent outline-none text-sm text-white"
            >
              <option value="UPDATED">Recently updated</option>
              <option value="CREATED">Recently created</option>
              <option value="INQUIRIES">Most inquiries</option>
            </select>
          </div>

          <div className="text-sm text-white/50 lg:text-right">
            {filtered.length} shown
          </div>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="border border-dashed border-white/15 rounded-2xl p-10 bg-white/[0.02]">
            <p className="text-lg font-semibold">No listings found</p>
            <p className="text-white/60 mt-2">
              Try a different search, or create a new listing.
            </p>
            <div className="mt-6">
              <Link
                href="/business/listings/new"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition"
              >
                <Plus size={18} />
                Create Listing
              </Link>
            </div>
          </div>
        ) : (
          filtered.map((l) => (
            <div
              key={l.id}
              className="border border-white/10 rounded-2xl bg-white/[0.02] p-5 hover:border-white/20 hover:bg-white/[0.03] transition"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                <div className="min-w-0 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold truncate">
                      {l.title}
                    </h3>

                    <Pill>{l.category}</Pill>

                    <Pill
                      tone={l.isActive ? "ok" : "muted"}
                    >
                      {l.isActive ? "Active" : "Paused"}
                    </Pill>

                    {l.openInquiries > 0 && (
                      <Pill tone="info">{l.openInquiries} open inquiry</Pill>
                    )}
                  </div>

                  <p className="text-sm text-white/60 line-clamp-2">
                    {l.description}
                  </p>

                  <div className="flex flex-wrap gap-3 text-xs text-white/50 pt-1">
                    {l.price != null && (
                      <span>
                        💰 {l.currency} {l.price} ({l.pricingType})
                      </span>
                    )}
                    <span>🎯 {l.targetCodesCount} codes</span>
                    {l.tagsCount > 0 && <span>🏷 {l.tagsCount} tags</span>}
                    {l.duration && <span>⏳ {l.duration}</span>}
                    {l.groupSize && <span>👥 {l.groupSize}</span>}
                    {(l.city || l.location) && (
                      <span>📍 {l.city || l.location}</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <Link
                    href={`/business/listings/${l.id}`}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-white/15 hover:bg-white/5 transition text-sm"
                  >
                    View <ArrowUpRight size={14} />
                  </Link>

                  <Link
                    href={`/business/listings/${l.id}/edit`}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-xl border border-white/15 hover:bg-white/5 transition text-sm"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => toggleActive(l.id, !l.isActive)}
                    disabled={busyId === l.id}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white text-black font-medium hover:bg-white/90 disabled:opacity-60 transition text-sm"
                  >
                    {l.isActive ? (
                      <>
                        <PauseCircle size={16} /> Pause
                      </>
                    ) : (
                      <>
                        <PlayCircle size={16} /> Activate
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ---------- UI helpers ---------- */

function Stat({
  label,
  value,
  highlight,
  link,
}: {
  label: string;
  value: number;
  highlight?: boolean;
  link?: string;
}) {
  const card = (
    <div
      className={`rounded-2xl p-6 border bg-white/[0.02] ${
        highlight ? "border-blue-500/30 bg-blue-500/5" : "border-white/10"
      }`}
    >
      <p className="text-sm text-white/60">{label}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
      {link && <p className="text-xs text-blue-300 mt-2">Open →</p>}
    </div>
  );

  return link ? <Link href={link}>{card}</Link> : card;
}

function Pill({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "info" | "ok" | "muted";
}) {
  const styles =
    tone === "info"
      ? "border-blue-500/30 bg-blue-500/10 text-blue-200"
      : tone === "ok"
      ? "border-green-500/30 bg-green-500/10 text-green-200"
      : tone === "muted"
      ? "border-white/10 bg-white/[0.02] text-white/60"
      : "border-white/10 bg-white/[0.03] text-white/70";

  return (
    <span className={`text-[11px] px-2 py-0.5 rounded-full border ${styles}`}>
      {children}
    </span>
  );
}
