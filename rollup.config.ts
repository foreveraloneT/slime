/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

const cjs = {
  input: 'src/index.ts',
  output: {
    dir: 'lib',
    format: 'cjs',
  },
  plugins: [
    typescript(),
  ],
};

const types = {
  input: 'src/index.ts',
  output: {
    dir: 'types',
    format: 'esm',
  },
  plugins: [
    dts(),
  ],
};

export default [
  cjs,
  types,
];
