'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import SectionTitle from '../ui/SectionTitle'

const projects = [
  {
    title: 'WifiHunter Suite',
    description: 'Toolkit avanzato per l’analisi del protocollo 802.11 e il penetration testing, con capacità di iniezione pacchetti in tempo reale e rilevamento degli attacchi di deautenticazione',
    image: '/images/projects/UaN9AAzx.jpg',
    tags: ['Red Team', 'Rust', 'GUI', 'Networking', '802.11', 'Security'],
    category: 'Red Team'
  },
  {
    title: 'AirBreaker',
    description: 'Strumento completo per la valutazione della sicurezza delle reti wireless, con moduli avanzati di exploit e scansione automatizzata delle vulnerabilità',
    image: '/images/projects/Jj_5i311.jpg',
    tags: ['Red Team', 'C++', 'Qt', 'Networking', '802.11', 'Pentesting'],
    category: 'Red Team'
  },
  {
    title: 'ExcelMaster CLI',
    description: 'Processore da linea di comando per file Excel ad alte prestazioni, con funzionalità avanzate di manipolazione dei dati e automazione',
    image: '/images/projects/magicstudio-art.jpg',
    tags: ['Tools', 'Python', 'CLI', 'Data Processing', 'Automation'],
    category: 'Tools'
  },
  {
    title: 'CyberAudit Pro',
    description: 'Piattaforma automatizzata per la valutazione della sicurezza, con funzionalità complete di scansione delle vulnerabilità e reportistica',
    image: '/images/projects/magicstudio-art(1).jpg',
    tags: ['Security', 'Python', 'React', 'Security', 'Automation'],
    category: 'Security'
  }
]

export default function FeaturedProjects() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="cyber-grid opacity-10 animate-pulse-slow" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-void/50 to-cyber-void" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Featured Projects"
          subtitle="Ricerca & Sviluppo"
        />

        <div className="mt-12 relative h-[600px]">
          {/* 3D Carousel */}
          <div className="absolute inset-0 perspective-[1000px] transform-style-preserve-3d">
            <AnimatePresence mode="popLayout">
              {projects.map((project, idx) => {
                const distance = idx - currentIndex
                const absoluteDistance = Math.abs(distance)
                const isActive = distance === 0
                const isVisible = absoluteDistance <= 2

                if (!isVisible) return null

                return (
                  <motion.div
                    key={project.title}
                    initial={{ 
                      opacity: 0,
                      rotateY: distance * 45,
                      z: -1000,
                      x: distance * 100
                    }}
                    animate={{ 
                      opacity: isActive ? 1 : 0.6,
                      rotateY: distance * 45,
                      z: isActive ? 0 : -500 * absoluteDistance,
                      x: distance * 300
                    }}
                    exit={{ 
                      opacity: 0,
                      rotateY: distance * 45,
                      z: -1000,
                      x: distance * 100
                    }}
                    transition={{
                      duration: 0.8,
                      ease: [0.23, 1, 0.32, 1]
                    }}
                    className={`absolute inset-0 w-full h-full ${isActive ? 'z-10' : 'z-0'}`}
                  >
                    <div className="relative w-full h-full rounded-xl overflow-hidden cyber-card group">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cyber-void via-cyber-void/50 to-transparent opacity-90" />
                      
                      <div className="absolute inset-0 flex flex-col justify-end p-8">
                        {/* Category Badge */}
                        <span className={`
                          inline-block px-3 py-1 rounded-full text-sm font-mono mb-4 w-fit
                          ${project.category === 'Red Team' ? 'bg-cyber-blood/20 text-cyber-blood border border-cyber-blood/50' :
                            project.category === 'Tools' ? 'bg-cyber-dream/20 text-cyber-dream border border-cyber-dream/50' :
                            'bg-cyber-acid/20 text-cyber-acid border border-cyber-acid/50'}
                        `}>
                          {project.category}
                        </span>

                        <h3 className="text-3xl font-bold mb-4 transition-colors duration-300 group-hover:text-cyber-acid">
                          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyber-neon to-cyber-acid">
                            {project.title}
                          </span>
                        </h3>
                        
                        <p className="text-cyber-neon/90 mb-6 font-mono max-w-lg transform transition-all duration-300 group-hover:translate-x-2">
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 transform transition-all duration-300 group-hover:translate-y-[-4px]">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-cyber-neon/10 border border-cyber-neon/30 rounded-full
                                       text-cyber-neon text-sm hover:bg-cyber-neon/20 hover:border-cyber-neon
                                       transition-all duration-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevProject}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 cyber-button-outline p-3 opacity-50 hover:opacity-100 transition-opacity"
            aria-label="Previous project"
          >
            ←
          </button>
          <button
            onClick={nextProject}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 cyber-button-outline p-3 opacity-50 hover:opacity-100 transition-opacity"
            aria-label="Next project"
          >
            →
          </button>

          {/* Progress Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'w-8 bg-gradient-to-r from-cyber-neon to-cyber-acid'
                    : 'bg-cyber-neon/30 hover:bg-cyber-neon/50'
                }`}
                aria-label={`Go to project ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 
