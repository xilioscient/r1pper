'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/animations'

interface FormData {
  name: string
  email: string
  github: string
  role: string
  skills: string
  message: string
}

const JoinTeamForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    github: '',
    role: '',
    skills: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here we'll add the API endpoint to connect with Telegram
      const response = await fetch('/api/join-team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Submission failed')
      
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        github: '',
        role: '',
        skills: '',
        message: '',
      })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus('idle'), 5000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
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
            className="form-input"
            placeholder="Il tuo nome"
          />
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
            className="form-input"
            placeholder="La tua email"
          />
        </div>

        <div>
          <label htmlFor="github" className="form-label">GitHub Profile</label>
          <input
            type="url"
            id="github"
            name="github"
            required
            value={formData.github}
            onChange={handleChange}
            className="form-input"
            placeholder="https://github.com/username"
          />
        </div>

        <div>
          <label htmlFor="role" className="form-label">Ruolo Desiderato</label>
          <select
            id="role"
            name="role"
            required
            value={formData.role}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Seleziona un ruolo</option>
            <option value="frontend">Frontend Developer</option>
            <option value="backend">Backend Developer</option>
            <option value="fullstack">Full Stack Developer</option>
            <option value="security">Security Expert</option>
            <option value="devops">DevOps Engineer</option>
            <option value="other">Altro</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="skills" className="form-label">Competenze Principali</label>
        <input
          type="text"
          id="skills"
          name="skills"
          required
          value={formData.skills}
          onChange={handleChange}
          className="form-input"
          placeholder="es: React, Node.js, Python, Penetration Testing..."
        />
      </div>

      <div>
        <label htmlFor="message" className="form-label">Perché vuoi unirti al team?</label>
        <textarea
          id="message"
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          className="form-textarea"
          placeholder="Raccontaci di te e perché vorresti far parte del team..."
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`cyber-button ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Invio in corso...' : 'Invia Richiesta'}
        </button>

        {submitStatus === 'success' && (
          <p className="text-cyber-acid animate-pulse">Richiesta inviata con successo!</p>
        )}
        {submitStatus === 'error' && (
          <p className="text-red-500 animate-pulse">Errore nell'invio. Riprova più tardi.</p>
        )}
      </div>
    </motion.form>
  )
}

export default JoinTeamForm 