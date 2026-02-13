"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { projects } from "@/app/data/projects";

export default function ProjectsArchive() {
  return (
    <main className="min-h-screen bg-cyber-black py-20 px-4">
      <section id="projects">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-black neon-text glitch-text uppercase italic mb-4"
              data-text="Project"
            >
              i miei Progetti
            </motion.h1>
            <div className="h-1 w-24 bg-cyber-cyan mx-auto" />
          </div>

          {/* Griglia Progetti - Visualizza tutti i progetti direttamente */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Link href={`/projects/${project.id}`}>
                    <div className="group relative bg-cyber-darker border border-white/10 overflow-hidden cursor-pointer hover:border-cyber-cyan transition-colors">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                          {project.description}
                        </p>
                        <div className="flex gap-2">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] text-cyber-cyan border border-cyber-cyan/30 px-2 py-1"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
