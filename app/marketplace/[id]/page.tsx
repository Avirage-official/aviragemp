"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { MOCK_LISTINGS, MockListing } from "@/lib/mockListings";
import { AnimatedBackdrop } from "@/components/ui/AnimatedBackdrop";

type Listing = MockListing;

export default function ListingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isSignedIn } = useUser();

  const [listing, setListing] = useState<Listing | null>(null);
  const [userCode, setUserCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    message: "",
    numberOfPeople: "",
    bookingDate: "",
    specialRequests: "",
  });

  const id = String(params?.id || "");

  const emoji = useMemo(() => {
    if (!listing) return "✨";
    return listing.category === "retreat"
      ? "🏔️"
      : listing.category === "coaching"
      ? "💬"
      : listing.category === "workshop"
      ? "🎨"
      : listing.category === "experience"
      ? "✨"
      : listing.category === "event"
      ? "🎉"
      : listing.category === "service"
      ? "🫧"
      : "📦";
  }, [listing]);

  const isMatched = useMemo(() => {
    if (!listing || !userCode) return false;
    return listing.targetCodes.includes(userCode);
  }, [listing, userCode]);

  // Fetch listing (API first, fallback to MOCK)
  useEffect(() => {
    async function fetchListing() {
      setLoading(true);

      // 1) Try API (future-ready)
      try {
        const res = await fetch(`/api/listings/${id}`);
        if (res.ok) {
          const data = await res.json();
          setListing(data.listing);
          setLoading(false);
          return;
        }
      } catch {
        // ignore and fallback
      }

      // 2) Fallback to mock data (UI-first)
      const found = MOCK_LISTINGS.find((l) => l.id === id);
      if (!found) {
        router.push("/marketplace");
        return;
      }
      setListing(found);
      setLoading(false);
    }

    fetchListing();
  }, [id, router]);

  // Fetch user code (works with real accounts later)
  useEffect(() => {
    async function fetchUserCode() {
      if (!user) return;
      try {
        const res = await fetch(`/api/users/${user.id}`);
        const data = await res.json();
        setUserCode(data.user?.primaryCode || null);
      } catch {
        setUserCode(null);
      }
    }
    fetchUserCode();
  }, [user]);

  async function submitInquiry(e: React.FormEvent) {
    e.preventDefault();

    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    if (!listing) return;

    setSubmitting(true);
    try {
      // UI-first note: API will work once you hook real listings + users
      const res = await fetch("/api/inquiries/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId: listing.id,
          ...form,
          numberOfPeople: form.numberOfPeople
            ? parseInt(form.numberOfPeople)
            : null,
        }),
      });

      if (res.ok) {
        alert("Inquiry sent. The business will respond personally.");
        setShowForm(false);
        setForm({
          message: "",
          numberOfPeople: "",
          bookingDate: "",
          specialRequests: "",
        });
      } else {
        alert("Failed to send inquiry. Try again.");
      }
    } catch {
      alert("An error occurred. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-white/60">Loading experience…</p>
      </div>
    );
  }

  if (!listing) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top ambience */}
      <div className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 opacity-[0.55]">
          <AnimatedBackdrop />
        </div>
        <div className="relative container mx-auto px-8 py-10">
          <Link
            href="/marketplace"
            className="text-sm text-white/70 hover:text-white hover:underline"
          >
            ← Back to marketplace
          </Link>

          <div className="mt-8 flex items-end justify-between gap-6">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/70">
                {listing.category}
              </p>
              <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mt-2">
                {listing.title}
              </h1>
              <p className="text-white/70 mt-4 leading-relaxed">
                {listing.description}
              </p>

              {isMatched && (
                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-green-300/30 bg-green-300/10 px-4 py-2">
                  <span className="text-green-200 text-sm font-semibold">
                    Aligned with you
                  </span>
                  <span className="text-green-200/70 text-sm">
                    — designed for your pace and preferences
                  </span>
                </div>
              )}
            </div>

            <div className="hidden md:flex items-center justify-center w-28 h-28 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
              <span className="text-6xl">{emoji}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* MAIN */}
          <div className="lg:col-span-2 space-y-8">
            {/* Details */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 shadow-[0_20px_70px_rgba(0,0,0,0.55)]">
              <h2 className="text-lg font-semibold">Details</h2>

              <div className="mt-5 space-y-4 text-white/70">
                {(listing.city || listing.location) && (
                  <div className="flex items-start gap-3">
                    <span className="text-xl">📍</span>
                    <div>
                      <p className="text-white font-medium">Location</p>
                      <p className="text-white/70">
                        {listing.city ? listing.city : ""}
                        {listing.city && listing.location ? ", " : ""}
                        {listing.location ? listing.location : ""}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <span className="text-xl">🎯</span>
                  <div>
                    <p className="text-white font-medium">
                      Designed for selected personality types
                    </p>
                    <p className="text-white/70">
                      Targeted to {listing.targetCodes.length} codes
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl">💬</span>
                  <div>
                    <p className="text-white font-medium">Booking style</p>
                    <p className="text-white/70">
                      Inquiry-based — you talk first, then decide.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Why this fits you */}
            {isMatched && (
              <section className="rounded-2xl border border-green-300/25 bg-green-300/10 p-7">
                <h3 className="text-lg font-semibold text-green-100">
                  Why this aligns with you
                </h3>
                <p className="text-green-100/80 mt-3 leading-relaxed">
                  This offering was created for people who value the same pace,
                  energy, and way of engaging with the world as you do — less
                  noise, more fit.
                </p>
              </section>
            )}

            {/* Business */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 shadow-[0_20px_70px_rgba(0,0,0,0.55)]">
              <h2 className="text-lg font-semibold">Offered by</h2>

              <div className="mt-5 flex gap-4 items-start">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center font-bold text-white">
                  {listing.business.businessName.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold">
                    {listing.business.businessName}
                  </p>
                  <p className="text-white/70 mt-1 leading-relaxed">
                    {listing.business.description}
                  </p>

                  {listing.business.website && (
                    <a
                      href={listing.business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-sm text-white/80 hover:text-white hover:underline"
                    >
                      Visit website →
                    </a>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="sticky top-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-[0_20px_70px_rgba(0,0,0,0.55)]">
              {/* Price */}
              <div className="pb-5 border-b border-white/10">
                {listing.price ? (
                  <>
                    <p className="text-3xl font-semibold text-white">
                      A${listing.price}
                    </p>
                    <p className="text-sm text-white/60 mt-1">
                      {listing.pricingType === "FIXED"
                        ? "Fixed price"
                        : listing.pricingType === "RANGE"
                        ? "Starting from"
                        : "Custom pricing"}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-xl font-semibold text-white">
                      Pricing on request
                    </p>
                    <p className="text-sm text-white/60 mt-1">
                      Send an inquiry to receive details.
                    </p>
                  </>
                )}
              </div>

              {!showForm ? (
                <>
                  <button
                    onClick={() =>
                      isSignedIn ? setShowForm(true) : router.push("/sign-in")
                    }
                    className="mt-5 w-full rounded-xl bg-white text-black font-semibold py-4 hover:bg-white/90 transition"
                  >
                    Send inquiry
                  </button>

                  <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-4">
                    <p className="text-sm text-white/70 font-medium">
                      What happens next
                    </p>
                    <ol className="mt-3 space-y-2 text-sm text-white/60 list-decimal ml-5">
                      <li>You send an inquiry</li>
                      <li>The business responds personally</li>
                      <li>You decide — no pressure</li>
                    </ol>
                  </div>

                  <p className="mt-5 text-xs text-white/40 text-center">
                    Australia-only for now. We’re curating intentionally.
                  </p>
                </>
              ) : (
                <form onSubmit={submitInquiry} className="mt-5 space-y-4">
                  <div>
                    <label className="text-sm font-medium text-white/80">
                      Your message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      required
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      placeholder="What are you hoping to experience?"
                      className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 text-white placeholder:text-white/30 p-3 focus:outline-none focus:ring-2 focus:ring-white/20"
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white/80">
                      Number of people
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={form.numberOfPeople}
                      onChange={(e) =>
                        setForm({ ...form, numberOfPeople: e.target.value })
                      }
                      placeholder="1"
                      className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 text-white placeholder:text-white/30 p-3 focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white/80">
                      Preferred date
                    </label>
                    <input
                      type="date"
                      value={form.bookingDate}
                      onChange={(e) =>
                        setForm({ ...form, bookingDate: e.target.value })
                      }
                      className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 text-white p-3 focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white/80">
                      Special requests
                    </label>
                    <textarea
                      value={form.specialRequests}
                      onChange={(e) =>
                        setForm({ ...form, specialRequests: e.target.value })
                      }
                      placeholder="Anything important to know?"
                      className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 text-white placeholder:text-white/30 p-3 focus:outline-none focus:ring-2 focus:ring-white/20"
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-white/80 hover:bg-white/10 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 rounded-xl bg-white text-black font-semibold py-3 hover:bg-white/90 disabled:opacity-60 transition"
                    >
                      {submitting ? "Sending…" : "Send"}
                    </button>
                  </div>

                  <p className="text-xs text-white/40 text-center mt-2">
                    The business will respond personally.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
