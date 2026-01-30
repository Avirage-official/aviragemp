"use client";

import { SignIn } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Sparkles, Users, Compass, MapPin, Shield, Heart } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Bright Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4F8CFF]/10 via-[#C7B9FF]/5 to-[#7CF5C8]/10" />
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-[#4F8CFF]/20 blur-3xl" />
        <div className="absolute top-40 right-20 h-80 w-80 rounded-full bg-[#C7B9FF]/20 blur-3xl" />
        <div className="absolute bottom-20 left-1/3 h-96 w-96 rounded-full bg-[#7CF5C8]/20 blur-3xl" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-7xl mx-auto">
          {/* Split Layout Container */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Hero Welcome & Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8 text-center lg:text-left"
            >
              {/* Hero Welcome */}
              <div className="space-y-6">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-xl border border-[#4F8CFF]/20 shadow-lg"
                >
                  <Sparkles className="w-4 h-4 text-[#4F8CFF]" />
                  <span className="text-sm font-semibold text-slate-800">
                    Personal Discovery Platform
                  </span>
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                >
                  <span className="text-slate-900">Welcome to Your</span>
                  <br />
                  <span className="bg-gradient-to-r from-[#4F8CFF] to-[#C7B9FF] bg-clip-text text-transparent">
                    Personal Discovery Journey
                  </span>
                </motion.h1>

                {/* Subtext */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0"
                >
                  Sign in to explore places that align with who you are and connect with a community that understands your unique journey.
                </motion.p>

                {/* Social Proof */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex items-center gap-3 justify-center lg:justify-start"
                >
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4F8CFF] to-[#C7B9FF] border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                      1K+
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C7B9FF] to-[#7CF5C8] border-2 border-white" />
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7CF5C8] to-[#4F8CFF] border-2 border-white" />
                  </div>
                  <p className="text-sm text-slate-600 font-medium">
                    Join thousands discovering their perfect environments
                  </p>
                </motion.div>
              </div>

              {/* Benefits Preview Cards */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4 max-w-2xl mx-auto lg:mx-0"
              >
                {[
                  {
                    icon: MapPin,
                    title: "Personalized Place Discovery",
                    description: "Find venues that match your energy"
                  },
                  {
                    icon: Users,
                    title: "Community Connections",
                    description: "Meet people who share your vibe"
                  },
                  {
                    icon: Heart,
                    title: "Wellness Insights",
                    description: "Understand what environments work for you"
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-2xl backdrop-blur-xl bg-white/60 border border-white/40 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#4F8CFF] to-[#C7B9FF] flex items-center justify-center shadow-lg">
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-bold text-slate-900 mb-1">{benefit.title}</h3>
                      <p className="text-sm text-slate-600">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - Sign In Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="w-full max-w-md">
                <SignIn
                  afterSignInUrl="/post-signin"
                  appearance={{
                    baseTheme: undefined,
                    elements: {
                      rootBox: "w-full",
                      card: "backdrop-blur-xl bg-white/90 border border-white/20 shadow-2xl rounded-3xl p-8",
                      headerTitle: "text-2xl font-bold bg-gradient-to-r from-[#4F8CFF] to-[#C7B9FF] bg-clip-text text-transparent",
                      headerSubtitle: "text-slate-600",
                      socialButtonsBlockButton: "border-2 border-slate-200 hover:border-[#4F8CFF]/30 bg-white hover:bg-slate-50 transition-all duration-300",
                      socialButtonsBlockButtonText: "text-slate-700 font-medium",
                      formButtonPrimary: "bg-gradient-to-r from-[#4F8CFF] to-[#C7B9FF] hover:shadow-lg hover:shadow-[#4F8CFF]/30 transition-all duration-300 hover:scale-105",
                      formFieldInput: "bg-white/80 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#4F8CFF] transition-all duration-300",
                      formFieldLabel: "text-slate-700 font-semibold",
                      footerActionLink: "text-[#4F8CFF] hover:text-[#C7B9FF] transition-colors font-semibold",
                      identityPreviewText: "text-slate-900",
                      formFieldInputShowPasswordButton: "text-slate-500 hover:text-slate-700",
                      otpCodeFieldInput: "bg-white/80 border-slate-200 text-slate-900",
                      formResendCodeLink: "text-[#4F8CFF] hover:text-[#C7B9FF]",
                      footerAction: "bg-slate-50/80 border-t border-slate-200/50 rounded-b-3xl",
                      footerActionText: "text-slate-600"
                    }
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 pt-8 border-t border-slate-200/50 text-center"
          >
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600">
              <Link href="/privacy" className="hover:text-[#4F8CFF] transition-colors flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                Privacy Policy
              </Link>
              <span className="text-slate-300">•</span>
              <Link href="/terms" className="hover:text-[#4F8CFF] transition-colors">
                Terms of Service
              </Link>
              <span className="text-slate-300">•</span>
              <Link href="/help" className="hover:text-[#4F8CFF] transition-colors">
                Help Center
              </Link>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              © 2026 ETHOS. Discover places that align with who you are.
            </p>
          </motion.footer>
        </div>
      </div>
    </div>
  );
}