/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

import { readdirSync, statSync } from 'fs';
import typescript from '@rollup/plugin-typescript';

const EXCLUDES = [
  '/__tests__/',
  'src/utils/validate.ts',
  'src/index.ts',
];

function scan(dir: string, tester: RegExp): string[] {
  const files = readdirSync(dir);

  return files.map((file) => `${dir}/${file}`)
    .filter((filePath) => {
      const info = statSync(filePath);

      return info.isDirectory;
    }).filter((filePath) => tester.test(filePath));
}

const excludes = EXCLUDES.map((exclude) => new RegExp(exclude, 'i'));

const treeShakingInput1 = scan('src', /(js|ts)$/)
  .filter((file) => excludes.every((exclude) => !exclude.test(file)));

const treeShakingInput2 = scan('src/utils', /(js|ts)$/)
  .filter((file) => excludes.every((exclude) => !exclude.test(file)));

console.log('Tree shaking 1', treeShakingInput1);
console.log('Tree shaking 2', treeShakingInput2);

const esm = {
  input: 'src/index.ts',
  output: {
    dir: 'lib/esm',
    format: 'esm',
  },
  plugins: [
    typescript({
      tsconfig: 'tsconfig.build.json', // we need to emit .d.ts here
    }),
  ],
};

const esmTreeShaking1 = {
  input: treeShakingInput1,
  output: {
    dir: 'lib/esm',
    format: 'esm',
  },
  plugins: [
    typescript(),
  ],
};

const esmShakingEsm2 = {
  input: treeShakingInput2,
  output: {
    dir: 'lib/esm/utils',
    format: 'esm',
  },
  plugins: [
    typescript(),
  ],
};

const cjs = {
  input: 'src/index.ts',
  output: {
    dir: 'lib/cjs',
    format: 'cjs',
  },
  plugins: [
    typescript(),
  ],
};

export default [
  esm,
  esmTreeShaking1,
  esmShakingEsm2,
  cjs,
];