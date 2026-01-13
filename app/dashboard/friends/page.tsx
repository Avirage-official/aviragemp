import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { FriendInviteButton } from "@/components/friends/FriendInviteButton";
import { FriendsList } from "@/components/friends/FriendsList";
import { MoodSelector } from "@/components/friends/MoodSelector";
import { Users } from "lucide-react";

export default async function FriendsPage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-10 text-white/70">
        You need to be signed in to view your circle.
      </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-10 animate-pulse">
        <div className="h-6 w-48 bg-white/10 rounded mb-4" />
        <div className="h-4 w-80 bg-white/5 rounded" />
      </div>
    );
  }

  /**
   * Fetch friendships
   */
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
        ? {
            id: friendship.id,
            user: friendUser,
          }
        : null;
    })
  );

  const friends = friendsWithData.filter(Boolean) as {
    id: string;
    user: NonNullable<typeof user>;
  }[];

  const hasFriends = friends.length > 0;

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-white/70">
            <Users className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider">
              Your Circle
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold text-white">
            Friends
          </h1>

          <p className="text-white/60 max-w-xl">
            These are the people you resonate with — not followers, not
            contacts, but aligned energy.
          </p>
        </div>

        <FriendInviteButton />
      </section>

      {/* MOOD */}
      <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
        <MoodSelector currentMood={user.currentMood} />
      </section>

      {/* FRIENDS LIST */}
      <section className="space-y-6">
        {hasFriends ? (
          <FriendsList friends={friends} />
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-12 text-center">
            <h3 className="text-xl font-medium text-white mb-3">
              Your circle is empty — for now
            </h3>
            <p className="text-white/60 max-w-md mx-auto mb-6">
              ETHOS connects you through personality, not algorithms. Invite
              people who move like you.
            </p>
            <FriendInviteButton />
          </div>
        )}
      </section>
    </div>
  );
}
