import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function InvitePage({ 
  params 
}: { 
  params: { token: string } 
}) {
  const { userId } = await auth();
  
  if (!userId) {
    // Redirect to sign up with invite token in URL
    redirect(`/sign-up?invite=${params.token}`);
  }
  
  const user = await prisma.user.findUnique({
    where: { clerkId: userId }
  });
  
  if (!user) {
    redirect("/onboarding");
  }
  
  // Extract sender ID from token
  const senderId = params.token.split("-")[0];
  
  // Check if already friends
  const existingFriendship = await prisma.friendship.findFirst({
    where: {
      OR: [
        { userId: user.id, friendId: senderId },
        { userId: senderId, friendId: user.id }
      ]
    }
  });
  
  if (existingFriendship) {
    redirect("/dashboard/friends?already=true");
  }
  
  // Create friendship (bidirectional)
  await prisma.friendship.createMany({
    data: [
      { userId: user.id, friendId: senderId },
      { userId: senderId, friendId: user.id }
    ]
  });
  
  // Create notification for sender
  await prisma.notification.create({
    data: {
      userId: senderId,
      type: "FRIEND_ACCEPTED",
      title: "Friend request accepted",
      message: `${user.name || user.username} accepted your friend invite!`,
      linkTo: "/dashboard/friends"
    }
  });
  
  redirect("/dashboard/friends?success=true");
}