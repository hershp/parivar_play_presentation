import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Parivar Play — Interactive Presentation",
  description: "An animated, page-by-page guide to nine multiplayer games and their scoring system.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Parivar Play — Interactive Presentation",
    description: "Nine games, animated rules, and one leaderboard.",
    type: "website",
    images: [{ url: "/og-parivar-play-new-logo.png", width: 1720, height: 914, alt: "Chalo! Madiye Ramiye Jaaniye — Parivar Play interactive presentation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Parivar Play — Interactive Presentation",
    description: "Nine games, animated rules, and one leaderboard.",
    images: ["/og-parivar-play-new-logo.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
