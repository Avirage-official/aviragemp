import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

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

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Messages</h1>
      
      <div className="grid grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Conversations list */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold mb-4">Conversations</h2>
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-2">💬</div>
            <p className="text-sm">No messages yet</p>
          </div>
        </div>
        
        {/* Message thread */}
        <div className="col-span-2 bg-white rounded-lg shadow flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">✉️</div>
            <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
            <p className="text-gray-600">
              Direct messaging with your friends
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}