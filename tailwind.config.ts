
import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(240 5% 88%)',
        background: 'hsl(0 0% 100%)',
        foreground: 'hsl(240 10% 3.9%)',
        muted: 'hsl(240 4.8% 95.9%)',
        mutedForeground: 'hsl(240 3.8% 45%)',
      }
    },
  },
  plugins: [],
} satisfies Config
