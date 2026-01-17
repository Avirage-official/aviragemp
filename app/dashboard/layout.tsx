// app/dashboard/layout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  House,
  Storefront,
  ChatCircle,
} from "@phosphor-icons/react";

/* ============================================================================
   TOP NAV ITEMS
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
          TOP NAV
          ================================================================ */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0F0F14]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#4F8CFF] to-[#C7B9FF]">
              <div className="h-5 w-5 rounded-md bg-[#0A0A0A]" />
            </div>
            <div className="text-xl font-bold tracking-tight text-white">
              ETHOS
            </div>
          </Link>

          {/* Center Nav */}
          <div className="flex items-center gap-2">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href, item.exact);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200
                    ${
                      active
                        ? "bg-white/[0.08] text-white"
                        : "text-white/50 hover:text-white hover:bg-white/[0.04]"
                    }
                  `}
                >
                  <Icon
                    weight={active ? "fill" : "regular"}
                    className="h-5 w-5"
                  />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* User Button */}
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-9 h-9 ring-2 ring-white/10",
              },
            }}
            afterSignOutUrl="/"
          />
        </div>
      </nav>

      {/* ================================================================
          MAIN CONTENT
          ================================================================ */}
      <main className="relative">
        {children}
      </main>
    </div>
  );
}