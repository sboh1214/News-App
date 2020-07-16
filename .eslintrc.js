module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'prettier',
    'prettier/react',
    'eslint-config-prettier',
    'plugin:prettier/recommended',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'react-hooks'],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
  },
  env: {
    jest: true,
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
