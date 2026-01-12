"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { User, Building2, ArrowRight, Shield, Zap, Users } from "lucide-react";
import { AnimatedBackdrop } from "@/components/ui/AnimatedBackdrop";

export default function OnboardingPage() {
  const { user } = useUser();
  const router = useRouter();

  function handleAccountTypeSelect(type: "personal" | "business") {
    if (type === "business") {
      router.push("/onboarding/business");
    } else {
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
          className="max-w-6xl w-full"
        >
          {/* Header - More Confident */}
          <div className="text-center mb-20">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight"
            >
              Welcome to ETHOS
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto"
            >
              Join thousands using personality insights to build better connections
            </motion.p>
          </div>

          {/* Trust Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center gap-12 mb-20"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">10K+</div>
              <div className="text-sm text-gray-500">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">500+</div>
              <div className="text-sm text-gray-500">Businesses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">50K+</div>
              <div className="text-sm text-gray-500">Connections Made</div>
            </div>
          </motion.div>

          {/* Account Cards - Clean & Professional */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Personal Account */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              onClick={() => handleAccountTypeSelect("personal")}
              className="group relative text-left bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-10 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center">
                  <User className="w-7 h-7 text-white" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
              
              <h3 className="text-2xl font-semibold text-white mb-3">Personal</h3>
              <p className="text-gray-400 mb-8 text-base leading-relaxed">
                Connect with like-minded people and discover experiences that match your personality
              </p>
              
              <div className="space-y-3 pt-6 border-t border-white/5">
                <div className="flex items-center gap-3 text-gray-300 text-sm">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span>Personality matching</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 text-sm">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span>Community access</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 text-sm">
                  <Zap className="w-4 h-4 text-blue-400" />
                  <span>Curated experiences</span>
                </div>
              </div>
            </motion.button>

            {/* Business Account */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              onClick={() => handleAccountTypeSelect("business")}
              className="group relative text-left bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-10 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
              
              <h3 className="text-2xl font-semibold text-white mb-3">Business</h3>
              <p className="text-gray-400 mb-8 text-base leading-relaxed">
                Reach your ideal customers through personality-driven marketing and listings
              </p>
              
              <div className="space-y-3 pt-6 border-t border-white/5">
                <div className="flex items-center gap-3 text-gray-300 text-sm">
                  <Shield className="w-4 h-4 text-purple-400" />
                  <span>Targeted listings</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 text-sm">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span>Customer insights</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 text-sm">
                  <Zap className="w-4 h-4 text-purple-400" />
                  <span>Analytics dashboard</span>
                </div>
              </div>
            </motion.button>
          </div>

          {/* Trust Badge Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16 text-sm text-gray-500"
          >
            Trusted by leading brands and individuals worldwide
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}