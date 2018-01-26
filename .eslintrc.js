module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  plugins: [
    'react',
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  rules: {
    'strict': ['error', 'global'],

    'default-case': 'error',
    'no-self-compare': 'error',
    'no-else-return': 'error',
    'no-throw-literal': 'error',
    'no-console': 'off',
    'no-debugger': 'off',
    'no-void': 'error',
    'no-var': 'error',
    'no-new-require': 'error',
    'no-lonely-if': 'error',
    'no-nested-ternary': 'error',
    'no-multiple-empty-lines': ['error', { 'max': 2 }],
    'no-unused-vars': ['error', {'args': 'all', 'argsIgnorePattern': '^_'}],
    'no-unused-expressions': 'off',
    'no-use-before-define': 'off',
    'prefer-const': 'error',
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],

    'react/jsx-uses-vars': 'warn'
  },
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true
  },
};
