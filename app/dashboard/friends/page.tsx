// app/dashboard/friends/page.tsx
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { FriendInviteButton } from "@/components/friends/FriendInviteButton";
import { FriendsList } from "@/components/friends/FriendsList";
import { MoodSelector } from "@/components/friends/MoodSelector";
import { Users, Sparkles } from "lucide-react";

/* ============================================================================
   FRIENDS PAGE — Your Circle
   Dark theme with proper visibility
   ============================================================================ */

export default async function FriendsPage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="min-h-screen bg-[#0B0D12] text-white p-6">
        <div className="max-w-xl rounded-3xl border border-white/10 bg-white/[0.02] p-8">
          <p className="text-white/70">
            You need to be signed in to view your circle.
          </p>
        </div>
      </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0B0D12] text-white p-6">
        <div className="max-w-xl rounded-3xl border border-white/10 bg-white/[0.02] p-8 animate-pulse">
          <div className="h-6 w-48 bg-white/5 rounded-lg mb-4" />
          <div className="h-4 w-72 bg-white/5 rounded-lg" />
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------------
     FRIENDSHIPS
     ------------------------------------------------------------------------ */

  const friendships = await prisma.friendship.findMany({
    where: { userId: user.id },
    select: {
      id: true,
      friendId: true,
    },
  });

  const friendsWithData = await Promise.all(
    friendships.map(async (friendship) => {
      const friendUser = await prisma.user.findUnique({
        where: { id: friendship.friendId },
      });

      return friendUser
        ? { id: friendship.id, user: friendUser }
        : null;
    })
  );

  const friends = friendsWithData.filter(Boolean) as {
    id: string;
    user: typeof user;
  }[];

  const hasFriends = friends.length > 0;

  return (
    <div className="min-h-screen bg-[#0B0D12] text-white">
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* ================================================================
            HEADER
            ================================================================ */}
        <section className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white/60">
              <Users className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">
                Your Circle
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              Friends
            </h1>

            <p className="max-w-xl text-lg text-white/70">
              These are people you resonate with — not followers, not contacts,
              but aligned energy.
            </p>
          </div>

          <FriendInviteButton />
        </section>

        {/* ================================================================
            MOOD — SOCIAL STATE
            ================================================================ */}
        <section>
          <MoodSelector currentMood={user.currentMood} />
        </section>

        {/* ================================================================
            FRIENDS LIST
            ================================================================ */}
        <section className="space-y-6">
          {hasFriends ? (
            <FriendsList friends={friends} />
          ) : (
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-12 sm:p-16 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C7B9FF]/20 to-[#7CF5C8]/20 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-[#C7B9FF]" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">
                Your circle is empty — for now
              </h3>

              <p className="max-w-md mx-auto text-white/70 text-lg mb-8">
                ETHOS connects people through personality, not algorithms.
                Invite people who move like you.
              </p>

              <FriendInviteButton />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}