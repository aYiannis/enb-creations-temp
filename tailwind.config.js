import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'rustic-cream': '#F9F7F2',
        'rustic-stone': '#4A403A',
        'rustic-terracotta': '#C87960',
        'rustic-sage': '#84A98C',
        'rustic-brown': '#2E2825',
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    }
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light",
      "dark",
      {
        rustic: {
          "primary": "#C87960",    // rustic-terracotta
          "secondary": "#84A98C",  // rustic-sage
          "accent": "#4A403A",     // rustic-stone
          "neutral": "#2E2825",    // rustic-brown
          "base-100": "#F9F7F2",   // rustic-cream
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
    ],
  },
};
