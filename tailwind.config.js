const colors = require("tailwindcss/colors")

module.exports = {
  mode: process.env.NODE_ENV ? "jit" : undefined,
  purge: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        gray: colors.coolGray,
      },
      boxShadow: {
        DEFAULT: "0px 1px 1px 0px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  variants: {extend: {opacity: ["disabled"]}},
  plugins: [],
}
