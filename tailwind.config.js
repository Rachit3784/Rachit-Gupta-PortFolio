// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
      extend: {

        animation: {
          'spin-slow': 'spin 3s linear infinite',
          'bounce-slow': 'bounce 2s infinite',
        },
        transitionDuration: {
          '2000': '2000ms',
        },
      },
    },
    plugins: [],
  }