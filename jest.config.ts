// jest.config.ts
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  // Other Jest configurations...
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  // Include testMatch configuration to include .tsx files
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)', // Include .js, .jsx, .ts, .tsx files in __tests__ directories
    '**/?(*.)+(spec|test).[tj]s?(x)', // Include .js, .jsx, .ts, .tsx files with spec or test in the filename
  ],
};

export default config;

