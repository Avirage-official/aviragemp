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
    <div className="relative min-h-screen flex overflow-hidden text-black">
      {/* ===============================================================
          GLOBAL LIFESTYLE BACKGROUND (BRIGHT, MODERN)
         =============================================================== */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F7F8FF] via-[#FFFFFF] to-[#F4FFF9]" />

        <div className="absolute -top-[25%] left-[10%] h-[700px] w-[700px] rounded-full bg-[#4F8CFF] opacity-[0.08] blur-[160px]" />
        <div className="absolute top-[35%] right-[5%] h-[600px] w-[600px] rounded-full bg-[#C7B9FF] opacity-[0.08] blur-[150px]" />
        <div className="absolute bottom-[-25%] left-[35%] h-[650px] w-[650px] rounded-full bg-[#7CF5C8] opacity-[0.07] blur-[160px]" />

        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.025]" />
      </div>

      {/* ===============================================================
          SIDE NAV (CLEAN / PRODUCT-GRADE)
         =============================================================== */}
      <aside className="hidden md:flex w-[260px] shrink-0 border-r border-black/5 bg-white/70 backdrop-blur-xl">
        <div className="flex h-full w-full flex-col px-5 py-6">
          <Link href="/dashboard" className="mb-10 block">
            <div className="text-lg font-semibold tracking-wide text-black">
              ETHOS
            </div>
            <div className="text-xs text-black/50">your universe</div>
          </Link>

          <nav className="flex flex-col gap-2">
            {items.map((it) => {
              const active = isActive(it.href);
              const Icon = it.icon;

              return (
                <Link
                  key={it.href}
                  href={it.href}
                  className={[
                    "relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition",
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

          <Link
            href="/marketplace"
            className="mb-6 flex items-center justify-between rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black/80 hover:bg-white transition"
          >
            Marketplace
            <ArrowRight className="h-4 w-4" />
          </Link>

          <div className="flex items-center gap-3">
            <UserButton
              appearance={{ elements: { avatarBox: "w-9 h-9" } }}
              afterSignOutUrl="/"
            />
            <span className="text-sm text-black/60">Account</span>
          </div>
        </div>
      </aside>

      {/* ===============================================================
          CONTENT WRAPPER (THIS FIXES ALL PAGES)
         =============================================================== */}
      <main className="flex-1 px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[32px] bg-white/85 backdrop-blur-xl border border-black/5 shadow-[0_30px_80px_rgba(0,0,0,0.08)] px-6 py-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
