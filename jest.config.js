const isCI = typeof process.env.GITHUB_RUN_ID !== 'undefined';

module.exports = {
  projects: [
    {
      transform: { '^.+\\.ts$': 'ts-jest' },
      moduleFileExtensions: ['ts', 'js', 'json', 'node'],
      roots: ['<rootDir>/src', '<rootDir>/test'],
      testEnvironment: 'node',
    },
  ],
  verbose: true,
  forceExit: false,
  coverageThreshold: {
    global: {
      branches: 15,
      functions: 30,
      lines: 30,
      statements: 30,
    },
  },
  // Exit immediately if any test fails.
  bail: true,
  globals: {
    'ts-jest': {
      // https://github.com/kulshekhar/ts-jest/blob/master/docs/user/config/isolatedModules.md#performance
      isolatedModules: isCI,
    },
  },
};
