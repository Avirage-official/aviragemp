// components/messages/ConversationsList.tsx
"use client";

import { motion } from "framer-motion";

type Conversation = {
  id: string;
  otherUser: {
    id: string;
    name: string | null;
    username: string | null;
    primaryCode: string | null;
  } | null;
  lastMessage: {
    content: string;
    createdAt: Date;
    senderId: string;
  } | null;
  updatedAt: string;
  lastRead: string;
};

function getTimeAgo(date: string): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return past.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function ConversationCard({
  conversation,
  currentUserId,
  isSelected,
  onClick,
}: {
  conversation: Conversation;
  currentUserId: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  if (!conversation.otherUser) return null;

  const otherUser = conversation.otherUser;
  const displayName = otherUser.name || otherUser.username || "Unknown";
  const initials = displayName.slice(0, 2).toUpperCase();
  
  const isUnread = conversation.lastMessage && 
    new Date(conversation.updatedAt) > new Date(conversation.lastRead) &&
    conversation.lastMessage.senderId !== currentUserId;

  const lastMessagePreview = conversation.lastMessage
    ? conversation.lastMessage.senderId === currentUserId
      ? `You: ${conversation.lastMessage.content}`
      : conversation.lastMessage.content
    : "No messages yet";

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: 4 }}
      className={`w-full text-left p-4 transition-colors relative ${
        isSelected
          ? "bg-white/[0.08]"
          : "hover:bg-white/[0.04]"
      }`}
    >
      {/* Active indicator */}
      {isSelected && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-[#4F8CFF] rounded-r-full" />
      )}

      <div className="flex items-start gap-3 pl-2">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4F8CFF] to-[#C7B9FF] flex items-center justify-center text-white text-sm font-bold">
            {initials}
          </div>
          {isUnread && (
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#7CF5C8] border-2 border-[#0D0D14] flex items-center justify-center">
              <span className="text-[10px] font-bold text-black">1</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className={`text-sm font-semibold truncate ${
              isUnread ? "text-white" : "text-white/90"
            }`}>
              {displayName}
            </h3>
            <span className="text-xs text-white/40 shrink-0">
              {getTimeAgo(conversation.updatedAt)}
            </span>
          </div>
          
          <p className={`text-xs truncate ${
            isUnread ? "text-white/70 font-medium" : "text-white/50"
          }`}>
            {lastMessagePreview}
          </p>
        </div>
      </div>
    </motion.button>
  );
}

export function ConversationsList({
  conversations,
  currentUserId,
  selectedId,
  onSelect,
}: {
  conversations: Conversation[];
  currentUserId: string;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  // Separate NEW (unread) and SEEN conversations
  const newConversations = conversations.filter((conv) => {
    if (!conv.lastMessage) return false;
    return new Date(conv.updatedAt) > new Date(conv.lastRead) &&
           conv.lastMessage.senderId !== currentUserId;
  });

  const seenConversations = conversations.filter((conv) => {
    if (!conv.lastMessage) return true;
    return new Date(conv.updatedAt) <= new Date(conv.lastRead) ||
           conv.lastMessage.senderId === currentUserId;
  });

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="text-5xl mb-4">💬</div>
        <h3 className="text-white font-semibold mb-2">No conversations yet</h3>
        <p className="text-sm text-white/50 max-w-xs">
          Start a conversation with someone from your friends list
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-white/[0.06]">
      {/* NEW Section */}
      {newConversations.length > 0 && (
        <div>
          <div className="px-6 py-3">
            <h2 className="text-[10px] font-bold uppercase tracking-wider text-white/40">
              NEW
            </h2>
          </div>
          <div>
            {newConversations.map((conv) => (
              <ConversationCard
                key={conv.id}
                conversation={conv}
                currentUserId={currentUserId}
                isSelected={selectedId === conv.id}
                onClick={() => onSelect(conv.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* SEEN Section */}
      {seenConversations.length > 0 && (
        <div>
          <div className="px-6 py-3">
            <h2 className="text-[10px] font-bold uppercase tracking-wider text-white/40">
              SEEN
            </h2>
          </div>
          <div>
            {seenConversations.map((conv) => (
              <ConversationCard
                key={conv.id}
                conversation={conv}
                currentUserId={currentUserId}
                isSelected={selectedId === conv.id}
                onClick={() => onSelect(conv.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}