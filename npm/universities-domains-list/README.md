# universities-domains-list

[Hipo's university domains list](https://github.com/Hipo/university-domains-list)
as an npm package, with TypeScript declarations and no runtime dependencies.
The default export is the complete, unchanged array from
`world_universities_and_domains.json` at the repository root.

## Install

After the first npm release:

```bash
bun add universities-domains-list
# or: npm install universities-domains-list
```

To use a local checkout before publishing, build and pack it as described below,
then install the generated tarball in your project:

```bash
bun add /path/to/universities-domains-list-0.1.0.tgz
```

## Usage

```js
import universities from 'universities-domains-list';

const canadianUniversities = universities.filter(
  (university) => university.alpha_two_code === 'CA',
);
```

CommonJS is also supported:

```js
const universities = require('universities-domains-list');
```

The raw JSON is available directly:

```js
import universities from 'universities-domains-list/world_universities_and_domains.json' with { type: 'json' };
```

The package exports a `University` type for ES modules:

```ts
import type { University } from 'universities-domains-list';
```

Each entry has this shape:

```ts
interface University {
  name: string;
  country: string;
  alpha_two_code: string;
  'state-province': string | null;
  domains: string[];
  web_pages: string[];
}
```

Some universities use department subdomains, such as `cs.usc.edu`, while the
dataset contains the parent domain, such as `usc.edu`.

## Build and test

Use Bun 1.4.4 and Node.js 22.18+, 24.11+, or 26+ for the Vite+ toolchain.
From the repository root:

```bash
cd npm/universities-domains-list
bun install --frozen-lockfile
bun run build
bun run check
bun run test
```

`bun run build` copies the current root JSON and MIT license, then runs
`vp pack` to produce ESM, CommonJS, and declaration files in `dist/`.
Generated files are ignored by Git. Update the repository's root JSON to
change the packaged data.

## Pack and publish

Vite+ delegates package management to the pinned Bun version through `vp pm`.
The `prepack` hook rebuilds the package before packing or publishing.

```bash
# Create an installable tarball without publishing.
bunx --no-install vp pm pack

# Preview the npm release without uploading it.
bun run release --dry-run

# Publish the version in package.json after authenticating with npm.
bun run release
```

Bump `version` in `package.json` before subsequent releases, and commit the
updated manifest and Bun lockfile. The package includes the unchanged JSON,
compiled entry points, declarations, this README, and the upstream MIT license.

## License

MIT. The bundled data is maintained by Hipo and the upstream contributors.
The upstream copyright notice is preserved in the packaged `LICENSE.txt`.
