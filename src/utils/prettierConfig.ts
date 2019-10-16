import { Options } from 'prettier';

const prettierConfig: Options = {
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    bracketSpacing: true,
    jsxBracketSameLine: false,
    parser: 'babel',
    arrowParens: 'always',
};

export default prettierConfig;
