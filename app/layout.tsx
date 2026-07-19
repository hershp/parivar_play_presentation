import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Game Night — Interactive Presentation",
  description: "An animated, page-by-page guide to eight multiplayer games and their scoring system.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Game Night — Interactive Presentation",
    description: "Eight games, animated rules, and one leaderboard.",
    type: "website",
    images: [{ url: "/og-game-night.png", width: 1731, height: 909, alt: "Game Night interactive presentation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Game Night — Interactive Presentation",
    description: "Eight games, animated rules, and one leaderboard.",
    images: ["/og-game-night.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
