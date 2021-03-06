// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    es6:true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-tabs':'off',
    'no-extra-semi':'error',
    'indent':[0],
    'comma-spacing':[0],
    'semi':[2,'always'],
    'key-spacing':[1,{
      'beforeColon':false,
      'afterColon':true
    }],
    'no-mixed-spaces-and-tabs':'off',
    "one-var": ["error", {"var": "always", "let": "never", "const": "never" }],
    'no-unused-vars':1,
    'space-before-blocks':[1,'never'],
    'space-before-function-paren':[1,'never'],
    'space-infix-ops':[1,{"int32Hint":true}],
    'spaced-comment':0,
    'no-trailing-spaces':0,
    'no-multiple-empty-lines':0,
    'keyword-spacing': [1, { "before": false,'after':false }],
    'padding-blocks': [0],
  }
}
