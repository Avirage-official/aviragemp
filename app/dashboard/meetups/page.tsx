import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { MeetupsList } from "@/components/meetups/MeetupsList";
import { CreateMeetupButton } from "@/components/meetups/CreateMeetupButton";
import { CalendarDays } from "lucide-react";

export default async function MeetupsPage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-10 text-white/70">
        You need to be signed in to view meetups.
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

  // Meetups — DO NOT TYPE THIS
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

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-white/60">
            <CalendarDays className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider">
              Real-world moments
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold text-white">
            Meetups
          </h1>

          <p className="text-white/60 max-w-xl">
            Plans don’t start with dates — they start with energy.
          </p>
        </div>

        <CreateMeetupButton friends={friends as any[]} />
      </section>

      {/* LIST */}
      <MeetupsList
        meetups={meetups}
        currentUserId={user.id}
      />
    </div>
  );
}