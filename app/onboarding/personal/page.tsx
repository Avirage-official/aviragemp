"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";

const PERSONALITY_CODES = [
  { label: "Earthlistener", value: "khoisan" },
  { label: "Fireweaver", value: "kayori" },
  { label: "HorizonWalker", value: "sahen" },
  { label: "Shieldbearer", value: "enzuka" },
  { label: "Kitsune", value: "siyuane" },
  { label: "Harmonist", value: "jaejin" },
  { label: "Flowbinder", value: "namsea" },
  { label: "BladeSmith", value: "shokunin" },
  { label: "SkyRider", value: "khoruun" },
  { label: "StillMind", value: "lhumir" },
  { label: "CycleKeeper", value: "yatevar" },
  { label: "HeartBearer", value: "tahiri" },
  { label: "AncestorRoot", value: "karayni" },
  { label: "SonglineKeeper", value: "wohaka" },
  { label: "Dreampath Navigator", value: "tjukari" },
  { label: "TimeArchitect", value: "kinmora" },
  { label: "FrostSentinel", value: "siljoa" },
  { label: "FutureGuardian", value: "skenari" },
  { label: "TruthForger", value: "ashkara" },
  { label: "Seeker", value: "alethir" },
];

const STEP_IMAGES = [
  "/images/onboarding/personal-1.jpg",
  "/images/onboarding/personal-2.jpg",
  "/images/onboarding/personal-3.jpg",
  "/images/onboarding/personal-4.jpg",
];

export default function PersonalOnboardingPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    primaryCode: "",
    secondaryCode: "",
    tertiaryCode: "",
    username: "",
    city: "",
  });

  /* 🔒 Guard — unchanged */
  useEffect(() => {
    if (!isLoaded || !user) return;
    fetch(`/api/users/${user.id}/type`)
      .then((res) => res.ok && router.replace("/dashboard"))
      .catch(() => {});
  }, [isLoaded, user, router]);

  async function next() {
    if (step < 4) {
      setStep(step + 1);
      return;
    }

    setLoading(true);
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
      setLoading(false);
    }
  }

  const valid =
    (step === 1 && form.primaryCode) ||
    (step === 2 && form.username) ||
    (step === 3 && form.city) ||
    step === 4;

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#0B0D12] text-white">
      {/* LEFT — IMAGE */}
      <div className="hidden lg:block relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${STEP_IMAGES[step - 1]})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#4F8CFF]/30 via-transparent to-[#7CF5C8]/30" />
      </div>

      {/* RIGHT — INTERACTION */}
      <div className="flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-lg space-y-10">
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
              <h1 className="text-3xl font-bold">
                {step === 1 && "Choose your primary code"}
                {step === 2 && "Pick a username"}
                {step === 3 && "Where are you based?"}
                {step === 4 && "Refine your identity"}
              </h1>

              <p className="text-white/70">
                {step === 1 && "This guides how ETHOS aligns you with people and experiences."}
                {step === 2 && "Something personal — no pressure to be perfect."}
                {step === 3 && "Used for discovery and local context."}
                {step === 4 && "Optional, but adds nuance to your profile."}
              </p>

              {/* Card */}
              <div className="rounded-2xl p-[1px] bg-gradient-to-r from-[#4F8CFF] via-[#C7B9FF] to-[#7CF5C8]">
                <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-6 space-y-4">
                  {step === 1 && (
                    <select
                      className="w-full bg-black text-white p-4 rounded-xl border border-white/15"
                      value={form.primaryCode}
                      onChange={(e) =>
                        setForm({ ...form, primaryCode: e.target.value })
                      }
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
                      className="w-full bg-black text-white p-4 rounded-xl border border-white/15"
                      placeholder="yourname"
                      value={form.username}
                      onChange={(e) =>
                        setForm({ ...form, username: e.target.value })
                      }
                    />
                  )}

                  {step === 3 && (
                    <input
                      className="w-full bg-black text-white p-4 rounded-xl border border-white/15"
                      placeholder="City"
                      value={form.city}
                      onChange={(e) =>
                        setForm({ ...form, city: e.target.value })
                      }
                    />
                  )}

                  {step === 4 && (
                    <>
                      <select
                        className="w-full bg-black text-white p-3 rounded-xl border border-white/15"
                        value={form.secondaryCode}
                        onChange={(e) =>
                          setForm({ ...form, secondaryCode: e.target.value })
                        }
                      >
                        <option value="">Secondary code (optional)</option>
                        {PERSONALITY_CODES.map((c) => (
                          <option key={c.value} value={c.value}>
                            {c.label}
                          </option>
                        ))}
                      </select>

                      <select
                        className="w-full bg-black text-white p-3 rounded-xl border border-white/15"
                        value={form.tertiaryCode}
                        onChange={(e) =>
                          setForm({ ...form, tertiaryCode: e.target.value })
                        }
                      >
                        <option value="">Tertiary code (optional)</option>
                        {PERSONALITY_CODES.map((c) => (
                          <option key={c.value} value={c.value}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                    </>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="flex-1 border border-white/20 rounded-xl p-4"
                  >
                    <ArrowLeft />
                  </button>
                )}
                <button
                  onClick={next}
                  disabled={!valid || loading}
                  className="flex-1 bg-white text-black rounded-xl p-4 font-semibold flex items-center justify-center gap-2"
                >
                  {step === 4 ? "Finish" : "Continue"}
                  <ArrowRight />
                </button>
              </div>

              {step < 4 && (
                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <Sparkles className="w-4 h-4 text-[#7CF5C8]" />
                  This takes less than a minute
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}