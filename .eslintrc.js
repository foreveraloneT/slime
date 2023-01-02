// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  env: {
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
  ],
  settings: {
    'import/resolver': {
      'eslint-import-resolver-custom-alias': {
        alias: {
          '@': path.resolve(__dirname, 'src'),
        },
        extensions: ['.js', '.ts'],
      },
    },
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    indent: 'off',
    quotes: [2, 'single', 'avoid-escape'],
    '@typescript-eslint/indent': ['error', 2],
    'import/prefer-default-export': 'off',
    'import/extensions': ['error', 'always', {
      js: 'never',
      ts: 'never',
    }],
    'class-methods-use-this': 'off',
    'max-classes-per-file': 'off',
    'no-use-before-define': 'off',
    'max-len': 'off',
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};
