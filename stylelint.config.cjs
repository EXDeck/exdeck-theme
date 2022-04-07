// eslint-disable-next-line no-undef
module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recess-order',
  ],
  ignoreFiles: ['**/node_modules/**', '**/dist/**', '**/*.min.*'],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
  },
}
