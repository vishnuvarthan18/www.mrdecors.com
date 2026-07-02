import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MR Decors | Custom Wedding & Event Decor, Erode",
  description:
    "MR Decors — Erode's custom wedding and event decor manufacturer since 2000. Bespoke stage backdrops, CNC & laser-cut decor, and full event styling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text">
        <SmoothScroll>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
        <WhatsAppButton />
      </body>
    </html>
  );
}
