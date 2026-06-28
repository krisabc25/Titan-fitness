module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    'controllers/**/*.js',
    'models/**/*.js',
    'routes/**/*.js',
    'middleware/**/*.js',
    '!**/node_modules/**'
  ],
  coveragePathIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/tests/**/*.test.js'],
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js']
};
