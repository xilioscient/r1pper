'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const projects = [
  {
    id: 1,
    title: "WifiHunter Suite",
    description: "Toolkit avanzato per l'analisi del protocollo 802.11 e il penetration testing, con capacità di iniezione pacchetti in tempo reale e rilevamento di attacchi di deautenticazione",
    tags: ["Rust", "GUI", "Networking", "802.11", "Security"],
    image: "/images/projects/UaN9AAzx.jpg",
    category: "Red Team",
    details: {
      features: [
        "Cattura e analisi pacchetti in tempo reale",
        "Framework personalizzato per l'iniezione di pacchetti",
        "Rilevamento di attacchi di deautenticazione",
        "Visualizzazione della topologia di rete",
        "Analisi del traffico cifrato"
      ],
      tech: "Sviluppato in Rust con GTK per alte prestazioni e un aspetto nativo. Utilizza API di rete a basso livello per l'accesso diretto all'hardware."
    }
  },
  {
    id: 2,
    title: "AirBreaker",
    description: "Strumento completo per la valutazione della sicurezza delle reti wireless, con moduli avanzati di exploit e scansione automatizzata delle vulnerabilità",
    tags: ["C++", "Qt", "Networking", "802.11", "Pentesting"],
    image: "/images/projects/Jj_5i311.jpg",
    category: "Red Team",
    details: {
      features: [
        "Valutazione automatica delle vulnerabilità",
        "Moduli di exploit personalizzati",
        "Supporto all'accelerazione hardware",
        "Creazione avanzata di pacchetti",
        "Mappatura di rete in tempo reale"
      ],
      tech: "Sviluppato in C++ con il framework Qt per compatibilità cross-platform. Implementa protocolli personalizzati per test di sicurezza avanzati."
    }
  },
  {
    id: 3,
    title: "ExcelMaster CLI",
    description: "Processore da linea di comando per file Excel ad alte prestazioni, con funzionalità avanzate di manipolazione dati e automazione",
    tags: ["Python", "CLI", "Data Processing", "Automation"],
    image: "/images/projects/magicstudio-art.jpg",
    category: "Tools",
    details: {
      features: [
        "Capacità di elaborazione batch",
        "Valutazione di formule personalizzate",
        "Validazione e pulizia dei dati",
        "Reportistica automatizzata",
        "Generazione basata su template"
      ],
      tech: "Sviluppato in Python, utilizza pandas e openpyxl per una manipolazione efficiente dei file Excel. Include un DSL personalizzato per operazioni avanzate."
    }
  },
  {
    id: 4,
    title: "CyberAudit Pro",
    description: "Piattaforma automatizzata per la valutazione della sicurezza, con funzionalità complete di scansione delle vulnerabilità e reportistica",
    tags: ["Python", "React", "Security", "Automation"],
    image: "/images/projects/magicstudio-art(1).jpg",
    category: "Security",
    details: {
      features: [
        "Scansione automatica delle vulnerabilità",
        "Sviluppo di exploit personalizzati",
        "Reportistica di conformità",
        "Valutazione dei rischi",
        "Monitoraggio delle attività di remediation"
      ],
      tech: "Applicazione full-stack con backend in Python e frontend in React. Implementa protocolli di sicurezza personalizzati e framework di test automatizzati."
    }
  },
];

const categories = ["All", "Red Team", "Security", "Tools"]

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  const filteredProjects = projects.filter(project => 
    activeCategory === "All" || project.category === activeCategory
  )

  const selectedProjectData = selectedProject 
    ? projects.find(p => p.id === selectedProject)
    : null

  return (
    <section id="projects" className="relative py-20 overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0">
        <div className="cyber-grid opacity-10 animate-pulse-slow" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-black/50 to-cyber-black" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center mb-12 neon-text glitch-text"
          data-text="The Eye Projects"
        >
          The Eye Projects
        </motion.h2>

        {/* Category Filter with Enhanced Animation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105
                ${activeCategory === category
                  ? 'bg-cyber-cyan text-cyber-black font-bold shadow-glow-cyan'
                  : 'border border-cyber-cyan/30 text-cyber-cyan hover:border-cyber-cyan hover:shadow-glow-cyan'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid with Enhanced Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.02 }}
                className="cyber-card group cursor-pointer transform transition-all duration-300
                         hover:shadow-glow-cyan border border-cyber-cyan/30 hover:border-cyber-cyan"
                onClick={() => setSelectedProject(project.id)}
              >
                <div className="relative aspect-video overflow-hidden rounded-t-lg">
                  <div className="absolute inset-0 bg-gradient-to-t from-cyber-black/90 to-transparent z-10" />
                  <motion.div
                    className="absolute inset-0 bg-cyber-grid opacity-30"
                    animate={{
                      backgroundPosition: ['0px 0px', '100px 100px'],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <span className="px-3 py-1 bg-cyber-cyan/20 backdrop-blur-sm rounded-full
                                 text-cyber-cyan text-sm border border-cyber-cyan/30">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-cyber-magenta mb-2 glitch-text-sm"
                      data-text={project.title}>
                    {project.title}
                  </h3>
                  <p className="text-cyber-cyan/80 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full border border-cyber-cyan/30 
                                 text-cyber-cyan bg-cyber-cyan/10 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Enhanced Project Modal */}
        <AnimatePresence>
          {selectedProject && selectedProjectData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-cyber-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="cyber-card max-w-4xl w-full max-h-[90vh] overflow-y-auto relative
                         border border-cyber-cyan/30 shadow-glow-cyan"
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 text-cyber-cyan hover:text-cyber-magenta
                           transition-colors duration-300 z-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <div className="relative aspect-video">
                  <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-cyber-black/50 to-transparent z-10" />
                  <motion.div
                    className="absolute inset-0 bg-cyber-grid opacity-30"
                    animate={{
                      backgroundPosition: ['0px 0px', '100px 100px'],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <img
                    src={selectedProjectData.image}
                    alt={selectedProjectData.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-8 space-y-6">
                  <h3 className="text-3xl font-bold text-cyber-magenta glitch-text"
                      data-text={selectedProjectData.title}>
                    {selectedProjectData.title}
                  </h3>
                  
                  <p className="text-cyber-cyan/90 text-lg">
                    {selectedProjectData.description}
                  </p>

                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-cyber-cyan">Key Features</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedProjectData.details.features.map((feature, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center space-x-2 text-cyber-cyan/80"
                        >
                          <span className="text-cyber-magenta">⚡</span>
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-cyber-cyan">Technology</h4>
                    <p className="text-cyber-cyan/80">
                      {selectedProjectData.details.tech}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4">
                    {selectedProjectData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-sm px-3 py-1 rounded-full border border-cyber-cyan/30 
                                 text-cyber-cyan bg-cyber-cyan/10 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
} 
