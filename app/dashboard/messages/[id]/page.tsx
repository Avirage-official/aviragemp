import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { MessageThread } from "@/components/messages/MessageThread";
import { MessageInput } from "@/components/messages/MessageInput";
import { redirect } from "next/navigation";

export default async function ConversationPage({
  params,
}: {
  params: { id: string };
}) {
  const { userId } = await auth();
  const conversationId = params.id;

  if (!userId) redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });
  if (!user) redirect("/onboarding");

  const conversation = await prisma.conversation.findUnique({
    where: { id: params.id },
    include: {
      participants: { include: { user: true } },
      messages: {
        include: { sender: true },
        orderBy: { createdAt: "asc" },
        take: 100,
      },
    },
  });

  if (!conversation) redirect("/dashboard/messages");

  const otherUser = conversation.participants.find(
    (p) => p.userId !== user.id
  )?.user;

  if (!otherUser) redirect("/dashboard/messages");

  return (
    <section className="flex h-[calc(100vh-4rem)] flex-col bg-black">
      {/* HEADER */}
      <div className="flex items-center gap-3 border-b border-white/10 px-6 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-sm font-semibold text-white">
          {(otherUser.name || otherUser.username || "?")[0]}
        </div>
        <div>
          <p className="text-sm font-medium text-white">
            {otherUser.name || otherUser.username}
          </p>
          {otherUser.primaryCode && (
            <p className="text-xs text-white/40">
              {otherUser.primaryCode}
            </p>
          )}
        </div>
      </div>

      {/* THREAD */}
      <MessageThread
        messages={conversation.messages}
        currentUserId={user.id}
        conversationId={conversation.id}
      />

      {/* INPUT */}
      <MessageInput conversationId={conversation.id} />
    </section>
  );
}
