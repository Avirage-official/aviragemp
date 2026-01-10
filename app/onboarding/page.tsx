"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const CODES = [
  "khoisan", "kayori", "sahen", "enzuka", "siyuane", "jaejin",
  "namsea", "shokunin", "khoruun", "lhumir", "yatevar", "tahiri",
  "karayni", "wohaka", "tjukari", "kinmora", "siljoa", "skenari",
  "ashkara", "alethir"
];

export default function OnboardingPage() {
  const { user } = useUser();
  const router = useRouter();
  const [formData, setFormData] = useState({
    primaryCode: "",
    username: "",
    city: ""
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

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
    } else {
      alert("Error creating profile");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-slate-900 flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full border border-white/20">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome to ETHOS</h1>
        <p className="text-gray-300 mb-6">Complete your profile to get started</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-2 text-sm">Your Mythical Code</label>
            <select
              value={formData.primaryCode}
              onChange={(e) => setFormData({ ...formData, primaryCode: e.target.value })}
              required
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
            >
              <option value="">Select your code...</option>
              {CODES.map(code => (
                <option key={code} value={code} className="bg-slate-800">
                  {code}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-400 mt-1">
              Don't know your code? <a href="https://myethoslens.vercel.app" target="_blank" className="text-blue-400">Take the quiz</a>
            </p>
          </div>

          <div>
            <label className="block text-white mb-2 text-sm">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
              placeholder="johndoe"
            />
          </div>

          <div>
            <label className="block text-white mb-2 text-sm">City</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              required
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
              placeholder="New York"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg font-semibold"
          >
            {loading ? "Creating profile..." : "Complete Setup"}
          </button>
        </form>
      </div>
    </div>
  );
}