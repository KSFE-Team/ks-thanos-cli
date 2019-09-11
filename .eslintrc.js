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
        'arrow-parens': 2, // 要求箭头函数的参数使用圆括号  (a) => {}
        'generator-star-spacing': 2, // 允许方法之间加星号 function * generator() {}
        'semi': [ // 要求在语句末尾使用封号
            'error', // 提示级别
            'always' // 要求在语句末尾使用分号
        ],
        // 要求或禁止使用拖尾逗号,当最后一个元素或属性与闭括号 ] 或 } 在 不同的行时，允许（但不要求）使用拖尾逗号；当在 同一行时，禁止使用拖尾逗
        'comma-dangle': ['error', 'only-multiline'],
        'padded-blocks': ['error', { 'blocks': 'never' }], // 要求或禁止块内填充,要求块语句和类的开始或末尾有空行
        'one-var': ['error', { var: 'always', let: 'consecutive', const: 'never' }], // 强制函数中的变量在一起声明或分开声明  let a,b;
        'no-return-assign': 2, // 禁止在返回语句中赋值,除非赋值语句是在圆括号中  return (foo = bar + 2);
        'indent': ['error', 4, { 'VariableDeclarator': { 'var': 1, 'let': 1 }, 'SwitchCase': 1 }], // 强制使用一致的缩进四个空格
        'no-debugger': process.env.KS_ENV === 'production' ? 2 : 0, // 禁用 debugger
        'space-before-function-paren': ['error', 'never'], // 要求或禁止函数圆括号之前有一个空格
        'space-infix-ops': ['error', { 'int32Hint': false }], // 要求操作符周围有空格,设置 int32Hint 选项为 true (默认 false) 允许 a|0 不带空格.
        'quotes': ['error', 'single', { 'allowTemplateLiterals': true }], // 强制使用单引号，允许字符串使用反勾号
        'eqeqeq': ['error', 'always'], // 使用类型安全的 === 和 !== 操作符代替 == 和 != 操作符
        'import/no-webpack-loader-syntax': 'off', // 不禁用 webpack-loader 语法
        'no-eval': 0,
        'no-template-curly-in-string': 0,
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
        '@typescript-eslint/explicit-member-accessibility': 0,
        '@typescript-eslint/no-unused-vars': ['error', {
            'vars': 'after-used',
            'args': 'after-used',
            'ignoreRestSiblings': false
        }]
    }
}
