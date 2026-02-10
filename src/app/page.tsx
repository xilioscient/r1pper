"use client";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Team from "@/components/sections/Team";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import OpenAICarousel from "@/components/sections/OpenAICarousel";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Team />
      <OpenAICarousel />
      <Contact />
      <Footer />
    </main>
  );
}
