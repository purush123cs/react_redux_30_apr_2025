module.exports = {
  preset: "ts-jest", // Use ts-jest preset
  testEnvironment: "jest-environment-jsdom", // Use jsdom for DOM-related tests
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Setup file for jest-dom
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Use ts-jest for TypeScript files
  },
  testPathIgnorePatterns: ["/node_modules/"], // Ignore node_modules
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"], // Recognize these file extensions
};