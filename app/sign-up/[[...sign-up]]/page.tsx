"use client";

import { SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Sparkles, Users, Compass, MapPin, Shield, Heart } from "lucide-react";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Bright, Luxurious Travel-Themed Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#87CEEB] via-[#FFF8DC] to-[#FFB347]" />
      
      {/* Subtle Marketplace Color Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4F8CFF]/10 via-[#C7B9FF]/5 to-[#7CF5C8]/10" />
      
      {/* Background Decorative Elements for Premium Feel */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-[#4F8CFF]/20 blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 h-80 w-80 rounded-full bg-[#C7B9FF]/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/3 h-96 w-96 rounded-full bg-[#7CF5C8]/20 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12 sm:py-16 lg:py-20">
        <div className="w-full max-w-7xl mx-auto">
          {/* Split Layout Container - Royal Caribbean Style */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
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
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/95 backdrop-blur-xl border-2 border-[#FF6B35]/30 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Sparkles className="w-4 h-4 text-[#FF6B35]" />
                  <span className="text-sm font-semibold text-[#0F172A]">
                    Join the Discovery Community
                  </span>
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                >
                  <span className="text-[#0F172A]">Join Your</span>
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
                  className="text-lg md:text-xl text-[#334155] leading-relaxed max-w-xl mx-auto lg:mx-0"
                >
                  Create your account to explore places that align with who you are
                </motion.p>

                {/* Social Proof */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex items-center gap-3 justify-center lg:justify-start"
                >
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#006994] to-[#4F8CFF] border-2 border-white shadow-md flex items-center justify-center text-white text-xs font-bold">
                      1K+
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4F8CFF] to-[#C7B9FF] border-2 border-white shadow-md" />
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C7B9FF] to-[#7CF5C8] border-2 border-white shadow-md" />
                  </div>
                  <p className="text-sm text-[#475569] font-medium">
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
                    description: "Find venues that match your energy",
                    gradient: "from-[#006994] to-[#4F8CFF]"
                  },
                  {
                    icon: Users,
                    title: "Community Connections",
                    description: "Meet people who share your vibe",
                    gradient: "from-[#4F8CFF] to-[#C7B9FF]"
                  },
                  {
                    icon: Heart,
                    title: "Wellness Insights",
                    description: "Understand what environments work for you",
                    gradient: "from-[#C7B9FF] to-[#7CF5C8]"
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="flex items-start gap-4 p-5 rounded-2xl backdrop-blur-xl bg-white/70 border border-white/60 shadow-xl hover:shadow-2xl transition-all cursor-pointer"
                  >
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center shadow-lg`}>
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-bold text-[#0F172A] mb-1">{benefit.title}</h3>
                      <p className="text-sm text-[#475569]">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - Sign Up Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="w-full max-w-md">
                <SignUp
                  afterSignUpUrl="/post-signin"
                  appearance={{
                    baseTheme: undefined,
                    variables: {
                      colorPrimary: '#006994',
                      colorBackground: '#FFFFFF',
                      colorInputBackground: '#FFFFFF',
                      colorText: '#0F172A',
                      borderRadius: '16px',
                    },
                    elements: {
                      rootBox: "w-full",
                      card: "backdrop-blur-xl bg-white/95 border-2 border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.15)] rounded-3xl p-8 hover:shadow-[0_25px_70px_rgba(0,0,0,0.2)] transition-shadow duration-500",
                      headerTitle: "text-2xl font-bold bg-gradient-to-r from-[#006994] via-[#4F8CFF] to-[#C7B9FF] bg-clip-text text-transparent",
                      headerSubtitle: "text-[#475569]",
                      socialButtonsBlockButton: "border-2 border-[#E2E8F0] hover:border-[#006994]/40 bg-white hover:bg-[#F8FAFC] transition-all duration-300 shadow-sm hover:shadow-md",
                      socialButtonsBlockButtonText: "text-[#334155] font-semibold",
                      formButtonPrimary: "bg-gradient-to-r from-[#006994] to-[#4F8CFF] hover:from-[#005580] hover:to-[#3d7ae6] shadow-lg hover:shadow-xl hover:shadow-[#006994]/30 transition-all duration-300 hover:scale-105 font-semibold",
                      formFieldInput: "bg-white/90 border-2 border-[#E2E8F0] text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#006994] focus:ring-2 focus:ring-[#006994]/20 transition-all duration-300",
                      formFieldLabel: "text-[#334155] font-semibold",
                      footerActionLink: "text-[#006994] hover:text-[#4F8CFF] transition-colors font-semibold",
                      identityPreviewText: "text-[#0F172A]",
                      formFieldInputShowPasswordButton: "text-[#64748B] hover:text-[#334155]",
                      otpCodeFieldInput: "bg-white/90 border-2 border-[#E2E8F0] text-[#0F172A]",
                      formResendCodeLink: "text-[#006994] hover:text-[#4F8CFF]",
                      footerAction: "bg-[#F8FAFC]/80 border-t-2 border-[#E2E8F0]/50 rounded-b-3xl",
                      footerActionText: "text-[#475569]"
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
            className="mt-16 pt-8 border-t-2 border-white/40 text-center"
          >
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#475569]">
              <Link href="/privacy" className="hover:text-[#006994] transition-colors flex items-center gap-1.5 font-medium">
                <Shield className="w-4 h-4" />
                Privacy Policy
              </Link>
              <span className="text-[#CBD5E1]">•</span>
              <Link href="/terms" className="hover:text-[#006994] transition-colors font-medium">
                Terms of Service
              </Link>
              <span className="text-[#CBD5E1]">•</span>
              <Link href="/help" className="hover:text-[#006994] transition-colors font-medium">
                Help Center
              </Link>
            </div>
            <p className="text-xs text-[#64748B] mt-4">
              © 2026 ETHOS. Discover places that align with who you are.
            </p>
          </motion.footer>
        </div>
      </div>
    </div>
  );
}