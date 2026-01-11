"use client";

import { useState } from "react";

export function SubscriptionButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubscribe() {
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/subscriptions/checkout", {
        method: "POST",
      });

      const data = await response.json();

      if (data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        alert("Failed to start checkout. Please try again.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleSubscribe}
      disabled={isLoading}
      className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
    >
      {isLoading ? "Loading..." : "Subscribe Now - $99/month"}
    </button>
  );
}