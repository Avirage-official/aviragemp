"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Calendar, ChatCircle, Sparkle } from "@phosphor-icons/react";

const PROMO_LINKS = [
  {
    href: "/meetups",
    title: "Join Meetups",
    description: "Connect with like-minded people",
    icon: Users,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    href: "/events",
    title: "Upcoming Events",
    description: "Don't miss out on local happenings",
    icon: Calendar,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    href: "/community",
    title: "Community Chat",
    description: "Join the conversation",
    icon: ChatCircle,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    href: "/quiz",
    title: "Discover Your Vibe",
    description: "Take our archetype quiz",
    icon: Sparkle,
    gradient: "from-orange-500 to-red-500",
  },
];

export function CrossPromotionLinks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
      {PROMO_LINKS.map((link, index) => {
        const Icon = link.icon;
        return (
          <Link key={link.href} href={link.href}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className={`p-5 rounded-xl bg-gradient-to-br ${link.gradient} cursor-pointer shadow-lg hover:shadow-xl transition-all`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-white" weight="fill" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-base mb-1">
                    {link.title}
                  </h3>
                  <p className="text-white/90 text-xs line-clamp-2">
                    {link.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
}
