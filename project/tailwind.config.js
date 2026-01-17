/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        yasna: {
          primary: '#1E3A5F',
          accent: '#C9A227',
          lightBg: '#F5F7FB',
          warmBg: '#FDF8F3',
          darkBg: '#152238',
          textPrimary: '#333333',
          textMuted: '#666666',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Raleway', 'sans-serif'],
      },
      letterSpacing: {
        'widest-plus': '0.2em',
      },
      boxShadow: {
        'yasna': '0 4px 20px rgba(0, 0, 0, 0.06)',
        'yasna-hover': '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
};
