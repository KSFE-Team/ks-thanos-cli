import { AstTransfer } from '../transfer';

const babelTraverse = require('@babel/traverse').default;

export class ConfigTransferFunc extends AstTransfer {
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
                    case 'GETMODELS':
                        if (
                            path.node.type === 'FunctionDeclaration' &&
                            path.node.id &&
                            path.node.id.name === 'getModels'
                        ) {
                            node.push(path.node);
                        }
                        break;
                    case 'CASE':
                        if (path.node.type === 'SwitchCase') {
                            node.push(path.node);
                        }
                        break;
                    default:
                }
            },
        });
        return node;
    };
}
