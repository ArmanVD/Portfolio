export default [
  {
    ignores: ['node_modules', "eslint.config.js"]
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    rules: {
      'no-unused-vars': 'warn', // Warn about unused variables
      'no-console': 'off', // Allow console.log (change to "warn" if needed)
      'semi': ['error', 'always'], // Require semicolons
      'quotes': ['error', 'single'], // Enforce single quotes instead of double
      'indent': ['error', 2], // Enforce 2-space indentation
      'brace-style': ['error', '1tbs'], // One true brace style
      'comma-dangle': ['error', 'never'] // No trailing commas
    }
  }
];