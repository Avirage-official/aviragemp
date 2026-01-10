import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { ConversationsList } from "@/components/messages/ConversationsList";

export default async function MessagesPage() {
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

  // Get user's conversations
  const conversationParticipants = await prisma.conversationParticipant.findMany({
    where: { userId: user.id },
    include: {
      conversation: {
        include: {
          participants: {
            where: {
              userId: { not: user.id } // Other participants
            },
            include: {
              user: true
            }
          },
          messages: {
            orderBy: { createdAt: "desc" },
            take: 1, // Last message preview
            include: {
              sender: true
            }
          }
        }
      }
    },
    orderBy: {
      conversation: {
        updatedAt: "desc"
      }
    }
  });

  const conversations = conversationParticipants.map(cp => ({
    id: cp.conversation.id,
    otherUser: cp.conversation.participants[0]?.user || null,
    lastMessage: cp.conversation.messages[0] || null,
    updatedAt: cp.conversation.updatedAt
  }));

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Messages</h1>
      
      <div className="grid grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Conversations list */}
        <ConversationsList 
          conversations={conversations}
          currentUserId={user.id}
        />
        
        {/* Message thread - shown when conversation selected */}
        <div className="col-span-2 bg-white rounded-lg shadow flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-6xl mb-4">💬</div>
            <p className="text-lg">Select a conversation to start messaging</p>
          </div>
        </div>
      </div>
    </div>
  );
}