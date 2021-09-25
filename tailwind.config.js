module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        WSAI: {
          Indigo: {
            25: '#EDEFFF',
            50: '#D6D9F1',
            100: '#D3D6ED',
            200: '#aaafd9',
            300: '#7f87c5',
            400: '#555fb2',
            500: '#2a379f',
            600: '#222c7f',
            700: '#19215f',
            800: '#111640',
            900: '#080b20',
          },
          JetBlack: '#585A6B',
          Orange: '#EE7520',
        },
      },
      fontFamily: {
        Lato: ['Lato', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
