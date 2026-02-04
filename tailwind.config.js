/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // Dark black theme for dating comparison presentation
        'dark-black': '#000000',
        'dark-gray': '#0a0a0a',
        'dark-surface': '#1a1a1a',
        // Vibrant accent colors
        'vibrant-purple': '#a855f7',
        'vibrant-pink': '#ec4899',
        'vibrant-orange': '#f97316',
        'vibrant-red': '#ef4444',
      },
      borderRadius: {
        'bento': '12px',
        'bento-lg': '16px',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
