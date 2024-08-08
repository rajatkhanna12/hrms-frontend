/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // other paths
  ],
  theme: {
    extend: {
      colors: {
        'custom-gray': 'rgb(241, 242, 244)',
        'custom-blue': 'rgb(135, 171, 207)',
      },
    },
  },
  plugins: [],
}