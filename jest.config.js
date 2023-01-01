/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/*.spec.ts',
    '**/*.test.ts',
  ],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!**/node_modules/**',
    '!src/index.ts',
  ],
  coverageReporters: [
    'text',
    'cobertura',
    'lcov',
  ],
};
