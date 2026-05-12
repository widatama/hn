import { defineConfig } from 'oxlint';
import stylistic from '@stylistic/eslint-plugin';

const styleConfig = stylistic.configs.customize({
  jsx: false, semi: true, arrowParens: true, braceStyle: '1tbs',
});

const styleRules: Record<string, unknown> = {};
for (const [key, val] of Object.entries(styleConfig.rules ?? {})) {
  styleRules[key.replace(/^@stylistic\//, 'stylistic/')] = val;
}

export default defineConfig({
  plugins: ['react', 'unicorn'],
  jsPlugins: [
    { name: 'stylistic', specifier: '@stylistic/eslint-plugin' },
  ],
  categories: {
    correctness: 'error',
    suspicious: 'warn',
    perf: 'warn',
  },
  settings: {
    react: { version: '19.0.0' },
  },
  options: {
    typeAware: true,
  },
  rules: {
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-console': 'warn',
    ...styleRules,
  },
  overrides: [
    {
      files: ['*.config.*'],
      env: { node: true },
      rules: { 'no-console': 'off' },
    },
  ],
});
