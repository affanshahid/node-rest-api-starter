module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.test.json'
    }
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/main.ts'
  ],
  moduleFileExtensions: ['js', 'json', 'ts'],
  testEnvironment: 'node',
  "testMatch": [
    "**/tests/**/*.e2e-spec.(ts|js)"
  ],
  preset: 'ts-jest'
};
