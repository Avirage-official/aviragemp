"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type RSVPStatus = "GOING" | "MAYBE" | "CANT_GO";

type Meetup = {
  id: string;
  title: string;
  description?: string | null;
  scheduledAt: Date;
  venueName: string;
  host: { id: string };
  participants: {
    userId: string;
    status: RSVPStatus;
  }[];
};

export function MeetupsList({
  meetups,
  currentUserId,
  userCode,
}: {
  meetups: Meetup[];
  currentUserId: string;
  userCode: string | null;
}) {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "hosting" | "attending">("all");
  const [pending, setPending] = useState<string | null>(null);

  function myStatus(meetup: Meetup): RSVPStatus | null {
    return (
      meetup.participants.find((p) => p.userId === currentUserId)?.status ??
      null
    );
  }

  const visible = meetups.filter((m) => {
    if (filter === "hosting") return m.host.id === currentUserId;
    if (filter === "attending")
      return m.participants.some(
        (p) => p.userId === currentUserId && p.status === "GOING"
      );
    return true;
  });

  async function rsvp(meetupId: string, status: RSVPStatus) {
    setPending(meetupId);

    await fetch("/api/meetups/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ meetupId, status }),
    });

    setPending(null);
    router.refresh(); // server truth
  }

  return (
    <section className="space-y-6">
      {/* FILTERS */}
      <div className="flex gap-2">
        {(["all", "hosting", "attending"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-sm transition ${
              filter === f
                ? "bg-white text-black"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="grid gap-6">
        {visible.map((m) => {
          const isHost = m.host.id === currentUserId;
          const status = myStatus(m);

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
                    {new Date(m.scheduledAt).toLocaleString()} · {m.venueName}
                  </p>
                </div>

                {!isHost && (
                  <div className="flex gap-2">
                    {(["GOING", "MAYBE", "CANT_GO"] as const).map((s) => {
                      const active = status === s;

                      return (
                        <button
                          key={s}
                          disabled={pending === m.id}
                          onClick={() => rsvp(m.id, s)}
                          className={[
                            "rounded-full px-3 py-1 text-xs transition",
                            active
                              ? "bg-white text-black"
                              : "bg-white/10 text-white hover:bg-white/20",
                            pending === m.id && "opacity-50",
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

              {status && !isHost && (
                <p className="mt-3 text-xs text-white/40">
                  Your response:{" "}
                  <span className="text-white">
                    {status.replace("_", " ")}
                  </span>
                </p>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}