module.exports = {
  extends: [
    "./node_modules/react-scripts/node_modules/eslint-config-react-app/index.js", // https://github.com/facebook/create-react-app/issues/1217#issuecomment-545094524
    // "shared-config",
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    // warn
    '@typescript-eslint/no-use-before-define': 'warn',
    'prefer-const': 'warn',

    // off
    '@typescript-eslint/camelcase': 'off',

    // error
    // 'array-bracket-spacing': ['error', 'always'],
  },
  "overrides": [
    {
      "files": ["**/*.ts?(x)"],
      "rules": {
        // "additional-typescript-only-rule": "warn"
      }
    }
  ]
};
