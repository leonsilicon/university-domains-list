import { defineConfig } from 'vite-plus';

export default defineConfig({
  pack: [
    {
      entry: ['src/index.ts'],
      format: ['esm'],
      dts: true,
      deps: {
        neverBundle: ['../world_universities_and_domains.json'],
      },
      clean: true,
    },
    {
      entry: { index: 'src/require.ts' },
      format: ['cjs'],
      dts: true,
      deps: {
        neverBundle: ['../world_universities_and_domains.json'],
      },
      clean: true,
    },
  ],
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {
    singleQuote: true,
    printWidth: 100,
    ignorePatterns: ['world_universities_and_domains.json', 'LICENSE.txt'],
  },
  test: {
    include: ['tests/**/*.test.ts'],
  },
});
