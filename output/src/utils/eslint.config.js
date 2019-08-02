"use strict";
module.exports = {
    'extends': [
        'plugin:@typescript-eslint/recommended'
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'project': './tsconfig.json',
        sourceType: 'module'
    },
    'plugins': [
        '@typescript-eslint'
    ],
    'rules': {
        'no-fallthrough': 0,
        'object-curly-spacing': 0,
        'arrow-parens': 2,
        'generator-star-spacing': 2,
        'semi': [
            'error',
            'always'
        ],
        'comma-dangle': ['error', 'only-multiline'],
        'padded-blocks': ['error', { 'blocks': 'never' }],
        'one-var': ['error', { var: 'always', let: 'consecutive', const: 'never' }],
        'no-return-assign': 2,
        'indent': ['error', 4, { 'VariableDeclarator': { 'var': 1, 'let': 1 }, 'SwitchCase': 1 }],
        'no-debugger': process.env.KS_ENV === 'production' ? 2 : 0,
        'space-before-function-paren': ['error', 'never'],
        'space-infix-ops': ['error', { 'int32Hint': false }],
        'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
        'eqeqeq': ['error', 'always'],
        'import/no-webpack-loader-syntax': 'off',
        'no-eval': 0,
        'no-template-curly-in-string': 0,
        '@typescript-eslint/restrict-plus-operands': 2,
        '@typescript-eslint/restrict-plus-operands': 0,
        '@typescript-eslint/member-ordering': 2,
        '@typescript-eslint/no-console': 0,
        '@typescript-eslint/object-literal-sort-keys': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/interface-name': 0,
        '@typescript-eslint/no-shadowed-variable': 0,
        '@typescript-eslint/no-eval': 0,
        '@typescript-eslint/no-use-before-define': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/explicit-member-accessibility': 0
    }
};
//# sourceMappingURL=eslint.config.js.map