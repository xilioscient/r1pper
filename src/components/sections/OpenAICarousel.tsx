"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  description: string;
}

export default function OpenAICarousel() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Ref per il vincolo del trascinamento
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://api.rss2json.com/v1/api.json?rss_url=https://openai.com/news/rss.xml",
        );
        const data = await response.json();

        if (data.items) {
          setNews(data.items);
        }
      } catch (error) {
        console.error("Errore nel recupero delle news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Calcolo della larghezza per il trascinamento quando le news sono caricate
  useEffect(() => {
    if (carouselRef.current) {
      setWidth(
        carouselRef.current.scrollWidth - carouselRef.current.offsetWidth,
      );
    }
  }, [news]);

  if (loading) {
    return (
      <div className="text-center p-10 neon-text">Caricamento News...</div>
    );
  }

  return (
    <section className="py-16 px-6 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-5xl font-black uppercase tracking-tighter italic text-white">
            OpenAI <span className="text-cyber-neon">Archive</span>
          </h2>
          <div
            className="h-[1px] flex-grow ml-8 opacity-30"
            style={{
              background: `linear-gradient(to right, rgb(var(--color-cyber-neon)), transparent)`,
            }}
          />
        </div>

        {/* Container Carosello con Drag Logic */}
        <motion.div
          ref={carouselRef}
          className="relative cursor-grab active:cursor-grabbing overflow-hidden"
        >
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            className="flex space-x-8 pb-12 pt-4"
          >
            {news.length > 0 ? (
              news.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="min-w-[320px] md:min-w-[450px] relative group/card pointer-events-none"
                >
                  <div
                    className="absolute -inset-1 rounded-xl blur opacity-10 group-hover/card:opacity-40 transition duration-500"
                    style={{ backgroundColor: `rgb(var(--color-cyber-neon))` }}
                  />

                  <div className="relative h-full bg-gray-950 border border-white/5 p-8 rounded-xl overflow-hidden shadow-2xl pointer-events-auto">
                    <div className="absolute top-0 right-0 p-3 text-[10px] font-mono opacity-20 text-white">
                      OAI_MNFST_{index}
                    </div>

                    <span
                      className="inline-block px-3 py-1 mb-6 border text-[10px] font-bold uppercase tracking-widest bg-opacity-10"
                      style={{
                        borderColor: `rgba(var(--color-cyber-neon), 0.5)`,
                        color: `rgb(var(--color-cyber-neon))`,
                        backgroundColor: `rgba(var(--color-cyber-neon), 0.05)`,
                      }}
                    >
                      {new Date(item.pubDate).toLocaleDateString("it-IT", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>

                    <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover/card:text-cyber-neon transition-colors duration-300">
                      {item.title}
                    </h3>

                    <p className="text-gray-400 text-sm mb-8 line-clamp-3 font-light leading-relaxed">
                      {item.description.replace(/<[^>]*>?/gm, "")}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative group/btn flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-white"
                      >
                        <span className="relative z-10 group-hover/btn:text-cyber-neon transition-colors">
                          Access Terminal
                        </span>
                        <span
                          className="w-8 h-[1px] transition-all group-hover/btn:w-12"
                          style={{
                            backgroundColor: `rgb(var(--color-cyber-neon))`,
                          }}
                        />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="w-full h-64 flex items-center justify-center border border-dashed border-white/10 rounded-xl">
                <p className="font-mono animate-pulse opacity-50 text-white">
                  SYSTEM_IDLE: NO_DATA
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      <style jsx global>{`
        /* Nasconde la barra di scorrimento ovunque */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
