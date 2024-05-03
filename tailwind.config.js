/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      colors: {
        'bg-grey': '#F1F3F4',
        'action-green': '#7FBC08',
        'hover-green': '#5F8D06',
        'icon-green': '#689310',
        'icon-grey': '#D9D9D9',
        'footer-grey': '#424242',
        'font-grey': '#767676',
        'title-grey': '#515151'
      },
    },
  },
  plugins: [],
}