module.exports = {
  mode: process.env.NODE_ENV ? "jit" : undefined,
  purge: ["./src/**/*.tsx"],
  theme: {extend: {}},
  variants: {extend: {}},
  plugins: [],
}
