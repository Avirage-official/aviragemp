"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const CATEGORIES = [
  { id: "all", name: "All Categories" },
  { id: "experience", name: "Experiences" },
  { id: "retreat", name: "Retreats" },
  { id: "coaching", name: "Coaching" },
  { id: "workshop", name: "Workshops" },
  { id: "event", name: "Events" },
  { id: "service", name: "Services" },
  { id: "product", name: "Products" }
];

export default function MarketplacePage() {
  const { user } = useUser();
  const [listings, setListings] = useState<any[]>([]);
  const [filteredListings, setFilteredListings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showMyMatches, setShowMyMatches] = useState(false);
  const [userCode, setUserCode] = useState<string | null>(null);

  // Fetch user's code
  useEffect(() => {
    async function fetchUserCode() {
      if (!user) return;
      
      try {
        const response = await fetch(`/api/users/${user.id}`);
        const data = await response.json();
        setUserCode(data.user?.primaryCode || null);
      } catch (error) {
        console.error("Error fetching user code:", error);
      }
    }
    
    fetchUserCode();
  }, [user]);

  // Fetch listings
  useEffect(() => {
    async function fetchListings() {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedCategory !== "all") {
          params.append("category", selectedCategory);
        }
        
        const response = await fetch(`/api/listings?${params}`);
        const data = await response.json();
        setListings(data.listings || []);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchListings();
  }, [selectedCategory]);

  // Apply "My Matches" filter
  useEffect(() => {
    if (showMyMatches && userCode) {
      const matched = listings.filter(listing => 
        listing.targetCodes.includes(userCode)
      );
      setFilteredListings(matched);
    } else {
      setFilteredListings(listings);
    }
  }, [listings, showMyMatches, userCode]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Discover Experiences</h1>
          <p className="text-gray-600 mt-2">
            Find offerings matched to your personality code
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Category Filter */}
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* My Matches Toggle */}
            {userCode && (
              <div className="flex items-end">
                <label className="flex items-center gap-3 p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
                  <input
                    type="checkbox"
                    checked={showMyMatches}
                    onChange={(e) => setShowMyMatches(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <div>
                    <p className="font-semibold">My Matches Only</p>
                    <p className="text-sm text-gray-600">Show listings for your code</p>
                  </div>
                </label>
              </div>
            )}
          </div>

          {showMyMatches && (
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                🎯 Showing listings targeted to your personality code
              </p>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {isLoading ? "Loading..." : `${filteredListings.length} listings found`}
          </p>
        </div>

        {/* Listings Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-gray-600">Loading listings...</p>
          </div>
        ) : filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <Link
                key={listing.id}
                href={`/marketplace/${listing.id}`}
                className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden"
              >
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <span className="text-6xl">
                    {listing.category === "retreat" ? "🏔️" :
                     listing.category === "coaching" ? "💬" :
                     listing.category === "workshop" ? "🎨" :
                     listing.category === "experience" ? "✨" :
                     listing.category === "event" ? "🎉" : "📦"}
                  </span>
                </div>

                <div className="p-6">
                  {/* Category Badge */}
                  <div className="mb-3">
                    <span className="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {listing.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">
                    {listing.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {listing.description}
                  </p>

                  {/* Business & Price */}
                  <div className="flex justify-between items-center pt-4 border-t">
                    <div>
                      <p className="text-xs text-gray-500">By</p>
                      <p className="text-sm font-semibold">{listing.business.businessName}</p>
                    </div>
                    {listing.price ? (
                      <div className="text-right">
                        <p className="text-lg font-bold text-blue-600">
                          ${listing.price}
                        </p>
                      </div>
                    ) : (
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Contact for pricing</p>
                      </div>
                    )}
                  </div>

                  {/* Match Indicator */}
                  {userCode && listing.targetCodes.includes(userCode) && (
                    <div className="mt-3 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-xs font-semibold text-green-800">
                        🎯 Matched to your code
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">No listings found</h3>
            <p className="text-gray-600">
              {showMyMatches 
                ? "Try browsing all listings or check back later"
                : "No listings available yet. Check back soon!"}
            </p>
            {showMyMatches && (
              <button
                onClick={() => setShowMyMatches(false)}
                className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Browse All Listings
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}