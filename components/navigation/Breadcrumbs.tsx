"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Breadcrumbs() {
  const pathname = usePathname();
  
  // Hide on these pages
  const hiddenPages = ["/", "/sign-in", "/sign-up", "/dashboard"];
  if (hiddenPages.some(page => pathname.startsWith(page))) return null;

  const segments = pathname.split("/").filter(Boolean);
  
  return (
    <div className="border-b border-white/10 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-white transition">Home</Link>
          {segments.map((segment, i) => (
            <div key={i} className="flex items-center gap-2">
              <span>/</span>
              <span className="capitalize">{segment.replace(/-/g, " ")}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}