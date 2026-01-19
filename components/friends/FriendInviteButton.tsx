"use client";

import { useState } from "react";
import { UserPlus, Copy, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FriendInviteButton() {
  const [showModal, setShowModal] = useState(false);
  const [inviteLink, setInviteLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  
  async function generateInviteLink() {
    setLoading(true);
    try {
      const response = await fetch("/api/friends/generate-invite", {
        method: "POST"
      });
      const data = await response.json();
      setInviteLink(data.inviteLink);
      setShowModal(true);
    } catch (error) {
      console.error("Failed to generate invite:", error);
    } finally {
      setLoading(false);
    }
  }
  
  function copyToClipboard() {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  
  return (
    <>
      {/* Trigger Button */}
      <button 
        onClick={generateInviteLink}
        disabled={loading}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <UserPlus className="w-4 h-4" />
        {loading ? "Generating..." : "Invite Friend"}
      </button>
      
      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              {/* Modal Content */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#0F0F14] p-8"
              >
                {/* Close Button */}
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-6 right-6 p-2 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5 text-white/60" />
                </button>

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7CF5C8] to-[#4F8CFF] flex items-center justify-center mb-6">
                  <UserPlus className="w-7 h-7 text-black" />
                </div>

                {/* Title & Description */}
                <h2 className="text-2xl font-bold text-white mb-2">
                  Invite a Friend
                </h2>
                <p className="text-white/60 mb-6">
                  Share this link with someone aligned with your energy. 
                  ETHOS is about quality connections, not quantity.
                </p>
                
                {/* Link Display */}
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4 mb-6">
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-2">
                    Your Invite Link
                  </p>
                  <p className="text-white/80 text-sm break-all font-mono">
                    {inviteLink}
                  </p>
                </div>
                
                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-all"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Link
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 rounded-xl border border-white/10 text-white/70 font-medium hover:bg-white/5 transition-all"
                  >
                    Close
                  </button>
                </div>

                {/* Tip */}
                <p className="text-xs text-white/40 mt-6 text-center">
                  Links work for 7 days and can only be used once
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}