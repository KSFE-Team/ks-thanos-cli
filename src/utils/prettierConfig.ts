import { Options } from 'prettier';

/**
 * prettier 配置
 */
const prettierConfig: Options = {
    tabWidth: 4, // tab宽度
    semi: true, // 行末分号
    singleQuote: true, // 单引号
    bracketSpacing: true, // 对象括号中的空格
    jsxBracketSameLine: false, // jsx 的拖尾 > 换行
    parser: 'babel', // 解析器
    arrowParens: 'always', // 箭头函数参数被括号包裹
};

export default prettierConfig;
