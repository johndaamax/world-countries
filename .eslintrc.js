module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'airbnb',
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'plugin:react/jsx-runtime', // Disable React in scope rule for > React 17 projects
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    indent: 0,
    'arrow-parens': 0,
    'no-return-await': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'no-debugger': 1,
    'no-console': [0, { allow: ['warn', 'error'] }],
    'no-multiple-empty-lines': [2, { max: 1, maxEOF: 0, maxBOF: 0 }],
    'eol-last': [2, 'always'],
    semi: [2, 'always'],
    'react-hooks/exhaustive-deps': 0,
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-closing-bracket-location': 0,
    'react/jsx-no-useless-fragment': 0,
    'no-use-before-define': 'off',
    'spaced-comment': 0,
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/explicit-function-return-type': ['error'],
    '@typescript-eslint/explicit-module-boundary-types': ['error'],
    '@typescript-eslint/no-unused-vars': 0,
    'no-shadow': 0,
    '@typescript-eslint/no-shadow': 1,
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }], // https://stackoverflow.com/a/58835704
    'import/extensions': [
      // Prevents the need to always include extension within import path. @ref: https://stackoverflow.com/a/59268871
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/jsx-wrap-multilines': [
      'error',
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'ignore',
        prop: 'ignore',
      },
    ],
    'max-len': [
      // Re-declaring max-len to ignore comments and ignore trailing comments
      'error',
      {
        code: 200,
        tabWidth: 2,
        ignorePattern: 'true',
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'import/order': 0, // Allow custom grouping of imports
    'unused-imports/no-unused-imports-ts': 1,
    'object-curly-newline': ['error', { consistent: true }], // Redeclaring to not enforce line breaks in object, just ensure that they're consistent
    'import/prefer-default-export': 0, // Disabling this as some constants files only export 1 constant which is then still perfectly acceptable
    'arrow-body-style': 0, // Do not enforce blocks around arrow body
    'consistent-return': 0, // Do not enforce consistent returns
    'implicit-arrow-linebreak': 0, // Do not enforce this
    'operator-linebreak': 0, // Do not enfore this, due to impossible to setup with prettier
    'react/jsx-one-expression-per-line': 0, // Disabled this for smaller file line numbers, and for a lack of valuable added readability
    'react/require-default-props': 0,
    'jsx-a11y/click-events-have-key-events': 'warn', // Changing from `error` because it is helpful but no need to enforce it atm
    'jsx-a11y/no-noninteractive-element-interactions': 'warn', // Changing from `error` because it is helpful but no need to enforce it atm
    'jsx-a11y/no-static-element-interactions': 'warn', // Changing from `error` because it is helpful but no need to enforce it atm
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    'import/resolver': {
      // Set module import resolution, @ref: https://stackoverflow.com/a/55280867
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
      },
    },
  },
  plugins: ['unused-imports'],
  ignorePatterns: ['src/setupTests.ts', 'src/test', 'src/**/*.test.ts', 'src/**/*.test.tsx', 'src/utils/hsmUtils.js'],
};
