/**
 * ── 属性      
    - node   当前节点
    - parent  父节点
    - parentPath 父path
    - scope   作用域
    - context  上下文
   ── 方法
    - get   当前节点
    - findParent  向父节点搜寻节点
    - getSibling 获取兄弟节点
    - replaceWith  用AST节点替换该节点
    - replaceWithMultiple 用多个AST节点替换该节点
    - insertBefore  在节点前插入节点
    - insertAfter 在节点后插入节点
    - remove   删除节点
 */
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
            compact: false, // 是否压缩
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
