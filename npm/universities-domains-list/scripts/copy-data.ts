import { copyFile } from 'node:fs/promises';

const packageRoot = new URL('../', import.meta.url);
const repositoryRoot = new URL('../../', packageRoot);

await Promise.all(
  ['world_universities_and_domains.json', 'LICENSE.txt'].map((file) =>
    copyFile(new URL(file, repositoryRoot), new URL(file, packageRoot)),
  ),
);
