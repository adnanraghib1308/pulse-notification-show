import * as process from "node:process";

import { baseMcrConfig, McrConfigOptions } from "@repo/shared/test-coverage";
import { TestTypeOption } from "@repo/shared/types";

// eslint-disable-next-line turbo/no-undeclared-env-vars
const testType = process.env.TEST_TYPE ?? TestTypeOption.UNIT;
const isComponentTest = testType === TestTypeOption.COMPONENT;

// "baseOptions" needs to be exported so the coverage merging function knows how to pick it up by default
export const baseOptions: McrConfigOptions = {
  thresholds: {
    lines: 90,
    statements: 90,
    // This line is commented out in the template because the absence of code branches would cause Vitest to incorrectly report 0% branch coverage.
    // Ensure this line is uncommented in a real package
    // branches: 90,
    functions: 90,
    bytes: 90,
  },
  includes: ["src/**/*.ts"],
  excludes: [
    "node_modules/",
    "tests/",
    "src/main.ts",
    "src/**/*.test.ts",
    "src/{__specs__,sandbox,constants,types}/**/*",
    "src/**/{index,constants,types}.ts",
    "src/external/scripts/**/*",
  ],
};

const mcrConfig = baseMcrConfig({
  ...baseOptions,
  testType: isComponentTest ? TestTypeOption.COMPONENT : TestTypeOption.UNIT,
});

export default mcrConfig;