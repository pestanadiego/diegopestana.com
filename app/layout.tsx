import { Analytics } from "@vercel/analytics/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Navbar } from "./components/navbar";
import "./globals.css";
import "react-tweet/theme.css";

export const metadata: Metadata = {
  title: "Diego Pestana",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} scroll-smooth`}>
      <body className="mx-auto mt-8 mb-40 max-w-2xl px-4 font-sans antialiased">
        <main className="mt-6 flex min-w-0 flex-auto flex-col px-2 md:px-0">
          <Navbar />
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}
