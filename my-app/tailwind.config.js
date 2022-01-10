module.exports = {
  purge: ['./public/**/*.html', './src/**/*.vue'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'vue-grey': '#2c3e50',
        'vue-green': '#42b983'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
