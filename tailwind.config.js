/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'g-blue': '#4285F4',
        'g-blue-dark': '#1a73e8',
        'g-blue-light': '#e8f0fe',
        'g-red': '#EA4335',
        'g-red-light': '#fce8e6',
        'g-yellow': '#FBBC05',
        'g-yellow-light': '#fef7e0',
        'g-green': '#34A853',
        'g-green-light': '#e6f4ea',
        'g-surface': '#f8f9fa',
        'g-surface2': '#f1f3f4',
        'g-border': '#dadce0',
        'g-text': '#202124',
        'g-text2': '#5f6368',
        'g-text3': '#80868b',
      },
      fontFamily: {
        sans: ['Google Sans', 'Roboto', 'system-ui', 'sans-serif'],
        body: ['Roboto', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'g-sm': '0 1px 2px rgba(60,64,67,.3),0 1px 3px 1px rgba(60,64,67,.15)',
        'g-md': '0 1px 3px rgba(60,64,67,.3),0 4px 8px 3px rgba(60,64,67,.15)',
        'g-lg': '0 2px 6px rgba(60,64,67,.3),0 8px 24px 4px rgba(60,64,67,.15)',
      },
      borderRadius: {
        'g': '8px',
        'g-lg': '12px',
        'g-xl': '16px',
        'g-pill': '24px',
      },
    },
  },
  plugins: [],
}
