/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de elegancia suprema - Colores oscuros y sofisticados
        elegant: {
          navy: '#1A1A40', // Azul oscuro elegante - Principal
          wine: '#4C0027', // Vino profundo - Acentos
          forest: '#1E5128', // Verde bosque - Éxito/Positivo
          deep: '#082032', // Azul profundo - Secundario
          black: '#000000', // Negro puro - Base
        },
        // Variaciones de los colores principales para diferentes tonos
        dark: {
          50: '#f5f5f7',
          100: '#e8e8ec',
          200: '#d1d1d9',
          300: '#b0b0c0',
          400: '#8a8a9f',
          500: '#6a6a7f',
          600: '#4a4a5f',
          700: '#2a2a3f',
          800: '#1A1A40', // Navy principal
          900: '#0d0d20',
          950: '#000000', // Negro puro
        },
        accent: {
          50: '#fef2f6',
          100: '#fde6ed',
          200: '#fcd0dd',
          300: '#faa8c0',
          400: '#f7749b',
          500: '#ee4876',
          600: '#dc2a5e',
          700: '#be1e4a',
          800: '#9e1c42',
          900: '#4C0027', // Wine principal
        },
        success: {
          50: '#f0fdf5',
          100: '#dcfce8',
          200: '#bbf7d1',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#1E5128', // Forest principal
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        // Colores de soporte elegantes
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        red: {
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        float: 'float 6s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center',
          },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'slide-up': {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'scale-in': {
          from: { transform: 'scale(0.9)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
