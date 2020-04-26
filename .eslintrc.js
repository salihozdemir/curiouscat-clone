module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["prettier/vue"],
  plugins: ["vue"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: "babel-eslint"
  }
};
