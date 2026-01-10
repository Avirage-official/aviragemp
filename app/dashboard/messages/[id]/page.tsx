import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { MessageThread } from "@/components/messages/MessageThread";
import { MessageInput } from "@/components/messages/MessageInput";
import { redirect } from "next/navigation";

export default async function ConversationPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { userId } = await auth();
  const { id: conversationId } = await params;
  
  if (!userId) {
    redirect("/sign-in");
  }
  
  const user = await prisma.user.findUnique({
    where: { clerkId: userId }
  });
  
  if (!user) {
    redirect("/onboarding");
  }
  
  const messages = await prisma.message.findMany({
    where: { conversationId },
    include: { sender: true },
    orderBy: { createdAt: "asc" },
    take: 100 // Last 100 messages
  });
  
  const conversation = await prisma.conversation.findUnique({
    where: { id: conversationId },
    include: {
      participants: {
        where: { userId: { not: user.id } },
        include: { user: true }
      }
    }
  });
  
  if (!conversation) {
    redirect("/dashboard/messages");
  }
  
  const otherUser = conversation.participants[0]?.user;
  
  if (!otherUser) {
    redirect("/dashboard/messages");
  }
  
  return (
    <div className="flex flex-col h-[calc(100vh-100px)]">
      {/* Header */}
      <div className="bg-white border-b p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
            {(otherUser.name || otherUser.username || "?")[0].toUpperCase()}
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">
              {otherUser.name || otherUser.username}
            </h2>
            <p className="text-sm text-gray-600">{otherUser.primaryCode}</p>
          </div>
        </div>
      </div>
      
      {/* Messages */}
      <MessageThread 
        messages={messages} 
        currentUserId={user.id}
        conversationId={conversationId}
      />
      
      {/* Input */}
      <MessageInput conversationId={conversationId} />
    </div>
  );
}