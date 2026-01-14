"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";

const PERSONALITY_CODES = [
  { label: "Earthlistener", value: "earthlistener" },
  { label: "Stillmind", value: "stillmind" },
  { label: "Northstar", value: "northstar" },
  { label: "Echoheart", value: "echoheart" },
  { label: "Sparkmaker", value: "sparkmaker" },
  { label: "Skyweaver", value: "skyweaver" },
  { label: "Neonmuse", value: "neonmuse" },
  { label: "Tidekeeper", value: "tidekeeper" },
  { label: "Ironreader", value: "ironreader" },
  { label: "Pathfinder", value: "pathfinder" },
  { label: "Otherseer", value: "otherseer" },
  { label: "Lumenward", value: "lumenward" },
  { label: "Ashcaller", value: "ashcaller" },
  { label: "Horizonkin", value: "horizonkin" },
  { label: "Stonebound", value: "stonebound" },
  { label: "Waveborn", value: "waveborn" },
  { label: "Quietforge", value: "quietforge" },
  { label: "Brightsignal", value: "brightsignal" },
  { label: "Deepthread", value: "deepthread" },
  { label: "Mythwalker", value: "mythwalker" },
];

export default function PersonalOnboardingPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [form, setForm] = useState({
    primaryCode: "",
    secondaryCode: "",
    tertiaryCode: "",
    username: "",
    city: "",
  });

  // 🔒 Guard (unchanged)
  useEffect(() => {
    if (!isLoaded || !user) return;
    fetch(`/api/users/${user.id}/type`)
      .then((res) => res.ok && router.replace("/dashboard"))
      .catch(() => {});
  }, [isLoaded, user, router]);

  async function next() {
    if (step < 4) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setStep(step + 1);
      }, 700);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/users/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkId: user?.id,
          email: user?.emailAddresses[0]?.emailAddress,
          username: form.username,
          city: form.city,
          primaryCode: form.primaryCode,
          secondaryCode: form.secondaryCode || null,
          tertiaryCode: form.tertiaryCode || null,
        }),
      });

      if (!res.ok) throw new Error();
      router.push("/dashboard");
    } catch {
      alert("Onboarding failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const valid =
    (step === 1 && form.primaryCode) ||
    (step === 2 && form.username) ||
    (step === 3 && form.city) ||
    step === 4;

  return (
    <div className="min-h-screen bg-[#0B0D12] flex items-center justify-center px-6">
      <div className="w-full max-w-xl">
        {/* Progress */}
        <div className="mb-8 text-sm text-white/60 flex justify-between">
          <span>Step {step} of 4</span>
          <span>Setting up your space</span>
        </div>

        <AnimatePresence mode="wait">
          {!showSuccess ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <h1 className="text-3xl font-bold text-white">
                {step === 1 && "Choose your primary code"}
                {step === 2 && "Pick a username"}
                {step === 3 && "Where are you based?"}
                {step === 4 && "Refine your identity (optional)"}
              </h1>

              <p className="text-white/65">
                {step === 1 && "This shapes how ETHOS matches you with people and experiences."}
                {step === 2 && "Something memorable — no pressure."}
                {step === 3 && "Used for local discovery and context."}
                {step === 4 && "Add nuance, or skip if you’re unsure."}
              </p>

              <div className="rounded-2xl p-[1px] bg-gradient-to-r from-[#4F8CFF]/50 via-[#C7B9FF]/40 to-[#7CF5C8]/50">
                <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  {step === 1 && (
                    <select
                      value={form.primaryCode}
                      onChange={(e) =>
                        setForm({ ...form, primaryCode: e.target.value })
                      }
                      className="w-full bg-black/60 text-white p-4 rounded-lg"
                    >
                      <option value="">Select your primary code</option>
                      {PERSONALITY_CODES.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  )}

                  {step === 2 && (
                    <input
                      value={form.username}
                      onChange={(e) =>
                        setForm({ ...form, username: e.target.value })
                      }
                      placeholder="yourname"
                      className="w-full bg-black/60 text-white p-4 rounded-lg"
                    />
                  )}

                  {step === 3 && (
                    <input
                      value={form.city}
                      onChange={(e) =>
                        setForm({ ...form, city: e.target.value })
                      }
                      placeholder="City"
                      className="w-full bg-black/60 text-white p-4 rounded-lg"
                    />
                  )}

                  {step === 4 && (
                    <div className="space-y-3">
                      <select
                        value={form.secondaryCode}
                        onChange={(e) =>
                          setForm({ ...form, secondaryCode: e.target.value })
                        }
                        className="w-full bg-black/60 text-white p-3 rounded-lg"
                      >
                        <option value="">Secondary code (optional)</option>
                        {PERSONALITY_CODES.map((c) => (
                          <option key={c.value} value={c.value}>
                            {c.label}
                          </option>
                        ))}
                      </select>

                      <select
                        value={form.tertiaryCode}
                        onChange={(e) =>
                          setForm({ ...form, tertiaryCode: e.target.value })
                        }
                        className="w-full bg-black/60 text-white p-3 rounded-lg"
                      >
                        <option value="">Tertiary code (optional)</option>
                        {PERSONALITY_CODES.map((c) => (
                          <option key={c.value} value={c.value}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="flex-1 border border-white/15 text-white p-4 rounded-xl"
                  >
                    <ArrowLeft />
                  </button>
                )}
                <button
                  onClick={next}
                  disabled={!valid || isLoading}
                  className="flex-1 bg-white text-black p-4 rounded-xl font-semibold"
                >
                  {step === 4 ? "Finish" : "Continue"} <ArrowRight />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Sparkles className="w-10 h-10 mx-auto text-[#7CF5C8]" />
              <p className="text-white mt-4">Nice choice — moving on…</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
