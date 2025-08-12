
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				
				/* Cores da marca com suporte a alpha */
				brand: {
					primary: 'rgb(var(--brand-primary) / <alpha-value>)',
					secondary: 'rgb(var(--brand-secondary) / <alpha-value>)'
				},
				
				/* Superfícies progressivas */
				surface: {
					0: 'rgb(var(--surface-0) / <alpha-value>)',
					1: 'rgb(var(--surface-1) / <alpha-value>)',
					2: 'rgb(var(--surface-2) / <alpha-value>)'
				},
				
				/* Texto principal */
				ink: 'rgb(var(--ink) / <alpha-value>)',
				
				/* Cores legadas (mantendo compatibilidade) */
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					50: 'rgb(var(--brand-primary) / 0.05)',
					100: 'rgb(var(--brand-primary) / 0.1)',
					200: 'rgb(var(--brand-primary) / 0.2)',
					300: 'rgb(var(--brand-primary) / 0.3)',
					400: 'rgb(var(--brand-primary) / 0.4)',
					500: 'rgb(var(--brand-primary) / 1)',
					600: 'rgb(var(--brand-primary) / 1)',
					700: 'rgb(var(--brand-primary) / 1)',
					800: 'rgb(var(--brand-primary) / 1)',
					900: 'rgb(var(--brand-primary) / 1)',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					50: 'rgb(var(--brand-secondary) / 0.05)',
					100: 'rgb(var(--brand-secondary) / 0.1)',
					200: 'rgb(var(--brand-secondary) / 0.2)',
					300: 'rgb(var(--brand-secondary) / 0.3)',
					400: 'rgb(var(--brand-secondary) / 0.4)',
					500: 'rgb(var(--brand-secondary) / 1)',
					600: 'rgb(var(--brand-secondary) / 1)',
					700: 'rgb(var(--brand-secondary) / 1)',
					800: 'rgb(var(--brand-secondary) / 1)',
					900: 'rgb(var(--brand-secondary) / 1)',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				heading: ['Inter', 'system-ui', 'sans-serif'],
			},
			fontSize: {
				'xs': ['0.75rem', { lineHeight: '1rem' }],
				'sm': ['0.875rem', { lineHeight: '1.25rem' }],
				'base': ['1rem', { lineHeight: '1.5rem' }],
				'lg': ['1.125rem', { lineHeight: '1.75rem' }],
				'xl': ['1.25rem', { lineHeight: '1.75rem' }],
				'2xl': ['1.5rem', { lineHeight: '2rem' }],
				'3xl': ['1.875rem', { lineHeight: '2.25rem' }],
				'4xl': ['2.25rem', { lineHeight: '2.5rem' }],
				'5xl': ['3rem', { lineHeight: '1' }],
				'6xl': ['3.75rem', { lineHeight: '1' }],
				'hero': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.1' }],
			},
			spacing: {
				'section': 'clamp(4rem, 8vw, 8rem)',
				'content': 'clamp(2rem, 4vw, 4rem)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-hero': 'linear-gradient(135deg, rgb(var(--brand-primary)), rgb(var(--brand-secondary)))',
				'gradient-feature': 'linear-gradient(135deg, rgb(var(--brand-primary) / 0.05), rgb(var(--brand-secondary) / 0.05))',
			},
			keyframes: {
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 0 0 rgb(var(--brand-primary) / 0.4)' },
					'50%': { boxShadow: '0 0 0 20px rgb(var(--brand-primary) / 0)' }
				}
			},
			animation: {
				'fade-in': 'fade-in 0.6s ease-out',
				'fade-in-up': 'fade-in-up 0.8s ease-out',
				'scale-in': 'scale-in 0.5s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
