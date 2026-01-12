"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Users, Compass, Heart } from "lucide-react";

export default function HomePage() {
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  
  // Parallax effect
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
  async function checkUser() {
    if (!user) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/users/${user.id}`);
      const data = await response.json();

      // If user doesn't exist in DB yet, go to onboarding
      if (!data.user) {
        router.push("/onboarding");
        return;
      }

      // If no personality code, go to onboarding
      if (!data.user.primaryCode) {
        router.push("/onboarding");
        return;
      }

      // User exists and has code, route to dashboard
      if (data.user.type === "BUSINESS") {
        router.push("/business/dashboard");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error checking user:", error);
      // On error, send to onboarding to be safe
      router.push("/onboarding");
    }
  }

  checkUser();
}, [user, router]);

  if (isLoading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with Background Image */}
      <section className="relative h-screen overflow-hidden">
        {/* Parallax Background Image */}
        <motion.div 
          style={{ y }}
          className="absolute inset-0 w-full h-[120vh]"
        >
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: 'url(/images/backgrounds/Landing-page-background.jpg)',
            }}
          />
          {/* Dark Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
        </motion.div>

        {/* Hero Content */}
        <motion.div 
          style={{ opacity }}
          className="relative z-10 h-full flex items-center justify-center px-6"
        >
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Fade in animations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-white">Discover Your Mythical Code</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white"
            >
              Find your tribe.
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Live authentically.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            >
              Connect with personality-matched experiences, discover your people, and explore a marketplace built around who you truly are.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Link
                href="/sign-up"
                className="group px-8 py-4 bg-white text-black rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-2xl hover:shadow-white/20 hover:scale-105"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/sign-in"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-xl font-semibold transition-all duration-300 border border-white/20"
              >
                Sign In
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-sm text-gray-400 pt-4"
            >
              Join thousands discovering their authentic path
            </motion.p>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-gray-400 uppercase tracking-wider">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
            >
              <div className="w-1 h-2 bg-white/60 rounded-full"></div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Your journey starts here
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Three simple steps to discover your authentic self
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative card hover:scale-[1.02] transition-all duration-300 h-full">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-white">Find Your Code</h3>
                <p className="text-gray-400 leading-relaxed">
                  Discover your personality archetype through our unique assessment system
                </p>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative card hover:scale-[1.02] transition-all duration-300 h-full">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-6">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-white">Connect with Friends</h3>
                <p className="text-gray-400 leading-relaxed">
                  Build meaningful connections with compatible personalities
                </p>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-blue-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative card hover:scale-[1.02] transition-all duration-300 h-full">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mb-6">
                  <Compass className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-white">Matched Experiences</h3>
                <p className="text-gray-400 leading-relaxed">
                  Explore curated offerings aligned with your unique code
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-black to-blue-950/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Heart className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to discover your path?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join our community and start your journey today
            </p>
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-10 py-5 bg-white text-black rounded-xl font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6 bg-black">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          <p>© 2026 ETHOS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}