"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Building2, ArrowRight, Shield, Zap, Users } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();

  function handleAccountTypeSelect(type: "personal" | "business") {
    if (type === "business") {
      router.push("/onboarding/business");
    } else {
      router.push("/onboarding/personal");
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-black">
      {/* Left Side - Image */}
      <div className="hidden lg:block relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/onboarding/account-selection.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
      </div>

      {/* Right Side - Content */}
      <div className="flex items-center justify-center px-6 py-20 relative">
        {/* Subtle gradient background for right side */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950 -z-10"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl w-full"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
            >
              Welcome to ETHOS
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-gray-400"
            >
              Join thousands using personality insights to build better connections
            </motion.p>
          </div>

          {/* Trust Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center gap-8 mb-16"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">10K+</div>
              <div className="text-xs text-gray-500">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">500+</div>
              <div className="text-xs text-gray-500">Businesses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">50K+</div>
              <div className="text-xs text-gray-500">Connections</div>
            </div>
          </motion.div>

          {/* Account Cards */}
          <div className="space-y-4">
            {/* Personal Account */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              onClick={() => handleAccountTypeSelect("personal")}
              className="group w-full text-left bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-2">Personal</h3>
              <p className="text-gray-400 mb-4 text-sm">
                Connect with like-minded people and discover experiences
              </p>
              
              <div className="flex gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Matching
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  Community
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  Experiences
                </span>
              </div>
            </motion.button>

            {/* Business Account */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              onClick={() => handleAccountTypeSelect("business")}
              className="group w-full text-left bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-2">Business</h3>
              <p className="text-gray-400 mb-4 text-sm">
                Reach your ideal customers through personality-driven marketing
              </p>
              
              <div className="flex gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Listings
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  Insights
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  Analytics
                </span>
              </div>
            </motion.button>
          </div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12 text-sm text-gray-600"
          >
            Trusted by leading brands and individuals worldwide
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}