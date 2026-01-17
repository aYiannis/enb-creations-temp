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
				'rustic-brown': '#2E2825'
			},
			fontFamily: {
				sans: ['Lato', 'sans-serif'],
				serif: ['Playfair Display', 'serif']
			},
			animation: {
				'fade-in-up': 'fadeInUp 1s ease-out forwards'
			},
			keyframes: {
				fadeInUp: {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				}
			}
		}
	},
	plugins: [daisyui],
	daisyui: {
		themes: [
			{
				rustic: {
					primary: '#C87960', // Terracotta
					'primary-content': '#FFFFFF',
					secondary: '#84A98C', // Sage
					'secondary-content': '#FFFFFF',
					accent: '#4A403A', // Stone
					neutral: '#2E2825', // Brown
					'neutral-content': '#F9F7F2',
					'base-100': '#F9F7F2', // Cream
					'base-content': '#4A403A', // Stone - CRITICAL FIX
					info: '#3abff8',
					success: '#36d399',
					warning: '#fbbd23',
					error: '#f87272'
				}
			}
		]
	}
};
