// app/dashboard/meetups/page.tsx
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { MeetupsList } from "@/components/meetups/MeetupsList";
import { CreateMeetupButton } from "@/components/meetups/CreateMeetupButton";
import { CalendarDays, Sparkles, TrendingUp, Coffee, Mountain, Palette } from "lucide-react";
import Link from "next/link";

/* ============================================================================
   MEETUPS PAGE — Real-world connections
   Dark theme with activity recommendations
   ============================================================================ */

// Activity recommendations based on codes
const RECOMMENDED_ACTIVITIES: Record<string, { 
  title: string; 
  icon: any; 
  description: string;
  tags: string[];
}[]> = {
  "stillmind": [
    { 
      title: "Meditation Circle", 
      icon: Mountain,
      description: "Silent group practice in nature",
      tags: ["Contemplative", "Outdoor"]
    },
    { 
      title: "Philosophy Café", 
      icon: Coffee,
      description: "Deep discussions over coffee",
      tags: ["Intellectual", "Social"]
    },
    { 
      title: "Art Gallery Walk", 
      icon: Palette,
      description: "Explore meaning through visual art",
      tags: ["Cultural", "Reflective"]
    }
  ],
  "fireweaver": [
    {
      title: "Rock Climbing Session",
      icon: Mountain,
      description: "Push your limits with aligned energy",
      tags: ["Physical", "Challenge"]
    },
    {
      title: "Creative Workshop",
      icon: Palette,
      description: "Transform ideas into reality",
      tags: ["Creative", "Action"]
    },
    {
      title: "Networking Mixer",
      icon: TrendingUp,
      description: "Connect with fellow catalysts",
      tags: ["Social", "Professional"]
    }
  ],
  // Default activities for other codes
  "default": [
    {
      title: "Coffee Meetup",
      icon: Coffee,
      description: "Casual connection over coffee",
      tags: ["Social", "Casual"]
    },
    {
      title: "Outdoor Adventure",
      icon: Mountain,
      description: "Explore nature together",
      tags: ["Outdoor", "Active"]
    },
    {
      title: "Creative Session",
      icon: Palette,
      description: "Express yourself creatively",
      tags: ["Creative", "Fun"]
    }
  ]
};

export default async function MeetupsPage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="min-h-screen bg-[#0B0D12] text-white p-6">
        <div className="max-w-xl rounded-3xl border border-white/10 bg-white/[0.02] p-10">
          <p className="text-white/70">
            You need to be signed in to view meetups.
          </p>
        </div>
      </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) return null;

  // Friends (for invites)
  const friendships = await prisma.friendship.findMany({
    where: { userId: user.id },
  });

  const friends = (
    await Promise.all(
      friendships.map((f) =>
        prisma.user.findUnique({ where: { id: f.friendId } })
      )
    )
  ).filter(Boolean);

  // Meetups
  const meetups = await prisma.meetup.findMany({
    where: {
      OR: [
        { isPublic: true },
        { hostId: user.id },
        { participants: { some: { userId: user.id } } },
      ],
      scheduledAt: { gte: new Date() },
    },
    include: {
      host: true,
      participants: {
        include: { user: true },
      },
    },
    orderBy: { scheduledAt: "asc" },
  });

  // Get recommended activities for user's code
  const userCodeKey = user.primaryCode?.toLowerCase() || "default";
  const recommendations = RECOMMENDED_ACTIVITIES[userCodeKey] || RECOMMENDED_ACTIVITIES["default"];

  return (
    <div className="min-h-screen bg-[#0B0D12] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* MAIN CONTENT */}
          <div className="lg:col-span-8 space-y-10">
            {/* HEADER */}
            <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/60">
                  <CalendarDays className="w-5 h-5" />
                  <span className="text-sm uppercase tracking-wider">
                    Real-world moments
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-bold text-white">
                  Meetups
                </h1>

                <p className="text-lg text-white/70 max-w-xl">
                  Plans don't start with dates — they start with energy.
                </p>
              </div>

              <CreateMeetupButton friends={friends as any[]} />
            </section>

            {/* MEETUPS LIST */}
            <MeetupsList
              meetups={meetups}
              currentUserId={user.id}
            />
          </div>

          {/* SIDEBAR - ACTIVITY RECOMMENDATIONS */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Recommendations Card */}
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD97D] to-[#FFB97D] flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Recommended Activities
                    </h3>
                    <p className="text-xs text-white/50">
                      For {user.primaryCode || "your code"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {recommendations.map((activity, i) => {
                    const Icon = activity.icon;
                    return (
                      <div 
                        key={i}
                        className="group rounded-2xl border border-white/10 bg-white/[0.02] p-4 hover:bg-white/[0.04] hover:border-white/20 transition-all cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-white/70" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-white mb-1">
                              {activity.title}
                            </h4>
                            <p className="text-xs text-white/60 mb-2">
                              {activity.description}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {activity.tags.map((tag, j) => (
                                <span 
                                  key={j}
                                  className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-white/50"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <p className="text-xs text-white/40 mt-4 text-center">
                  Activities curated for your mythical code
                </p>
              </div>

              {/* Marketplace CTA */}
              <div className="rounded-3xl border border-[#4F8CFF]/30 bg-gradient-to-br from-[#4F8CFF]/10 to-transparent p-6">
                <h3 className="text-lg font-bold text-white mb-2">
                  Discover Experiences
                </h3>
                <p className="text-sm text-white/60 mb-4">
                  Find professionally curated activities matched to your code
                </p>
                <Link 
                  href="/marketplace"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#4F8CFF] text-black font-medium hover:bg-[#4F8CFF]/90 transition-all text-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  Browse Marketplace
                </Link>
              </div>

              {/* Stats */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="text-sm font-semibold text-white mb-4">
                  Your Meetup Stats
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-xl bg-white/[0.02]">
                    <p className="text-2xl font-bold text-white">
                      {meetups.filter(m => m.hostId === user.id).length}
                    </p>
                    <p className="text-xs text-white/50 mt-1">Hosting</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-white/[0.02]">
                    <p className="text-2xl font-bold text-white">
                      {meetups.filter(m => 
                        m.participants.some(p => p.userId === user.id && p.status === "GOING")
                      ).length}
                    </p>
                    <p className="text-xs text-white/50 mt-1">Attending</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}