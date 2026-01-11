"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const MYTHICAL_CODES = [
  { id: "khoisan", name: "Earthlistener" },
  { id: "kayori", name: "Fireweaver" },
  { id: "sahen", name: "HorizonWalker" },
  { id: "enzuka", name: "Shieldbearer" },
  { id: "siyuane", name: "Kitsune" },
  { id: "jaejin", name: "Harmonist" },
  { id: "namsea", name: "Flowbinder" },
  { id: "shokunin", name: "BladeSmith" },
  { id: "khoruun", name: "SkyRider" },
  { id: "lhumir", name: "StillMind" },
  { id: "yatevar", name: "CycleKeeper" },
  { id: "tahiri", name: "HeartBearer" },
  { id: "karayni", name: "AncestorRoot" },
  { id: "wohaka", name: "SonglineKeeper" },
  { id: "tjukari", name: "Dreampath Navigator" },
  { id: "kinmora", name: "TimeArchitect" },
  { id: "siljoa", name: "FrostSentinel" },
  { id: "skenari", name: "FutureGuardian" },
  { id: "ashkara", name: "TruthForger" },
  { id: "alethir", name: "Seeker" }
];

export default function OnboardingPage() {
  const { user } = useUser();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    accountType: "",
    primaryCode: "",
    city: "",
    username: ""
  });

  async function handleSubmit() {
    const response = await fetch("/api/users/onboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clerkId: user?.id,
        email: user?.emailAddresses[0]?.emailAddress,
        name: user?.fullName,
        ...formData
      })
    });

    if (response.ok) {
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        {step === 1 && (
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome to ETHOS</h1>
            <p className="text-gray-600 mb-8">How would you like to join?</p>
            
            <div className="space-y-4">
              <button
                onClick={() => {
                  setFormData({ ...formData, accountType: "consumer" });
                  setStep(2);
                }}
                className="w-full p-6 border-2 border-gray-300 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition text-left"
              >
                <h3 className="text-xl font-bold mb-2">User Account</h3>
                <p className="text-gray-600">
                  Discover your Mythical Code, connect with friends, and find experiences
                </p>
              </button>
              
              <button
                onClick={() => {
                  router.push("/onboarding/business");
                }}
                className="w-full p-6 border-2 border-gray-300 rounded-lg hover:border-green-600 hover:bg-green-50 transition text-left"
              >
                <h3 className="text-xl font-bold mb-2">Business Account</h3>
                <p className="text-gray-600">
                  Reach personality-matched customers and grow your business
                </p>
                <p className="text-sm text-green-600 font-semibold mt-2">
                  7-day free trial included
                </p>
              </button>
            </div>
          </div>
        )}

        {step === 2 && formData.accountType === "consumer" && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Enter Your Mythical Code</h2>
            <p className="text-gray-600 mb-6">
              Don't know your code?{" "}
              <a 
                href="https://myethoslens.vercel.app" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Take the quiz
              </a>
            </p>
            
            <select 
              value={formData.primaryCode}
              onChange={(e) => setFormData({ ...formData, primaryCode: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-6"
            >
              <option value="">Select your code...</option>
              {MYTHICAL_CODES.map(code => (
                <option key={code.id} value={code.id}>
                  {code.name}
                </option>
              ))}
            </select>
            
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!formData.primaryCode}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Complete Your Profile</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-2">Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block font-semibold mb-2">City</label>
                <input
                  type="text"
                  placeholder="San Francisco"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!formData.username || !formData.city}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
              >
                Complete Setup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}