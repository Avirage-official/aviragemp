// components/messages/MessagesClient.tsx
"use client";

import { useState, useEffect } from "react";
import { ConversationsList } from "./ConversationsList";
import { MessageThread } from "./MessageThread";
import { ChatCircle } from "@phosphor-icons/react";

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

export function MessagesClient({
  conversations,
  currentUserId,
  currentUserName,
}: {
  conversations: Conversation[];
  currentUserId: string;
  currentUserName: string;
}) {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  
  const selectedConversation = conversations.find((c) => c.id === selectedConversationId);

  return (
    <div className="fixed inset-0 bg-[#0A0A0A] flex">
      {/* Left Sidebar - Conversations List */}
      <div className="w-[380px] border-r border-white/[0.06] flex flex-col bg-[#0D0D14]">
        {/* Header */}
        <div className="p-5 border-b border-white/[0.06]">
          <h1 className="text-lg font-bold text-white">Messages</h1>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 rounded-full bg-[#7CF5C8]" />
            <span className="text-xs text-white/50">{conversations.length} conversations</span>
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          <ConversationsList
            conversations={conversations}
            currentUserId={currentUserId}
            selectedId={selectedConversationId}
            onSelect={setSelectedConversationId}
          />
        </div>
      </div>

      {/* Right Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation && selectedConversation.otherUser ? (
          <MessageThread
            conversationId={selectedConversation.id}
            otherUser={selectedConversation.otherUser}
            currentUserId={currentUserId}
            currentUserName={currentUserName}
          />
        ) : (
          // Empty state
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/[0.03] flex items-center justify-center mx-auto mb-4">
                <ChatCircle weight="duotone" className="w-8 h-8 text-white/30" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                No conversation selected
              </h3>
              <p className="text-sm text-white/50">
                Choose a conversation from the sidebar to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}