module.exports = {
    extends: ['mantine', 'plugin:@next/next/recommended', 'plugin:jest/recommended'],
    plugins: ['testing-library', 'jest'],
    overrides: [
      {
        files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
        extends: ['plugin:next/core-web-vitals'],
      },
    ],
    parserOptions: {
      project: './tsconfig.json',
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'import/extensions': 'off',
    },
  };
  