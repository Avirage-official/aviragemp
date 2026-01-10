"use client";

import { useRouter } from "next/navigation";

interface Conversation {
  id: string;
  otherUser: {
    id: string;
    name: string | null;
    username: string | null;
    primaryCode: string | null;
    avatar: string | null;
  } | null;
  lastMessage: {
    content: string;
    createdAt: Date;
    senderId: string;
  } | null;
  updatedAt: Date;
}

export function ConversationsList({ 
  conversations,
  currentUserId 
}: { 
  conversations: Conversation[],
  currentUserId: string
}) {
  const router = useRouter();
  
  if (conversations.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="font-semibold mb-4 text-gray-900">Conversations</h2>
        <div className="text-center py-12 text-gray-400">
          <div className="text-4xl mb-2">💬</div>
          <p className="text-sm">No messages yet</p>
          <p className="text-xs mt-2">Click "Message" on a friend's card to start chatting</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow p-4 overflow-y-auto">
      <h2 className="font-semibold mb-4 text-gray-900">Conversations</h2>
      
      <div className="space-y-2">
        {conversations.map(conv => {
          if (!conv.otherUser) return null;
          
          const otherUser = conv.otherUser;
          const timeAgo = getTimeAgo(new Date(conv.updatedAt));
          const isFromMe = conv.lastMessage?.senderId === currentUserId;
          
          return (
            <button
              key={conv.id}
              onClick={() => router.push(`/dashboard/messages/${conv.id}`)}
              className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  {(otherUser.name || otherUser.username || "?")[0].toUpperCase()}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <p className="font-semibold text-gray-900 truncate">
                      {otherUser.name || otherUser.username || "Anonymous"}
                    </p>
                    <p className="text-xs text-gray-500 flex-shrink-0 ml-2">
                      {timeAgo}
                    </p>
                  </div>
                  
                  {conv.lastMessage && (
                    <p className="text-sm text-gray-600 truncate">
                      {isFromMe && "You: "}
                      {conv.lastMessage.content}
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  
  return date.toLocaleDateString();
}