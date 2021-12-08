module.exports = {
  root: true,
  extends: '@react-native-community',
  env: {
    browser: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    fetch: true,
    window: true,
    navigator: true,
    ReactElement: true,
    requestAnimationFrame: true,
    jest: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  ignorePatterns: ['tools/**/*'],
  rules: {
    'prettier/prettier': 0,
    'react/jsx-filename-extension': ['off'],
    'jsx-a11y/accessible-emoji': ['off'],
    'react/jsx-one-expression-per-line': ['off'],
    'max-len': ['error', 160],
    'class-methods-use-this': 0,
    'no-console': 0,
    'react/static-property-placement': 0,
    'react/jsx-props-no-spreading': 0,
    'react/state-in-constructor': 0,
    'max-classes-per-file': 0,
    'react/destructuring-assignment': 0,
    'import/extensions': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-var-requires': 0,
    'object-curly-spacing': ['error', 'always'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
  },
 };
  