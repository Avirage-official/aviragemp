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
    <div className="min-h-screen bg-black text-white flex">
      {/* ======================================================================
          SIDE NAV (DESKTOP)
          ====================================================================== */}
      <aside className="hidden md:flex w-[260px] shrink-0 border-r border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="flex h-full w-full flex-col px-5 py-6">
          {/* LOGO */}
          <Link href="/dashboard" className="mb-10 block">
            <div className="text-lg font-semibold tracking-wide">ETHOS</div>
            <div className="text-xs text-white/40">your universe</div>
          </Link>

          {/* NAV ITEMS */}
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
                      ? "bg-white/10 text-white"
                      : "text-white/65 hover:text-white hover:bg-white/5",
                  ].join(" ")}
                >
                  {/* ACTIVE GLOW */}
                  {active && (
                    <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-[14px]" />
                  )}

                  <span className="relative z-10 flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    {it.label}

                    {/* PRESENCE */}
                    {it.label === "Friends" &&
                      presence.friendsOnline && (
                        <span className="ml-auto h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      )}

                    {it.label === "Messages" &&
                      presence.unreadMessages > 0 && (
                        <span className="ml-auto rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-black">
                          {presence.unreadMessages}
                        </span>
                      )}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* SPACER */}
          <div className="flex-1" />

          {/* MARKETPLACE */}
          <Link
            href="/marketplace"
            className="mb-6 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/80 hover:bg-white/10 transition"
          >
            Marketplace
            <ArrowRight className="h-4 w-4" />
          </Link>

          {/* USER */}
          <div className="flex items-center gap-3">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9",
                },
              }}
              afterSignOutUrl="/"
            />
            <span className="text-sm text-white/70">Account</span>
          </div>
        </div>
      </aside>

      {/* ======================================================================
          MAIN CONTENT
          ====================================================================== */}
      <main className="flex-1 px-6 py-10">{children}</main>
    </div>
  );
}
