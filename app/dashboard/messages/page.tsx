// app/dashboard/messages/page.tsx
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { MessagesClient } from "@/components/messages/MessagesClient";

export default async function MessagesPage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-white/70">Please sign in to access messages</p>
      </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-white/70">User not found</p>
      </div>
    );
  }

  // Fetch conversations
  const conversationParticipants = await prisma.conversationParticipant.findMany({
    where: { userId: user.id },
    include: {
      conversation: {
        include: {
          participants: {
            where: { userId: { not: user.id } },
            include: { user: true },
          },
          messages: {
            orderBy: { createdAt: "desc" },
            take: 1,
            include: { sender: true },
          },
        },
      },
    },
    orderBy: {
      conversation: { updatedAt: "desc" },
    },
  });

  const conversations = conversationParticipants.map((cp) => ({
    id: cp.conversation.id,
    otherUser: cp.conversation.participants[0]?.user || null,
    lastMessage: cp.conversation.messages[0] || null,
    updatedAt: cp.conversation.updatedAt.toISOString(),
    lastRead: cp.lastRead.toISOString(),
  }));

  return (
    <MessagesClient 
      conversations={conversations} 
      currentUserId={user.id}
      currentUserName={user.name || "You"}
    />
  );
}