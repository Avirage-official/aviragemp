"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CodeTargetingSelector } from "@/components/business/CodeTargetingSelector";

export default function NewListingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    subcategory: "",
    price: "",
    pricingType: "FIXED",
    location: "",
    city: "",
    bookingType: "INQUIRY",
    targetCodes: [] as string[]
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/listings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: formData.price ? parseFloat(formData.price) : null
        })
      });

      if (response.ok) {
        router.push("/business/dashboard?listing=created");
      } else {
        alert("Failed to create listing. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Create New Listing</h1>
            <p className="text-gray-600 mt-2">
              Add your product or service to reach personality-matched customers
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6">
            {/* Basic Info */}
            <div>
              <h2 className="text-xl font-bold mb-4">Basic Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block font-semibold mb-2">
                    Title <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="E.g., 7-Day Mindfulness Retreat"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">
                    Description <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your offering in detail..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={6}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-2">
                      Category <span className="text-red-600">*</span>
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select category...</option>
                      <option value="experience">Experience</option>
                      <option value="product">Product</option>
                      <option value="service">Service</option>
                      <option value="event">Event</option>
                      <option value="retreat">Retreat</option>
                      <option value="coaching">Coaching</option>
                      <option value="workshop">Workshop</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">
                      Subcategory
                    </label>
                    <input
                      type="text"
                      value={formData.subcategory}
                      onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                      placeholder="E.g., Wellness, Adventure"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div>
              <h2 className="text-xl font-bold mb-4">Pricing</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-2">
                    Price (USD)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="99.00"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Leave empty for "Contact for pricing"
                  </p>
                </div>

                <div>
                  <label className="block font-semibold mb-2">
                    Pricing Type
                  </label>
                  <select
                    value={formData.pricingType}
                    onChange={(e) => setFormData({ ...formData, pricingType: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="FIXED">Fixed Price</option>
                    <option value="RANGE">Price Range</option>
                    <option value="CUSTOM">Contact for Pricing</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <h2 className="text-xl font-bold mb-4">Location (Optional)</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-2">
                    Venue/Location Name
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="E.g., Mountain View Retreat Center"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="E.g., San Francisco"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Booking Type */}
            <div>
              <h2 className="text-xl font-bold mb-4">Booking Type</h2>
              
              <div className="space-y-3">
                <label className="flex items-start gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
                  <input
                    type="radio"
                    name="bookingType"
                    value="INQUIRY"
                    checked={formData.bookingType === "INQUIRY"}
                    onChange={(e) => setFormData({ ...formData, bookingType: e.target.value })}
                    className="mt-1"
                  />
                  <div>
                    <p className="font-semibold">Inquiry (Recommended)</p>
                    <p className="text-sm text-gray-600">
                      Customers send you an inquiry. You respond and confirm booking manually.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 opacity-50">
                  <input
                    type="radio"
                    name="bookingType"
                    value="DIRECT"
                    disabled
                    className="mt-1"
                  />
                  <div>
                    <p className="font-semibold">Direct Booking (Coming Soon)</p>
                    <p className="text-sm text-gray-600">
                      Instant booking with payment. Requires Stripe Connect setup.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Code Targeting */}
            <div>
              <h2 className="text-xl font-bold mb-4">Target Personality Codes</h2>
              <p className="text-gray-600 mb-4">
                Select which personality codes would be most interested in this offering. This helps us show your listing to the right people.
              </p>
              
              <CodeTargetingSelector
                selectedCodes={formData.targetCodes}
                onChange={(codes) => setFormData({ ...formData, targetCodes: codes })}
              />
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-6 border-t">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || formData.targetCodes.length === 0}
                className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
              >
                {isLoading ? "Creating..." : "Create Listing"}
              </button>
            </div>

            {formData.targetCodes.length === 0 && (
              <p className="text-sm text-red-600 text-center">
                Please select at least one personality code to target
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}