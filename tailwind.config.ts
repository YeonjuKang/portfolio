import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-noto-sans-kr)', 'sans-serif'],
      },
      backgroundImage: {
        'mesh-gradient': `
          radial-gradient(at 20% 30%, rgba(124, 58, 237, 0.2) 0px, transparent 50%),
          radial-gradient(at 80% 10%, rgba(37, 99, 235, 0.2) 0px, transparent 50%),
          radial-gradient(at 50% 80%, rgba(6, 182, 212, 0.15) 0px, transparent 50%)
        `,
      },
      animation: {
        'gradient-shift': 'gradient-shift 6s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.8s ease forwards',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
