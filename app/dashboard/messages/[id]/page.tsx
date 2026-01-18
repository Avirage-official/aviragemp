// app/dashboard/messages/[id]/page.tsx
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { MessageThread } from "@/components/messages/MessageThread";

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { userId } = await auth();
  const { id } = await params;

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    redirect("/sign-in");
  }

  // Verify user is participant in this conversation
  const participant = await prisma.conversationParticipant.findFirst({
    where: {
      conversationId: id,
      userId: user.id,
    },
  });

  if (!participant) {
    redirect("/dashboard/messages");
  }

  // Get conversation and other participant
  const conversation = await prisma.conversation.findUnique({
    where: { id },
    include: {
      participants: {
        where: { userId: { not: user.id } },
        include: { user: true },
      },
    },
  });

  if (!conversation || !conversation.participants[0]) {
    redirect("/dashboard/messages");
  }

  const otherUser = conversation.participants[0].user;

  return (
    <div className="fixed inset-0 bg-[#0A0A0A]">
      <MessageThread
        conversationId={conversation.id}
        otherUser={{
          id: otherUser.id,
          name: otherUser.name,
          username: otherUser.username,
        }}
        currentUserId={user.id}
        currentUserName={user.name || "You"}
      />
    </div>
  );
}