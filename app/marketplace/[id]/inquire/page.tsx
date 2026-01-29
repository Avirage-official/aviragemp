"use client";

import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react";

export default function VenueInquirePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-950/10 to-black pb-20">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3">
          <Link
            href=".."
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" weight="bold" />
            Back to Venue
          </Link>
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Book or Inquire</h1>
          <p className="text-zinc-400">
            Contact this venue directly or use the Booking system.
          </p>
        </div>

        <div className="p-8 rounded-lg bg-[#111111] border border-white/5">
          <p className="text-zinc-300 text-center">
            Booking form coming soon. For now, please contact the venue directly using their website or phone number.
          </p>
        </div>
      </main>
    </div>
  );
}
