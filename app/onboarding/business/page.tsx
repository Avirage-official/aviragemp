"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { AnimatedBackdrop } from "@/components/ui/AnimatedBackdrop";
import { Building2, Sparkles } from "lucide-react";

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

export default function BusinessOnboardingPage() {
  const { user } = useUser();
  const router = useRouter();
  const [formData, setFormData] = useState({
    businessName: "",
    description: "",
    category: "",
    contactEmail: user?.emailAddresses[0]?.emailAddress || "",
    contactPhone: "",
    website: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
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

  return (
    <>
      <AnimatedBackdrop />
      
      <div className="min-h-screen flex items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl w-full"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 mb-6"
            >
              <Building2 className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">Business Account</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Tell us about your business
            </h1>
            <p className="text-xl text-gray-400">
              Start your 7-day free trial • No credit card required
            </p>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="card p-8 space-y-6"
          >
            {/* Business Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Business Name *
              </label>
              <input
                type="text"
                required
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="input w-full"
                placeholder="Your Business Inc."
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="textarea w-full min-h-[120px]"
                placeholder="Tell us about your business and what you offer..."
              />
              <p className="text-xs text-gray-500 mt-2">
                This will appear on your business profile
              </p>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 rounded-lg focus:border-purple-500 focus:outline-none transition-all duration-200 appearance-none cursor-pointer hover:bg-white/10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23ffffff' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  paddingRight: '3rem'
                }}
              >
                <option value="" disabled className="bg-zinc-900 text-gray-400">Select your industry</option>
                {CATEGORIES.map(cat => (
                  <option key={cat.value} value={cat.value} className="bg-zinc-900 text-white py-2">
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Two Column Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Contact Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Contact Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="input w-full"
                  placeholder="hello@business.com"
                />
              </div>

              {/* Contact Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  className="input w-full"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="input w-full"
                placeholder="https://yourbusiness.com"
              />
            </div>

            {/* Trial Info Box */}
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-purple-400 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-purple-300 mb-1">
                    7-Day Free Trial Included
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Full access to all features • No credit card required • Cancel anytime • $99/month after trial
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/20"
            >
              {isLoading ? "Creating your business profile..." : "Start Free Trial"}
            </button>

            {/* Terms */}
            <p className="text-xs text-center text-gray-500">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </motion.form>
        </motion.div>
      </div>
    </>
  );
}