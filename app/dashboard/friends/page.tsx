import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { FriendInviteButton } from "@/components/friends/FriendInviteButton";
import { FriendsList } from "@/components/friends/FriendsList";
import { MoodSelector } from "@/components/friends/MoodSelector";
import { Users, Sparkles } from "lucide-react";

/* ============================================================================
   FRIENDS PAGE — Your Circle
   Lifestyle-first, light, warm, human
   ============================================================================ */

export default async function FriendsPage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="card-glow max-w-xl">
        <p className="text-sm text-[var(--text-muted)]">
          You need to be signed in to view your circle.
        </p>
      </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    return (
      <div className="card-glow animate-pulse space-y-4 max-w-xl">
        <div className="h-6 w-48 bg-black/5 rounded-lg" />
        <div className="h-4 w-72 bg-black/5 rounded-lg" />
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
    <div className="space-y-12">
      {/* ================================================================
          HEADER
          ================================================================ */}
      <section className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[var(--text-muted)]">
            <Users className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider">
              Your Circle
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-semibold text-black">
            Friends
          </h1>

          <p className="max-w-xl text-[var(--text-secondary)]">
            These are people you resonate with — not followers, not contacts,
            but aligned energy.
          </p>
        </div>

        <FriendInviteButton />
      </section>

      {/* ================================================================
          MOOD — SOCIAL STATE
          ================================================================ */}
      <section className="card-glow">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-[var(--ethos-lavender)]" />
          <h2 className="text-lg font-medium text-black">
            Your current vibe
          </h2>
        </div>

        <MoodSelector currentMood={user.currentMood} />
      </section>

      {/* ================================================================
          FRIENDS LIST
          ================================================================ */}
      <section className="space-y-6">
        {hasFriends ? (
          <FriendsList friends={friends} />
        ) : (
          <div className="card-glow text-center py-14">
            <h3 className="text-xl font-medium text-black mb-3">
              Your circle is empty — for now
            </h3>

            <p className="max-w-md mx-auto text-[var(--text-secondary)] mb-8">
              ETHOS connects people through personality, not algorithms.
              Invite people who move like you.
            </p>

            <FriendInviteButton />
          </div>
        )}
      </section>
    </div>
  );
}
