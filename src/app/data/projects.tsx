// @/data/projects.ts

export interface Project {
    id: number;
    title: string;
    description: string;
    tags: string[];
    image: string;
    category: string;
    details: {
        features: string[];
        tech: string;
    };
}

export const projects: Project[] = [
    {
        id: 1,
        title: "WifiHunter Suite",
        description: "Toolkit avanzato per l'analisi del protocollo 802.11 e il penetration testing, con capacità di iniezione pacchetti in tempo reale e rilevamento di attacchi di deautenticazione",
        tags: ["Rust", "GUI", "Networking", "802.11", "Security"],
        image: "/images/projects/UaN9AAzx.jpg",
        category: "Red Team",
        details: {
            features: [
                "Cattura e analisi pacchetti in tempo reale",
                "Framework personalizzato per l'iniezione di pacchetti",
                "Rilevamento di attacchi di deautenticazione",
                "Visualizzazione della topologia di rete",
                "Analisi del traffico cifrato"
            ],
            tech: "Sviluppato in Rust con GTK per alte prestazioni e un aspetto nativo. Utilizza API di rete a basso livello per l'accesso diretto all'hardware."
        }
    },
    {
        id: 2,
        title: "AirBreaker",
        description: "Strumento completo per la valutazione della sicurezza delle reti wireless, con moduli avanzati di exploit e scansione automatizzata delle vulnerabilità",
        tags: ["C++", "Qt", "Networking", "802.11", "Pentesting"],
        image: "/images/projects/Jj_5i311.jpg",
        category: "Red Team",
        details: {
            features: [
                "Valutazione automatica delle vulnerabilità",
                "Moduli di exploit personalizzati",
                "Supporto all'accelerazione hardware",
                "Creazione avanzata di pacchetti",
                "Mappatura di rete in tempo reale"
            ],
            tech: "Sviluppato in C++ con il framework Qt per compatibilità cross-platform. Implementa protocolli personalizzati per test di sicurezza avanzati."
        }
    },
    {
        id: 3,
        title: "ExcelMaster CLI",
        description: "Processore da linea di comando per file Excel ad alte prestazioni, con funzionalità avanzate di manipolazione dati e automazione",
        tags: ["Python", "CLI", "Data Processing", "Automation"],
        image: "/images/projects/magicstudio-art.jpg",
        category: "Tools",
        details: {
            features: [
                "Capacità di elaborazione batch",
                "Valutazione di formule personalizzate",
                "Validazione e pulizia dei dati",
                "Reportistica automatizzata",
                "Generazione basata su template"
            ],
            tech: "Sviluppato in Python, utilizza pandas e openpyxl per una manipolazione efficiente dei file Excel. Include un DSL personalizzato per operazioni avanzate."
        }
    },
    {
        id: 4,
        title: "CyberAudit Pro",
        description: "Piattaforma automatizzata per la valutazione della sicurezza, con funzionalità complete di scansione delle vulnerabilità e reportistica",
        tags: ["Python", "React", "Security", "Automation"],
        image: "/images/projects/magicstudio-art(1).jpg",
        category: "Security",
        details: {
            features: [
                "Scansione automatica delle vulnerabilità",
                "Sviluppo di exploit personalizzati",
                "Reportistica di conformità",
                "Valutazione dei rischi",
                "Monitoraggio delle attività di remediation"
            ],
            tech: "Applicazione full-stack con backend in Python e frontend in React. Implementa protocolli di sicurezza personalizzati e framework di test automatizzati."
        }
    }
];