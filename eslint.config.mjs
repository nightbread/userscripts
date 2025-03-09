import prettier from 'eslint-plugin-prettier';
import stylistic from '@stylistic/eslint-plugin';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptSortKeys from 'eslint-plugin-typescript-sort-keys';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['dist/*.js'],
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ),
  {
    plugins: {
      '@stylistic': stylistic,
      '@typescript-eslint': typescriptEslint,
      prettier,
      'typescript-sort-keys': typescriptSortKeys,
    },

    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'commonjs',

      parserOptions: {
        project: './tsconfig.json',
      },
    },

    rules: {
      '@typescript-eslint/array-type': [
        'warn',
        {
          default: 'array',
          readonly: 'array',
        },
      ],

      '@typescript-eslint/brace-style': 'off',
      '@typescript-eslint/camelcase': 'off',
      '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@stylistic/func-call-spacing': 'warn',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/member-ordering': 'error',
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/no-empty-interface': 'error',
      '@typescript-eslint/no-explicit-any': 'off',

      '@stylistic/no-extra-parens': [
        'warn',
        'all',
        {
          conditionalAssign: false,
          enforceForArrowConditionals: false,
          enforceForNewInMemberExpressions: false,
          ignoreJSX: 'all',
          nestedBinaryExpressions: false,
          returnAssign: false,
        },
      ],

      '@typescript-eslint/no-inferrable-types': 'off',

      '@typescript-eslint/no-magic-numbers': [
        'warn',
        {
          enforceConst: true,
          ignore: [-1, 0, 1, 2, 3, 4, 10, 100, 200, 201, 204, 301, 302, 400, 404, 500, 3000],
          ignoreEnums: true,
          ignoreNumericLiteralTypes: true,
          ignoreReadonlyClassProperties: true,
        },
      ],

      '@typescript-eslint/no-non-null-assertion': 'off',

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_([a-z_]+)?$',
          varsIgnorePattern: '^_([a-z_]+)?$',
        },
      ],

      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-var-requires': 0,
      '@stylistic/quotes': ['warn', 'single'],
      '@typescript-eslint/restrict-plus-operands': 'warn',
      '@typescript-eslint/unified-signatures': 'warn',
      'brace-style': 'off',
      camelcase: 'off',
      'func-call-spacing': 'off',
      indent: 'off',
      'linebreak-style': ['error', 'unix'],
      'no-console': 0,
      'no-extra-parens': 'off',
      'no-magic-numbers': 'off',

      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
        },
      ],

      quotes: 'off',
      semi: ['error', 'always'],

      'sort-keys': [
        'warn',
        'asc',
        {
          natural: true,
        },
      ],

      'sort-vars': 'warn',
    },
  },
];
