module.exports = {
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
    },
  },
  roots: ["<rootDir>/"],
  testMatch: ["**/?(*.)+(spec|test).+(ts|tsx|js)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupTestFrameworkScriptFile: "<rootDir>/config/jest/setup.js",
};
