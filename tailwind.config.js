/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'md': '768px',
        'lg': '1300px',
      },
      gridTemplateColumns: {
        'columns-base-content-md': 'var(--columns-base-content-md)',
        'columns-base-content-lg': 'var(--columns-base-content-lg)',
      },
      gridColumn: {
        'span-base-content-columns-md': 'var(--span-base-content-columns-md)',
        'span-content-columns-md': 'var(--span-content-columns-md)',
        'span-base-content-columns-lg': 'var(--span-base-content-columns-lg)',
        'span-content-columns-lg': 'var(--span-content-columns-lg)',
      },
      gridColumnStart: {
        'content-column-md': 'var(--start-content-column-md)',
        'content-column-lg': 'var(--start-content-column-lg)',
      }
    },
  },
  plugins: [],
};