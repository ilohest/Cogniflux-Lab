import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        accent: '#2CA898',
        primary: '#C2A898',
        'beige-light': '#FFF8EE',
        'beige-med': '#FCF0E3',
        'beige-dark': '#F4EBE1',
        text: '#2CA898',
        ink: '#260E03',
        muted: '#78695F',
      },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui'],
        serif: ['Fraunces', 'ui-serif', 'Georgia'],
      },
      boxShadow: {
        soft: '0 24px 80px rgba(38, 14, 3, 0.08)',
      },
    },
  },
  plugins: [],
} satisfies Config;
