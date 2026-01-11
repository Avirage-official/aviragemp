import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { MeetupsList } from "@/components/meetups/MeetupsList";
import { CreateMeetupButton } from "@/components/meetups/CreateMeetupButton";

export default async function MeetupsPage() {
  const { userId } = await auth();
  
  if (!userId) {
    return <div>Not authenticated</div>;
  }
  
  const user = await prisma.user.findUnique({
    where: { clerkId: userId }
  });

  if (!user) {
    return <div>Loading...</div>;
  }

  // Get user's friends for private meetup invites
  const friendships = await prisma.friendship.findMany({
    where: { userId: user.id }
  });

  const friends = await Promise.all(
    friendships.map(async (friendship) => {
      const friendUser = await prisma.user.findUnique({
        where: { id: friendship.friendId }
      });
      return friendUser;
    })
  );

  // Get all meetups user can see
  const meetups = await prisma.meetup.findMany({
    where: {
      OR: [
        { isPublic: true }, // Public meetups
        { hostId: user.id }, // Meetups user created
        { 
          participants: {
            some: { userId: user.id } // Meetups user was invited to
          }
        }
      ],
      scheduledAt: {
        gte: new Date() // Only future meetups
      }
    },
    include: {
      host: true,
      participants: {
        include: {
          user: true
        }
      }
    },
    orderBy: {
      scheduledAt: "asc"
    }
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Meetups</h1>
        <CreateMeetupButton friends={friends.filter(f => f !== null)} />
      </div>
      
      <MeetupsList 
        meetups={meetups}
        currentUserId={user.id}
        userCode={user.primaryCode}
      />
    </div>
  );
}