module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'airbnb-base',
    'plugin:vue/vue3-essential',
    '@vue/typescript/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'import/extensions': 'off'
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'node_modules/@vue/cli-service/webpack.config.js'
      }
    }
  }
}
