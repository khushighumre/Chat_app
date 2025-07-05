/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      'my-custom-bg': "url('./assets/assets.js')",
    },
  },
  plugins: [],
};
