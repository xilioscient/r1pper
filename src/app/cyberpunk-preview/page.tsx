"use client"; // <--- QUESTA RIGA È FONDAMENTALE

import SectionTitle from "@/components/ui/SectionTitle";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import OpenAICarousel from "@/components/sections/OpenAICarousel";

export default function CyberpunkPreview() {
  return (
    <div className="bg-cyber-void text-cyber-neon min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <SectionTitle
          title="Cyberpunk Preview"
          subtitle="Esplora il design e il progetto"
        />
        <Hero />
        <About />
      </main>
    </div>
  );
}
