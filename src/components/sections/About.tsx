"use client";

import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";

const values = [
  {
    title: "Verità",
    description:
      "Oltre gli schermi e i firewall, c'è una verità che attende di essere scoperta. Il codice non mente.",
    icon: "🔓",
  },
  {
    title: "Conoscenza",
    description:
      "L'informazione vuole essere libera. Il sapere è un diritto, non un privilegio da tenere sotto chiave.",
    icon: "💡",
  },
  {
    title: "Equilibrio",
    description:
      "Tra il caos e l'ordine, tra l'ombra e la luce. Il vero potere sta nel saper mantenere l'equilibrio.",
    icon: "⚖️",
  },
  {
    title: "Cambiamento",
    description:
      "Il sistema non è immutabile. Ogni linea di codice può essere l'inizio di una rivoluzione silenziosa.",
    icon: "🔄",
  },
];

const manifesto = `
In un mondo dove i bit valgono più dell'oro, dove i dati raccontano le nostre storie,
c'è chi sceglie di guardare oltre la superficie. Di vedere ciò che altri non vedono.

Non sono un ribelle. Non sono un eroe. Sono solo qualcuno che ha scelto di non accettare
le cose così come appaiono. Che ha deciso di cercare la verità nei luoghi più oscuri del codice.

Il sistema non è perfetto, ma non serve distruggerlo. Serve comprenderlo, modificarlo, migliorarlo.
Un bit alla volta, una vulnerabilità alla volta, un cambiamento alla volta.

La vera rivoluzione non fa rumore. Si muove nell'ombra, silenziosa ma inesorabile.
Come il codice che scorre sullo schermo, invisibile ai più, ma capace di cambiare tutto.
`;

export default function About() {
  return (
    <section id="about" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0">
        <div className="cyber-grid opacity-10 animate-pulse-slow" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-void/50 to-cyber-void" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Pensieri"
          subtitle="C'è sempre una via d'accesso"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 mb-16"
        >
          <div className="cyber-card p-8 hover:shadow-glow-acid">
            <p className="text-lg text-cyber-neon/90 leading-relaxed whitespace-pre-line font-mono">
              {manifesto}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="cyber-card p-6 group hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="text-4xl mb-4 ">{value.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-cyber-acid group-hover:text-cyber-neon transition-colors">
                {value.title}
              </h3>
              <p className="text-cyber-neon/80 group-hover:text-cyber-neon transition-colors">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-cyber-acid font-mono">
            "Il controllo è un'illusione. La libertà è la realtà. "
            <br />
            Alessandro Faraone
          </p>
        </motion.div>
      </div>
    </section>
  );
}
