// app/onboarding/personal/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { EmblemCarousel } from "@/components/emblems/EmblemCarousel";
import { MYTHICAL_CODES } from "@/lib/mythicalCodesData";
import { ArrowLeft, ArrowRight, Calendar, Clock, MapPin, Globe } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type StepId = 1 | 2 | 3 | 4 | 5;

/* -------------------------------------------------------------------------- */
/* COUNTRY DATA - ANZ & ASIA                                                  */
/* -------------------------------------------------------------------------- */

const COUNTRIES = [
  // ANZ
  { code: "AU", name: "Australia", region: "ANZ" },
  { code: "NZ", name: "New Zealand", region: "ANZ" },
  
  // East Asia
  { code: "JP", name: "Japan", region: "Asia" },
  { code: "KR", name: "South Korea", region: "Asia" },
  { code: "CN", name: "China", region: "Asia" },
  { code: "HK", name: "Hong Kong", region: "Asia" },
  { code: "TW", name: "Taiwan", region: "Asia" },
  { code: "MN", name: "Mongolia", region: "Asia" },
  
  // Southeast Asia
  { code: "SG", name: "Singapore", region: "Asia" },
  { code: "MY", name: "Malaysia", region: "Asia" },
  { code: "ID", name: "Indonesia", region: "Asia" },
  { code: "TH", name: "Thailand", region: "Asia" },
  { code: "VN", name: "Vietnam", region: "Asia" },
  { code: "PH", name: "Philippines", region: "Asia" },
  { code: "MM", name: "Myanmar", region: "Asia" },
  { code: "KH", name: "Cambodia", region: "Asia" },
  { code: "LA", name: "Laos", region: "Asia" },
  { code: "BN", name: "Brunei", region: "Asia" },
  { code: "TL", name: "Timor-Leste", region: "Asia" },
  
  // South Asia
  { code: "IN", name: "India", region: "Asia" },
  { code: "PK", name: "Pakistan", region: "Asia" },
  { code: "BD", name: "Bangladesh", region: "Asia" },
  { code: "LK", name: "Sri Lanka", region: "Asia" },
  { code: "NP", name: "Nepal", region: "Asia" },
  { code: "BT", name: "Bhutan", region: "Asia" },
  { code: "MV", name: "Maldives", region: "Asia" },
];

// Group by region for the dropdown
const GROUPED_COUNTRIES = {
  ANZ: COUNTRIES.filter(c => c.region === "ANZ"),
  Asia: COUNTRIES.filter(c => c.region === "Asia"),
};

/* -------------------------------------------------------------------------- */
/* PAGE                                                                       */
/* -------------------------------------------------------------------------- */

export default function PersonalOnboardingPage() {
  const { user } = useUser();
  const router = useRouter();

  const [step, setStep] = useState<StepId>(1);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    primaryCode: "",
    username: "",
    birthDate: "",
    birthTime: "",
    country: "",
    city: "",
    secondaryCode: "",
    tertiaryCode: "",
  });

  async function next() {
    if (step < 5) {
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
          country: form.country,
          birthDate: form.birthDate ? new Date(form.birthDate).toISOString() : null,
          birthTime: form.birthTime || null,
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

  function back() {
    if (step > 1) {
      setStep((s) => (s - 1) as StepId);
    }
  }

  const valid =
    (step === 1 && form.primaryCode) ||
    (step === 2 && form.username) ||
    (step === 3 && form.birthDate) || // birthTime is optional
    (step === 4 && form.country && form.city) ||
    step === 5;

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
            <span>Step {step} of 5</span>
            <span>Setting up your space</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#4F8CFF] via-[#C7B9FF] to-[#7CF5C8]"
              initial={{ width: "0%" }}
              animate={{ width: `${(step / 5) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
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
                {step === 3 && "When were you born?"}
                {step === 4 && "Where are you based?"}
                {step === 5 && "Refine your identity"}
              </h1>

              <p className="text-white/70 text-center max-w-2xl mx-auto">
                {step === 1 && "This guides how ETHOS aligns you with people and experiences."}
                {step === 2 && "Something personal — no pressure to be perfect."}
                {step === 3 && "We use this for your astrology & numerology profile."}
                {step === 4 && "Used for discovery and local context."}
                {step === 5 && "Optional, but adds nuance to your profile."}
              </p>

              {/* Step Content */}
              <div className="min-h-[500px]">
                {/* Step 1: Primary Code */}
                {step === 1 && (
                  <EmblemCarousel
                    codes={MYTHICAL_CODES}
                    selectedCode={form.primaryCode}
                    onSelect={(code) => setForm({ ...form, primaryCode: code })}
                  />
                )}

                {/* Step 2: Username */}
                {step === 2 && (
                  <div className="max-w-lg mx-auto">
                    <div className="rounded-2xl p-[1px] bg-gradient-to-r from-[#4F8CFF] via-[#C7B9FF] to-[#7CF5C8]">
                      <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-6">
                        <input
                          className="w-full bg-black text-white p-4 rounded-xl border border-white/15 focus:outline-none focus:border-[#4F8CFF] transition placeholder:text-white/40"
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

                {/* Step 3: Birth Date & Time */}
                {step === 3 && (
                  <div className="max-w-lg mx-auto space-y-4">
                    {/* Birth Date */}
                    <div className="rounded-2xl p-[1px] bg-gradient-to-r from-[#4F8CFF] via-[#C7B9FF] to-[#7CF5C8]">
                      <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-6">
                        <label className="flex items-center gap-2 text-sm text-white/60 mb-3">
                          <Calendar className="w-4 h-4" />
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          className="w-full bg-black text-white p-4 rounded-xl border border-white/15 focus:outline-none focus:border-[#4F8CFF] transition [color-scheme:dark]"
                          value={form.birthDate}
                          onChange={(e) =>
                            setForm({ ...form, birthDate: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    {/* Birth Time (Optional) */}
                    <div className="rounded-2xl p-[1px] bg-gradient-to-r from-[#C7B9FF]/50 via-[#4F8CFF]/50 to-[#7CF5C8]/50">
                      <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-6">
                        <label className="flex items-center gap-2 text-sm text-white/60 mb-3">
                          <Clock className="w-4 h-4" />
                          Time of Birth
                          <span className="text-white/40 text-xs">(optional — for rising sign)</span>
                        </label>
                        <input
                          type="time"
                          className="w-full bg-black text-white p-4 rounded-xl border border-white/15 focus:outline-none focus:border-[#C7B9FF] transition [color-scheme:dark]"
                          value={form.birthTime}
                          onChange={(e) =>
                            setForm({ ...form, birthTime: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <p className="text-center text-white/40 text-sm">
                      Don't know your birth time? No worries — you can add it later.
                    </p>
                  </div>
                )}

                {/* Step 4: Country & City */}
                {step === 4 && (
                  <div className="max-w-lg mx-auto space-y-4">
                    {/* Country Dropdown */}
                    <div className="rounded-2xl p-[1px] bg-gradient-to-r from-[#4F8CFF] via-[#C7B9FF] to-[#7CF5C8]">
                      <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-6">
                        <label className="flex items-center gap-2 text-sm text-white/60 mb-3">
                          <Globe className="w-4 h-4" />
                          Country
                        </label>
                        <select
                          className="w-full bg-black text-white p-4 rounded-xl border border-white/15 focus:outline-none focus:border-[#4F8CFF] transition appearance-none cursor-pointer"
                          value={form.country}
                          onChange={(e) =>
                            setForm({ ...form, country: e.target.value })
                          }
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 1rem center",
                            backgroundSize: "1.5rem",
                          }}
                        >
                          <option value="" className="bg-[#111827]">Select your country</option>
                          
                          <optgroup label="🌏 Australia & New Zealand" className="bg-[#111827]">
                            {GROUPED_COUNTRIES.ANZ.map((country) => (
                              <option key={country.code} value={country.code} className="bg-[#111827]">
                                {country.name}
                              </option>
                            ))}
                          </optgroup>
                          
                          <optgroup label="🌏 Asia" className="bg-[#111827]">
                            {GROUPED_COUNTRIES.Asia.map((country) => (
                              <option key={country.code} value={country.code} className="bg-[#111827]">
                                {country.name}
                              </option>
                            ))}
                          </optgroup>
                        </select>
                      </div>
                    </div>

                    {/* City Input */}
                    <div className="rounded-2xl p-[1px] bg-gradient-to-r from-[#7CF5C8]/50 via-[#4F8CFF]/50 to-[#C7B9FF]/50">
                      <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-6">
                        <label className="flex items-center gap-2 text-sm text-white/60 mb-3">
                          <MapPin className="w-4 h-4" />
                          City
                        </label>
                        <input
                          className="w-full bg-black text-white p-4 rounded-xl border border-white/15 focus:outline-none focus:border-[#7CF5C8] transition placeholder:text-white/40"
                          placeholder="Enter your city"
                          value={form.city}
                          onChange={(e) =>
                            setForm({ ...form, city: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5: Secondary & Tertiary Codes */}
                {step === 5 && (
                  <div className="max-w-lg mx-auto">
                    <div className="rounded-2xl p-[1px] bg-gradient-to-r from-[#4F8CFF] via-[#C7B9FF] to-[#7CF5C8]">
                      <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-6 space-y-4">
                        <select
                          className="w-full bg-black text-white p-4 rounded-xl border border-white/15 focus:outline-none focus:border-[#C7B9FF] transition appearance-none cursor-pointer"
                          value={form.secondaryCode}
                          onChange={(e) =>
                            setForm({ ...form, secondaryCode: e.target.value })
                          }
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 1rem center",
                            backgroundSize: "1.5rem",
                          }}
                        >
                          <option value="" className="bg-[#111827]">Secondary code (optional)</option>
                          {MYTHICAL_CODES.filter(c => c.key !== form.primaryCode).map((c) => (
                            <option key={c.key} value={c.key} className="bg-[#111827]">
                              {c.label}
                            </option>
                          ))}
                        </select>

                        <select
                          className="w-full bg-black text-white p-4 rounded-xl border border-white/15 focus:outline-none focus:border-[#7CF5C8] transition appearance-none cursor-pointer"
                          value={form.tertiaryCode}
                          onChange={(e) =>
                            setForm({ ...form, tertiaryCode: e.target.value })
                          }
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 1rem center",
                            backgroundSize: "1.5rem",
                          }}
                        >
                          <option value="" className="bg-[#111827]">Tertiary code (optional)</option>
                          {MYTHICAL_CODES.filter(c => c.key !== form.primaryCode && c.key !== form.secondaryCode).map((c) => (
                            <option key={c.key} value={c.key} className="bg-[#111827]">
                              {c.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-8">
                <button
                  onClick={back}
                  disabled={step === 1}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition ${
                    step === 1
                      ? "opacity-0 pointer-events-none"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <button
                  onClick={next}
                  disabled={!valid || loading}
                  className={`flex items-center gap-2 px-8 py-3 rounded-xl font-medium transition ${
                    valid && !loading
                      ? "bg-gradient-to-r from-[#4F8CFF] to-[#7CF5C8] text-white hover:shadow-lg hover:shadow-[#4F8CFF]/30 hover:scale-[1.02]"
                      : "bg-white/10 text-white/40 cursor-not-allowed"
                  }`}
                >
                  {loading ? (
                    <span className="animate-pulse">Creating profile...</span>
                  ) : step === 5 ? (
                    "Complete Setup"
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}