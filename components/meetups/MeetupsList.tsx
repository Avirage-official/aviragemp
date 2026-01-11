"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Meetup {
  id: string;
  title: string;
  description: string | null;
  scheduledAt: Date;
  venueName: string;
  city: string;
  isPublic: boolean;
  host: {
    id: string;
    name: string | null;
    username: string | null;
  };
  participants: Array<{
    userId: string;
    status: string;
    user: {
      id: string;
      name: string | null;
      username: string | null;
    };
  }>;
}

export function MeetupsList({ 
  meetups,
  currentUserId,
  userCode
}: { 
  meetups: Meetup[],
  currentUserId: string,
  userCode: string | null
}) {
  const [filter, setFilter] = useState<"all" | "hosting" | "attending">("all");
  const router = useRouter();
  
  const filteredMeetups = meetups.filter(meetup => {
    if (filter === "hosting") return meetup.host.id === currentUserId;
    if (filter === "attending") {
      return meetup.participants.some(a => 
        a.userId === currentUserId && a.status === "GOING"
      );
    }
    return true;
  });
  
  async function handleRSVP(meetupId: string, status: string) {
    await fetch("/api/meetups/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ meetupId, status })
    });
    router.refresh();
  }
  
  function getUserStatus(meetup: Meetup): string | null {
    const participant = meetup.participants.find(a => a.userId === currentUserId);
    return participant?.status || null;
  }
  
  if (meetups.length === 0) {
    return (
      <div className="bg-white rounded-lg p-12 shadow text-center">
        <div className="text-6xl mb-4">📅</div>
        <h2 className="text-2xl font-bold mb-2">No Meetups Yet</h2>
        <p className="text-gray-600">
          Create your first meetup or wait for friends to invite you!
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded transition ${
            filter === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All Meetups
        </button>
        <button
          onClick={() => setFilter("hosting")}
          className={`px-4 py-2 rounded transition ${
            filter === "hosting"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Hosting
        </button>
        <button
          onClick={() => setFilter("attending")}
          className={`px-4 py-2 rounded transition ${
            filter === "attending"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Attending
        </button>
      </div>
      
      {/* Meetups List */}
      <div className="grid gap-4">
        {filteredMeetups.map(meetup => {
          const userStatus = getUserStatus(meetup);
          const isHost = meetup.host.id === currentUserId;
          const goingCount = meetup.participants.filter(a => a.status === "GOING").length;
          
          return (
            <div key={meetup.id} className="bg-white rounded-lg p-6 shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-gray-900">{meetup.title}</h3>
                    {meetup.isPublic ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                        Public
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        Private
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    Hosted by {isHost ? "You" : (meetup.host.name || meetup.host.username)}
                  </p>
                </div>
                
                {!isHost && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRSVP(meetup.id, "GOING")}
                      className={`px-3 py-1 rounded text-sm transition ${
                        userStatus === "GOING"
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Going
                    </button>
                    <button
                      onClick={() => handleRSVP(meetup.id, "MAYBE")}
                      className={`px-3 py-1 rounded text-sm transition ${
                        userStatus === "MAYBE"
                          ? "bg-yellow-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Maybe
                    </button>
                    <button
                      onClick={() => handleRSVP(meetup.id, "CANT_GO")}
                      className={`px-3 py-1 rounded text-sm transition ${
                        userStatus === "CANT_GO"
                          ? "bg-red-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Can't Go
                    </button>
                  </div>
                )}
              </div>
              
              {meetup.description && (
                <p className="text-gray-700 mb-4">{meetup.description}</p>
              )}
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">📅 Date & Time</p>
                  <p className="font-medium text-gray-900">
                    {new Date(meetup.scheduledAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">📍 Location</p>
                  <p className="font-medium text-gray-900">{meetup.venueName}, {meetup.city}</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-600">
                  {goingCount} {goingCount === 1 ? "person" : "people"} going
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      {filteredMeetups.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>No meetups in this category</p>
        </div>
      )}
    </div>
  );
}