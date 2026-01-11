"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const STATUS_INFO = {
  INQUIRY: {
    label: "Inquiry Sent",
    color: "bg-blue-100 text-blue-800",
    icon: "📨",
    description: "Your inquiry has been sent to the business"
  },
  PENDING: {
    label: "Pending Response",
    color: "bg-yellow-100 text-yellow-800",
    icon: "⏳",
    description: "Waiting for final confirmation"
  },
  CONFIRMED: {
    label: "Confirmed",
    color: "bg-green-100 text-green-800",
    icon: "✅",
    description: "Your booking is confirmed!"
  },
  COMPLETED: {
    label: "Completed",
    color: "bg-gray-100 text-gray-800",
    icon: "🎉",
    description: "Experience completed"
  },
  CANCELLED: {
    label: "Cancelled",
    color: "bg-red-100 text-red-800",
    icon: "❌",
    description: "Booking was cancelled"
  }
};

export default function UserBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/bookings");
      const data = await response.json();
      setBookings(data.bookings || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function openDetailModal(booking: any) {
    setSelectedBooking(booking);
    setShowDetailModal(true);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">My Bookings & Inquiries</h1>
          <p className="text-gray-600 mt-2">
            Track your requests and booking status
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Total Inquiries</p>
            <p className="text-3xl font-bold mt-2">{bookings.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Pending</p>
            <p className="text-3xl font-bold mt-2 text-yellow-600">
              {bookings.filter(b => b.status === "INQUIRY" || b.status === "PENDING").length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Confirmed</p>
            <p className="text-3xl font-bold mt-2 text-green-600">
              {bookings.filter(b => b.status === "CONFIRMED").length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Completed</p>
            <p className="text-3xl font-bold mt-2 text-gray-600">
              {bookings.filter(b => b.status === "COMPLETED").length}
            </p>
          </div>
        </div>

        {/* Bookings List */}
        {bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => {
              const statusInfo = STATUS_INFO[booking.status as keyof typeof STATUS_INFO];
              
              return (
                <div
                  key={booking.id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold">{booking.listing.title}</h3>
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusInfo.color}`}>
                            {statusInfo.icon} {statusInfo.label}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">
                          {booking.listing.business.businessName}
                        </p>
                      </div>
                      <Link
                        href={`/marketplace/${booking.listing.id}`}
                        className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition"
                      >
                        View Listing
                      </Link>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Requested Date</p>
                        <p className="font-semibold">
                          {booking.bookingDate 
                            ? new Date(booking.bookingDate).toLocaleDateString()
                            : "Flexible"}
                        </p>
                      </div>
                      {booking.numberOfPeople && (
                        <div>
                          <p className="text-xs text-gray-500">Number of People</p>
                          <p className="font-semibold">{booking.numberOfPeople}</p>
                        </div>
                      )}
                      {booking.amount && (
                        <div>
                          <p className="text-xs text-gray-500">Price</p>
                          <p className="font-semibold text-green-600">
                            ${booking.amount} {booking.currency}
                          </p>
                        </div>
                      )}
                      <div>
                        <p className="text-xs text-gray-500">Inquiry Sent</p>
                        <p className="font-semibold">
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Status Message */}
                    <div className={`p-3 rounded-lg ${statusInfo.color.replace('text-', 'border-').replace('bg-', 'bg-opacity-20 border-l-4 border-')}`}>
                      <p className="text-sm">{statusInfo.description}</p>
                    </div>

                    {/* Business Response */}
                    {booking.businessResponse && (
                      <div className="mt-4 bg-green-50 border-l-4 border-green-400 p-4 rounded">
                        <p className="text-sm font-semibold text-green-800 mb-2">
                          Business Response:
                        </p>
                        <p className="text-gray-700">{booking.businessResponse}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          Updated {new Date(booking.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="mt-4 pt-4 border-t flex gap-3">
                      <button
                        onClick={() => openDetailModal(booking)}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                      >
                        View Details
                      </button>
                      {booking.listing.business.website && (
                        <a
                          href={booking.listing.business.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition"
                        >
                          Visit Business Website →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-bold mb-2">No bookings yet</h3>
            <p className="text-gray-600 mb-6">
              Start exploring the marketplace to find experiences
            </p>
            <Link
              href="/marketplace"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Browse Marketplace
            </Link>
          </div>
        )}

        {/* Detail Modal */}
        {showDetailModal && selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">Booking Details</h2>
                    <p className="text-gray-600 mt-1">{selectedBooking.listing.title}</p>
                  </div>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                {/* Status */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-600 mb-2">Status</p>
                  <span className={`inline-block text-sm font-semibold px-4 py-2 rounded-full ${STATUS_INFO[selectedBooking.status as keyof typeof STATUS_INFO].color}`}>
                    {STATUS_INFO[selectedBooking.status as keyof typeof STATUS_INFO].icon} {STATUS_INFO[selectedBooking.status as keyof typeof STATUS_INFO].label}
                  </span>
                </div>

                {/* Your Message */}
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded">
                  <p className="text-sm font-semibold text-blue-800 mb-2">Your Message:</p>
                  <p className="text-gray-700">{selectedBooking.inquiryMessage}</p>
                  {selectedBooking.specialRequests && (
                    <>
                      <p className="text-sm font-semibold text-blue-800 mt-3 mb-1">Special Requests:</p>
                      <p className="text-gray-700">{selectedBooking.specialRequests}</p>
                    </>
                  )}
                </div>

                {/* Business Response */}
                {selectedBooking.businessResponse ? (
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6 rounded">
                    <p className="text-sm font-semibold text-green-800 mb-2">Business Response:</p>
                    <p className="text-gray-700">{selectedBooking.businessResponse}</p>
                  </div>
                ) : (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
                    <p className="text-sm text-yellow-800">
                      Waiting for business to respond...
                    </p>
                  </div>
                )}

                {/* Details */}
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Business</p>
                    <p className="text-lg">{selectedBooking.listing.business.businessName}</p>
                    <p className="text-sm text-gray-600">{selectedBooking.listing.business.contactEmail}</p>
                  </div>

                  {selectedBooking.bookingDate && (
                    <div>
                      <p className="text-sm font-semibold text-gray-600">Requested Date</p>
                      <p>{new Date(selectedBooking.bookingDate).toLocaleDateString()}</p>
                    </div>
                  )}

                  {selectedBooking.numberOfPeople && (
                    <div>
                      <p className="text-sm font-semibold text-gray-600">Number of People</p>
                      <p>{selectedBooking.numberOfPeople}</p>
                    </div>
                  )}

                  {selectedBooking.amount && (
                    <div>
                      <p className="text-sm font-semibold text-gray-600">Price</p>
                      <p className="text-lg font-bold text-green-600">
                        ${selectedBooking.amount} {selectedBooking.currency}
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-semibold text-gray-600">Inquiry Sent</p>
                    <p>{new Date(selectedBooking.createdAt).toLocaleString()}</p>
                  </div>

                  {selectedBooking.updatedAt !== selectedBooking.createdAt && (
                    <div>
                      <p className="text-sm font-semibold text-gray-600">Last Updated</p>
                      <p>{new Date(selectedBooking.updatedAt).toLocaleString()}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t flex gap-3">
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                  >
                    Close
                  </button>
                  <Link
                    href={`/marketplace/${selectedBooking.listing.id}`}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition"
                  >
                    View Listing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}