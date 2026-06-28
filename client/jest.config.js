module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.js'],
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testMatch: ['**/src/tests/**/*.test.js'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/index.js',
    '!src/**/*.test.js',
  ],
  coveragePathIgnorePatterns: ['/node_modules/'],
};
