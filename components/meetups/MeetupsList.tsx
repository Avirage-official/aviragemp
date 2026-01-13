"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export function MeetupsList({
  meetups,
  currentUserId,
}: {
  meetups: any[];
  currentUserId: string;
}) {
  const [filter, setFilter] =
    useState<"all" | "hosting" | "attending">("all");
  const router = useRouter();

  function getMyStatus(meetup: any) {
    const p = meetup.participants.find(
      (p: any) => p.userId === currentUserId
    );
    return p?.status ?? null;
  }

  const visible = meetups.filter((m) => {
    if (filter === "hosting") return m.host.id === currentUserId;
    if (filter === "attending")
      return m.participants.some(
        (p: any) =>
          p.userId === currentUserId && p.status === "GOING"
      );
    return true;
  });

  async function rsvp(meetupId: string, status: string) {
    await fetch("/api/meetups/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ meetupId, status }),
    });

    router.refresh();
  }

  return (
    <div className="space-y-6">
      {/* FILTERS */}
      <div className="flex gap-2">
        {["all", "hosting", "attending"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-1.5 rounded-full text-sm transition ${
              filter === f
                ? "bg-white text-black"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* MEETUPS */}
      <div className="grid gap-6">
        {visible.map((m) => {
          const isHost = m.host.id === currentUserId;
          const myStatus = getMyStatus(m);

          return (
            <motion.div
              key={m.id}
              whileHover={{ y: -4 }}
              className="rounded-3xl border border-white/10 bg-white/[0.02] p-6"
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="text-lg font-medium text-white">
                    {m.title}
                  </h3>
                  <p className="text-sm text-white/50">
                    {new Date(m.scheduledAt).toLocaleString()} ·{" "}
                    {m.venueName}
                  </p>
                </div>

                {!isHost && (
                  <div className="flex gap-2">
                    {["GOING", "MAYBE", "CANT_GO"].map((s) => {
                      const active = myStatus === s;

                      return (
                        <button
                          key={s}
                          onClick={() => rsvp(m.id, s)}
                          className={[
                            "px-3 py-1 rounded-full text-xs transition",
                            active
                              ? "bg-white text-black"
                              : "bg-white/10 text-white hover:bg-white/20",
                          ].join(" ")}
                        >
                          {s.replace("_", " ")}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {m.description && (
                <p className="mt-3 text-sm text-white/60">
                  {m.description}
                </p>
              )}

              {myStatus && !isHost && (
                <p className="mt-3 text-xs text-white/40">
                  Your response:{" "}
                  <span className="text-white">
                    {myStatus.replace("_", " ")}
                  </span>
                </p>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
