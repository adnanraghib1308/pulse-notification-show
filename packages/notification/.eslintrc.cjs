/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/library.js"],
  parser: "@typescript-eslint/parser",
  ignorePatterns: [".eslintrc.cjs", 'vitest.config.ts', '/tests/setup.ts', "coverage/**", "coverage-reports/**","mcr.config.ts"],
  parserOptions: {
    project: "./tsconfig.lint.json",
    tsconfigRootDir: __dirname,
  },
};
