"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { AnimatedBackdrop } from "@/components/ui/AnimatedBackdrop";
import { Sparkles } from "lucide-react";

const PERSONALITY_CODES = [
  "khoisan", "kayori", "sahen", "enzuka", "siyuane", "jaejin", "namsea",
  "shokunin", "khoruun", "lhumir", "yatevar", "tahiri", "karayni", "wohaka",
  "tjukari", "kinmora", "siljoa", "skenari", "ashkara", "alethir"
];

export default function PersonalOnboardingPage() {
  const { user } = useUser();
  const router = useRouter();
  const [formData, setFormData] = useState({
    primaryCode: "",
    username: "",
    city: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
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
        router.push("/dashboard");
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

  return (
    <>
      <AnimatedBackdrop />
      
      <div className="min-h-screen flex items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl w-full"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-gray-300">Almost there</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Complete your profile
            </h1>
            <p className="text-xl text-gray-400">
              Tell us a bit about yourself
            </p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="card p-8 space-y-6"
          >
            {/* Personality Code */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Mythical Code *
              </label>
              <select
  required
  value={formData.primaryCode}
  onChange={(e) => setFormData({ ...formData, primaryCode: e.target.value })}
  className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 rounded-lg focus:border-blue-500 focus:outline-none transition-all duration-200 appearance-none cursor-pointer hover:bg-white/10"
  style={{
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23ffffff' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 1rem center',
    paddingRight: '3rem'
  }}
>
  <option value="" disabled className="bg-zinc-900 text-gray-400">Select your code</option>
  {PERSONALITY_CODES.map(code => (
    <option key={code} value={code} className="bg-zinc-900 text-white py-2">
      {code}
    </option>
  ))}
</select>
              <p className="text-xs text-gray-500 mt-2">
                Don't know your code?{" "}
                <a href="https://myethoslens.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                  Take the quiz →
                </a>
              </p>
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Username *
              </label>
              <input
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="input w-full"
                placeholder="johndoe"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                City *
              </label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="input w-full"
                placeholder="San Francisco"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating your profile..." : "Continue to Dashboard"}
            </button>
          </motion.form>
        </motion.div>
      </div>
    </>
  );
}