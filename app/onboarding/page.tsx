"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Sparkles, Building2, ArrowRight } from "lucide-react";
import { AnimatedBackdrop } from "@/components/ui/AnimatedBackdrop";

export default function OnboardingPage() {
  const { user } = useUser();
  const router = useRouter();
  const [accountType, setAccountType] = useState<"personal" | "business" | null>(null);

  function handleAccountTypeSelect(type: "personal" | "business") {
    setAccountType(type);
    
    if (type === "business") {
      router.push("/onboarding/business");
    } else {
      // For personal, we need to show the personality code entry
      // Let's create that next
      router.push("/onboarding/personal");
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
          className="max-w-5xl w-full"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-gray-300">Welcome to ETHOS</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Choose your account type
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-400"
            >
              Let's get you set up in just a few steps
            </motion.p>
          </div>

          {/* Account Type Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Personal Account */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              onClick={() => handleAccountTypeSelect("personal")}
              className="group relative text-left"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Card */}
              <div className="relative card p-8 hover:scale-[1.02] transition-all duration-300 h-full border-2 border-transparent hover:border-blue-500/30">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3">Personal Account</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Discover your code, connect with friends, and explore matched experiences
                </p>
                
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-blue-400 text-xs">✓</span>
                    </div>
                    <span className="text-sm">Personality assessment</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-blue-400 text-xs">✓</span>
                    </div>
                    <span className="text-sm">Friend connections</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-blue-400 text-xs">✓</span>
                    </div>
                    <span className="text-sm">Marketplace access</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-blue-400 text-xs">✓</span>
                    </div>
                    <span className="text-sm">Meetup coordination</span>
                  </li>
                </ul>
              </div>
            </motion.button>

            {/* Business Account */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              onClick={() => handleAccountTypeSelect("business")}
              className="group relative text-left"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Card */}
              <div className="relative card p-8 hover:scale-[1.02] transition-all duration-300 h-full border-2 border-transparent hover:border-purple-500/30">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3">Business Account</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Reach customers through personality-matched marketing
                </p>
                
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <span className="text-purple-400 text-xs">✓</span>
                    </div>
                    <span className="text-sm">Create listings</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <span className="text-purple-400 text-xs">✓</span>
                    </div>
                    <span className="text-sm">Target by personality</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <span className="text-purple-400 text-xs">✓</span>
                    </div>
                    <span className="text-sm">Manage inquiries</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <span className="text-purple-400 text-xs">✓</span>
                    </div>
                    <span className="text-sm">7-day free trial</span>
                  </li>
                </ul>
                
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-sm text-purple-400 font-semibold">$99/month after trial</p>
                </div>
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </>
  );
}