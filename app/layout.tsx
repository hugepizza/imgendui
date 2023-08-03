import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { createContext, useContext, useState } from "react";
import { ThemeProvider } from "./contexts/theme_code";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Imgen App",
  description: "A simple markdown tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <html lang="en">
        <body className={inter.className}>
          <main className="flex flex-col h-screen">
            {children}
          </main>
        </body>
      </html>
    </ThemeProvider>
  );
}
