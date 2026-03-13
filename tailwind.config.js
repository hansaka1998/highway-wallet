/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter'],
        'inter-italic': ['InterItalic'],
        'karantina-regular': ['KarantinaRegular'],
        'karantina-bold': ['KarantinaBold'],
      },
    },
  },
  plugins: [],
};
