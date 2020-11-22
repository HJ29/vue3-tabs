module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-strongly-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-use-before-define': "off",
    "vue/html-self-closing": "error",
    '@typescript-eslint/no-empty-function': 'off',
    'semi': 'error',
    "indent": ["error", 2],
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "always"]
  },
  overrides: [{
    files: ["**/dist/*.js"]
  }]
}
