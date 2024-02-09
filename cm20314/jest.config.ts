// jest.config.js or jest.config.ts
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
  }
};

export default config;
