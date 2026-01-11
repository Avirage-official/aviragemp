"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Friend {
  id: string;
  name: string | null;
  username: string | null;
}

export function CreateMeetupButton({ friends }: { friends: Friend[] }) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    city: "",
    isPublic: false,
    invitedFriends: [] as string[]
  });
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch("/api/meetups/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setShowModal(false);
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to create meetup:", error);
    } finally {
      setLoading(false);
    }
  }
  
  function toggleFriend(friendId: string) {
    setFormData(prev => ({
      ...prev,
      invitedFriends: prev.invitedFriends.includes(friendId)
        ? prev.invitedFriends.filter(f => f !== friendId)
        : [...prev.invitedFriends, friendId]
    }));
  }
  
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Create Meetup
      </button>
      
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-2xl w-full my-8">
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <h2 className="text-2xl font-bold mb-4">Create Meetup</h2>
              
              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-900">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full p-2 border rounded text-gray-900"
                  placeholder="Coffee & Chat"
                />
              </div>
              
              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-900">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full p-2 border rounded text-gray-900"
                  rows={3}
                  placeholder="Let's grab coffee and catch up!"
                />
              </div>
              
              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-900">Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full p-2 border rounded text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-900">Time *</label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="w-full p-2 border rounded text-gray-900"
                  />
                </div>
              </div>
              
              {/* Location & City */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-900">Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full p-2 border rounded text-gray-900"
                    placeholder="Blue Bottle Coffee"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-900">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full p-2 border rounded text-gray-900"
                    placeholder="San Francisco"
                  />
                </div>
              </div>
              
              {/* Public/Private */}
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isPublic}
                    onChange={(e) => setFormData({...formData, isPublic: e.target.checked})}
                  />
                  <span className="text-sm text-gray-900">Make this meetup public (discoverable by others)</span>
                </label>
              </div>
              
              {/* Invite Friends (for private meetups) */}
              {!formData.isPublic && friends.length > 0 && (
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">
                    Invite Friends
                  </label>
                  <div className="space-y-2 max-h-40 overflow-y-auto p-2 border rounded">
                    {friends.map(friend => (
                      <label key={friend.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.invitedFriends.includes(friend.id)}
                          onChange={() => toggleFriend(friend.id)}
                        />
                        <span className="text-sm text-gray-900">
                          {friend.name || friend.username}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Actions */}
              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300 transition"
                >
                  {loading ? "Creating..." : "Create Meetup"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}