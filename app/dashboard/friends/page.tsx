import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { FriendInviteButton } from "@/components/friends/FriendInviteButton";
// import { FriendsList } from "@/components/friends/FriendsList";
// import { MoodSelector } from "@/components/friends/MoodSelector";

export default async function FriendsPage() {
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

  // Get friends with their details
  const friendships = await prisma.friendship.findMany({
    where: { userId: user.id },
    include: {
      user: true
    }
  });

  // Map to get the friend user data
  const friendsWithData = await Promise.all(
    friendships.map(async (friendship) => {
      const friendUser = await prisma.user.findUnique({
        where: { id: friendship.friendId }
      });
      return {
        id: friendship.id,
        user: friendUser!
      };
    })
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Friends</h1>
        <FriendInviteButton />
      </div>
      
      {/* <MoodSelector currentMood={user.currentMood} /> */}
      
      {/* <FriendsList friends={friendsWithData} /> */}
      
      <p>Testing FriendInviteButton only...</p>
    </div>
  );
}