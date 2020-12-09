import * as generate from 'babel-generator';
import * as babylon from 'babylon';
import * as babelTypes from '@babel/types';

export abstract class AstTransfer {
    originData: any;

    astData: any;

    constructor(originData: any) {
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
    toJS = () => {
        const resultCode = generate.default(this.astData, {
            compact: false,
        });
        return resultCode.code;
    };

    /**
     * 克隆节点
     */
    copyNode = (node: any) => {
        return babelTypes.cloneNode(node);
    };
}
