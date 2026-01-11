"use client";

import Link from "next/link";

export function QuickActions({ userType }: { userType?: string }) {
  if (userType === "BUSINESS") {
    return (
      <div className="fixed bottom-8 right-8 flex flex-col gap-3">
        <Link
          href="/business/listings/new"
          className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition flex items-center justify-center text-2xl"
          title="Create Listing"
        >
          ➕
        </Link>
      </div>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-3">
      <Link
        href="/marketplace"
        className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition flex items-center justify-center text-2xl"
        title="Browse Marketplace"
      >
        🛍️
      </Link>
    </div>
  );
}