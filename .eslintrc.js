module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'airbnb',
    'airbnb/hooks',
    'prettier',
    'prettier/react',
    'eslint-config-prettier',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'react/jsx-filename-extension': [1, {extensions: ['.jsx', '.tsx']}],
    'import/extensions': [
      'error',
      'ignorePackages',
      {js: 'never', jsx: 'never', ts: 'never', tsx: 'never', json: 'never'},
    ],
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
