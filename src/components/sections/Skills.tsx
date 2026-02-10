'use client'

import { motion } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'

const skillCategories = [
  {
    title: "Sicurezza Offensiva",
    skills: [
      { name: "Web Penetration Testing", level: 85 },
      { name: "Network Security", level: 80 },
      { name: "Mobile Security", level: 55 },
      { name: "Social Engineering", level: 45 },
    ],
  },
  {
    title: "Sviluppo Sicuro",
    skills: [
      { name: "OWASP Top 10", level: 78 },
      { name: "Secure Coding", level: 87 },
      { name: "Code Review", level: 70 },
      { name: "API Security", level: 73 },
    ],
  },
  {
    title: "Strumenti & Tecnologie",
    skills: [
      { name: "Burp Suite", level: 90 },
      { name: "Metasploit", level: 68 },
      { name: "Wireshark", level: 85 },
      { name: "Nmap", level: 88 },
    ],
  },
  {
    title: "Competenze Avanzate",
    skills: [
      { name: "Malware Analysis", level: 70 },
      { name: "Reverse Engineering", level: 55 },
      { name: "Incident Response", level: 65 },
      { name: "Digital Forensics", level: 52 },
    ],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0">
        <div className="cyber-grid opacity-10 animate-pulse-slow" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-void/50 to-cyber-void" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Competenze"
          subtitle="Specializzazioni & Tecnologie"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.2 }}
                  className="p-6 hover:shadow-glow-neon transition-all duration-500"
            >
              <h3 className="text-2xl font-bold text-cyber-acid mb-6 neon-text">
                {category.title}
              </h3>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (categoryIndex * 0.2) + (skillIndex * 0.1) }}
                    className="group"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-cyber-neon ">
                        {skill.name}
                      </span>
                      <span className="text-cyber-dream font-mono">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-cyber-void/50 rounded-full overflow-hidden p-[1px]">
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyber-neon to-cyber-acid rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1.5,
                          delay: (categoryIndex * 0.2) + (skillIndex * 0.1),
                          ease: "easeOut"
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-cyber-neon/90 max-w-3xl mx-auto">
            Costantemente in aggiornamento sulle ultime tecnologie e minacce nel campo della sicurezza informatica.
            La pratica continua e la partecipazione a CTF e bug bounty contribuiscono al miglioramento costante delle competenze.
          </p>
        </motion.div>
      </div>
    </section>
  )
} 