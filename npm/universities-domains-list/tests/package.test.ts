import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { expect, test } from 'vite-plus/test';

const require = createRequire(import.meta.url);
const packageRoot = new URL('../', import.meta.url);
const repositoryRoot = new URL('../../', packageRoot);
const dataFile = 'world_universities_and_domains.json';
const source: unknown = JSON.parse(readFileSync(new URL(dataFile, repositoryRoot), 'utf8'));

test('the CommonJS package entry exports the complete upstream dataset', () => {
  expect(require('universities-domains-list')).toEqual(source);
});

test('the ES module package entry loads in Node without a bundler', () => {
  const output = execFileSync(
    'node',
    [
      '--input-type=module',
      '-e',
      "import universities from 'universities-domains-list'; console.log(JSON.stringify(universities));",
    ],
    { cwd: packageRoot, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 },
  );

  expect(JSON.parse(output)).toEqual(source);
});

test('the raw JSON export and license preserve the upstream files byte for byte', () => {
  expect(require(`universities-domains-list/${dataFile}`)).toEqual(source);

  for (const file of [dataFile, 'LICENSE.txt']) {
    expect(readFileSync(new URL(file, packageRoot))).toEqual(
      readFileSync(new URL(file, repositoryRoot)),
    );
  }
});
