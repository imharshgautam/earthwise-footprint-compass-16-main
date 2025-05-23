/** @type {import('tailwindcss').Config} */
export default {
  content: ['*'],
  theme: {
    extend: {},
  },
  plugins: [],
}

// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border) / <alpha-value>)',
      },
    },
  },
};