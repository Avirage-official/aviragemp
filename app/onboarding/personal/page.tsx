"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { EmblemCarousel } from "@/components/emblems/EmblemCarousel";
import { MYTHICAL_CODES } from "@/lib/mythicalCodesData";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type StepId = 1 | 2 | 3 | 4;

export default function PersonalOnboardingPage() {
  const { user } = useUser();
  const router = useRouter();

  const [step, setStep] = useState<StepId>(1);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    primaryCode: "",
    username: "",
    city: "",
    secondaryCode: "",
    tertiaryCode: "",
  });

  async function next() {
    if (step < 4) {
      setStep((s) => (s + 1) as StepId);
      return;
    }

    // Final submit
    setLoading(true);
    try {
      const res = await fetch("/api/users/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkId: user!.id,
          email: user!.emailAddresses[0]?.emailAddress,
          username: form.username,
          city: form.city,
          primaryCode: form.primaryCode,
          secondaryCode: form.secondaryCode || null,
          tertiaryCode: form.tertiaryCode || null,
          type: "CONSUMER",
        }),
      });

      if (!res.ok) {
        alert("Failed to create profile. Please try again.");
        return;
      }

      router.push("/dashboard");
    } catch {
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const valid =
    (step === 1 && form.primaryCode) ||
    (step === 2 && form.username) ||
    (step === 3 && form.city) ||
    step === 4;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111827] via-[#0f172a] to-[#111827] text-white">
      {/* Ambient Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-[30%] right-[10%] h-[800px] w-[800px] rounded-full bg-[#C7B9FF] blur-[180px] opacity-[0.08] animate-pulse" />
        <div className="absolute bottom-[-20%] left-[40%] h-[750px] w-[750px] rounded-full bg-[#4F8CFF] blur-[170px] opacity-[0.06]" />
      </div>

      <div className="relative flex items-center justify-center px-6 py-20 min-h-screen">
        <div className="w-full max-w-4xl space-y-10">
          {/* Progress */}
          <div className="flex justify-between text-sm text-white/60">
            <span>Step {step} of 4</span>
            <span>Setting up your space</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              className="space-y-6"
            >
              <h1 className="text-4xl font-bold text-center">
                {step === 1 && "Choose your primary code"}
                {step === 2 && "Pick a username"}
                {step === 3 && "Where are you based?"}
                {step === 4 && "Refine your identity"}
              </h1>

              <p className="text-white/70 text-center max-w-2xl mx-auto">
                {step === 1 && "This guides how ETHOS aligns you with people and experiences."}
                {step === 2 && "Something personal — no pressure to be perfect."}
                {step === 3 && "Used for discovery and local context."}
                {step === 4 && "Optional, but adds nuance to your profile."}
              </p>

              {/* Step Content */}
              <div className="min-h-[500px]">
                {step === 1 && (
                  <EmblemCarousel
                    codes={MYTHICAL_CODES}
                    selectedCode={form.primaryCode}
                    onSelect={(code) => setForm({ ...form, primaryCode: code })}
                  />
                )}

                {step === 2 && (
                  <div className="max-w-lg mx-auto">
                    <div className="rounded-2xl p-[1px] bg-gradient-to-r from-[#4F8CFF] via-[#C7B9FF] to-[#7CF5C8]">
                      <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-6">
                        <input
                          className="w-full bg-black text-white p-4 rounded-xl border border-white/15 focus:outline-none focus:border-[#4F8CFF] transition"
                          placeholder="yourname"
                          value={form.username}
                          onChange={(e) =>
                            setForm({ ...form, username: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="max-w-lg mx-auto">
                    <div className="rounded-2xl p-[1px] bg-gradient-to-r from-[#4F8CFF] via-[#C7B9FF] to-[#7CF5C8]">
                      <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-6">
                        <input
                          className="w-full bg-black text-white p-4 rounded-xl border border-white/15 focus:outline-none focus:border-[#4F8CFF] transition"
                          placeholder="City"
                          value={form.city}
                          onChange={(e) =>
                            setForm({ ...form, city: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="max-w-lg mx-auto">
                    <div className="rounded-2xl p-[1px] bg-gradient-to-r from-[#4F8CFF] via-[#C7B9FF] to-[#7CF5C8]">
                      <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-6 space-y-4">
                        <select
                          className="w-full bg-black text-white p-3 rounded-xl border border-white/15 focus:outline-none focus:border-[#C7B9FF] transition"
                          value={form.secondaryCode}
                          onChange={(e) =>
                            setForm({ ...form, secondaryCode: e.target.value })
                          }
                        >
                          <option value="">Secondary code (optional)</option>
                          {MYTHICAL_CODES.map((c) => (
                            <option key={c.key} value={c.key}>
                              {c.label}
                            </option>
                          ))}
                        </select>

                        <select
                          className="w-full bg-black text-white p-3 rounded-xl border border-white/15 focus:outline-none focus:border-[#7CF5C8] transition"
                          value={form.tertiaryCode}
                          onChange={(e) =>
                            setForm({ ...form, tertiaryCode: e.target.value })
                          }
                        >
                          <option value="">Tertiary code (optional)</option>
                          {MYTHICAL_CODES.map((c) => (
                            <option key={c.key} value={c.key}>
                              {c.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-4 max-w-lg mx-auto">
                {step > 1 && (
                  <button
                    onClick={() => setStep((s) => (s - 1) as StepId)}
                    className="flex-1 border border-white/20 rounded-xl p-4 hover:bg-white/5 transition flex items-center justify-center"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={next}
                  disabled={!valid || loading}
                  className="flex-1 bg-white text-black rounded-xl p-4 font-semibold flex items-center justify-center gap-2 hover:bg-white/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    "Loading..."
                  ) : step === 4 ? (
                    <>
                      Complete <ArrowRight className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      Continue <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Info */}
          <div className="flex items-center justify-center gap-2 text-xs text-white/40">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            This takes less than a minute
          </div>
        </div>
      </div>
    </div>
  );
}