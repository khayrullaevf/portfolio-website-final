import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ScrollProgressIndicator } from "@/components/scroll-progress-indicator";
import { AnimationProvider } from "@/contexts/animation-context";
import { Toaster } from "@/components/ui/toaster";
import { getMetaInfo } from "@/lib/data";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const metaInfo = await getMetaInfo();
  return {
    title: metaInfo.title,
    description: metaInfo.description,
    keywords: [
      "Fazliddin Khayrullaev",
      "Fazliddin Xayrullayev",
      "developer",
      "portfolio",
      "React",
      "Next.js",
      "web developer",
    ],
    authors: [{ name: "Fazliddin Khayrullaev" }],
    openGraph: {
      title: metaInfo.title,
      description: metaInfo.description,
      type: "website",
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AnimationProvider>
          <ScrollProgressIndicator />
          {children}
          <Toaster />
        </AnimationProvider>
      </body>
    </html>
  );
}
