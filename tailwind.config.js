/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'sans-serif'],
        orbitron: ['var(--font-orbitron)', 'sans-serif'],
      },
      colors: {
        'cyber-void': 'rgb(var(--color-cyber-void))',
        'cyber-neon': 'rgb(var(--color-cyber-neon))',
        'cyber-acid': 'rgb(var(--color-cyber-acid))',
        'cyber-dream': 'rgb(var(--color-cyber-dream))',
        'cyber-surge': 'rgb(var(--color-cyber-surge))',
        'cyber-blood': 'rgb(var(--color-cyber-blood))',
      },
      boxShadow: {
        'glow-neon': '0 0 10px rgba(var(--color-cyber-neon), 0.3), 0 0 20px rgba(var(--color-cyber-neon), 0.2), 0 0 30px rgba(var(--color-cyber-neon), 0.1)',
        'glow-dream': '0 0 10px rgba(var(--color-cyber-dream), 0.3), 0 0 20px rgba(var(--color-cyber-dream), 0.2), 0 0 30px rgba(var(--color-cyber-dream), 0.1)',
        'glow-acid': '0 0 10px rgba(var(--color-cyber-acid), 0.3), 0 0 20px rgba(var(--color-cyber-acid), 0.2), 0 0 30px rgba(var(--color-cyber-acid), 0.1)',
      },
      animation: {
        'glitch': 'glitch 500ms infinite',
        'pulse-slow': 'pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'wave': 'wave 8s ease-in-out infinite',
        'grid-pulse': 'grid-pulse 4s ease-in-out infinite',
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: 0.1 },
          '50%': { opacity: 0.2 },
        },
        'pulse-neon': {
          '0%, 100%': {
            textShadow: '0 0 5px rgba(var(--color-cyber-neon), 0.5), 0 0 10px rgba(var(--color-cyber-neon), 0.3), 0 0 15px rgba(var(--color-cyber-neon), 0.2)',
          },
          '50%': {
            textShadow: '0 0 10px rgba(var(--color-cyber-neon), 0.8), 0 0 20px rgba(var(--color-cyber-neon), 0.6), 0 0 30px rgba(var(--color-cyber-neon), 0.4)',
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'wave': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'grid-pulse': {
          '0%, 100%': { opacity: 0.1 },
          '50%': { opacity: 0.2 },
        },
        'glitch': {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        }
      },
      backgroundImage: {
        'cyber-grid': "url('/images/cyber-grid.svg')",
        'cyber-gradient': 'linear-gradient(180deg, var(--color-cyber-void) 0%, rgba(var(--color-cyber-void), 0.95) 100%)',
      },
    },
  },
  plugins: [],
} 