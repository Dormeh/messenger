module.exports = {
  transformIgnorePatterns: ['node_modules/(?!(sucrase)/)'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
  },
  testEnvironment: "jsdom",
  setupFiles: [
    "<rootDir>/src/tests/setupEnv.ts"
  ],
  setupFilesAfterEnv: [
    "<rootDir>/src/tests/setup.ts"
  ],

  moduleNameMapper: {
    "\\.(css|scss|svg)$": "identity-obj-proxy",
    "^core(.*)$": "<rootDir>/src/core$1",
    "^components(.*)$": "<rootDir>/src/components$1",
    "^utils(.*)$": "<rootDir>/src/utils$1",
    "^services(.*)$": "<rootDir>/src/services$1",
    "^store(.*)$": "<rootDir>/src/store$1",
    "^pages(.*)$": "<rootDir>/src/pages$1",
    "^tests(.*)$": "<rootDir>/src/tests$1",
    "nanoid": "nanoid"
  }

};
