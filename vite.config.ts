import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      all: false,
    },
    dir: 'tests',
    workspace: [
      {
        extends: true,
        test: {
          name: 'unit',
          dir: 'tests/services',
        },
      },
      {
        extends: true,
        test: {
          name: 'e2e',
          dir: 'tests/controllers',
          environment: './prisma/vitest-environment-prisma/prisma-test-environment.ts',
        },
      },
    ],
  },
});
