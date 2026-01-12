"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Users, Compass } from "lucide-react";

export default function HomePage() {
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/users/${user.id}`);
        const data = await response.json();

        if (!data.user?.primaryCode) {
          router.push("/onboarding");
          return;
        }

        if (data.user.type === "BUSINESS") {
          router.push("/business/dashboard");
        } else {
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error checking user:", error);
        setIsLoading(false);
      }
    }

    checkUser();
  }, [user, router]);

  if (isLoading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Floating gradient orb background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
          
          <div className="text-center space-y-8">
            {/* Kicker */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-gray-300">Discover Your Mythical Code</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Find your tribe.
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Live authentically.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Connect with personality-matched experiences, discover your people, and explore a marketplace built around who you truly are.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/sign-up"
                className="group px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg shadow-blue-500/20"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/sign-in"
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-all duration-200 border border-white/10"
              >
                Sign In
              </Link>
            </div>

            {/* Trust Badge */}
            <p className="text-sm text-gray-500">
              Join thousands discovering their authentic path
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="group card hover:scale-[1.02] transition-transform duration-200">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Your Code</h3>
              <p className="text-gray-400 leading-relaxed">
                Discover your personality archetype through our unique assessment system
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group card hover:scale-[1.02] transition-transform duration-200">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect with Friends</h3>
              <p className="text-gray-400 leading-relaxed">
                Build meaningful connections with compatible personalities
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group card hover:scale-[1.02] transition-transform duration-200">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
                <Compass className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Matched Experiences</h3>
              <p className="text-gray-400 leading-relaxed">
                Explore curated offerings aligned with your unique code
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6 mt-20">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          © 2026 ETHOS. All rights reserved.
        </div>
      </footer>
    </div>
  );
}