// components/navigation/MainNav.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { 
  House, 
  Storefront, 
  ChatCircle, 
  List, 
  X,
  Sparkle
} from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: House },
  { label: "Marketplace", href: "/marketplace", icon: Storefront },
  { label: "Messages", href: "/dashboard/messages", icon: ChatCircle },
];

export function MainNav() {
  const pathname = usePathname();
  const { isLoaded } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Hide MainNav only on dashboard routes (dashboard has its own nav in layout)
  // Keep showing on marketplace
  if (pathname?.startsWith('/dashboard')) {
    return null;
  }

  if (!isLoaded) return null;

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname === href || pathname?.startsWith(href);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between gap-4 h-16">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center gap-2 lg:gap-3 group shrink-0">
              <div className="relative">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-[#4F8CFF] to-[#C7B9FF] opacity-70 blur group-hover:opacity-100 transition-opacity" />
                <div className="relative w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-[#4F8CFF] to-[#C7B9FF] flex items-center justify-center">
                  <Sparkle className="w-4 h-4 lg:w-5 lg:h-5 text-black" weight="fill" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg lg:text-xl font-bold text-white group-hover:text-[#4F8CFF] transition-colors">
                  ETHOS
                </span>
                <span className="text-xs text-white/30 font-normal tracking-wide hidden lg:block">
                  your universe
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      active
                        ? "bg-[#4F8CFF]/20 text-[#4F8CFF]"
                        : "text-white/70 hover:text-white hover:bg-white/[0.08]"
                    }`}
                  >
                    <Icon className="w-4 h-4" weight={active ? "fill" : "regular"} />
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3 shrink-0">
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

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/[0.08] transition-all"
              >
                {mobileOpen ? <X className="w-6 h-6" weight="bold" /> : <List className="w-6 h-6" weight="bold" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-16 left-4 right-4 bg-[#0D0D14] border border-white/[0.08] rounded-2xl p-4 shadow-2xl"
            >
              <div className="space-y-1">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                        active
                          ? "bg-[#4F8CFF]/20 text-[#4F8CFF]"
                          : "text-white/70 hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      <Icon className="w-5 h-5" weight={active ? "fill" : "regular"} />
                      {item.label}
                    </Link>
                  );
                })}

                {/* User button in mobile */}
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}