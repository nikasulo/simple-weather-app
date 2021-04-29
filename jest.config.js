module.exports = {
  setupFiles: ["@testing-library/react/dont-cleanup-after-each"],
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!src/index.tsx",
  ],
};
