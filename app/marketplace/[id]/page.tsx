"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function ListingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isSignedIn } = useUser();
  const [listing, setListing] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    message: "",
    numberOfPeople: "",
    bookingDate: "",
    specialRequests: ""
  });

  useEffect(() => {
    async function fetchListing() {
      try {
        const response = await fetch(`/api/listings/${params.id}`);
        const data = await response.json();
        
        if (response.ok) {
          setListing(data.listing);
        } else {
          router.push("/marketplace");
        }
      } catch (error) {
        console.error("Error fetching listing:", error);
        router.push("/marketplace");
      } finally {
        setIsLoading(false);
      }
    }

    fetchListing();
  }, [params.id, router]);

  async function handleInquirySubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/inquiries/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId: listing.id,
          ...formData,
          numberOfPeople: formData.numberOfPeople ? parseInt(formData.numberOfPeople) : null
        })
      });

      if (response.ok) {
        alert("Inquiry sent! The business will contact you soon.");
        setShowInquiryForm(false);
        setFormData({
          message: "",
          numberOfPeople: "",
          bookingDate: "",
          specialRequests: ""
        });
      } else {
        alert("Failed to send inquiry. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!listing) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-8">
        {/* Back Button */}
        <Link 
          href="/marketplace"
          className="inline-flex items-center text-blue-600 hover:underline mb-6"
        >
          ← Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div className="h-96 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg mb-8 flex items-center justify-center">
              <span className="text-9xl">
                {listing.category === "retreat" ? "🏔️" :
                 listing.category === "coaching" ? "💬" :
                 listing.category === "workshop" ? "🎨" :
                 listing.category === "experience" ? "✨" :
                 listing.category === "event" ? "🎉" : "📦"}
              </span>
            </div>

            {/* Category & Title */}
            <div className="mb-6">
              <span className="text-sm font-semibold px-4 py-2 bg-blue-100 text-blue-800 rounded-full">
                {listing.category}
              </span>
              <h1 className="text-4xl font-bold mt-4">{listing.title}</h1>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {listing.description}
              </p>
            </div>

            {/* Details */}
            <div className="bg-white rounded-lg shadow p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">Details</h2>
              
              <div className="space-y-4">
                {listing.location && (
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-gray-600">
                        {listing.location}
                        {listing.city && `, ${listing.city}`}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <p className="font-semibold">Matched Personality Types</p>
                    <p className="text-gray-600">
                      {listing.targetCodes.length} personality codes targeted
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-2xl">📋</span>
                  <div>
                    <p className="font-semibold">Booking Type</p>
                    <p className="text-gray-600">
                      {listing.bookingType === "INQUIRY" 
                        ? "Send inquiry to book" 
                        : "Instant booking available"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Info */}
            <div className="bg-white rounded-lg shadow p-8">
              <h2 className="text-2xl font-bold mb-4">Offered By</h2>
              
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {listing.business.businessName.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{listing.business.businessName}</h3>
                  <p className="text-gray-600 mt-1">{listing.business.description}</p>
                  {listing.business.website && (
                    <a
                      href={listing.business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline mt-2 inline-block"
                    >
                      Visit Website →
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              {/* Price */}
              <div className="mb-6 pb-6 border-b">
                {listing.price ? (
                  <div>
                    <p className="text-3xl font-bold text-blue-600">
                      ${listing.price}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {listing.pricingType === "FIXED" ? "Fixed price" :
                       listing.pricingType === "RANGE" ? "Starting from" :
                       "Custom pricing"}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-xl font-bold text-gray-700">Contact for Pricing</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Send an inquiry to get pricing details
                    </p>
                  </div>
                )}
              </div>

              {/* Inquiry Button */}
              {!showInquiryForm ? (
                <button
                  onClick={() => {
                    if (!isSignedIn) {
                      router.push("/sign-in");
                    } else {
                      setShowInquiryForm(true);
                    }
                  }}
                  className="w-full px-6 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
                >
                  Send Inquiry
                </button>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Your Message <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your interest..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Number of People
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.numberOfPeople}
                      onChange={(e) => setFormData({ ...formData, numberOfPeople: e.target.value })}
                      placeholder="1"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.bookingDate}
                      onChange={(e) => setFormData({ ...formData, bookingDate: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Special Requests
                    </label>
                    <textarea
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      placeholder="Any special requirements?"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowInquiryForm(false)}
                      className="flex-1 px-4 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
                    >
                      {isSubmitting ? "Sending..." : "Send"}
                    </button>
                  </div>
                </form>
              )}

              {/* Info */}
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-gray-600 text-center">
                  💬 The business will respond to your inquiry via email
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}