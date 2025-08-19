'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const LiquidBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let particles: Array<{
      x: number
      y: number
      radius: number
      speedX: number
      speedY: number
      hue: number
    }> = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      particles = []
      const numberOfParticles = 50
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 50 + 20,
          speedX: Math.random() * 2 - 1,
          speedY: Math.random() * 2 - 1,
          hue: Math.random() * 60 - 30 // Variazione di colore intorno al colore base
        })
      }
    }

    const drawParticle = (particle: typeof particles[0]) => {
      const gradient = ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.radius
      )

      // Colori cyberpunk personalizzati
      gradient.addColorStop(0, `rgba(0, 255, 196, 0.2)`) // cyber-neon
      gradient.addColorStop(0.5, `rgba(163, 255, 0, 0.1)`) // cyber-acid
      gradient.addColorStop(1, 'rgba(128, 0, 255, 0.05)') // cyber-dream

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
      ctx.fill()
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(8, 12, 24, 0.1)' // cyber-void con trasparenza
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Rimbalzo ai bordi
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

        drawParticle(particle)
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    resize()
    createParticles()
    animate()

    window.addEventListener('resize', () => {
      resize()
      createParticles()
    })

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
}

export default LiquidBackground 