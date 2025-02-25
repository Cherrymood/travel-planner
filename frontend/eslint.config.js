import reactPlugin from "eslint-plugin-react";

export default {
  plugins: {
    react: reactPlugin,
  },
  extends: ["plugin:react/recommended"],
  settings: {
    react: {
      version: "detect", // Automatically detect React version
    },
  },
  rules: {
    "react/no-unescaped-entities": "off",
    "react/prop-types": "off",
  },
};
