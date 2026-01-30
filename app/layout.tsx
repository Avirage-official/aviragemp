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
    <ClerkProvider
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: '#4F8CFF',
          colorBackground: '#FFFFFF',
          colorInputBackground: '#F8FAFC',
          colorText: '#0F172A',
          borderRadius: '12px',
        },
        elements: {
          card: 'backdrop-blur-xl bg-white/90 border border-white/20 shadow-2xl rounded-3xl',
          headerTitle: 'text-2xl font-bold bg-gradient-to-r from-[#4F8CFF] to-[#C7B9FF] bg-clip-text text-transparent',
          formButtonPrimary: 'bg-gradient-to-r from-[#4F8CFF] to-[#C7B9FF] hover:shadow-lg transition-all duration-300',
          socialButtonsBlockButton: 'border border-gray-200 hover:border-[#4F8CFF]/30 transition-all duration-300',
          footerActionLink: 'text-[#4F8CFF] hover:text-[#C7B9FF] transition-colors',
        }
      }}
    >
      <html lang="en">
        <body className="antialiased bg-[#111827] text-[#FAFAFA]">
          <MainNav />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}