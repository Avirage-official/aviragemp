import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { MainNav } from "@/components/navigation/MainNav";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
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
        <body className="antialiased">
          <MainNav />
          <Breadcrumbs />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}