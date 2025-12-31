import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AVIRAGE - Choose Your Destiny",
  description: "Discover your cultural code and enter a world tailored just for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
