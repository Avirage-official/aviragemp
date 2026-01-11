"use client";

import { useState, useEffect } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

  if (!user) return null;

  const isBusiness = userType === "BUSINESS";

  const userLinks = [
    { href: "/dashboard", label: "Dashboard", icon: "🏠" },
    { href: "/marketplace", label: "Marketplace", icon: "🛍️" },
    { href: "/bookings", label: "My Bookings", icon: "📋" },
    { href: "/friends", label: "Friends", icon: "👥" },
    { href: "/meetups", label: "Meetups", icon: "📅" },
  ];

  const businessLinks = [
    { href: "/business/dashboard", label: "Dashboard", icon: "🏢" },
    { href: "/business/listings/new", label: "Create Listing", icon: "➕" },
    { href: "/business/inquiries", label: "Inquiries", icon: "📬" },
  ];

  const links = isBusiness ? businessLinks : userLinks;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={isBusiness ? "/business/dashboard" : "/dashboard"} className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-600">ETHOS</span>
            {isBusiness && (
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold">
                BUSINESS
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                  pathname === link.href
                    ? "bg-blue-600 text-white font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span>{link.icon}</span>
                <span className="text-sm">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <UserButton 
                afterSignOutUrl="/sign-in"
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10"
                  }
                }}
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
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
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    pathname === link.href
                      ? "bg-blue-600 text-white font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-xl">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
              
              {/* Mobile User Button */}
              <div className="mt-4 pt-4 border-t flex items-center justify-between px-4">
                <span className="text-sm text-gray-600">Account</span>
                <UserButton 
                  afterSignOutUrl="/sign-in"
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