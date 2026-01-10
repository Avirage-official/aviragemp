import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Top Nav */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold text-white">ETHOS</h1>
            
            <div className="flex gap-6">
              <Link href="/dashboard" className="text-white/80 hover:text-white">
                Your Code
              </Link>
              <Link href="/dashboard/friends" className="text-white/80 hover:text-white">
                Friends
              </Link>
              <Link href="/dashboard/meetups" className="text-white/80 hover:text-white">
                Meetups
              </Link>
              <Link href="/dashboard/messages" className="text-white/80 hover:text-white">
                Messages
              </Link>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/marketplace" className="text-white/80 hover:text-white">
              Marketplace
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}