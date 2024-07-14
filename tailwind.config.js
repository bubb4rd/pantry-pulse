/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "orange-900": "#F95738",
        "orange-500": "#EE964B",
        "yellow-300": "#F4D35E",
        "cream-900": "#F1FAEE",
        "cream-500": "#EBEBD3",
      },
      fontFamily: {
        apfel: ["Apfel", "sans-serif"],
        "apfel-brukt": ["Apfel-Brukt", "sans-serif"],
        "apfel-fett": ["Apfel-Fett", "sans-serif"],
        "apfel-regular": ["Apfel-Regular", "sans-serif"],
        "array-regular": ["Array-Regular", "sans-serif"],
        "array-semibold": ["Array-Semibold", "sans-serif"],
        "array-semibold-wide": ["Array-SemiboldWide", "sans-serif"],
        "array-bold": ["Array-Bold", "sans-serif"],
        "gasoek": ["Gasoek One"],
      },
      backgroundImage: {
        'hero': "url('./src/assets/hero.jpg)'",
        'food': "url('/src/assets/blueberries.jpg')",
        "signup": "url('/src/assets/spaghetti.jpg')"
      },
      transform: {
        'card': "scale(1.25)",
      }
    },
  },
  presets: [
      [
        ["@babel/preset-react", {"throwIfNamespace": false}]
      ]
  ],
  plugins: [
    require('@tailwindcss/forms'),
  ],
});

