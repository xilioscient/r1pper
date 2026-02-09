'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/animations'
import { z } from 'zod'

// Form validation schema
const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    company: z.string().max(100).optional(),
    serviceType: z.enum(['pentest', 'security-audit', 'code-review', 'network-security', 'web-security', 'training', 'other']),
    budget: z.enum(['small', 'medium', 'large', 'enterprise', 'discuss']),
    timeline: z.enum(['urgent', 'short', 'medium', 'long', 'flexible']),
    description: z.string().min(10).max(1000),
    priority: z.enum(['low', 'normal', 'high'])
})

type FormData = z.infer<typeof formSchema>

const ConsultationForm = () => {
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

        if (!validateForm()) {
            return
        }

        if (isSubmitting) {
            return
        }

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

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.message || 'Submission failed')
            }

            setSubmitStatus('success')
            setFormData({
                name: '',
                email: '',
                company: '',
                serviceType: 'pentest',
                budget: 'discuss',
                timeline: 'flexible',
                description: '',
                priority: 'normal'
            })
        } catch (error) {
            setSubmitStatus('error')
            console.error('Form submission error:', error)
        } finally {
            setIsSubmitting(false)
            setTimeout(() => setSubmitStatus('idle'), 5000)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        if (errors[name as keyof FormData]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }))
        }
    }

    return (
        <motion.form
            variants={fadeIn('up', 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-6 max-w-2xl mx-auto"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className="form-label">Nome Completo</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className={`form-input ${errors.name ? 'border-cyber-blood' : ''}`}
                        placeholder="Il tuo nome"
                    />
                    {errors.name && (
                        <p className="text-cyber-blood text-sm mt-1">{errors.name}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={`form-input ${errors.email ? 'border-cyber-blood' : ''}`}
                        placeholder="La tua email"
                    />
                    {errors.email && (
                        <p className="text-cyber-blood text-sm mt-1">{errors.email}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="company" className="form-label">Azienda/Organizzazione</label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className={`form-input ${errors.company ? 'border-cyber-blood' : ''}`}
                        placeholder="Nome azienda (opzionale)"
                    />
                    {errors.company && (
                        <p className="text-cyber-blood text-sm mt-1">{errors.company}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="serviceType" className="form-label">Tipo di Servizio</label>
                    <select
                        id="serviceType"
                        name="serviceType"
                        required
                        value={formData.serviceType}
                        onChange={handleChange}
                        className={`form-select ${errors.serviceType ? 'border-cyber-blood' : ''}`}
                    >
                        <option value="">Seleziona un servizio</option>
                        <option value="pentest">Penetration Testing</option>
                        <option value="security-audit">Security Audit</option>
                        <option value="code-review">Code Review</option>
                        <option value="network-security">Network Security</option>
                        <option value="web-security">Web Application Security</option>
                        <option value="training">Security Training</option>
                        <option value="other">Altro</option>
                    </select>
                    {errors.serviceType && (
                        <p className="text-cyber-blood text-sm mt-1">{errors.serviceType}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="budget" className="form-label">Budget Indicativo</label>
                    <select
                        id="budget"
                        name="budget"
                        required
                        value={formData.budget}
                        onChange={handleChange}
                        className={`form-select ${errors.budget ? 'border-cyber-blood' : ''}`}
                    >
                        <option value="">Seleziona range di budget</option>
                        <option value="small">{'<'} €1.000</option>
                        <option value="medium">€1.000 - €5.000</option>
                        <option value="large">€5.000 - €10.000</option>
                        <option value="enterprise">{'>'} €10.000</option>
                        <option value="discuss">Da discutere</option>
                    </select>
                    {errors.budget && (
                        <p className="text-cyber-blood text-sm mt-1">{errors.budget}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="timeline" className="form-label">Tempistica Desiderata</label>
                    <select
                        id="timeline"
                        name="timeline"
                        required
                        value={formData.timeline}
                        onChange={handleChange}
                        className={`form-select ${errors.timeline ? 'border-cyber-blood' : ''}`}
                    >
                        <option value="">Seleziona tempistica</option>
                        <option value="urgent">Urgente ({'<'} 1 settimana)</option>
                        <option value="short">Breve termine (1-2 settimane)</option>
                        <option value="medium">Medio termine (2-4 settimane)</option>
                        <option value="long">Lungo termine ({'>'} 1 mese)</option>
                        <option value="flexible">Flessibile</option>
                    </select>
                    {errors.timeline && (
                        <p className="text-cyber-blood text-sm mt-1">{errors.timeline}</p>
                    )}
                </div>
            </div>

            <div>
                <label htmlFor="description" className="form-label">
                    Descrizione del Progetto
                    <span className="text-xs text-cyber-cyan/60 ml-2">(min 10 caratteri, max 1000)</span>
                </label>
                <textarea
                    id="description"
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleChange}
                    className={`form-textarea ${errors.description ? 'border-cyber-blood' : ''}`}
                    placeholder="Descrivi il tuo progetto e le tue esigenze di sicurezza..."
                    maxLength={1000}
                />
                {errors.description && (
                    <p className="text-cyber-blood text-sm mt-1">{errors.description}</p>
                )}
            </div>

            <div>
                <label htmlFor="priority" className="form-label">Priorità</label>
                <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            name="priority"
                            value="high"
                            checked={formData.priority === 'high'}
                            onChange={handleChange}
                            className="form-radio text-cyber-neon"
                        />
                        <span className="ml-2 text-cyber-neon">Alta</span>
                    </label>
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            name="priority"
                            value="normal"
                            checked={formData.priority === 'normal'}
                            onChange={handleChange}
                            className="form-radio text-cyber-neon"
                        />
                        <span className="ml-2 text-cyber-neon">Normale</span>
                    </label>
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            name="priority"
                            value="low"
                            checked={formData.priority === 'low'}
                            onChange={handleChange}
                            className="form-radio text-cyber-neon"
                        />
                        <span className="ml-2 text-cyber-neon">Bassa</span>
                    </label>
                </div>
            </div>

            {submitStatus === 'success' && (
                <div className="p-4 bg-cyber-dream/20 border border-cyber-dream text-cyber-dream rounded">
                    Richiesta inviata con successo! Ti contatteremo presto.
                </div>
            )}

            {submitStatus === 'error' && (
                <div className="p-4 bg-cyber-blood/20 border border-cyber-blood text-cyber-blood rounded">
                    Si è verificato un errore. Per favore riprova più tardi o contattaci direttamente via email.
                </div>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className={`cyber-button w-full ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'animate-pulse-neon'}`}
            >
                {isSubmitting ? 'Invio in corso...' : 'Invia Richiesta'}
            </button>
        </motion.form>
    )
}

export default ConsultationForm 