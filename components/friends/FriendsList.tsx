"use client";

import { useRouter } from "next/navigation";

interface Friend {
  id: string;
  user: {
    id: string;
    name: string | null;
    username: string | null;
    primaryCode: string | null;
    currentMood: string | null;
    avatar: string | null;
  };
}

export function FriendsList({ friends }: { friends: Friend[] }) {
  const router = useRouter();
  
  if (friends.length === 0) {
    return (
      <div className="bg-white rounded-lg p-12 shadow text-center">
        <div className="text-6xl mb-4">👋</div>
        <h2 className="text-2xl font-bold mb-2">No friends yet</h2>
        <p className="text-gray-600">
          Click "Invite Friend" above to start building your circle
        </p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h2 className="text-2xl font-bold mb-4">Your Friends ({friends.length})</h2>
      
      <div className="space-y-4">
        {friends.map(friendship => {
          const friend = friendship.user;
          return (
            <div key={friend.id} className="flex items-center justify-between border-b pb-4 last:border-b-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                  {(friend.name || friend.username || "?")[0].toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold">
                    {friend.name || friend.username || "Anonymous"}
                  </p>
                  <p className="text-sm text-gray-600">{friend.primaryCode}</p>
                  
                  {friend.currentMood && (
                    <p className="text-sm text-blue-600 mt-1">
                      {friend.currentMood}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => router.push(`/dashboard/messages`)}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                >
                  Message
                </button>
                <button 
                  onClick={() => router.push(`/dashboard/meetups`)}
                  className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                >
                  Plan Meetup
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}