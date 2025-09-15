import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ScrollProgressIndicator } from "@/components/scroll-progress-indicator";
import { AnimationProvider } from "@/contexts/animation-context";
import { MagneticCursor } from "@/components/magnetic-cursor";
import { getMetaInfo } from "@/lib/data";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

const metaInfo = getMetaInfo();

export const metadata: Metadata = {
  title: metaInfo.title,
  description: metaInfo.description,
  generator: "v0.app",
};

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
          <MagneticCursor />
          <Head>
            <title>Fazliddin Khayrullaev - Portfolio</title>
            <meta
              name="description"
              content="Fazliddin Khayrullaev - Full Stack Developer portfolio. Web dasturlash, React, Next.js bo'yicha loyihalar."
            />
            <meta
              name="keywords"
              content="Fazliddin Khayrullaev,Fazliddin Xayrullayev developer, portfolio, React, Next.js, web developer"
            />
            <meta name="author" content="Fazliddin Khayrullaev" />
            <meta
              property="og:title"
              content="Fazliddin Khayrullaev - Portfolio"
            />
            <meta
              property="og:description"
              content="Professional web developer portfolio"
            />
            <meta property="og:type" content="website" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
          {children}
        </AnimationProvider>
      </body>
    </html>
  );
}
