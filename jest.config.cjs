module.exports = {
  moduleDirectories: [
    'node_modules',
    './src/challenge/tests', // a utility folder
    __dirname, // the root directory
  ],
  "transform": {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest"
  },
  "testEnvironment": "jsdom"
};
