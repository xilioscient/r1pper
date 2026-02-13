"use client";

import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";

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
];

export default function Skills() {
  // Configurazione cerchio
  const radius = 36;
  const circumference = 2 * Math.PI * radius;

  return (
    <section id="skills" className="relative py-20 overflow-hidden bg-black">
      <div className="absolute inset-0 cyber-grid opacity-5 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionTitle
          title="Competenze"
          subtitle="Specializzazioni & Tecnologie"
        />

        <div className="mt-16 space-y-20">
          {skillCategories.map((category, catIdx) => (
            <div key={category.title}>
              {/* Header Categoria Professionale */}
              <div className="flex items-center gap-4 mb-10">
                <h3 className="text-xl font-bold text-cyber-acid uppercase tracking-tighter italic">
                  {category.title}
                </h3>
                <div className="h-[1px] flex-grow bg-white/10" />
              </div>

              {/* Griglia dei Cerchi */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {category.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: skillIdx * 0.1 }}
                    className="flex flex-col items-center group"
                  >
                    <div className="relative w-24 h-24 mb-4">
                      {/* SVG del Cerchio */}
                      <svg className="w-full h-full -rotate-90 transform">
                        {/* Cerchio di Sfondo (Binario) */}
                        <circle
                          cx="48"
                          cy="48"
                          r={radius}
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="transparent"
                          className="text-white/5"
                        />
                        {/* Cerchio di Caricamento (Bordo) */}
                        <motion.circle
                          cx="48"
                          cy="48"
                          r={radius}
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="transparent"
                          strokeDasharray={circumference}
                          initial={{ strokeDashoffset: circumference }}
                          whileInView={{
                            strokeDashoffset:
                              circumference -
                              (skill.level / 100) * circumference,
                          }}
                          viewport={{ once: true }}
                          transition={{ duration: 2, ease: "easeOut" }}
                          className="text-cyber-neon"
                          style={{
                            filter: "drop-shadow(0 0 5px var(--tw-content))",
                          }}
                        />
                      </svg>

                      {/* Percentuale al centro */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-mono font-bold color: text-white">
                          {skill.level}%
                        </span>
                      </div>
                    </div>

                    {/* Nome Skill */}
                    <span className="text-[10px] text-center uppercase tracking-widest leading-tight text-white/60 group-hover:text-cyber-acid transition-colors">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Testo originale */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 text-center border-t border-white/5 pt-12"
        >
          <p className="text-lg text-cyber-neon/90 max-w-4xl mx-auto italic leading-relaxed">
            Costantemente in aggiornamento sulle ultime tecnologie e minacce nel
            campo della sicurezza informatica. La pratica continua e la
            partecipazione a CTF e bug bounty contribuiscono al miglioramento
            costante delle competenze.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
