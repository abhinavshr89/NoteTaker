/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0a091b", // Background color
        accent: "#5c3d8f", // Button background
        accentHover: "#9d82c9", // Button hover background
        gradientStart: "rgba(92,54,103,0.5)", // Gradient start color
        gradientEnd: "transparent", // Gradient end color
      },
    },
  },
  plugins: [],
}

