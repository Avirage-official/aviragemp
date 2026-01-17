"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { useMemo } from "react";
import {
  Sparkles,
  Users,
  Compass,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* TEMP UI STATE (wire later)                                                  */
/* -------------------------------------------------------------------------- */

const presence = {
  friendsOnline: true,
  unreadMessages: 0,
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

  const items: NavItem[] = useMemo(
    () => [
      { label: "Your Code", href: "/dashboard", icon: Sparkles },
      { label: "Friends", href: "/dashboard/friends", icon: Users },
      { label: "Messages", href: "/dashboard/messages", icon: MessageCircle },
      { label: "Meetups", href: "/dashboard/meetups", icon: Compass },
    ],
    []
  );

  const isActive = (href: string) =>
    href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname?.startsWith(href);

  return (
    <div className="relative min-h-screen text-white flex overflow-hidden">
      {/* ======================================================================
          AMBIENT LIFESTYLE BACKGROUND (GLOBAL FOR DASHBOARD)
          ====================================================================== */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        {/* Base light system gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F7F8FF] via-[#FDFDFF] to-[#F4FFF9]" />

        {/* Color orbs — lifestyle energy */}
        <div className="absolute -top-[25%] left-[10%] h-[700px] w-[700px] rounded-full bg-[#4F8CFF] opacity-[0.08] blur-[180px] animate-float" />
        <div className="absolute top-[35%] right-[5%] h-[600px] w-[600px] rounded-full bg-[#C7B9FF] opacity-[0.09] blur-[160px] animate-float" />
        <div className="absolute bottom-[-25%] left-[35%] h-[650px] w-[650px] rounded-full bg-[#7CF5C8] opacity-[0.08] blur-[170px] animate-float" />

        {/* Soft noise for texture */}
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03]" />
      </div>

      {/* ======================================================================
          SIDE NAV
          ====================================================================== */}
      <aside className="hidden md:flex w-[260px] shrink-0 border-r border-black/5 bg-white/60 backdrop-blur-xl">
        <div className="flex h-full w-full flex-col px-5 py-6">
          {/* LOGO */}
          <Link href="/dashboard" className="mb-10 block">
            <div className="text-lg font-semibold tracking-wide text-black">
              ETHOS
            </div>
            <div className="text-xs text-black/50">your universe</div>
          </Link>

          {/* NAV */}
          <nav className="flex flex-col gap-2">
            {items.map((it) => {
              const active = isActive(it.href);
              const Icon = it.icon;

              return (
                <Link
                  key={it.href}
                  href={it.href}
                  className={[
                    "group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition",
                    active
                      ? "bg-black/5 text-black"
                      : "text-black/60 hover:text-black hover:bg-black/5",
                  ].join(" ")}
                >
                  {active && (
                    <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-[12px]" />
                  )}

                  <span className="relative z-10 flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    {it.label}

                    {it.label === "Friends" &&
                      presence.friendsOnline && (
                        <span className="ml-auto h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      )}

                    {it.label === "Messages" &&
                      presence.unreadMessages > 0 && (
                        <span className="ml-auto rounded-full bg-black px-2 py-0.5 text-[11px] font-medium text-white">
                          {presence.unreadMessages}
                        </span>
                      )}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="flex-1" />

          {/* MARKETPLACE */}
          <Link
            href="/marketplace"
            className="mb-6 flex items-center justify-between rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-black/80 hover:bg-white transition"
          >
            Marketplace
            <ArrowRight className="h-4 w-4" />
          </Link>

          {/* USER */}
          <div className="flex items-center gap-3">
            <UserButton
              appearance={{ elements: { avatarBox: "w-9 h-9" } }}
              afterSignOutUrl="/"
            />
            <span className="text-sm text-black/60">Account</span>
          </div>
        </div>
      </aside>

      {/* ======================================================================
          CONTENT
          ====================================================================== */}
      <main className="flex-1 px-6 py-10 text-black">
        {children}
      </main>
    </div>
  );
}
