/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
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
