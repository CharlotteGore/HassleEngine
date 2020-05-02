module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ["<rootDir>/source/setupTests.ts"],
  moduleNameMapper: {
    "^glMatrix(.*)$": "<rootDir>/gl-matrix/src$1"
  }
};