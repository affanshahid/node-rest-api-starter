module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.test.json'
    }
  },
  'moduleFileExtensions': [
    'js',
    'json',
    'ts'
  ],
  'rootDir': 'src',
  'testRegex': '.spec.ts$',
  'transform': {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  'coverageDirectory': '../coverage',
  'testEnvironment': 'node'
};