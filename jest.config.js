module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "^glMatrix(.*)$": "<rootDir>/gl-matrix/src$1"
  }
};