import { AstTransfer } from './index';

const babelTraverse = require('@babel/traverse');

export class StateTransfer extends AstTransfer {
    constructor(originData: any) {
        super(originData);
        this.originData = originData;
        this.astData = this.toAST(originData);
    }

    /**
     * 获取State节点
     */
    getStateNode = () => {
        let node;
        babelTraverse.default(this.astData, {
            enter(path: any) {
                if (path.node.type === 'VariableDeclarator' && path.node.id && path.node.id.name === 'STATE') {
                    node = path.node;
                }
            },
        });
        return node;
    };

    /**
     * 替换State节点
     */
    replaceStateNode = (node: any) => {
        babelTraverse.default(this.astData, {
            enter(path: any) {
                // console.log('path.node.type', path.node.type);
                if (path.node.type === 'VariableDeclarator' && path.node.id && path.node.id.name === 'STATE') {
                    path.replaceWith(node);
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
    };

    /**
     * 获取State节点
     */
    getEffectsNode = () => {
        let node;
        babelTraverse.default(this.astData, {
            enter(path: any) {
                if (path.node.type === 'ObjectProperty' && path.node.key && path.node.key.name === 'effects') {
                    node = path.node;
                }
            },
        });
        return node;
    };

    /**
     * 替换State节点
     */
    replaceEffectsNode = (node: any) => {
        babelTraverse.default(this.astData, {
            enter(path: any) {
                // console.log('path.node.type', path.node.type);
                if (path.node.type === 'ObjectProperty' && path.node.key && path.node.key.name === 'effects') {
                    path.replaceWith(node);
                }
            },
        });
    };
}
