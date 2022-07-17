/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  content: [
    "./src/pages/*.{html,js,jsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: { jetbrains: ["JetBrains Mono", "monospace"] },
    extend: {},
  },
  plugins: [],
};
