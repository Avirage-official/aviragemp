"use client";

import { useState, useEffect } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Calendar, Users as UsersIcon, CalendarDays } from "lucide-react";

export function MainNav() {
  const { user } = useUser();
  const pathname = usePathname();
  const [userType, setUserType] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchUserType() {
      if (!user) return;
      
      try {
        const response = await fetch(`/api/users/${user.id}/type`);
        const data = await response.json();
        setUserType(data.type || "CONSUMER");
      } catch (error) {
        console.error("Error fetching user type:", error);
        setUserType("CONSUMER");
      }
    }
    
    fetchUserType();
  }, [user]);

  // Hide nav on these pages
  if (!user || pathname?.startsWith("/onboarding") || pathname === "/sign-in" || pathname === "/sign-up" || pathname === "/") {
    return null;
  }

  const isBusiness = userType === "BUSINESS";

  const userLinks = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/marketplace", label: "Marketplace", icon: ShoppingBag },
    { href: "/bookings", label: "My Bookings", icon: Calendar },
    { href: "/dashboard/friends", label: "Friends", icon: UsersIcon },
    { href: "/dashboard/meetups", label: "Meetups", icon: CalendarDays },
  ];

  const businessLinks = [
    { href: "/business/dashboard", label: "Dashboard", icon: Home },
    { href: "/business/listings/new", label: "Create Listing", icon: ShoppingBag },
    { href: "/business/inquiries", label: "Inquiries", icon: Calendar },
  ];

  const links = isBusiness ? businessLinks : userLinks;

  return (
    <nav className="bg-black border-b border-white/10 sticky top-0 z-50 backdrop-blur-xl">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={isBusiness ? "/business/dashboard" : "/dashboard"} className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">ETHOS</span>
            {isBusiness && (
              <span className="text-xs px-2 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full font-semibold">
                BUSINESS
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    pathname === link.href
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                    userButtonPopoverCard: "bg-zinc-900 border border-white/10",
                    userButtonPopoverActionButton: "text-white hover:bg-white/10"
                  }
                }}
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/5 text-gray-400"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-2">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      pathname === link.href
                        ? "bg-blue-600 text-white"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                );
              })}
              
              {/* Mobile User Button */}
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between px-4">
                <span className="text-sm text-gray-400">Account</span>
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10"
                    }
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}