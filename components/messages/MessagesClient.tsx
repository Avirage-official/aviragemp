// components/messages/MessagesClient.tsx
"use client";

import { useState } from "react";
import { ConversationsList } from "./ConversationsList";
import { MessageThread } from "./MessageThread";
import { NewMessageButton } from "./NewMessageButton";
import { ChatCircle, ArrowLeft } from "@phosphor-icons/react";

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

  // Mobile: show chat when conversation selected, otherwise show sidebar
  const showSidebar = !selectedConversationId;

  const handleSelectConversation = (id: string) => {
    setSelectedConversationId(id);
  };

  const handleBackToList = () => {
    setSelectedConversationId(null);
  };

  return (
    <div className="fixed inset-0 bg-[#0A0A0A] flex">
      {/* Left Sidebar - Conversations List */}
      <div 
        className={`
          ${showSidebar ? 'flex' : 'hidden'} lg:flex
          w-full lg:w-[380px] 
          border-r border-white/[0.06] 
          flex-col 
          bg-[#0D0D14]
        `}
      >
        {/* Header */}
        <div className="p-4 lg:p-5 border-b border-white/[0.06] space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-base lg:text-lg font-bold text-white">Messages</h1>
            <NewMessageButton />
          </div>
          <div className="flex items-center gap-2">
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
            onSelect={handleSelectConversation}
          />
        </div>
      </div>

      {/* Right Main Chat Area */}
      <div 
        className={`
          ${!showSidebar ? 'flex' : 'hidden'} lg:flex
          flex-1 
          flex-col
        `}
      >
        {selectedConversation && selectedConversation.otherUser ? (
          <div className="flex flex-col h-full">
            {/* Mobile back button */}
            <div className="lg:hidden p-4 border-b border-white/[0.06] flex items-center gap-3">
              <button
                onClick={handleBackToList}
                className="p-2 rounded-lg hover:bg-white/[0.08] transition-colors"
              >
                <ArrowLeft weight="bold" className="w-5 h-5 text-white" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4F8CFF] to-[#C7B9FF] flex items-center justify-center text-white text-sm font-bold">
                  {(selectedConversation.otherUser.name || selectedConversation.otherUser.username || "?").slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-base font-semibold text-white">
                    {selectedConversation.otherUser.name || selectedConversation.otherUser.username || "Unknown"}
                  </h2>
                  <p className="text-xs text-white/50">Online</p>
                </div>
              </div>
            </div>

            {/* Message thread */}
            <div className="flex-1 overflow-hidden">
              <MessageThread
                conversationId={selectedConversation.id}
                otherUser={selectedConversation.otherUser}
                currentUserId={currentUserId}
                currentUserName={currentUserName}
              />
            </div>
          </div>
        ) : (
          // Empty state
          <div className="flex-1 flex items-center justify-center p-6">
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