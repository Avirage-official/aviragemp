"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AnimatedBackdrop } from "@/components/ui/AnimatedBackdrop";
import { Sparkles, TrendingUp, Users, Calendar, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const { user } = useUser();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      if (!user) return;

      try {
        const response = await fetch(`/api/users/${user.id}`);
        const data = await response.json();

        if (!data.user || !data.user.primaryCode) {
          router.push("/onboarding");
          return;
        }

        setUserData(data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserData();
  }, [user, router]);

  if (isLoading) {
    return (
      <>
        <AnimatedBackdrop />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading your dashboard...</p>
          </div>
        </div>
      </>
    );
  }

  if (!userData) {
    return null;
  }

  // Get time-based greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <>
      <AnimatedBackdrop />
      
      <div className="min-h-screen px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-400">Active</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              {greeting}, {user?.firstName || "there"}
            </h1>
            
            <p className="text-xl text-gray-400">
              Welcome back to your dashboard
            </p>
          </motion.div>

          {/* Your Code Card - Featured */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              
              <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/[0.04] transition-all duration-300">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
                      <Sparkles className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-medium text-blue-400">Your Mythical Code</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 capitalize">
                      {userData.primaryCode}
                    </h2>
                    
                    <p className="text-gray-400">
                      Your unique personality archetype
                    </p>
                  </div>
                  
                  <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-sm font-medium transition-all duration-200 flex items-center gap-2">
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                  <div>
                    <div className="text-2xl font-bold text-white mb-1">0</div>
                    <div className="text-sm text-gray-500">Connections</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white mb-1">0</div>
                    <div className="text-sm text-gray-500">Experiences</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white mb-1">0</div>
                    <div className="text-sm text-gray-500">Meetups</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Marketplace */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onClick={() => router.push("/marketplace")}
              className="group relative text-left"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
              
              <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">Explore Marketplace</h3>
                <p className="text-sm text-gray-400 mb-4">Discover experiences matched to your code</p>
                
                <div className="flex items-center gap-2 text-sm text-blue-400 font-medium">
                  Browse now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.button>

            {/* Friends */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onClick={() => router.push("/dashboard/friends")}
              className="group relative text-left"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
              
              <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">Connect with Friends</h3>
                <p className="text-sm text-gray-400 mb-4">Find your tribe with compatible codes</p>
                
                <div className="flex items-center gap-2 text-sm text-purple-400 font-medium">
                  Find friends
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.button>

            {/* Meetups */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              onClick={() => router.push("/dashboard/meetups")}
              className="group relative text-left"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-pink-500/5 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
              
              <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-pink-400" />
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">Upcoming Meetups</h3>
                <p className="text-sm text-gray-400 mb-4">Join events with like-minded people</p>
                
                <div className="flex items-center gap-2 text-sm text-pink-400 font-medium">
                  View meetups
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.button>
          </div>

          {/* Recent Activity / Placeholder for existing components */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Your Activity</h2>
            
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-gray-600" />
              </div>
              <p className="text-gray-400 mb-6">No activity yet. Start exploring!</p>
              <button
                onClick={() => router.push("/marketplace")}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all duration-200 inline-flex items-center gap-2"
              >
                Explore Marketplace
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}