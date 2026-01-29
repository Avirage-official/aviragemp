"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, MapPin } from "@phosphor-icons/react";
import { MarketplaceCard } from "./MarketplaceCard";
import type { Venue } from "../page";

interface FriendsPicksProps {
  className?: string;
}

interface FriendCheckin {
  venueId: string;
  count: number;
  archetypes: string[];
  status: string;
  updatedAt: Date;
  venue: Venue;
}

export function FriendsPicks({ className = "" }: FriendsPicksProps) {
  const [friendsCheckins, setFriendsCheckins] = useState<FriendCheckin[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFriendsCheckins = async () => {
      try {
        const response = await fetch("/api/friends-checkins");
        if (response.ok) {
          const data = await response.json();
          setFriendsCheckins(data.checkins || []);
        }
      } catch (error) {
        console.error("Error fetching friends' check-ins:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFriendsCheckins();
  }, []);

  if (isLoading) {
    return (
      <div className={`${className}`}>
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-slate-200 rounded mb-4"></div>
          <div className="flex gap-4 overflow-x-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="min-w-[300px] h-64 bg-slate-100 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (friendsCheckins.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${className}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
          <Users className="w-5 h-5 text-white" weight="fill" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Friends' Picks
          </h2>
          <p className="text-sm text-slate-600">
            Places your friends are visiting
          </p>
        </div>
      </div>

      {/* Horizontal scrolling cards */}
      <div className="relative">
        <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar">
          {friendsCheckins.map((checkin) => (
            <div key={checkin.venueId} className="min-w-[320px] flex-shrink-0">
              <div className="relative">
                {/* Friend activity badge */}
                <motion.div
                  initial={{ scale: 0, y: -10 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="absolute -top-3 left-4 z-10 px-3 py-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold shadow-lg flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5" weight="fill" />
                  <span>
                    {checkin.count} {checkin.count === 1 ? "friend" : "friends"}{" "}
                    {checkin.status === "here" ? "here" : "going"}
                  </span>
                </motion.div>

                {/* Venue Card */}
                <MarketplaceCard venue={checkin.venue} />

                {/* Archetypes indicator */}
                {checkin.archetypes.length > 0 && (
                  <div className="mt-3 px-3">
                    <p className="text-xs text-slate-600">
                      Popular with:{" "}
                      <span className="font-semibold text-blue-600">
                        {checkin.archetypes
                          .map((a) => a.charAt(0).toUpperCase() + a.slice(1))
                          .join(", ")}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Fade gradient at edges */}
        <div className="absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </motion.div>
  );
}
