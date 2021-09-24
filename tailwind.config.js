const colors = require("tailwindcss/colors")

module.exports = {
  mode: process.env.NODE_ENV ? "jit" : undefined,
  purge: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        gray: colors.coolGray,
      },
    },
  },
  variants: {extend: {}},
  plugins: [],
}
