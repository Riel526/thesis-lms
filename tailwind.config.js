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
            150: '#D7DBFA',
            200: '#AAB0DE',
            300: '#7f87c5',
            400: '#555fb2',
            500: '#2a379f',
            600: '#222c7f',
            700: '#19215f',
            800: '#111640',
            900: '#080b20',
          },
          JetBlack: '#585A6B',
          Orange: {
            100: '#fce3d2',
            200: '#f8c8a6',
            300: '#f5ac79',
            400: '#f1914d',
            500: '#ee7520',
            600: '#be5e1a',
            700: '#8f4613',
            800: '#5f2f0d',
            900: '#301706',
          },
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
