"use client";

import { useState } from "react";

export function FriendInviteButton() {
  const [showModal, setShowModal] = useState(false);
  const [inviteLink, setInviteLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  
  async function generateInviteLink() {
    setLoading(true);
    const response = await fetch("/api/friends/generate-invite", {
      method: "POST"
    });
    const data = await response.json();
    setInviteLink(data.inviteLink);
    setShowModal(true);
    setLoading(false);
  }
  
  function copyToClipboard() {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  
  return (
    <>
      <button 
        onClick={generateInviteLink}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
      >
        {loading ? "Generating..." : "Invite Friend"}
      </button>
      
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">Invite a Friend</h2>
            <p className="text-gray-600 mb-4">
              Share this link with someone you'd like to connect with on ETHOS:
            </p>
            
            <div className="bg-gray-50 p-3 rounded border mb-4 break-all text-sm">
              {inviteLink}
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                {copied ? "✓ Copied!" : "Copy Link"}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}