import type React from "react";
import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ScrollProgressIndicator } from "@/components/scroll-progress-indicator";
import { ViewTransitionListener } from "@/components/view-transition";
import { AnimationProvider } from "@/contexts/animation-context";
import { Toaster } from "@/components/ui/toaster";
import { getMetaInfo } from "@/lib/data";

// Three voices: serif for display, tight sans for reading, mono for metadata.
// Each is exposed as a CSS variable that tailwind.config.ts maps to a family,
// so no component ever references a font file directly.
const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0b",
};

export async function generateMetadata(): Promise<Metadata> {
  const metaInfo = await getMetaInfo();
  return {
    // Set NEXT_PUBLIC_SITE_URL in the deploy environment so OG/canonical URLs
    // resolve absolutely; localhost is only a development fallback.
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
    ),
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
    twitter: {
      card: "summary_large_image",
      title: metaInfo.title,
      description: metaInfo.description,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} ${mono.variable}`}
    >
      <body className="font-sans antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <AnimationProvider>
          <ViewTransitionListener />
          <ScrollProgressIndicator />
          {children}
          <Toaster />
        </AnimationProvider>
      </body>
    </html>
  );
}
