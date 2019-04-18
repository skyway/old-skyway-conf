module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    jsx: true,
    sourceType: "module"
  },
  plugins: ["@typescript-eslint", "import", "react", "react-hooks"],
  settings: {
    react: {
      version: "detect"
    }
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
    "prettier/react"
  ],
  rules: {
    "no-console": "off",
    "no-debugger": "off",
    "no-else-return": "error",
    "no-self-compare": "error",
    "no-void": "error",
    "no-var": "error",
    "no-lonely-if": "error",
    "prefer-const": "error",

    "import/order": "error",
    "import/no-duplicates": "off",

    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-member-accessibility": [
      "error",
      { accessibility: "no-public" }
    ],
    "@typescript-eslint/no-use-before-define": "off",

    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error"
  }
};
