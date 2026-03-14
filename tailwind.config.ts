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
            'brand-orange': '#FF6B35',
            'brand-pink': '#FF2D78',
            'brand-yellow': '#FFD23F',
            'cream': '#FFF8F0',
            'choco': '#3D1C02',
            'choco-light': '#7B4A1E',
            'glass': 'rgba(255,255,255,0.08)',
         },
         fontFamily: {
            'display': ['Outfit', 'sans-serif'],
            'body': ['Inter', 'sans-serif'],
            'signature': ['var(--font-caveat)', 'cursive'],
         },
         backgroundImage: {
            'radial-orange': 'radial-gradient(circle at center, #FF6B35, transparent)',
            'radial-pink': 'radial-gradient(circle at center, #FF2D78, transparent)',
            'gradient-hero': 'linear-gradient(135deg, #0a0a0a 0%, #1a0a00 50%, #0a0505 100%)',
         },
         animation: {
            'float': 'float 6s ease-in-out infinite',
            'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
            'spin-slow': 'spin 20s linear infinite',
            'drift': 'drift 8s ease-in-out infinite',
         },
         keyframes: {
            float: {
               '0%, 100%': { transform: 'translateY(0px)' },
               '50%': { transform: 'translateY(-20px)' },
            },
            pulseGlow: {
               '0%, 100%': { boxShadow: '0 0 20px rgba(255,107,53,0.4)' },
               '50%': { boxShadow: '0 0 60px rgba(255,107,53,0.8)' },
            },
            drift: {
               '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
               '33%': { transform: 'translate(20px, -15px) rotate(5deg)' },
               '66%': { transform: 'translate(-10px, 10px) rotate(-3deg)' },
            },
         },
         backdropBlur: {
            xs: '2px',
         },
         boxShadow: {
            'glow-orange': '0 0 40px rgba(255,107,53,0.3)',
            'glow-pink': '0 0 40px rgba(255,45,120,0.3)',
            'glass': '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
            'deep': '0 25px 80px rgba(0,0,0,0.6)',
         },
      },
   },
   plugins: [],
}

export default config
