// app/dashboard/layout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  House,
  Storefront,
  ChatCircle,
  Sparkle,
} from "@phosphor-icons/react";

/* ============================================================================
   NAV ITEMS
   ============================================================================ */

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: House, exact: true },
  { href: "/marketplace", label: "Marketplace", icon: Storefront },
  { href: "/dashboard/messages", label: "Messages", icon: ChatCircle },
];

/* ============================================================================
   LAYOUT
   ============================================================================ */

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname?.startsWith(href);

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-white">
      {/* ================================================================
          AMBIENT BACKGROUND
          ================================================================ */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-[30%] left-[5%] h-[600px] w-[600px] rounded-full bg-[#4F8CFF] opacity-[0.03] blur-[150px]" />
        <div className="absolute top-[40%] right-[0%] h-[500px] w-[500px] rounded-full bg-[#C7B9FF] opacity-[0.03] blur-[140px]" />
        <div className="absolute bottom-[-20%] left-[30%] h-[550px] w-[550px] rounded-full bg-[#7CF5C8] opacity-[0.02] blur-[160px]" />
      </div>

      {/* ================================================================
          TOP NAV BAR
          ================================================================ */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#0A0A0A]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1800px] items-center justify-between px-6 lg:px-8">
          
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-[#4F8CFF] to-[#C7B9FF] opacity-70 blur group-hover:opacity-100 transition-opacity" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#4F8CFF] to-[#C7B9FF]">
                <Sparkle weight="fill" className="h-5 w-5 text-black" />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-[#4F8CFF] transition-colors">
              ETHOS
            </span>
            <span className="text-xs text-white/30 font-normal tracking-wide hidden sm:block">
              your universe
            </span>
          </Link>

          {/* Center Nav */}
          <div className="hidden md:flex items-center gap-1.5">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href, item.exact);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    group relative flex items-center gap-2.5 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-200
                    ${
                      active
                        ? "text-white"
                        : "text-white/50 hover:text-white"
                    }
                  `}
                >
                  {/* Active background */}
                  {active && (
                    <div className="absolute inset-0 rounded-xl bg-white/[0.08] border border-white/[0.08]" />
                  )}
                  
                  {/* Hover glow */}
                  {!active && (
                    <div className="absolute inset-0 rounded-xl bg-white/[0.04] opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                  
                  <Icon
                    weight={active ? "fill" : "regular"}
                    className={`relative h-5 w-5 transition-colors ${active ? 'text-[#4F8CFF]' : ''}`}
                  />
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Search - placeholder for future */}
            <button className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white/40 text-sm hover:border-white/[0.12] hover:text-white/60 transition-all">
              <span className="text-xs">⌘K</span>
            </button>
            
            {/* User Button */}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9 ring-2 ring-white/10 hover:ring-white/20 transition-all",
                },
              }}
              afterSignOutUrl="/"
            />
          </div>
        </div>
      </nav>

      {/* ================================================================
          MAIN CONTENT AREA
          ================================================================ */}
      <main className="relative pt-16">
        <div className="mx-auto max-w-[1800px] px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}