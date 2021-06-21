module.exports = {
  // messes with imported components needing all styles
  // purge: [
  //   './src/**/*.tsx'
  // ],
  purge: false,
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      borderColor: ['active'],
    },
  },
  plugins: [],
}
