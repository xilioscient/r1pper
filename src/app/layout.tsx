import type { Metadata } from "next";
import { Orbitron, Space_Grotesk } from "next/font/google";
import "./globals.css";
import LiquidBackground from "@/components/effects/LiquidBackground";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "R1PP3R - Digital Liberation & Research",
  description:
    "Esplorando i confini del digitale. Ricerca, analisi e comprensione dei sistemi. Un viaggio oltre la superficie del codice.",
  keywords: [
    "sicurezza",
    "privacy",
    "ricerca",
    "analisi",
    "sistemi",
    "codice",
    "digitale",
    "cyberspazio",
  ],
  authors: [{ name: "Alessandro Faraone" }],
  openGraph: {
    title: "R1PP3R - Digital Liberation & Research",
    description:
      "Esplorando i confini del digitale. Ricerca, analisi e comprensione dei sistemi.",
    images: ["/images/team/profile.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "R1PP3R - Digital Liberation & Research",
    description:
      "Esplorando i confini del digitale. Ricerca, analisi e comprensione dei sistemi.",
    images: ["/images/team/profile.jpg"],
  },
  themeColor: "#00ffc4",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body
        className={`${orbitron.variable} ${spaceGrotesk.variable} font-sans bg-cyber-void text-cyber-neon min-h-screen relative`}
      >
        <div className="scanline" />
        <div className="matrix-bg fixed inset-0 pointer-events-none opacity-5" />
        <LiquidBackground />
        {children}
      </body>
    </html>
  );
}
