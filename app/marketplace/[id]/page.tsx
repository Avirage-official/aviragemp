"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

type Listing = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number | null;
  pricingType: string;
  location: string | null;
  city: string | null;
  targetCodes: string[];
  bookingType: string;
  business: {
    businessName: string;
    description: string;
    website?: string | null;
  };
};

export default function ListingDetailPage() {
  const { id } = useParams();
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

  /* -------------------------------------------------------------------------- */
  /* Fetch listing                                                              */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    async function fetchListing() {
      try {
        const res = await fetch(`/api/listings/${id}`);
        const data = await res.json();
        if (!res.ok) return router.push("/marketplace");
        setListing(data.listing);
      } catch {
        router.push("/marketplace");
      } finally {
        setLoading(false);
      }
    }
    fetchListing();
  }, [id, router]);

  /* -------------------------------------------------------------------------- */
  /* Fetch user code                                                            */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    async function fetchUserCode() {
      if (!user) return;
      const res = await fetch(`/api/users/${user.id}`);
      const data = await res.json();
      setUserCode(data.user?.primaryCode || null);
    }
    fetchUserCode();
  }, [user]);

  /* -------------------------------------------------------------------------- */
  /* Inquiry submit                                                             */
  /* -------------------------------------------------------------------------- */
  async function submitInquiry(e: React.FormEvent) {
    e.preventDefault();

    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/inquiries/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId: listing!.id,
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
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading experience…
      </div>
    );
  }

  if (!listing) return null;

  const isMatched =
    userCode && listing.targetCodes.includes(userCode);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-8 py-10">
        {/* Back */}
        <Link
          href="/marketplace"
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-8">
          {/* MAIN */}
          <div className="lg:col-span-2">
            {/* Hero */}
            <div className="h-96 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-10">
              <span className="text-8xl opacity-90">
                {listing.category === "retreat"
                  ? "🏔️"
                  : listing.category === "coaching"
                  ? "💬"
                  : listing.category === "workshop"
                  ? "🎨"
                  : listing.category === "experience"
                  ? "✨"
                  : listing.category === "event"
                  ? "🎉"
                  : "📦"}
              </span>
            </div>

            {/* Title */}
            <div className="mb-8">
              <span className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                {listing.category}
              </span>
              <h1 className="text-4xl font-bold mt-3">
                {listing.title}
              </h1>

              {isMatched && (
                <p className="mt-3 text-sm text-green-700">
                  Aligned with how you prefer to experience things
                </p>
              )}
            </div>

            {/* About */}
            <section className="bg-white rounded-xl shadow p-8 mb-8">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {listing.description}
              </p>
            </section>

            {/* Why it fits */}
            {isMatched && (
              <section className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
                <h3 className="font-semibold mb-2">
                  Why this aligns with you
                </h3>
                <p className="text-sm text-green-800">
                  This experience was created for people who value the same
                  pace, energy, and way of engaging with the world as you do.
                </p>
              </section>
            )}

            {/* Details */}
            <section className="bg-white rounded-xl shadow p-8 mb-8">
              <h2 className="text-xl font-semibold mb-4">Details</h2>

              <div className="space-y-4 text-gray-700">
                {listing.location && (
                  <p>
                    📍 {listing.location}
                    {listing.city && `, ${listing.city}`}
                  </p>
                )}
                <p>🎯 Designed for selected personality types</p>
                <p>
                  📩 Booking via personal inquiry
                </p>
              </div>
            </section>

            {/* Business */}
            <section className="bg-white rounded-xl shadow p-8">
              <h2 className="text-xl font-semibold mb-4">
                Offered by
              </h2>

              <div className="flex gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                  {listing.business.businessName.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">
                    {listing.business.businessName}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {listing.business.description}
                  </p>
                  {listing.business.website && (
                    <a
                      href={listing.business.website}
                      target="_blank"
                      className="text-sm text-blue-600 hover:underline mt-2 inline-block"
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
            <div className="sticky top-10 bg-white rounded-xl shadow-lg p-6">
              {/* Price */}
              <div className="mb-6 pb-6 border-b">
                {listing.price ? (
                  <p className="text-3xl font-bold text-blue-600">
                    ${listing.price}
                  </p>
                ) : (
                  <p className="text-lg font-semibold">
                    Pricing on request
                  </p>
                )}
              </div>

              {!showForm ? (
                <>
                  <button
                    onClick={() =>
                      isSignedIn
                        ? setShowForm(true)
                        : router.push("/sign-in")
                    }
                    className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Send inquiry
                  </button>

                  <div className="mt-6 text-sm text-gray-600 space-y-2">
                    <p>What happens next:</p>
                    <ol className="list-decimal ml-5 space-y-1">
                      <li>You send an inquiry</li>
                      <li>The business responds personally</li>
                      <li>You decide — no pressure</li>
                    </ol>
                  </div>
                </>
              ) : (
                <form onSubmit={submitInquiry} className="space-y-4">
                  <textarea
                    required
                    placeholder="Tell them what you're looking for…"
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full border rounded-lg p-3"
                    rows={4}
                  />

                  <input
                    type="number"
                    min="1"
                    placeholder="Number of people"
                    value={form.numberOfPeople}
                    onChange={(e) =>
                      setForm({ ...form, numberOfPeople: e.target.value })
                    }
                    className="w-full border rounded-lg p-3"
                  />

                  <input
                    type="date"
                    value={form.bookingDate}
                    onChange={(e) =>
                      setForm({ ...form, bookingDate: e.target.value })
                    }
                    className="w-full border rounded-lg p-3"
                  />

                  <textarea
                    placeholder="Special requests (optional)"
                    value={form.specialRequests}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        specialRequests: e.target.value,
                      })
                    }
                    className="w-full border rounded-lg p-3"
                    rows={3}
                  />

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 bg-gray-200 py-3 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold"
                    >
                      {submitting ? "Sending…" : "Send"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}