module.exports = {
  root: true,
  extends: [
    'airbnb',
    'airbnb-typescript',
    'next',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    project: ['./tsconfig.json', './tsconfig.config.json'],
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: ['./tsconfig.json', './tsconfig.config.json'],
      },
    },
  },
};
