'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/animations'
import SectionTitle from '../ui/SectionTitle'
import ConsultationForm from '../forms/ConsultationForm'

const Contact = () => {
  const [showConsultationForm, setShowConsultationForm] = useState(false)

  return (
    <section id="contact" className="py-16 bg-cyber-void relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-10" />
      
      <div className="container mx-auto px-4 relative">
        <SectionTitle 
          title="Contatti" 
          subtitle="Parliamo del tuo progetto" 
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            variants={fadeIn('right', 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-r from-cyber-dream to-cyber-neon p-[2px] rounded-lg">
              <div className="bg-cyber-void p-6 rounded-lg">
                <h3 className="text-xl font-bold text-cyber-neon mb-4">Informazioni di Contatto</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-cyber-acid">📧</span>
                    <a 
                      href="mailto:root.gore.it@gmail.com"
                      className="text-cyber-neon hover:text-cyber-acid transition-colors"
                    >
                      root.gore.it@gmail.com
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-cyber-acid">📱</span>
                    <a 
                      href="tel:+393200670605"
                      className="text-cyber-neon hover:text-cyber-acid transition-colors"
                    >
                      +39 320 067 0605
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-cyber-acid">🔗</span>
                    <a 
                      href="https://github.com/xilioscient"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyber-neon hover:text-cyber-acid transition-colors"
                    >
                      github.com/xilioscient
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyber-neon to-cyber-acid p-[2px] rounded-lg">
              <div className="bg-cyber-void p-6 rounded-lg">
                <h3 className="text-xl font-bold text-cyber-neon mb-4">Orari Disponibilità</h3>
                <p className="text-cyber-neon/80">
                  Sono disponibile per consulenze e progetti dal lunedì al venerdì.
                  Per emergenze o progetti critici, sono reperibile anche nel weekend.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn('left', 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {!showConsultationForm ? (
              <div className="text-center space-y-8">
                <div className="bg-gradient-to-r from-cyber-acid to-cyber-dream p-[2px] rounded-lg">
                  <div className="bg-cyber-void p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-cyber-neon mb-4">Richiedi una Consulenza</h3>
                    <p className="text-cyber-neon/80 mb-6">
                      Hai un progetto in mente o necessiti di una consulenza di sicurezza?
                      Compila il form e ti risponderò il prima possibile.
                    </p>
                    <button
                      onClick={() => setShowConsultationForm(true)}
                      className="cyber-button animate-pulse-neon"
                    >
                      Richiedi Consulenza
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <ConsultationForm />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact 