"use client";

import { motion } from "framer-motion";
import SocialLinks from "../sections/SocialLinks";
import Link from "next/link";

const quickLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Team", href: "#team" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black pb-12 pt-20">
      {/* Grid di sfondo molto leggera */}
      <div className="absolute inset-0 cyber-grid opacity-5 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* 1. Brand Section */}
          <div className="flex flex-col space-y-4">
            <h2 className="text-2xl font-black tracking-tighter text-cyber-yellow">
              THE <span className="text-white">EYE</span>
            </h2>
            <p className="text-xs text-white/40 uppercase tracking-widest leading-relaxed max-w-[250px]">
              Advanced digital interface protocol. Authorized access only.
            </p>
          </div>

          {/* 2. Navigation Section - Centrata */}
          <div className="flex flex-col md:items-center space-y-4">
            <h3 className="text-[10px] font-bold text-cyber-yellow uppercase tracking-[0.3em]">
              Quick_Links
            </h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs uppercase font-medium text-white/60 hover:text-cyber-yellow transition-colors tracking-wider"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* 3. Social & Status Section - Allineata a destra */}
          <div className="flex flex-col md:items-end space-y-6">
            <div className="flex flex-col md:items-end">
              <h3 className="text-[10px] font-bold text-cyber-yellow uppercase tracking-[0.3em] mb-4">
                Connect
              </h3>
              <SocialLinks />
            </div>

            {/* Copyright con stile terminale */}
            <div className="md:text-right">
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-tighter">
                [SYSTEM STATUS:{" "}
                <span className="text-cyber-yellow animate-pulse">ONLINE</span>]
              </p>
              <p className="text-[10px] font-mono text-white/30 uppercase">
                © {new Date().getFullYear()} THE EYE.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
