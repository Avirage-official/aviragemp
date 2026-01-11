"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const STATUS_COLORS = {
  INQUIRY: "bg-blue-100 text-blue-800",
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-green-100 text-green-800",
  COMPLETED: "bg-gray-100 text-gray-800",
  CANCELLED: "bg-red-100 text-red-800"
};

export default function BusinessInquiriesPage() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [showResponseForm, setShowResponseForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseData, setResponseData] = useState({
    response: "",
    status: "",
    amount: ""
  });

  useEffect(() => {
    fetchInquiries();
  }, []);

  async function fetchInquiries() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/inquiries");
      const data = await response.json();
      setInquiries(data.inquiries || []);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function openResponseForm(inquiry: any) {
    setSelectedInquiry(inquiry);
    setResponseData({
      response: inquiry.businessResponse || "",
      status: inquiry.status,
      amount: inquiry.amount?.toString() || ""
    });
    setShowResponseForm(true);
  }

  async function handleResponseSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/inquiries/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: selectedInquiry.id,
          ...responseData
        })
      });

      if (response.ok) {
        alert("Response sent successfully!");
        setShowResponseForm(false);
        setSelectedInquiry(null);
        fetchInquiries(); // Refresh list
      } else {
        alert("Failed to send response. Please try again.");
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
          <p className="text-gray-600">Loading inquiries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Customer Inquiries</h1>
            <p className="text-gray-600 mt-2">
              Manage and respond to booking requests
            </p>
          </div>
          <button
            onClick={() => router.push("/business/dashboard")}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Total Inquiries</p>
            <p className="text-3xl font-bold mt-2">{inquiries.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">New Inquiries</p>
            <p className="text-3xl font-bold mt-2 text-blue-600">
              {inquiries.filter(i => i.status === "INQUIRY").length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Confirmed</p>
            <p className="text-3xl font-bold mt-2 text-green-600">
              {inquiries.filter(i => i.status === "CONFIRMED").length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Pending</p>
            <p className="text-3xl font-bold mt-2 text-yellow-600">
              {inquiries.filter(i => i.status === "PENDING").length}
            </p>
          </div>
        </div>

        {/* Inquiries List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {inquiries.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Listing
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      People
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {inquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold">{inquiry.user.name || "Anonymous"}</p>
                          <p className="text-sm text-gray-600">{inquiry.user.email}</p>
                          {inquiry.user.primaryCode && (
                            <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded mt-1 inline-block">
                              {inquiry.user.primaryCode}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold">{inquiry.listing.title}</p>
                          <p className="text-sm text-gray-600">{inquiry.listing.category}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm">
                          {inquiry.bookingDate 
                            ? new Date(inquiry.bookingDate).toLocaleDateString()
                            : "Flexible"}
                        </p>
                        <p className="text-xs text-gray-500">
                          Requested {new Date(inquiry.createdAt).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm">{inquiry.numberOfPeople || "-"}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_COLORS[inquiry.status as keyof typeof STATUS_COLORS]}`}>
                          {inquiry.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => openResponseForm(inquiry)}
                          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                        >
                          {inquiry.businessResponse ? "Update" : "Respond"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📬</div>
              <h3 className="text-xl font-bold mb-2">No inquiries yet</h3>
              <p className="text-gray-600">
                Customer inquiries will appear here when they contact you
              </p>
            </div>
          )}
        </div>

        {/* Response Modal */}
        {showResponseForm && selectedInquiry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">Respond to Inquiry</h2>
                    <p className="text-gray-600 mt-1">
                      {selectedInquiry.listing.title}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowResponseForm(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                {/* Customer Info */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold mb-3">Customer Details</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Name:</strong> {selectedInquiry.user.name || "Anonymous"}</p>
                    <p><strong>Email:</strong> {selectedInquiry.user.email}</p>
                    {selectedInquiry.user.primaryCode && (
                      <p><strong>Code:</strong> {selectedInquiry.user.primaryCode}</p>
                    )}
                    {selectedInquiry.bookingDate && (
                      <p><strong>Preferred Date:</strong> {new Date(selectedInquiry.bookingDate).toLocaleDateString()}</p>
                    )}
                    {selectedInquiry.numberOfPeople && (
                      <p><strong>Number of People:</strong> {selectedInquiry.numberOfPeople}</p>
                    )}
                  </div>
                </div>

                {/* Customer Message */}
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                  <p className="text-sm font-semibold text-blue-800 mb-2">Customer Message:</p>
                  <p className="text-gray-700">{selectedInquiry.inquiryMessage}</p>
                  {selectedInquiry.specialRequests && (
                    <>
                      <p className="text-sm font-semibold text-blue-800 mt-3 mb-1">Special Requests:</p>
                      <p className="text-gray-700">{selectedInquiry.specialRequests}</p>
                    </>
                  )}
                </div>

                {/* Response Form */}
                <form onSubmit={handleResponseSubmit} className="space-y-4">
                  <div>
                    <label className="block font-semibold mb-2">
                      Your Response <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      required
                      value={responseData.response}
                      onChange={(e) => setResponseData({ ...responseData, response: e.target.value })}
                      placeholder="Type your response to the customer..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      rows={6}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold mb-2">
                        Update Status
                      </label>
                      <select
                        value={responseData.status}
                        onChange={(e) => setResponseData({ ...responseData, status: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="INQUIRY">Inquiry</option>
                        <option value="PENDING">Pending</option>
                        <option value="CONFIRMED">Confirmed</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold mb-2">
                        Price (USD)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={responseData.amount}
                        onChange={(e) => setResponseData({ ...responseData, amount: e.target.value })}
                        placeholder="99.00"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowResponseForm(false)}
                      className="flex-1 px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
                    >
                      {isSubmitting ? "Sending..." : "Send Response"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}