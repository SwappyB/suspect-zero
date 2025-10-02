import type { Metadata } from "next";
import "./globals.css";
import { MultiplayerGameProvider } from "@/context/MultiplayerGameContext";

export const metadata: Metadata = {
  title: "The Blackwood Estate Murder",
  description: "A murder mystery game for two players",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <MultiplayerGameProvider>
          {children}
        </MultiplayerGameProvider>
      </body>
    </html>
  );
}
