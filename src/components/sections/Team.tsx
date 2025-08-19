'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/animations'
import SectionTitle from '../ui/SectionTitle'
import JoinTeamForm from '../forms/JoinTeamForm'
import Image from 'next/image'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

const teamMembers = [
  {
    name: 'Alessandro Faraone',
    role: 'Studente presso itis nullo baldini',
    image: '/team/alessandro.jpg',
    bio: 'Appassionato di sicurezza informatica e pentesting, con particolare interesse per lo sviluppo di applicazioni sicure o ulteriori appliccazzioni per testarle . Attualmente concentrato sullo studio di vulnerabilità web e mobile, con esperienza pratica in CTF e bug bounty.',
    links: {
      github: 'https://github.com/xilioscient',
      linkedin: '#'
    },
    skills: [
      'Penetration Testing',
      'Sviluppo Sicuro',
      'Analisi Malware',
      'Reverse Engineering',
      'Web Security'
    ]
  }
]

const skills = [
  { name: 'Analisi di Sistema', level: 80 },
  { name: 'Architetture di Rete', level: 85 },
  { name: 'Sviluppo Sicuro', level: 95 },
  { name: 'Reverse Engineering', level: 60 },
  { name: 'Analisi Binaria', level: 75 },
  { name: 'Ricerca Vulnerabilità', level: 85 },
]

const tools = [
  { 
    name: 'Analisi Web', 
    description: 'Esplorazione e comprensione delle architetture web',
    image: '/images/projects/magicstudio-art.jpg'
  },
  { 
    name: 'Testing', 
    description: 'Analisi approfondita dei sistemi',
    image: '/images/projects/magicstudio-art(1).jpg'
  },
  { 
    name: 'Network', 
    description: 'Studio delle comunicazioni di rete',
    image: '/images/projects/UaN9AAzx.jpg'
  },
  { 
    name: 'Binary', 
    description: 'Analisi a basso livello',
    image: '/images/projects/Jj_5i311.jpg'
  }
]

const Team = () => {
  const [showJoinForm, setShowJoinForm] = useState(false)

  return (
    <section id="team" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="cyber-grid opacity-10 animate-pulse-slow" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-void/50 to-cyber-void" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Identità"
          subtitle="Dietro ogni schermo c'è una storia"
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="cyber-card p-8 group hover:transform hover:scale-105 transition-all duration-500"
          >
            <div className="relative w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-4 border-cyber-neon group-hover:border-cyber-acid transition-colors duration-300">
              <Image
                src="/images/team/profile.jpg"
                alt="Alessandro Faraone"
                fill
                className="object-cover filter contrast-125 brightness-90 group-hover:scale-110 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-cyber-neon/10 mix-blend-overlay group-hover:bg-cyber-acid/20 transition-colors duration-300" />
            </div>

            <h3 className="text-2xl font-bold text-center mb-4 text-cyber-acid">
              Alessandro Faraone
            </h3>
            <p className="text-cyber-neon/90 text-center mb-6 font-mono">
              "La conoscenza è potere, ma la saggezza sta nel suo utilizzo"
            </p>

            <div className="prose text-cyber-neon/80 max-w-none mb-8 font-mono">
              <p>
                "Non siamo ciò che sembriamo. In un mondo di dati e codice, 
                cerco le verità nascoste tra gli 1 e gli 0. La curiosità è la mia guida,
                l'etica il mio confine."
              </p>
              <p className="mt-4">
                "Il sistema è vulnerabile, ma non sono qui per distruggere. 
                Sono qui per comprendere, per proteggere, per migliorare. 
                Ogni bug è una lezione, ogni exploit una responsabilità."
              </p>
            </div>

            <div className="flex justify-center space-x-6">
              <a
                href="https://github.com/xilioscient"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyber-neon hover:text-cyber-acid transform hover:scale-110 transition-all"
              >
                <FaGithub className="w-8 h-8" />
              </a>
              <a
                href="https://twitter.com/xilioscient"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyber-neon hover:text-cyber-acid transform hover:scale-110 transition-all"
              >
                <FaTwitter className="w-8 h-8" />
              </a>
              <a
                href="https://linkedin.com/in/alessandro-faraone"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyber-neon hover:text-cyber-acid transform hover:scale-110 transition-all"
              >
                <FaLinkedin className="w-8 h-8" />
              </a>
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Skills Bars */}
            <div className="cyber-card p-6">
              <h4 className="text-xl font-bold mb-6 text-cyber-acid">Conoscenze</h4>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-cyber-neon font-mono">{skill.name}</span>
                      <span className="text-cyber-acid font-mono">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-cyber-void rounded-full overflow-hidden border border-cyber-neon/30">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-cyber-neon to-cyber-acid"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tools Grid */}
            <div className="cyber-card p-6">
              <h4 className="text-xl font-bold mb-6 text-cyber-acid">Strumenti</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tools.map((tool, index) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative overflow-hidden rounded-lg border border-cyber-neon/30 hover:border-cyber-acid transition-all duration-500"
                  >
                    <div className="relative aspect-video w-full overflow-hidden">
                      <Image
                        src={tool.image}
                        alt={tool.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cyber-void via-transparent to-transparent opacity-80" />
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-end p-4">
                      <h5 className="text-lg font-bold text-cyber-acid mb-2 group-hover:text-cyber-neon transition-colors">
                        {tool.name}
                      </h5>
                      <p className="text-sm text-cyber-neon/80 font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {tool.description}
                      </p>
                    </div>
                    <div className="absolute inset-0 border-2 border-cyber-acid/0 group-hover:border-cyber-acid/50 transition-all duration-500" />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="cyber-card p-6">
              <p className="text-cyber-acid font-mono text-center">
                "La vera libertà è la capacità di vedere oltre la matrice"
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={fadeIn('up', 0.4)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          {!showJoinForm ? (
            <button
              onClick={() => setShowJoinForm(true)}
              className="cyber-button-outline animate-pulse-neon"
            >
              Unisciti al Team
            </button>
          ) : (
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-cyber-neon mb-8 animate-pulse-neon">
                Candidati per unirti al team
              </h3>
              <JoinTeamForm />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default Team 