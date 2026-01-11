"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function OnboardingPage() {
  const { user } = useUser();
  const router = useRouter();
  const [step, setStep] = useState<"type" | "profile">("type");
  const [accountType, setAccountType] = useState<"USER" | "BUSINESS" | null>(null);
  
  // If they select business, redirect to business onboarding
  function handleTypeSelection(type: "USER" | "BUSINESS") {
    if (type === "BUSINESS") {
      router.push("/onboarding/business");
    } else {
      setAccountType(type);
      setStep("profile");
    }
  }
  
  // Rest of your existing profile form...
  const [formData, setFormData] = useState({
    mythicalCode: "",
    username: "",
    city: ""
  });
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/users/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkId: user?.id,
          email: user?.emailAddresses[0]?.emailAddress,
          name: user?.fullName || formData.username,
          username: formData.username,
          primaryCode: formData.mythicalCode,
          city: formData.city,
          type: "CONSUMER"
        })
      });
      
      if (response.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  if (step === "type") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          <h1 className="text-4xl font-bold text-white text-center mb-4">
            Welcome to ETHOS
          </h1>
          <p className="text-gray-400 text-center mb-12">
            Choose your account type to get started
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Personal Account */}
            <button
              onClick={() => handleTypeSelection("USER")}
              className="p-8 bg-white/5 border-2 border-white/10 hover:border-blue-500 rounded-2xl transition-all duration-200 text-left group"
            >
              <div className="text-5xl mb-4">🎭</div>
              <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Personal Account
              </h2>
              <p className="text-gray-400">
                Discover your code, connect with friends, and explore matched experiences
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li>✓ Personality assessment</li>
                <li>✓ Friend connections</li>
                <li>✓ Marketplace access</li>
                <li>✓ Meetup coordination</li>
              </ul>
            </button>
            
            {/* Business Account */}
            <button
              onClick={() => handleTypeSelection("BUSINESS")}
              className="p-8 bg-white/5 border-2 border-white/10 hover:border-purple-500 rounded-2xl transition-all duration-200 text-left group"
            >
              <div className="text-5xl mb-4">🏢</div>
              <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                Business Account
              </h2>
              <p className="text-gray-400">
                Reach customers through personality-matched marketing
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li>✓ Create listings</li>
                <li>✓ Target by personality</li>
                <li>✓ Manage inquiries</li>
                <li>✓ 7-day free trial</li>
              </ul>
              <div className="mt-4 text-sm text-purple-400 font-semibold">
                $99/month after trial
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Profile form (existing code)
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="max-w-md w-full space-y-6">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Complete Your Profile
        </h2>
        
        {/* Mythical Code */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Mythical Code *
          </label>
          <input
            type="text"
            required
            value={formData.mythicalCode}
            onChange={(e) => setFormData({...formData, mythicalCode: e.target.value})}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
            placeholder="e.g., lhumir"
          />
        </div>
        
        {/* Username */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Username *
          </label>
          <input
            type="text"
            required
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
            placeholder="Your username"
          />
        </div>
        
        {/* City */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            City *
          </label>
          <input
            type="text"
            required
            value={formData.city}
            onChange={(e) => setFormData({...formData, city: e.target.value})}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
            placeholder="Your city"
          />
        </div>
        
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200"
        >
          Complete Setup
        </button>
      </form>
    </div>
  );
}