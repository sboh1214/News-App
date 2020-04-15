const projectPath = path.resolve(__dirname, './src');

module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
