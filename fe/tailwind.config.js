// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // Quan trọng: Chỉ định các file cần áp dụng style
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
