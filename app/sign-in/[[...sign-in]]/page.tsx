"use client";

import { SignIn } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function SignInPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0"
      >
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/backgrounds/signin-signupbcg.jpg)' }}
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      </motion.div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Sign In Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10"
      >
        <SignIn
        afterSignInUrl="/post-signin"
        appearance={{
          baseTheme: undefined,
          elements: {
              rootBox: "mx-auto",
              card: "bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl",
              headerTitle: "text-white text-2xl",
              headerSubtitle: "text-gray-300",
              socialButtonsBlockButton: "bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300",
              socialButtonsBlockButtonText: "text-white font-medium",
              formButtonPrimary: "bg-blue-600 hover:bg-blue-500 transition-all duration-300 shadow-lg shadow-blue-500/20",
              formFieldInput: "bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-blue-500 transition-all duration-300",
              formFieldLabel: "text-gray-300 font-medium",
              footerActionLink: "text-blue-400 hover:text-blue-300 transition-colors",
              identityPreviewText: "text-white",
              formFieldInputShowPasswordButton: "text-gray-400 hover:text-white",
              otpCodeFieldInput: "bg-white/5 border-white/20 text-white",
              formResendCodeLink: "text-blue-400 hover:text-blue-300",
              footerAction: "bg-white/5 border-t border-white/10",
              footerActionText: "text-gray-400"
            }
          }}
        />
      </motion.div>
    </div>
  );
}