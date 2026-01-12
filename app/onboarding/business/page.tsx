"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedBackdrop } from "@/components/ui/AnimatedBackdrop";
import { ArrowRight, ArrowLeft, Building2, Target, Users, TrendingUp } from "lucide-react";

const CATEGORIES = [
  { value: "coaching", label: "Coaching & Consulting" },
  { value: "wellness", label: "Wellness & Spa" },
  { value: "retreat", label: "Retreats & Workshops" },
  { value: "creative", label: "Creative Services" },
  { value: "hospitality", label: "Hospitality & Travel" },
  { value: "fitness", label: "Fitness & Training" },
  { value: "education", label: "Education & Learning" },
  { value: "other", label: "Other" }
];

const STEP_INFO = {
  1: {
    title: "What's your business name?",
    subtitle: "This is how customers will find you",
    info: "Your business name builds trust and recognition. Make it memorable.",
    icon: Building2
  },
  2: {
    title: "Tell us about your business",
    subtitle: "What makes you unique?",
    info: "A clear description helps personality-matched customers understand if you're right for them. The more specific, the better.",
    icon: Target
  },
  3: {
    title: "What industry are you in?",
    subtitle: "Help us categorize your offerings",
    info: "Categorization improves discoverability. Customers can filter by industry to find exactly what they need.",
    icon: Users
  },
  4: {
    title: "How can customers reach you?",
    subtitle: "Contact details for inquiries",
    info: "Direct communication builds trust. Customers prefer businesses that are easy to contact.",
    icon: TrendingUp
  }
};

export default function BusinessOnboardingPage() {
  const { user } = useUser();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    description: "",
    category: "",
    contactEmail: user?.emailAddresses[0]?.emailAddress || "",
    contactPhone: "",
    website: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  async function handleNext() {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setIsLoading(true);
      try {
        const response = await fetch("/api/businesses/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user?.id,
            ...formData
          })
        });

        if (response.ok) {
          router.push("/business/dashboard");
        } else {
          alert("Error creating business profile. Please try again.");
        }
      } catch (error) {
        console.error("Business onboarding error:", error);
        alert("An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  }

  function handleBack() {
    if (step > 1) setStep(step - 1);
  }

  const isValid = 
    (step === 1 && formData.businessName.length > 0) ||
    (step === 2 && formData.description.length > 0) ||
    (step === 3 && formData.category.length > 0) ||
    (step === 4 && formData.contactEmail.length > 0);

  const Icon = STEP_INFO[step as keyof typeof STEP_INFO].icon;

  return (
    <>
      <AnimatedBackdrop />
      
      <div className="min-h-screen flex items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full"
        >
          {/* Progress */}
          <div className="mb-12">
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                    i <= step ? "bg-purple-500" : "bg-white/10"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500">Step {step} of 4</p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Header with Icon */}
              <div className="flex items-start gap-4 mb-8">
                <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-7 h-7 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {STEP_INFO[step as keyof typeof STEP_INFO].title}
                  </h1>
                  <p className="text-lg text-gray-400">
                    {STEP_INFO[step as keyof typeof STEP_INFO].subtitle}
                  </p>
                </div>
              </div>

              {/* Educational Info */}
              <div className="bg-purple-500/5 border border-purple-500/10 rounded-xl p-4">
                <p className="text-sm text-gray-400 leading-relaxed">
                  💡 {STEP_INFO[step as keyof typeof STEP_INFO].info}
                </p>
              </div>

              {/* Input */}
              <div className="card p-8">
                {step === 1 && (
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full bg-white/5 border border-white/20 text-white px-6 py-4 rounded-xl text-lg focus:border-purple-500 focus:outline-none transition-all"
                    placeholder="Your Business Inc."
                    autoFocus
                  />
                )}

                {step === 2 && (
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-white/5 border border-white/20 text-white px-6 py-4 rounded-xl text-lg focus:border-purple-500 focus:outline-none transition-all min-h-[150px] resize-none"
                    placeholder="Describe what makes your business special..."
                    autoFocus
                  />
                )}

                {step === 3 && (
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-white/5 border border-white/20 text-white px-6 py-4 rounded-xl text-lg focus:border-purple-500 focus:outline-none transition-all appearance-none cursor-pointer hover:bg-white/10"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23ffffff' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1.5rem center',
                      paddingRight: '4rem'
                    }}
                  >
                    <option value="" className="bg-zinc-900 text-gray-400">Select your industry</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat.value} value={cat.value} className="bg-zinc-900 text-white py-2">
                        {cat.label}
                      </option>
                    ))}
                  </select>
                )}

                {step === 4 && (
                  <div className="space-y-4">
                    <input
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      className="w-full bg-white/5 border border-white/20 text-white px-6 py-4 rounded-xl text-lg focus:border-purple-500 focus:outline-none transition-all"
                      placeholder="hello@business.com"
                    />
                    <input
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      className="w-full bg-white/5 border border-white/20 text-white px-6 py-4 rounded-xl text-lg focus:border-purple-500 focus:outline-none transition-all"
                      placeholder="+1 (555) 000-0000 (optional)"
                    />
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full bg-white/5 border border-white/20 text-white px-6 py-4 rounded-xl text-lg focus:border-purple-500 focus:outline-none transition-all"
                      placeholder="https://yourbusiness.com (optional)"
                    />
                  </div>
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
                  className="flex-1 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-purple-500/20"
                >
                  {step === 4 ? (isLoading ? "Creating..." : "Start Free Trial") : "Continue"}
                  {step < 4 && <ArrowRight className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}