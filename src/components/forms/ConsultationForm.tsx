'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeIn } from '@/lib/animations'
import { z } from 'zod'

// Form validation schema
const formSchema = z.object({
    name: z.string().min(2, "Il nome è troppo corto").max(50),
    email: z.string().email("Email non valida"),
    company: z.string().max(100).optional(),
    serviceType: z.enum(['pentest', 'security-audit', 'code-review', 'network-security', 'web-security', 'training', 'other']),
    budget: z.enum(['small', 'medium', 'large', 'enterprise', 'discuss']),
    timeline: z.enum(['urgent', 'short', 'medium', 'long', 'flexible']),
    description: z.string().min(10, "Descrizione troppo breve").max(1000),
    priority: z.enum(['low', 'normal', 'high'])
})

type FormData = z.infer<typeof formSchema>

const ConsultationModal = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        company: '',
        serviceType: 'pentest',
        budget: 'discuss',
        timeline: 'flexible',
        description: '',
        priority: 'normal'
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

    // Blocca lo scroll della pagina quando il pop-up è attivo
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => { document.body.style.overflow = 'unset' }
    }, [isOpen])

    const validateForm = (): boolean => {
        try {
            formSchema.parse(formData)
            setErrors({})
            return true
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: Partial<Record<keyof FormData, string>> = {}
                error.errors.forEach((err) => {
                    if (err.path[0]) {
                        newErrors[err.path[0] as keyof FormData] = err.message
                    }
                })
                setErrors(newErrors)
            }
            return false
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm() || isSubmitting) return

        setIsSubmitting(true)

        try {
            const response = await fetch('/api/consultation-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': 'the-eye-security-token-2024',
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) throw new Error('Submission failed')

            setSubmitStatus('success')
            setFormData({
                name: '', email: '', company: '', serviceType: 'pentest',
                budget: 'discuss', timeline: 'flexible', description: '', priority: 'normal'
            })

            // Chiude il modal automaticamente dopo il successo
            setTimeout(() => setIsOpen(false), 3000)
        } catch (error) {
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
            setTimeout(() => setSubmitStatus('idle'), 5000)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name as keyof FormData]) {
            setErrors(prev => ({ ...prev, [name]: undefined }))
        }
    }

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="cyber-button animate-pulse-neon"
            >
                Richiedi Consulenza
            </button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        {/* Backdrop Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        />

                        {/* Modal Box */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-3xl bg-cyber-darker border border-cyber-neon/30 p-6 md:p-8 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-y-auto max-h-[95vh]"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 text-cyber-neon hover:rotate-90 transition-transform duration-300 z-10"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="mb-6">
                                <h2 className="text-3xl font-bold text-cyber-neon tracking-tighter uppercase italic">Security Consultation</h2>
                                <div className="h-1 w-24 bg-cyber-neon mt-2" />
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="form-label">Nome Completo</label>
                                        <input
                                            type="text" name="name" required
                                            value={formData.name} onChange={handleChange}
                                            className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                                            placeholder="Il tuo nome"
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email" name="email" required
                                            value={formData.email} onChange={handleChange}
                                            className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                                            placeholder="Email aziendale"
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label className="form-label">Azienda</label>
                                        <input
                                            type="text" name="company"
                                            value={formData.company} onChange={handleChange}
                                            className="form-input"
                                            placeholder="Nome organizzazione"
                                        />
                                    </div>

                                    <div>
                                        <label className="form-label">Tipo di Servizio</label>
                                        <select
                                            name="serviceType" required
                                            value={formData.serviceType} onChange={handleChange}
                                            className="form-select"
                                        >
                                            <option value="pentest">Penetration Testing</option>
                                            <option value="security-audit">Security Audit</option>
                                            <option value="code-review">Code Review</option>
                                            <option value="network-security">Network Security</option>
                                            <option value="web-security">Web Security</option>
                                            <option value="training">Security Training</option>
                                            <option value="other">Altro</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="form-label">Budget</label>
                                        <select
                                            name="budget" required
                                            value={formData.budget} onChange={handleChange}
                                            className="form-select"
                                        >
                                            <option value="small">poco</option>
                                            <option value="medium">medio</option>
                                            <option value="large">grande</option>
                                            <option value="enterprise">alto</option>
                                            <option value="discuss">Da discutere</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="form-label">Tempistica</label>
                                        <select
                                            name="timeline" required
                                            value={formData.timeline} onChange={handleChange}
                                            className="form-select"
                                        >
                                            <option value="urgent">Urgente</option>
                                            <option value="short">Breve termine</option>
                                            <option value="medium">Medio termine</option>
                                            <option value="long">Lungo termine</option>
                                            <option value="flexible">Flessibile</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="form-label">Descrizione del Progetto</label>
                                    <textarea
                                        name="description" required
                                        value={formData.description} onChange={handleChange}
                                        className={`form-textarea h-28 ${errors.description ? 'border-red-500' : ''}`}
                                        placeholder="Descrivi le tue esigenze di sicurezza..."
                                    />
                                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                                </div>

                                <div>
                                    <label className="form-label block mb-2">Priorità</label>
                                    <div className="flex space-x-6">
                                        {['high', 'normal', 'low'].map((p) => (
                                            <label key={p} className="inline-flex items-center cursor-pointer">
                                                <input
                                                    type="radio" name="priority" value={p}
                                                    checked={formData.priority === p}
                                                    onChange={handleChange}
                                                    className="form-radio text-cyber-neon"
                                                />
                                                <span className="ml-2 text-cyber-neon text-sm uppercase">{p === 'high' ? 'Alta' : p === 'normal' ? 'Normale' : 'Bassa'}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`cyber-button w-full ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {isSubmitting ? 'Inizializzazione Protocollo...' : 'Invia Richiesta di Consulenza'}
                                    </button>

                                    <AnimatePresence>
                                        {submitStatus === 'success' && (
                                            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-cyber-acid text-center font-mono text-sm mt-4 uppercase">
                                                Richiesta crittografata e inviata.
                                            </motion.p>
                                        )}
                                        {submitStatus === 'error' && (
                                            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-center font-mono text-sm mt-4 uppercase">
                                                Errore di trasmissione. Riprovare.
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}

export default ConsultationModal