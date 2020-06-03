module.exports = {
  purge: [
    "./components/**/*.js",
    "./pages/**/*.js",
    "./components/**/*.tsx",
    "./pages/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        mygrey: "#F5F5F5",
        brandRed: "#E20303",
        brandBlack: "#000000",
        brandGrey: "#4D4D4D",
      },
      fontFamily: {
        sans: "Montserrat, sans-serif",
        serif: "Open Sans, sans-serif",
      },
    },
  },
  variants: {},
  plugins: [],
};
