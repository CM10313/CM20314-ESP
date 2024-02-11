// jest.config.js or jest.config.ts
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  // Other Jest configurations...
  testEnvironment: 'jsdom',
};

export default config;
