"use client";

import { useState, useEffect } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Calendar, Users as UsersIcon, CalendarDays, Menu, X, Sparkles } from "lucide-react";

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
    <nav className="bg-[#111827]/95 border-b border-[#FAFAFA]/10 sticky top-0 z-50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href={isBusiness ? "/business/dashboard" : "/dashboard"} 
            className="flex items-center gap-3 group"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#4F8CFF] group-hover:text-[#7CF5C8] transition-colors duration-300" />
              <span className="text-xl font-bold bg-gradient-to-r from-[#4F8CFF] via-[#C7B9FF] to-[#7CF5C8] bg-clip-text text-transparent">
                ETHOS
              </span>
            </div>
            {isBusiness && (
              <span className="text-[10px] px-2 py-1 bg-[#C7B9FF]/10 border border-[#C7B9FF]/30 text-[#C7B9FF] rounded-full font-semibold uppercase tracking-wider">
                Business
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300
                    ${isActive
                      ? "bg-gradient-to-r from-[#4F8CFF]/20 to-[#7CF5C8]/20 border border-[#4F8CFF]/30 text-[#FAFAFA]"
                      : "text-[#FAFAFA]/60 hover:text-[#FAFAFA] hover:bg-[#FAFAFA]/5"
                    }
                  `}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#4F8CFF]" : ""}`} />
                  <span className="text-sm font-medium">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Menu & Mobile Toggle */}
          <div className="flex items-center gap-4">
            {/* Desktop User Button */}
            <div className="hidden md:block">
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9 ring-2 ring-[#4F8CFF]/20 hover:ring-[#4F8CFF]/40 transition-all",
                    userButtonPopoverCard: "bg-[#111827] border border-[#FAFAFA]/10 shadow-2xl",
                    userButtonPopoverActionButton: "text-[#FAFAFA] hover:bg-[#FAFAFA]/10 transition-colors",
                    userButtonPopoverActionButtonText: "text-[#FAFAFA]/80",
                    userButtonPopoverActionButtonIcon: "text-[#4F8CFF]",
                    userButtonPopoverFooter: "hidden"
                  }
                }}
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-[#FAFAFA]/5 text-[#FAFAFA]/60 hover:text-[#FAFAFA] transition-all"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#FAFAFA]/10 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col gap-2">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                      ${isActive
                        ? "bg-gradient-to-r from-[#4F8CFF]/20 to-[#7CF5C8]/20 border border-[#4F8CFF]/30 text-[#FAFAFA]"
                        : "text-[#FAFAFA]/60 hover:text-[#FAFAFA] hover:bg-[#FAFAFA]/5"
                      }
                    `}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "text-[#4F8CFF]" : ""}`} />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                );
              })}
              
              {/* Mobile User Section */}
              <div className="mt-4 pt-4 border-t border-[#FAFAFA]/10">
                <div className="flex items-center justify-between px-4 py-2">
                  <span className="text-sm text-[#FAFAFA]/50 font-medium">Account</span>
                  <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "w-9 h-9 ring-2 ring-[#4F8CFF]/20",
                        userButtonPopoverCard: "bg-[#111827] border border-[#FAFAFA]/10",
                        userButtonPopoverActionButton: "text-[#FAFAFA] hover:bg-[#FAFAFA]/10"
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}