module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        WSAI: {
          Indigo: '#2A379F',
          LightIndigo: '#5765D3',
          White: '#EDEFFF',
          DirtyWhite: '#D6D9F1',
          LightGray: '#B5B9DB',
          JetBlack: '#585A6B',
          Orange: '#EE7520',
        }
      },
      fontFamily: {
        Lato: ['Lato', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {

    },
  },
  plugins: [],
}