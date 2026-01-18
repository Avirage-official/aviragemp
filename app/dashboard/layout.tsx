// app/dashboard/layout.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import {
  House,
  Storefront,
  ChatCircle,
  Sparkle,
  List,
  X,
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        <div className="mx-auto flex h-16 max-w-[1800px] items-center justify-between px-4 lg:px-8">
          
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 lg:gap-3 group">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-[#4F8CFF] to-[#C7B9FF] opacity-70 blur group-hover:opacity-100 transition-opacity" />
              <div className="relative flex h-9 w-9 lg:h-10 lg:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#4F8CFF] to-[#C7B9FF]">
                <Sparkle weight="fill" className="h-4 w-4 lg:h-5 lg:w-5 text-black" />
              </div>
            </div>
            <span className="text-lg lg:text-xl font-bold tracking-tight text-white group-hover:text-[#4F8CFF] transition-colors">
              ETHOS
            </span>
            <span className="text-xs text-white/30 font-normal tracking-wide hidden sm:block">
              your universe
            </span>
          </Link>

          {/* Desktop Nav */}
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
                        ? "bg-white/[0.08] text-white"
                        : "text-white/70 hover:text-white hover:bg-white/[0.04]"
                    }
                  `}
                >
                  <Icon
                    weight={active ? "fill" : "regular"}
                    className={`h-4 w-4 transition-colors ${
                      active ? "text-[#4F8CFF]" : ""
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9 lg:w-10 lg:h-10 ring-2 ring-white/20 hover:ring-[#4F8CFF]/50 transition-all",
                  },
                }}
              />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/[0.08] transition-all"
            >
              {mobileMenuOpen ? (
                <X weight="bold" className="w-6 h-6" />
              ) : (
                <List weight="bold" className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/[0.06] bg-[#0A0A0A]"
            >
              <div className="px-4 py-3 space-y-1">
                {NAV_ITEMS.map((item) => {
                  const active = isActive(item.href, item.exact);
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`
                        flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all
                        ${
                          active
                            ? "bg-white/[0.08] text-white"
                            : "text-white/70 hover:text-white hover:bg-white/[0.04]"
                        }
                      `}
                    >
                      <Icon
                        weight={active ? "fill" : "regular"}
                        className={`h-5 w-5 ${active ? "text-[#4F8CFF]" : ""}`}
                      />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}

                {/* User button in mobile menu */}
                <div className="sm:hidden pt-3 border-t border-white/[0.06] mt-3">
                  <div className="flex items-center gap-3 px-4 py-2">
                    <UserButton
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          avatarBox: "w-10 h-10",
                        },
                      }}
                    />
                    <span className="text-sm text-white/70">Account</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ================================================================
          MAIN CONTENT
          ================================================================ */}
      <main className="pt-16">
        <div className="mx-auto max-w-[1800px] px-4 lg:px-8 py-6 lg:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}