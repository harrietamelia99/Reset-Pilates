import type { Metadata } from "next";
import { IBM_Plex_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { DevHostHint } from "@/components/DevHostHint";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PreLaunchBanner } from "@/components/PreLaunchBanner";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

/** Loads as `--font-accent` until self-hosted Anca Coder files are added to `/public/fonts/` (see `globals.css`). */
const accentMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-accent",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://resetpilatesstudio.co.uk"),
  title: "Reset Pilates Studio | Reformer & Hot Mat Pilates in Nailsea",
  description:
    "Premium boutique Pilates in Nailsea, North Somerset. Reformer, hot mat and mat Pilates — opening June 2026.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Reset Pilates Studio",
    title: "Reset Pilates Studio | Reformer & Hot Mat Pilates in Nailsea",
    description:
      "Premium boutique Pilates in Nailsea, North Somerset. Reformer, hot mat and mat Pilates.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reset Pilates Studio",
    description:
      "Premium boutique Pilates in Nailsea — reformer, hot mat & mat Pilates.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${playfair.variable} ${accentMono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <PreLaunchBanner />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <DevHostHint />
      </body>
    </html>
  );
}
