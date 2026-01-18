// components/messages/NewMessageButton.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { PencilSimple, X, MagnifyingGlass } from "@phosphor-icons/react";

type Friend = {
  id: string;
  name: string | null;
  username: string | null;
  primaryCode: string | null;
};

export function NewMessageButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [creating, setCreating] = useState(false);
  const router = useRouter();

  // Fetch friends when modal opens
  const handleOpen = async () => {
    setIsOpen(true);
    setLoading(true);
    
    try {
      const res = await fetch("/api/friends");
      const data = await res.json();
      setFriends(data.friends || []);
    } catch (error) {
      console.error("Failed to fetch friends:", error);
    } finally {
      setLoading(false);
    }
  };

  // Create/find conversation and navigate
  const handleSelectFriend = async (friendId: string) => {
    setCreating(true);
    
    try {
      const res = await fetch("/api/conversations/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ friendId }),
      });

      const data = await res.json();
      
      if (data.conversationId) {
        router.push(`/dashboard/messages/${data.conversationId}`);
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Failed to create conversation:", error);
    } finally {
      setCreating(false);
    }
  };

  const filteredFriends = friends.filter((friend) => {
    const displayName = friend.name || friend.username || "";
    return displayName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      {/* New Message Button */}
      <button
        onClick={handleOpen}
        className="flex items-center gap-2 px-3 lg:px-4 py-2 lg:py-2.5 rounded-xl bg-[#4F8CFF] hover:bg-[#4F8CFF]/90 text-white text-sm font-semibold transition-colors"
      >
        <PencilSimple weight="bold" className="w-4 h-4" />
        <span className="hidden sm:inline">New Message</span>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#0D0D14] rounded-2xl border border-white/[0.08] shadow-2xl z-50"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
                <h2 className="text-lg font-bold text-white">New Message</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/[0.08] transition-colors"
                >
                  <X weight="bold" className="w-5 h-5 text-white/60" />
                </button>
              </div>

              {/* Search */}
              <div className="p-4 border-b border-white/[0.06]">
                <div className="relative">
                  <MagnifyingGlass
                    weight="bold"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40"
                  />
                  <input
                    type="text"
                    placeholder="Search friends..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-10 pl-10 pr-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-white/40 focus:border-[#4F8CFF]/50 focus:bg-white/[0.05] outline-none transition-all"
                  />
                </div>
              </div>

              {/* Friends List */}
              <div className="max-h-[400px] overflow-y-auto">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="w-8 h-8 border-2 border-[#4F8CFF] border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : filteredFriends.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-white/50 text-sm">
                      {searchQuery ? "No friends found" : "No friends yet"}
                    </p>
                  </div>
                ) : (
                  <div className="p-2">
                    {filteredFriends.map((friend) => {
                      const displayName = friend.name || friend.username || "Unknown";
                      const initials = displayName.slice(0, 2).toUpperCase();

                      return (
                        <button
                          key={friend.id}
                          onClick={() => handleSelectFriend(friend.id)}
                          disabled={creating}
                          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {/* Avatar */}
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4F8CFF] to-[#C7B9FF] flex items-center justify-center text-white text-sm font-bold shrink-0">
                            {initials}
                          </div>

                          {/* Info */}
                          <div className="flex-1 text-left">
                            <p className="text-sm font-semibold text-white">
                              {displayName}
                            </p>
                            {friend.primaryCode && (
                              <p className="text-xs text-white/50">
                                {friend.primaryCode}
                              </p>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}