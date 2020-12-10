import { AstTransfer } from '../transfer';
// import * as babelTypes from '@babel/types';

const babelTraverse = require('@babel/traverse').default;

export class ModelTransferFunc extends AstTransfer {
    constructor(originData: any) {
        super(originData);
        this.originData = originData;
        this.astData = this.toAST(originData);
    }

    /**
     * 获取节点
     */
    getNode = (nodeType: string) => {
        const node: any[] = [];
        babelTraverse(this.astData, {
            enter(path: any) {
                switch (nodeType) {
                    case 'STATE':
                        if (path.node.type === 'VariableDeclarator' && path.node.id && path.node.id.name === 'STATE') {
                            node.push(path.node);
                        }
                        break;
                    case 'EFFECTS':
                        if (path.node.type === 'ObjectProperty' && path.node.key && path.node.key.name === 'effects') {
                            node.push(path.node);
                        }
                        break;
                    case 'IMPORT':
                        if (path.node.type === 'ImportDeclaration') {
                            node.push(path.node);
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
    insertNode = (sourceNode: any, targetNode: any[] = []) => {
        if (!sourceNode.type) {
            return;
        }
        const allNodes = this.getNode('IMPORT');
        const lastNodes = allNodes[allNodes.length - 1];
        babelTraverse(this.astData, {
            enter(path: any) {
                if (path.node.type === sourceNode.type && lastNodes.source.value === path.node.source.value) {
                    path.insertAfter(targetNode);
                }
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
