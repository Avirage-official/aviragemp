import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { ConversationsList } from "@/components/messages/ConversationsList";
import { MessageCircle } from "lucide-react";

export default async function MessagesPage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-10 text-white/70">
        You need to be signed in to access messages.
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
   * Fetch conversations
   */
  const conversationParticipants =
    await prisma.conversationParticipant.findMany({
      where: { userId: user.id },
      include: {
        conversation: {
          include: {
            participants: {
              where: {
                userId: { not: user.id },
              },
              include: {
                user: true,
              },
            },
            messages: {
              orderBy: { createdAt: "desc" },
              take: 1,
              include: {
                sender: true,
              },
            },
          },
        },
      },
      orderBy: {
        conversation: {
          updatedAt: "desc",
        },
      },
    });

  const conversations = conversationParticipants.map((cp) => ({
    id: cp.conversation.id,
    otherUser: cp.conversation.participants[0]?.user || null,
    lastMessage: cp.conversation.messages[0] || null,
    updatedAt: cp.conversation.updatedAt,
  }));

  const hasConversations = conversations.length > 0;

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <section className="space-y-2">
        <div className="flex items-center gap-3 text-white/70">
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm uppercase tracking-wider">
            Conversations
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-semibold text-white">
          Messages
        </h1>

        <p className="text-white/60 max-w-xl">
          Conversations with people you resonate with. No noise, no feeds —
          just direct connection.
        </p>
      </section>

      {/* MAIN GRID */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[70vh]">
        {/* CONVERSATIONS LIST */}
        <div className="md:col-span-1 rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden">
          {hasConversations ? (
            <ConversationsList
              conversations={conversations}
              currentUserId={user.id}
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center">
              <p className="text-white/60 mb-2">
                No conversations yet
              </p>
              <p className="text-sm text-white/40 max-w-xs">
                When you connect with friends on ETHOS, your conversations
                will live here.
              </p>
            </div>
          )}
        </div>

        {/* MESSAGE THREAD PLACEHOLDER */}
        <div className="md:col-span-2 rounded-3xl border border-white/10 bg-white/[0.02] flex items-center justify-center">
          <div className="text-center space-y-4 max-w-md">
            <div className="mx-auto w-14 h-14 rounded-full bg-white/5 flex items-center justify-center">
              <MessageCircle className="w-7 h-7 text-white/50" />
            </div>

            <h3 className="text-lg font-medium text-white">
              Select a conversation
            </h3>

            <p className="text-white/60 text-sm">
              Choose a conversation from the left to start messaging.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}