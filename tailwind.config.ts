import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cyber-black': '#000000',
        'cyber-cyan': '#00fff5',
        'cyber-magenta': '#ff00ff',
        'cyber-purple': '#9600ff',
        'cyber-blue': '#0033ff',
      },
      fontFamily: {
        cyber: ['var(--font-cyber)', 'sans-serif'],
        mono: ['var(--font-roboto-mono)', 'monospace'],
      },
      animation: {
        'glitch': 'glitch 1s infinite',
        'pulse-neon': 'pulse-neon 2s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        'pulse-neon': {
          '0%, 100%': {
            opacity: '1',
            filter: 'brightness(1.5) drop-shadow(0 0 15px currentColor)',
          },
          '50%': {
            opacity: '0.6',
            filter: 'brightness(1) drop-shadow(0 0 5px currentColor)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'cyber-grid': "url('/images/cyber-grid.svg')",
      },
    },
  },
  plugins: [],
}

export default config 