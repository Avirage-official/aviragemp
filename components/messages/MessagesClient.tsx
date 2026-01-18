// components/messages/MessagesClient.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { ConversationsList } from "./ConversationsList";
import { MessageThread } from "./MessageThread";
import { NewMessageButton } from "./NewMessageButton";
import { 
  ChatCircle, 
  ArrowLeft,
  House,
  Storefront,
  Sparkle,
  List,
  X,
} from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";

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

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: House },
  { href: "/marketplace", label: "Marketplace", icon: Storefront },
  { href: "/dashboard/messages", label: "Messages", icon: ChatCircle },
];

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
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
    <div className="fixed inset-0 bg-[#0A0A0A] flex flex-col">
      {/* Top Navigation */}
      <nav className="h-16 border-b border-white/[0.06] bg-[#0A0A0A]/95 backdrop-blur-xl shrink-0 z-50">
        <div className="h-full flex items-center justify-between gap-4 px-4 lg:px-8">
          
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 lg:gap-3 group shrink-0">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-[#4F8CFF] to-[#C7B9FF] opacity-70 blur group-hover:opacity-100 transition-opacity" />
              <div className="relative flex h-9 w-9 lg:h-10 lg:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#4F8CFF] to-[#C7B9FF]">
                <Sparkle weight="fill" className="h-4 w-4 lg:h-5 lg:w-5 text-black" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg lg:text-xl font-bold tracking-tight text-white group-hover:text-[#4F8CFF] transition-colors">
                ETHOS
              </span>
              <span className="text-xs text-white/30 font-normal tracking-wide hidden lg:block">
                your universe
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1.5">
            {NAV_ITEMS.map((item) => {
              const active = pathname?.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    group relative flex items-center gap-2.5 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-200
                    ${
                      active
                        ? "bg-white/[0.08] text-white"
                        : "text-white/70 hover:text-white hover:bg-white/[0.04]"
                    }
                  `}
                >
                  <Icon
                    weight={active ? "fill" : "regular"}
                    className={`h-4 w-4 transition-colors ${
                      active ? "text-[#4F8CFF]" : ""
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:block">
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9 lg:w-10 lg:h-10 ring-2 ring-white/20 hover:ring-[#4F8CFF]/50 transition-all",
                  },
                }}
              />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/[0.08] transition-all"
            >
              {mobileMenuOpen ? (
                <X weight="bold" className="w-6 h-6" />
              ) : (
                <List weight="bold" className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/[0.06] bg-[#0A0A0A] absolute top-16 left-0 right-0 z-50"
            >
              <div className="px-4 py-3 space-y-1">
                {NAV_ITEMS.map((item) => {
                  const active = pathname?.startsWith(item.href);
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`
                        flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all
                        ${
                          active
                            ? "bg-white/[0.08] text-white"
                            : "text-white/70 hover:text-white hover:bg-white/[0.04]"
                        }
                      `}
                    >
                      <Icon
                        weight={active ? "fill" : "regular"}
                        className={`h-5 w-5 ${active ? "text-[#4F8CFF]" : ""}`}
                      />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}

                {/* User button in mobile menu */}
                <div className="sm:hidden pt-3 border-t border-white/[0.06] mt-3">
                  <div className="flex items-center gap-3 px-4 py-2">
                    <UserButton
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          avatarBox: "w-10 h-10",
                        },
                      }}
                    />
                    <span className="text-sm text-white/70">Account</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Messages Area */}
      <div className="flex-1 flex overflow-hidden">
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
    </div>
  );
}