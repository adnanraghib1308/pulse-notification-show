import { TestTypeOption } from "@repo/shared/types";
import { defineConfig, UserConfigExport } from "vitest/config";

// eslint-disable-next-line turbo/no-undeclared-env-vars
const testType = process.env.TEST_TYPE ?? TestTypeOption.UNIT;
const rootFolder = process.cwd();

const defConf: UserConfigExport = {
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    setupFiles: ["./tests/setup.ts"],
    root: rootFolder,
    globals: true,
    clearMocks: true,
    reporters: ["verbose"],
    pool: testType === TestTypeOption.UNIT ? "threads" : "forks",
    poolOptions: {
      threads: {
        minThreads: 1,
        maxThreads: 10,
      },
    },
    coverage: {
      // see mcr.config.ts for test coverage setup
      provider: "custom",
      customProviderModule: "vitest-monocart-coverage",
      clean: testType === TestTypeOption.UNIT,
    },
  },
};

export default defineConfig(defConf);
