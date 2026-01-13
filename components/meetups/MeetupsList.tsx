"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface Friend {
  id: string;
  name: string | null;
  username: string | null;
}

export function CreateMeetupButton({ friends }: { friends: Friend[] }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    city: "",
    isPublic: false,
    invitedFriends: [] as string[],
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/meetups/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);
    setOpen(false);
    router.refresh();
  }

  function toggleFriend(id: string) {
    setForm((p) => ({
      ...p,
      invitedFriends: p.invitedFriends.includes(id)
        ? p.invitedFriends.filter((f) => f !== id)
        : [...p.invitedFriends, id],
    }));
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-full bg-white text-black px-5 py-2 text-sm font-medium hover:opacity-90 transition"
      >
        Create meetup
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.form
              onSubmit={submit}
              initial={{ scale: 0.96, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 20 }}
              className="w-full max-w-2xl rounded-3xl border border-white/10 bg-black p-8 space-y-6"
            >
              <header className="space-y-1">
                <h2 className="text-2xl font-semibold text-white">
                  Create a meetup
                </h2>
                <p className="text-sm text-white/50">
                  Start with intention, not logistics.
                </p>
              </header>

              {/* WHAT */}
              <div className="space-y-3">
                <input
                  required
                  placeholder="What’s the plan?"
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  className="w-full rounded-xl bg-white/5 border border-white/10 p-3 text-white placeholder-white/40 focus:outline-none"
                />
                <textarea
                  placeholder="Optional context"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={3}
                  className="w-full rounded-xl bg-white/5 border border-white/10 p-3 text-white placeholder-white/40 focus:outline-none"
                />
              </div>

              {/* WHEN */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) =>
                    setForm({ ...form, date: e.target.value })
                  }
                  className="rounded-xl bg-white/5 border border-white/10 p-3 text-white"
                />
                <input
                  type="time"
                  required
                  value={form.time}
                  onChange={(e) =>
                    setForm({ ...form, time: e.target.value })
                  }
                  className="rounded-xl bg-white/5 border border-white/10 p-3 text-white"
                />
              </div>

              {/* WHERE */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  required
                  placeholder="Place"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  className="rounded-xl bg-white/5 border border-white/10 p-3 text-white"
                />
                <input
                  required
                  placeholder="City"
                  value={form.city}
                  onChange={(e) =>
                    setForm({ ...form, city: e.target.value })
                  }
                  className="rounded-xl bg-white/5 border border-white/10 p-3 text-white"
                />
              </div>

              {/* WHO */}
              {!form.isPublic && friends.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-white/60">
                    Invite friends
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {friends.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => toggleFriend(f.id)}
                        className={`px-3 py-1 rounded-full text-xs transition ${
                          form.invitedFriends.includes(f.id)
                            ? "bg-white text-black"
                            : "bg-white/10 text-white hover:bg-white/20"
                        }`}
                      >
                        {f.name || f.username}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ACTIONS */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-sm text-white/50 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  disabled={loading}
                  type="submit"
                  className="rounded-full bg-white text-black px-6 py-2 text-sm font-medium"
                >
                  {loading ? "Creating…" : "Create"}
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}