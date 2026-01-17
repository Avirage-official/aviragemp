// app/dashboard/layout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  Sparkle,
  Users,
  ChatCircle,
  Calendar,
  Storefront,
  ArrowRight,
} from "@phosphor-icons/react";

/* ============================================================================
   NAV ITEMS
   ============================================================================ */

const NAV_ITEMS = [
  { href: "/dashboard", label: "Your Code", icon: Sparkle, exact: true },
  { href: "/dashboard/friends", label: "Friends", icon: Users },
  { href: "/dashboard/messages", label: "Messages", icon: ChatCircle },
  { href: "/dashboard/meetups", label: "Meetups", icon: Calendar },
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
    <div className="relative min-h-screen flex bg-[#050505] text-white">
      {/* ================================================================
          AMBIENT BACKGROUND
          ================================================================ */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-[30%] left-[5%] h-[600px] w-[600px] rounded-full bg-[#4F8CFF] opacity-[0.04] blur-[150px]" />
        <div className="absolute top-[40%] right-[0%] h-[500px] w-[500px] rounded-full bg-[#C7B9FF] opacity-[0.04] blur-[140px]" />
        <div className="absolute bottom-[-20%] left-[30%] h-[550px] w-[550px] rounded-full bg-[#7CF5C8] opacity-[0.03] blur-[160px]" />
      </div>

      {/* ================================================================
          SIDEBAR
          ================================================================ */}
      <aside className="hidden md:flex w-[260px] shrink-0 border-r border-white/[0.06] bg-[#0A0A0A]/80 backdrop-blur-xl">
        <div className="flex h-full w-full flex-col px-5 py-6">
          {/* Logo */}
          <Link href="/dashboard" className="mb-10 block">
            <div className="text-xl font-bold tracking-wide text-white">
              ETHOS
            </div>
            <div className="text-xs text-white/40">your universe</div>
          </Link>

          {/* Nav */}
          <nav className="flex flex-col gap-1.5">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href, item.exact);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200
                    ${active
                      ? "bg-white/[0.08] text-white"
                      : "text-white/50 hover:text-white hover:bg-white/[0.04]"
                    }
                  `}
                >
                  {/* Active indicator */}
                  {active && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-[#4F8CFF]" />
                  )}
                  
                  <Icon
                    weight={active ? "fill" : "regular"}
                    className={`w-5 h-5 ${active ? "text-[#4F8CFF]" : ""}`}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex-1" />

          {/* Marketplace CTA */}
          <Link
            href="/marketplace"
            className="group mb-6 flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-sm text-white/70 hover:bg-white/[0.05] hover:border-white/[0.12] transition-all"
          >
            <div className="flex items-center gap-3">
              <Storefront weight="duotone" className="w-5 h-5 text-[#C7B9FF]" />
              <span>Marketplace</span>
            </div>
            <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all" />
          </Link>

          {/* User */}
          <div className="flex items-center gap-3 px-2">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9 ring-2 ring-white/10",
                },
              }}
              afterSignOutUrl="/"
            />
            <span className="text-sm text-white/50">Account</span>
          </div>
        </div>
      </aside>

      {/* ================================================================
          MAIN CONTENT
          ================================================================ */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}