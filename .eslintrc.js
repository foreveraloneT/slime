module.exports = {
  env: {
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    indent: 'off',
    quotes: [2, 'single', 'avoid-escape'],
    '@typescript-eslint/indent': ['error', 2],
    'import/prefer-default-export': 'off',
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
