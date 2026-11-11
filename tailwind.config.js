/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        festive: {
          marigold: '#F59E0B',
          saffron: '#FF7722',
          kumkum: '#E11D48',
          gold: '#FBBF24',
          deepGold: '#D97706',
          purple: '#6D28D9',
          royal: '#4C1D95',
          cream: '#FFFBEB',
          softRose: '#FFE4E6',
          night: '#0F172A',
          twilight: '#1E1B4B'
        }
      },
      fontFamily: {
        cartoon: ['"Fredoka"', '"Comic Neue"', 'cursive', 'sans-serif'],
        festive: ['"Cinzel Decorative"', '"Playfair Display"', 'serif'],
        body: ['"Quicksand"', '"Nunito"', 'sans-serif'],
        handwritten: ['"Caveat"', 'cursive', 'sans-serif']
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s infinite',
        'spin-slow': 'spin 18s linear infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', filter: 'drop-shadow(0 0 15px rgba(245, 158, 11, 0.6))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 25px rgba(225, 29, 72, 0.8))' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}

