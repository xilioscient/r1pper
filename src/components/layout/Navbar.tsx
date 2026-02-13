"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Team", href: "#team" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full flex justify-center pt-0 z-50">
      {/* Container della Navbar - Non scorre, resta in cima */}
      <nav className="relative w-full max-w-5xl bg-black/80 backdrop-blur-md border-b-2 border-cyber-yellow clip-path-cyber-header">
        <div className="flex justify-between items-center h-16 px-10">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-black tracking-tighter text-cyber-yellow hover:opacity-80 transition"
          >
            R1PP<span className="text-white">3R</span>
          </Link>

          {/* Desktop Navigation - Meta schermo */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-[11px] uppercase tracking-[0.25em] font-bold text-white hover:text-cyber-yellow transition-colors group"
              >
                {item.name}
                {/* Decorazione sotto i link */}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-cyber-yellow group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-cyber-yellow"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>

        {/* Elemento Decorativo: Taglio a 45 gradi tipico Cyberpunk */}
        <div className="absolute top-0 right-0 w-8 h-8 bg-cyber-yellow clip-path-accent hidden md:block" />
      </nav>

      {/* Menu Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-16 left-0 w-full bg-black/95 border-b border-cyber-yellow flex flex-col items-center py-10 space-y-6 md:hidden overflow-hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-xl font-bold text-white uppercase tracking-widest hover:text-cyber-yellow"
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        /* Taglio diagonale sui bordi esterni della navbar */
        .clip-path-cyber-header {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 5% 100%, 0 70%);
        }

        /* Accento decorativo giallo nell'angolo */
        .clip-path-accent {
          clip-path: polygon(100% 0, 0 0, 100% 100%);
        }
      `}</style>
    </div>
  );
}
