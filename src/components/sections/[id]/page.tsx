'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { projects } from '@/app/data/projects'
/**
 * 
 * export default function ProjectPage() {
    const params = useParams()
    const id = params?.id // Recuperiamo l'id dall'oggetto params
    
    // Cerchiamo convertendo entrambi in stringa per evitare mismatch di tipo
    const project = projects.find(p => p.id.toString() === id);

    // Se il progetto non viene trovato dopo il primo render
    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-cyber-black">
                <h1 className="text-cyber-cyan font-mono text-2xl mb-4 animate-pulse">
                    404_PROJECT_NOT_FOUND
                </h1>
                <Link href="/projects" className="text-cyber-magenta hover:underline font-mono">
                    {">"} RETURN_TO_CORE_DATABASE
                </Link>
            </div>
        )
    }
    // ... resto del codice
 * @returns
 */
export default function ProjectPage() {
    const params = useParams()
    const id = params?.id 


    const project = projects.find(p => p.id.toString() === id);


    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-cyber-black">
                <h1 className="text-cyber-cyan font-mono text-2xl mb-4 animate-pulse">
                    404_PROJECT_NOT_FOUND
                </h1>
                <Link href="/projects" className="text-cyber-magenta hover:underline font-mono">
                    {">"} RETURN_TO_CORE_DATABASE
                </Link>
            </div>
        )
    }
    return (
        <main className="min-h-screen bg-cyber-black text-white relative">
            {/* Background Decor */}
            <div className="fixed inset-0 cyber-grid opacity-5 pointer-events-none" />

            <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
                {/* Navigazione */}
                <Link href="/projects" className="inline-flex items-center gap-2 text-cyber-cyan hover:text-cyber-magenta transition-colors mb-12 font-mono text-sm group">
                    <span className="group-hover:-translate-x-2 transition-transform">←</span> RETURN_TO_ARCHIVE
                </Link>

                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-cyber-cyan opacity-20 blur group-hover:opacity-40 transition" />
                            <img
                                src={project.image}
                                alt={project.title}
                                className="relative border border-white/20 w-full rounded-sm shadow-2xl"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <span className="text-cyber-magenta font-mono text-sm tracking-widest uppercase">
              // CATEGORY: {project.category}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">
                            {project.title}
                        </h1>
                        <div className="h-1 w-20 bg-cyber-cyan" />
                        <p className="text-xl text-gray-400 font-light leading-relaxed italic">
                            "{project.description}"
                        </p>
                    </motion.div>
                </div>

                {/* Content Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-12">
                    <div className="md:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-cyber-cyan mb-6 flex items-center gap-2">
                                <span className="w-8 h-px bg-cyber-cyan" /> KEY_FEATURES
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {project.details.features.map((feature, i) => (
                                    <div key={i} className="flex gap-3 p-4 bg-white/5 border border-white/5 hover:border-cyber-magenta/30 transition-colors">
                                        <span className="text-cyber-magenta">⚡</span>
                                        <span className="text-gray-300 text-sm">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-cyber-cyan mb-6 flex items-center gap-2">
                                <span className="w-8 h-px bg-cyber-cyan" /> TECHNICAL_REPORT
                            </h2>
                            <p className="text-gray-400 leading-relaxed font-light bg-cyber-darker p-6 border-l-4 border-cyber-cyan">
                                {project.details.tech}
                            </p>
                        </section>
                    </div>

                    <aside className="space-y-8">
                        <div className="p-6 border border-white/10 bg-white/5">
                            <h3 className="text-sm font-mono text-cyber-magenta mb-4 uppercase tracking-widest">Stack_Tools</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-cyber-cyan/10 text-cyber-cyan text-xs border border-cyber-cyan/20">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <button className="w-full py-4 bg-cyber-cyan text-black font-bold uppercase tracking-widest hover:bg-cyber-magenta hover:text-white transition-all shadow-glow-cyan hover:shadow-glow-magenta">
                            LAUNCH_PROJECT
                        </button>
                    </aside>
                </div>
            </div>
        </main>
    )
}