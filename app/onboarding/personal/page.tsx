"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedBackdrop } from "@/components/ui/AnimatedBackdrop";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";

const PERSONALITY_CODES = [
  "khoisan", "kayori", "sahen", "enzuka", "siyuane", "jaejin", "namsea",
  "shokunin", "khoruun", "lhumir", "yatevar", "tahiri", "karayni", "wohaka",
  "tjukari", "kinmora", "siljoa", "skenari", "ashkara", "alethir"
];

const STEP_COPY = {
  1: {
    title: "What's your Mythical Code?",
    subtitle: "This is kind of important. Like, really important.",
    placeholder: "Select your code",
    successMessage: "Nice choice. You seem interesting already."
  },
  2: {
    title: "Pick a username",
    subtitle: "Make it memorable. Or don't, we're not judging.",
    placeholder: "coolperson123",
    successMessage: "Classic. We love it."
  },
  3: {
    title: "Where are you based?",
    subtitle: "So we can connect you with people nearby. We're not creepy, promise.",
    placeholder: "San Francisco",
    successMessage: "Great city. Or town. Or village. Whatever."
  }
};

export default function PersonalOnboardingPage() {
  const { user } = useUser();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    primaryCode: "",
    username: "",
    city: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  async function handleNext() {
    if (step < 3) {
      // Show success message
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setStep(step + 1);
      }, 1500);
    } else {
      // Final submission
      setIsLoading(true);
      try {
        const response = await fetch("/api/users/onboard", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clerkId: user?.id,
            email: user?.emailAddresses[0]?.emailAddress,
            name: formData.username,
            primaryCode: formData.primaryCode,
            city: formData.city,
            type: "CONSUMER"
          })
        });

        if (response.ok) {
          setShowSuccess(true);
          setTimeout(() => router.push("/dashboard"), 1500);
        } else {
          alert("Error creating profile. Please try again.");
        }
      } catch (error) {
        console.error("Onboarding error:", error);
        alert("An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  }

  function handleBack() {
    if (step > 1) setStep(step - 1);
  }

  const currentValue = step === 1 ? formData.primaryCode : step === 2 ? formData.username : formData.city;
  const isValid = currentValue.length > 0;

  return (
    <>
      <AnimatedBackdrop />
      
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full"
        >
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex gap-2 mb-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                    i <= step ? "bg-blue-500" : "bg-white/10"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500">Step {step} of 3</p>
          </div>

          <AnimatePresence mode="wait">
            {!showSuccess ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Question */}
                <div className="text-center mb-12">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {STEP_COPY[step as keyof typeof STEP_COPY].title}
                  </h1>
                  <p className="text-xl text-gray-400">
                    {STEP_COPY[step as keyof typeof STEP_COPY].subtitle}
                  </p>
                </div>

                {/* Input */}
                <div className="card p-8">
                  {step === 1 ? (
                    // Dropdown for code
                    <select
                      value={formData.primaryCode}
                      onChange={(e) => setFormData({ ...formData, primaryCode: e.target.value })}
                      className="w-full bg-white/5 border border-white/20 text-white px-6 py-4 rounded-xl text-lg focus:border-blue-500 focus:outline-none transition-all appearance-none cursor-pointer hover:bg-white/10"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23ffffff' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1.5rem center',
                        paddingRight: '4rem'
                      }}
                    >
                      <option value="" className="bg-zinc-900 text-gray-400">
                        {STEP_COPY[step as keyof typeof STEP_COPY].placeholder}
                      </option>
                      {PERSONALITY_CODES.map(code => (
                        <option key={code} value={code} className="bg-zinc-900 text-white py-2">
                          {code}
                        </option>
                      ))}
                    </select>
                  ) : (
                    // Text input for username/city
                    <input
                      type="text"
                      value={currentValue as string}
                      onChange={(e) => {
                        if (step === 2) {
                          setFormData({ ...formData, username: e.target.value });
                        } else {
                          setFormData({ ...formData, city: e.target.value });
                        }
                      }}
                      className="w-full bg-white/5 border border-white/20 text-white px-6 py-4 rounded-xl text-lg focus:border-blue-500 focus:outline-none transition-all"
                      placeholder={STEP_COPY[step as keyof typeof STEP_COPY].placeholder}
                      autoFocus
                    />
                  )}
                  
                  {step === 1 && (
                    <p className="text-sm text-gray-500 mt-4">
                      Don't know your code?{" "}
                      <a href="https://myethoslens.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                        Take the quiz →
                      </a>
                    </p>
                  )}
                </div>

                {/* Navigation */}
                <div className="flex gap-4">
                  {step > 1 && (
                    <button
                      onClick={handleBack}
                      className="flex-1 btn-ghost py-4 flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Back
                    </button>
                  )}
                  <button
                    onClick={handleNext}
                    disabled={!isValid || isLoading}
                    className="flex-1 btn-primary py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {step === 3 ? (isLoading ? "Creating..." : "Finish") : "Continue"}
                    {step < 3 && <ArrowRight className="w-5 h-5" />}
                  </button>
                </div>
              </motion.div>
            ) : (
              // Success Message
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10 text-green-400" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">
                  {step === 3 ? "You're all set!" : STEP_COPY[step as keyof typeof STEP_COPY].successMessage}
                </h2>
                <p className="text-gray-400">
                  {step === 3 ? "Welcome to ETHOS. Let's go." : "Moving on..."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}