"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Users,
  Compass,
  MessageCircle,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";

/**
 * TEMP PRESENCE / UNREAD STATE
 * (UI-first, wire to real data later)
 */
const presence = {
  friendsOnline: true,
  unreadMessages: 2,
};

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const items: NavItem[] = useMemo(
    () => [
      { label: "Your Code", href: "/dashboard", icon: Sparkles },
      { label: "Friends", href: "/dashboard/friends", icon: Users },
      { label: "Messages", href: "/dashboard/messages", icon: MessageCircle },
      { label: "Meetups", href: "/dashboard/meetups", icon: Compass },
    ],
    []
  );

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname?.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* NAV */}
      <header className="sticky top-0 z-50">
        <div className="border-b border-white/10 bg-black/70 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex h-16 items-center justify-between">
              {/* LEFT */}
              <div className="flex items-center gap-6">
                <Link
                  href="/dashboard"
                  className="group flex items-center gap-2"
                  onClick={() => setOpen(false)}
                >
                  <span className="text-lg font-semibold tracking-wide">
                    ETHOS
                  </span>
                  <span className="hidden sm:inline text-xs text-white/40 group-hover:text-white/60 transition">
                    your universe
                  </span>
                </Link>

                {/* DESKTOP NAV */}
                <nav className="hidden md:flex items-center gap-2">
                  {items.map((it) => {
                    const active = isActive(it.href);
                    const Icon = it.icon;

                    return (
                      <Link
                        key={it.href}
                        href={it.href}
                        className={[
                          "relative flex items-center gap-2 rounded-full px-4 py-2 text-sm transition",
                          active
                            ? "text-white"
                            : "text-white/65 hover:text-white hover:bg-white/5",
                        ].join(" ")}
                      >
                        {/* ACTIVE GLOW */}
                        {active && (
                          <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-[10px]" />
                        )}

                        <span className="relative z-10 flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          {it.label}

                          {/* PRESENCE / UNREAD */}
                          {it.label === "Friends" &&
                            presence.friendsOnline && (
                              <span className="ml-1 h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                            )}

                          {it.label === "Messages" &&
                            presence.unreadMessages > 0 && (
                              <span className="ml-1 rounded-full bg-white/90 px-1.5 text-[10px] font-medium text-black">
                                {presence.unreadMessages}
                              </span>
                            )}
                        </span>

                        {/* ACTIVE DOT */}
                        {active && (
                          <span className="absolute -bottom-[9px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/70" />
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-3">
                <Link
                  href="/marketplace"
                  className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition"
                >
                  Marketplace <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="hidden sm:block">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-8 h-8",
                      },
                    }}
                    afterSignOutUrl="/"
                  />
                </div>

                {/* MOBILE TOGGLE */}
                <button
                  onClick={() => setOpen((v) => !v)}
                  className="md:hidden inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.02] p-2 hover:bg-white/10 transition"
                  aria-label="Open menu"
                >
                  {open ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE DRAWER */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-b border-white/10 bg-black/90 backdrop-blur-xl"
            >
              <div className="mx-auto max-w-7xl px-6 py-4 space-y-2">
                {items.map((it) => {
                  const active = isActive(it.href);
                  const Icon = it.icon;

                  return (
                    <Link
                      key={it.href}
                      href={it.href}
                      onClick={() => setOpen(false)}
                      className={[
                        "flex items-center justify-between rounded-2xl px-4 py-3 transition",
                        active
                          ? "bg-white/10 text-white"
                          : "bg-white/[0.03] text-white/75 hover:bg-white/8",
                      ].join(" ")}
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{it.label}</span>

                        {/* PRESENCE / UNREAD (MOBILE) */}
                        {it.label === "Friends" &&
                          presence.friendsOnline && (
                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                          )}

                        {it.label === "Messages" &&
                          presence.unreadMessages > 0 && (
                            <span className="ml-1 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-medium text-black">
                              {presence.unreadMessages}
                            </span>
                          )}
                      </span>

                      <ArrowRight className="w-4 h-4 text-white/40" />
                    </Link>
                  );
                })}

                <Link
                  href="/marketplace"
                  onClick={() => setOpen(false)}
                  className="mt-2 flex items-center justify-between rounded-2xl px-4 py-3 border border-white/10 bg-white/[0.02] hover:bg-white/10 transition"
                >
                  <span className="text-sm text-white/85">Marketplace</span>
                  <ArrowRight className="w-4 h-4 text-white/60" />
                </Link>

                <div className="pt-3 flex items-center justify-between">
                  <span className="text-xs text-white/40">Account</span>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-9 h-9",
                      },
                    }}
                    afterSignOutUrl="/"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* CONTENT */}
      <main className="mx-auto max-w-7xl px-6 py-10">{children}</main>
    </div>
  );
}
