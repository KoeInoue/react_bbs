module.exports = {
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  env: {
    es6: true,
    node: true,
    browser: true,
    commonjs: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'eslint-plugin-prettier'],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  rules: {
    'react/prop-types': 'off', //not required prop-types cause use typescript
    'no-console': 'off', // to prevent forgetting to erase console.log()
    'no-unused-vars': 'off', // unused variables
    camelcase: 'warn', // camelcase
    'no-undef': 'off', // undefined variables
    'no-irregular-whitespace': 'warn', // irregular
    '@typescript-eslint/no-unused-vars': 'off',

    // These rules relate to ES6, also known as ES2015
    'arrow-parens': 'error', // require parentheses around arrow function arguments
    'arrow-spacing': 'error', // enforce consistent spacing before and after the arrow in arrow functions
    'generator-star-spacing': 'error', // enforce consistent spacing around `*` operators in generator functions
    'no-duplicate-imports': 'error', // disallow duplicate module imports
    'no-useless-computed-key': 'error', // 	disallow unnecessary computed property keys in objects and classes
    'no-useless-constructor': 'error', // disallow unnecessary constructors
    'no-useless-rename': 'error', // disallow renaming import, export, and destructured assignments to the same name
    'no-var': 'error', //	require `let` or `const` instead of `var`
    'object-shorthand': 'error', // require or disallow method and property shorthand syntax for object literals
    'prefer-arrow-callback': 'error', // require using arrow functions for callbacks
    'prefer-const': 'error', // require `const` declarations for variables that are never reassigned after declared
    'prefer-rest-params': 'error', // require rest parameters instead of `arguments`
    'prefer-spread': 'error', // require spread operators instead of `.apply()`
    'prefer-template': 'error', // require template literals instead of string concatenation
    'rest-spread-spacing': 'error', // 	enforce spacing between rest and spread operators and their expressions
    'template-curly-spacing': 'error', // require or disallow spacing around embedded expressions of template strings
    'yield-star-spacing': 'error', // require or disallow spacing around the `*` in `yield*` expressions

    // Prettier rules below
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        tabWidth: 2,
        useTabs: false,
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
        arrowParens: 'always',
        semi: true,
      },
    ],
  },
};
