module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  plugins: ['react', 'prettier'],
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  rules: {
    strict: ['error', 'global'],

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
    'no-multiple-empty-lines': ['error', { max: 2 }],
    'no-unused-vars': ['error', { args: 'all', argsIgnorePattern: '^_' }],
    'no-unused-expressions': 'off',
    'no-use-before-define': 'off',
    'prefer-const': 'error',
    semi: ['error', 'always'],
    quotes: ['error', 'single'],

    'react/jsx-uses-vars': 'warn',
    'react/prop-types': 'off',

    // prettier
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
      },
    ],
  },
  env: {
    browser: true,
    node: true,
    jasmine: true,
    es6: true,
  },
};
