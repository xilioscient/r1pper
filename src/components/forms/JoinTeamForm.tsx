"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "@/lib/animations";

interface FormData {
  name: string;
  email: string;
  github: string;
  role: string;
  skills: string;
  message: string;
}

const JoinTeamModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    github: "",
    role: "",
    skills: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Blocca lo scroll della pagina quando il pop-up è attivo
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/join-team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Submission failed");

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        github: "",
        role: "",
        skills: "",
        message: "",
      });

      // Chiude il modal automaticamente dopo il successo
      setTimeout(() => setIsOpen(false), 2500);
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="cyber-button animate-pulse-neon"
      >
        Unisciti al Team
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
              className="relative w-full max-w-2xl bg-cyber-darker border border-cyber-neon/30 p-8 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-y-auto max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-cyber-neon hover:rotate-90 transition-transform duration-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="mb-8">
                <h2 className="text-3xl font-bold text-cyber-neon tracking-tighter uppercase">
                  Recruitment
                </h2>
                <div className="h-1 w-20 bg-cyber-neon mt-2" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">Nome Completo</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Il tuo nome"
                    />
                  </div>
                  <div>
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="La tua email"
                    />
                  </div>
                  <div>
                    <label className="form-label">GitHub Profile</label>
                    <input
                      type="url"
                      name="github"
                      required
                      value={formData.github}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="https://github.com/..."
                    />
                  </div>
                  <div>
                    <label className="form-label">Ruolo Desiderato</label>
                    <select
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
                  <label className="form-label">Competenze Principali</label>
                  <input
                    type="text"
                    name="skills"
                    required
                    value={formData.skills}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="es: React, Python, Go..."
                  />
                </div>

                <div>
                  <label className="form-label">Perché vuoi unirti?</label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea h-32"
                  />
                </div>

                <div className="flex flex-col space-y-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`cyber-button w-full ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {isSubmitting
                      ? "Protocollo di invio attivo..."
                      : "Invia Candidatura"}
                  </button>

                  {submitStatus === "success" && (
                    <p className="text-cyber-acid text-center font-mono text-sm uppercase">
                      Dati ricevuti. Analisi in corso...
                    </p>
                  )}
                  {submitStatus === "error" && (
                    <p className="text-red-500 text-center font-mono text-sm">
                      Connessione fallita. Riprova.
                    </p>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default JoinTeamModal;
