const babelTraverse = require('@babel/traverse');
const generate = require('babel-generator');
const babylon = require('babylon');

const replacement = {
    type: 'StringLiteral',
    value: 'ceshixixi',
};
// export interface originData {

// }

export class AstTransfer {
    originData: any;

    astData: any;

    constructor(originData: any) {
        // super(props);
        this.originData = originData;
        this.astData = this.toAST(originData);
    }

    /**
     * js转ast
     * @param data 原始数据
     */
    toAST = (data: any) => {
        let codeAST;
        try {
            codeAST = babylon.parse(data, {
                sourceType: 'module',
                plugins: [
                    // enable jsx and flow syntax
                    'jsx',
                    'flow',
                    'objectRestSpread',
                    'classProperties',
                ],
            });
        } catch (err) {
            console.log(err);
        }
        return codeAST;
    };

    /**
     * ast转js
     */
    toJS = (data: any) => {
        const resultCode = generate.default(data, {
            compact: false,
        });
        return resultCode.code;
    };

    /**
     * 替换节点
     */
    replaceWith() {
        babelTraverse.default(this.astData, {
            enter(path: any) {
                // console.log('path.node.type', path.node.type);
                if (path.node.type === 'VariableDeclarator' && path.node.id && path.node.id.name === 'STATE') {
                    console.log('enterPath', path);
                    path.replaceWith(replacement);
                }
            },
            ImportDeclaration(path: any) {
                // console.log('ImportDeclarationPath', path);
                // switch (path.node.source.value) {
                //     case 'react-native':
                //     case 'Components/LazyImage':
                //         path.remove(path.node);
                //         break;
                //     case './styles':
                //         path.parent.body[path.key].specifiers = [];
                //         path.parent.body[path.key].source.value = path.parent.body[path.key].source.value + '.scss';
                //         break;
                // }
            },
        });
    }
}
