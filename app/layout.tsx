import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProviderClient } from "@/components/sessionProviderClient";
import { SiteNav } from "@/components/sitenav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "List Application",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProviderClient>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <SiteNav/>
          {children}
        </body>
      </SessionProviderClient>
    </html>
  );
}
