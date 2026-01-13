"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { RSVPStatus } from "@prisma/client";

type MeetupLite = {
  id: string;
  title: string;
  description: string | null;
  scheduledAt: Date | string;
  venueName: string;
  city: string;
  isPublic: boolean;
  host: { id: string; name: string | null; username: string | null };
  participants: Array<{
    userId: string;
    status: RSVPStatus | string; // allow string from prisma/select differences
    user?: { id: string; name: string | null; username: string | null } | null;
  }>;
};

export function MeetupsList({
  meetups,
  currentUserId,
  userCode,
}: {
  meetups: MeetupLite[];
  currentUserId: string;
  userCode: string | null;
}) {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "hosting" | "attending">("all");

  // optimistic local status so buttons “stick” instantly
  const [localStatus, setLocalStatus] = useState<Record<string, RSVPStatus | null>>({});

  const getMyStatus = (m: MeetupLite): RSVPStatus | null => {
    if (localStatus[m.id] !== undefined) return localStatus[m.id];
    const p = m.participants.find((p) => p.userId === currentUserId);
    return (p?.status as RSVPStatus) ?? null;
  };

  const visible = useMemo(() => {
    return meetups.filter((m) => {
      if (filter === "hosting") return m.host.id === currentUserId;
      if (filter === "attending") return getMyStatus(m) === "GOING";
      return true;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetups, filter, currentUserId, localStatus]);

  async function rsvp(meetupId: string, status: RSVPStatus) {
    // optimistic
    setLocalStatus((p) => ({ ...p, [meetupId]: status }));

    const res = await fetch("/api/meetups/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ meetupId, status }),
    });

    // rollback if API fails
    if (!res.ok) {
      setLocalStatus((p) => {
        const copy = { ...p };
        delete copy[meetupId];
        return copy;
      });
      return;
    }

    router.refresh();
  }

  return (
    <div className="space-y-6">
      {/* FILTERS */}
      <div className="flex gap-2">
        {(["all", "hosting", "attending"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
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
                  <h3 className="text-lg font-medium text-white">{m.title}</h3>
                  <p className="text-sm text-white/50">
                    {new Date(m.scheduledAt).toLocaleString()} · {m.venueName}
                    {m.city ? `, ${m.city}` : ""}
                  </p>
                </div>

                {!isHost && (
                  <div className="flex gap-2">
                    {(["GOING", "MAYBE", "CANT_GO"] as const).map((s) => {
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
                <p className="mt-3 text-sm text-white/60">{m.description}</p>
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
