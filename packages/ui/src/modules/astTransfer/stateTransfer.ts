/**
 * 合并 replaceWith方法，数据需要手动合并。例如STATE、effects合并
 * 插入 insertAfter方法，需要使用@babel/types
 * 删除 remove()
 */
import { AstTransfer } from './index';

const babelTraverse = require('@babel/traverse').default;
// const t = require('@babel/types');

export class StateTransfer extends AstTransfer {
    constructor(originData: any) {
        super(originData);
        this.originData = originData;
        this.astData = this.toAST(originData);
    }

    /**
     * 获取节点
     */
    getNode = (nodeType: string) => {
        let node;
        babelTraverse(this.astData, {
            enter(path: any) {
                switch (nodeType) {
                    case 'STATE':
                        if (path.node.type === 'VariableDeclarator' && path.node.id && path.node.id.name === 'STATE') {
                            node = path.node;
                        }
                        break;
                    case 'EFFECTS':
                        if (path.node.type === 'ObjectProperty' && path.node.key && path.node.key.name === 'effects') {
                            node = path.node;
                        }
                        break;
                    default:
                }
            },
        });
        return node;
    };

    /**
     * 插入节点
     */
    insertNode = (node: any) => {
        babelTraverse(this.astData, {
            enter(path: any) {},
            ObjectExpression(path: any) {},
            VariableDeclarator(path: any) {},
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
     * 替换节点
     */
    replaceNode = (nodeType: string, node: any) => {
        babelTraverse(this.astData, {
            enter(path: any) {
                switch (nodeType) {
                    case 'STATE':
                        if (path.node.type === 'VariableDeclarator' && path.node.id && path.node.id.name === 'STATE') {
                            path.replaceWith(node);
                        }
                        break;
                    case 'EFFECTS':
                        if (path.node.type === 'ObjectProperty' && path.node.key && path.node.key.name === 'effects') {
                            path.replaceWith(node);
                        }
                        break;
                    default:
                }
            },
        });
    };
}
