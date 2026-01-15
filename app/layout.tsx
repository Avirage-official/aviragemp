import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { MainNav } from "@/components/navigation/MainNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "ETHOS - Discover Your Mythical Code",
  description: "Connect with personality-matched experiences and people",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased bg-[#111827] text-[#FAFAFA]">
          <MainNav />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}