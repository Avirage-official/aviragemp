"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Calendar, Users, DollarSign, Clock, ExternalLink, X, CheckCircle, AlertCircle, Loader, Ban } from "lucide-react";

const STATUS_INFO = {
  INQUIRY: {
    label: "Inquiry Sent",
    color: "bg-[#4F8CFF]/10 border-[#4F8CFF]/30 text-[#4F8CFF]",
    icon: <AlertCircle className="w-4 h-4" />,
    description: "Your inquiry has been sent to the business"
  },
  PENDING: {
    label: "Pending Response",
    color: "bg-[#C7B9FF]/10 border-[#C7B9FF]/30 text-[#C7B9FF]",
    icon: <Loader className="w-4 h-4" />,
    description: "Waiting for final confirmation"
  },
  CONFIRMED: {
    label: "Confirmed",
    color: "bg-[#7CF5C8]/10 border-[#7CF5C8]/30 text-[#7CF5C8]",
    icon: <CheckCircle className="w-4 h-4" />,
    description: "Your booking is confirmed!"
  },
  COMPLETED: {
    label: "Completed",
    color: "bg-[#FAFAFA]/10 border-[#FAFAFA]/30 text-[#FAFAFA]",
    icon: <CheckCircle className="w-4 h-4" />,
    description: "Experience completed"
  },
  CANCELLED: {
    label: "Cancelled",
    color: "bg-red-500/10 border-red-500/30 text-red-400",
    icon: <Ban className="w-4 h-4" />,
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
      <div className="min-h-screen bg-[#111827] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#4F8CFF]/30 border-t-[#4F8CFF] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#FAFAFA]/60">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111827] text-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#4F8CFF] via-[#C7B9FF] to-[#7CF5C8] bg-clip-text text-transparent">
            My Bookings & Inquiries
          </h1>
          <p className="text-[#FAFAFA]/60 mt-2">
            Track your requests and booking status
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="relative group">
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-[#4F8CFF]/20 to-[#7CF5C8]/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
            <div className="relative rounded-2xl bg-white/[0.03] backdrop-blur-2xl border border-[#FAFAFA]/10 p-6">
              <p className="text-[#FAFAFA]/50 text-sm">Total Inquiries</p>
              <p className="text-3xl font-bold mt-2 text-[#FAFAFA]">{bookings.length}</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-[#C7B9FF]/20 to-[#4F8CFF]/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
            <div className="relative rounded-2xl bg-white/[0.03] backdrop-blur-2xl border border-[#FAFAFA]/10 p-6">
              <p className="text-[#FAFAFA]/50 text-sm">Pending</p>
              <p className="text-3xl font-bold mt-2 text-[#C7B9FF]">
                {bookings.filter(b => b.status === "INQUIRY" || b.status === "PENDING").length}
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-[#7CF5C8]/20 to-[#4F8CFF]/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
            <div className="relative rounded-2xl bg-white/[0.03] backdrop-blur-2xl border border-[#FAFAFA]/10 p-6">
              <p className="text-[#FAFAFA]/50 text-sm">Confirmed</p>
              <p className="text-3xl font-bold mt-2 text-[#7CF5C8]">
                {bookings.filter(b => b.status === "CONFIRMED").length}
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-[#FAFAFA]/10 to-[#4F8CFF]/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
            <div className="relative rounded-2xl bg-white/[0.03] backdrop-blur-2xl border border-[#FAFAFA]/10 p-6">
              <p className="text-[#FAFAFA]/50 text-sm">Completed</p>
              <p className="text-3xl font-bold mt-2 text-[#FAFAFA]/80">
                {bookings.filter(b => b.status === "COMPLETED").length}
              </p>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        {bookings.length > 0 ? (
          <div className="space-y-6">
            {bookings.map((booking) => {
              const statusInfo = STATUS_INFO[booking.status as keyof typeof STATUS_INFO];
              
              return (
                <div key={booking.id} className="relative group">
                  {/* Glow */}
                  <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-br from-[#4F8CFF]/10 via-[#C7B9FF]/10 to-[#7CF5C8]/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
                  
                  {/* Card */}
                  <div className="relative rounded-[28px] bg-white/[0.03] backdrop-blur-2xl border border-[#FAFAFA]/10 p-6 transition-all duration-300 group-hover:bg-white/[0.05]">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-2">
                          <h3 className="text-xl font-bold text-[#FAFAFA]">{booking.listing.title}</h3>
                          <span className={`flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full border ${statusInfo.color}`}>
                            {statusInfo.icon}
                            {statusInfo.label}
                          </span>
                        </div>
                        <p className="text-[#FAFAFA]/60 text-sm">
                          {booking.listing.business.businessName}
                        </p>
                      </div>
                      <Link
                        href={`/marketplace/${booking.listing.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAFAFA]/5 border border-[#FAFAFA]/10 text-[#FAFAFA]/80 text-sm rounded-xl hover:bg-[#FAFAFA]/10 transition-all"
                      >
                        View Listing
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#4F8CFF]/10 border border-[#4F8CFF]/30 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-[#4F8CFF]" />
                        </div>
                        <div>
                          <p className="text-xs text-[#FAFAFA]/40 uppercase tracking-wider">Requested Date</p>
                          <p className="font-semibold text-[#FAFAFA]">
                            {booking.bookingDate 
                              ? new Date(booking.bookingDate).toLocaleDateString()
                              : "Flexible"}
                          </p>
                        </div>
                      </div>

                      {booking.numberOfPeople && (
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#C7B9FF]/10 border border-[#C7B9FF]/30 flex items-center justify-center flex-shrink-0">
                            <Users className="w-5 h-5 text-[#C7B9FF]" />
                          </div>
                          <div>
                            <p className="text-xs text-[#FAFAFA]/40 uppercase tracking-wider">People</p>
                            <p className="font-semibold text-[#FAFAFA]">{booking.numberOfPeople}</p>
                          </div>
                        </div>
                      )}

                      {booking.amount && (
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#7CF5C8]/10 border border-[#7CF5C8]/30 flex items-center justify-center flex-shrink-0">
                            <DollarSign className="w-5 h-5 text-[#7CF5C8]" />
                          </div>
                          <div>
                            <p className="text-xs text-[#FAFAFA]/40 uppercase tracking-wider">Price</p>
                            <p className="font-semibold text-[#7CF5C8]">
                              ${booking.amount} {booking.currency}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Status Message */}
                    <div className={`p-4 rounded-xl border ${statusInfo.color} mb-4`}>
                      <p className="text-sm">{statusInfo.description}</p>
                    </div>

                    {/* Business Response */}
                    {booking.businessResponse && (
                      <div className="bg-[#7CF5C8]/10 border-l-4 border-[#7CF5C8] p-4 rounded-xl mb-4">
                        <p className="text-sm font-semibold text-[#7CF5C8] mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Business Response:
                        </p>
                        <p className="text-[#FAFAFA]/80">{booking.businessResponse}</p>
                        <p className="text-xs text-[#FAFAFA]/40 mt-2 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Updated {new Date(booking.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-[#FAFAFA]/10">
                      <button
                        onClick={() => openDetailModal(booking)}
                        className="px-4 py-2 bg-[#4F8CFF] text-white text-sm rounded-xl hover:bg-[#4F8CFF]/90 transition-all font-medium"
                      >
                        View Details
                      </button>
                      {booking.listing.business.website && (
                        <a
                          href={booking.listing.business.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAFAFA]/5 border border-[#FAFAFA]/10 text-[#FAFAFA]/80 text-sm rounded-xl hover:bg-[#FAFAFA]/10 transition-all"
                        >
                          Visit Website
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="relative group">
            <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-br from-[#4F8CFF]/10 to-[#7CF5C8]/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
            <div className="relative rounded-[28px] bg-white/[0.03] backdrop-blur-2xl border border-[#FAFAFA]/10 text-center py-16 px-6">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-2xl font-bold mb-2 text-[#FAFAFA]">No bookings yet</h3>
              <p className="text-[#FAFAFA]/60 mb-6 max-w-md mx-auto">
                Start exploring the marketplace to find experiences that resonate with your code
              </p>
              <Link
                href="/marketplace"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#4F8CFF] to-[#7CF5C8] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#4F8CFF]/30 transition-all"
              >
                Browse Marketplace
              </Link>
            </div>
          </div>
        )}

        {/* Detail Modal */}
        {showDetailModal && selectedBooking && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              {/* Glow */}
              <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-br from-[#4F8CFF]/20 via-[#C7B9FF]/20 to-[#7CF5C8]/20 blur-xl" />
              
              {/* Modal */}
              <div className="relative rounded-[28px] bg-[#111827] border border-[#FAFAFA]/10 p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#FAFAFA]">Booking Details</h2>
                    <p className="text-[#FAFAFA]/60 mt-1">{selectedBooking.listing.title}</p>
                  </div>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="p-2 hover:bg-[#FAFAFA]/10 rounded-xl transition-colors"
                  >
                    <X className="w-6 h-6 text-[#FAFAFA]/60" />
                  </button>
                </div>

                {/* Status */}
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-wider text-[#FAFAFA]/40 mb-2">Status</p>
                  <span className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl border ${STATUS_INFO[selectedBooking.status as keyof typeof STATUS_INFO].color}`}>
                    {STATUS_INFO[selectedBooking.status as keyof typeof STATUS_INFO].icon}
                    {STATUS_INFO[selectedBooking.status as keyof typeof STATUS_INFO].label}
                  </span>
                </div>

                {/* Your Message */}
                <div className="bg-[#4F8CFF]/10 border-l-4 border-[#4F8CFF] p-4 mb-6 rounded-xl">
                  <p className="text-sm font-semibold text-[#4F8CFF] mb-2">Your Message:</p>
                  <p className="text-[#FAFAFA]/80">{selectedBooking.inquiryMessage}</p>
                  {selectedBooking.specialRequests && (
                    <>
                      <p className="text-sm font-semibold text-[#4F8CFF] mt-3 mb-1">Special Requests:</p>
                      <p className="text-[#FAFAFA]/80">{selectedBooking.specialRequests}</p>
                    </>
                  )}
                </div>

                {/* Business Response */}
                {selectedBooking.businessResponse ? (
                  <div className="bg-[#7CF5C8]/10 border-l-4 border-[#7CF5C8] p-4 mb-6 rounded-xl">
                    <p className="text-sm font-semibold text-[#7CF5C8] mb-2">Business Response:</p>
                    <p className="text-[#FAFAFA]/80">{selectedBooking.businessResponse}</p>
                  </div>
                ) : (
                  <div className="bg-[#C7B9FF]/10 border-l-4 border-[#C7B9FF] p-4 mb-6 rounded-xl">
                    <p className="text-sm text-[#C7B9FF]">
                      Waiting for business to respond...
                    </p>
                  </div>
                )}

                {/* Details Grid */}
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#FAFAFA]/40 mb-1">Business</p>
                    <p className="text-lg font-semibold text-[#FAFAFA]">{selectedBooking.listing.business.businessName}</p>
                    <p className="text-sm text-[#FAFAFA]/60">{selectedBooking.listing.business.contactEmail}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {selectedBooking.bookingDate && (
                      <div>
                        <p className="text-xs uppercase tracking-wider text-[#FAFAFA]/40 mb-1">Requested Date</p>
                        <p className="text-[#FAFAFA]">{new Date(selectedBooking.bookingDate).toLocaleDateString()}</p>
                      </div>
                    )}

                    {selectedBooking.numberOfPeople && (
                      <div>
                        <p className="text-xs uppercase tracking-wider text-[#FAFAFA]/40 mb-1">Number of People</p>
                        <p className="text-[#FAFAFA]">{selectedBooking.numberOfPeople}</p>
                      </div>
                    )}

                    {selectedBooking.amount && (
                      <div>
                        <p className="text-xs uppercase tracking-wider text-[#FAFAFA]/40 mb-1">Price</p>
                        <p className="text-lg font-bold text-[#7CF5C8]">
                          ${selectedBooking.amount} {selectedBooking.currency}
                        </p>
                      </div>
                    )}

                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#FAFAFA]/40 mb-1">Inquiry Sent</p>
                      <p className="text-[#FAFAFA]/80 text-sm">{new Date(selectedBooking.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-6 border-t border-[#FAFAFA]/10">
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="flex-1 px-6 py-3 bg-[#FAFAFA]/5 border border-[#FAFAFA]/10 text-[#FAFAFA]/80 rounded-xl hover:bg-[#FAFAFA]/10 transition-all font-medium"
                  >
                    Close
                  </button>
                  <Link
                    href={`/marketplace/${selectedBooking.listing.id}`}
                    className="flex-1 px-6 py-3 bg-[#4F8CFF] text-white text-center rounded-xl hover:bg-[#4F8CFF]/90 transition-all font-medium"
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