const {defaults: tsjPreset} = require('ts-jest/presets');

module.exports = {
  ...tsjPreset,
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    ...tsjPreset.transform,
    '\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native(.*)' +
      '|@react-native-community' +
      '|native-base-shoutem-theme' +
      ')/)',
  ],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  testPathIgnorePatterns: ['\\.snap$', '<rootDir>/node_modules/'],
  testEnvironment: 'node',
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
  cacheDirectory: '.jest/cache',
};
