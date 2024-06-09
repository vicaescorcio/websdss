// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Path to Next.js app to load next.config.js
  dir: './',
});

/** @type {import('@jest/types').Config.InitialOptions} */
const customJestConfig = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  /**
   * Custom config goes here, I am not adding it to keep this example simple.
   * See next/jest examples for more information.
   */
};

module.exports = async () => ({
  ...(await createJestConfig(customJestConfig)()),
  transformIgnorePatterns: [
    // The regex below is just a guess, you might tweak it
    '/node_modules/(?!(react-leaflet/lib|@react-leaflet/core/lib)/)',
  ],
});
