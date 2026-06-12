/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F4F7FA',
          100: '#E8F0F8',
          200: '#C8D9EC',
          400: '#2D6A9F',
          500: '#1F4F7E',
          600: '#1A3A5C',
          700: '#142E4A',
          800: '#0F2238',
          900: '#0A1A2E',
        },
        ink: '#1A1A1A',
        body: '#4A5568',
        muted: '#5A6678',
        amber: {
          400: '#F2B843',
          500: '#E8A020',
          600: '#C8861A',
        },
      },
      fontFamily: {
        serif: ['Lora', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      maxWidth: { content: '1100px' },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'marquee': 'marquee 30s linear infinite',
        'glow': 'glow 2.5s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        glow: {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 1 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [],
}
