'use client'

import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/animations'

interface SectionTitleProps {
  title: string
  subtitle: string
}

const SectionTitle = ({ title, subtitle }: SectionTitleProps) => {
  return (
    <motion.div
      variants={fadeIn('up', 0)}
      initial="show"
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      <h2 className="text-5xl md:text-6xl font-extrabold mb-4 text-cyber-cyan neon-text">
        {title}
      </h2>
      <p className="text-cyber-magenta text-lg md:text-xl font-medium">
        {subtitle}
      </p>
      <div className="w-32 h-1 bg-gradient-to-r from-cyber-purple to-cyber-blue mx-auto mt-4" />
    </motion.div>
  )
}

export default SectionTitle