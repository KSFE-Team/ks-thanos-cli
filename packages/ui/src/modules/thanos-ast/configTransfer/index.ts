import { ConfigTransferFunc } from './func';

export class ConfigTransfer extends ConfigTransferFunc {
    constructor(originData: any) {
        super(originData);
        this.originData = originData;
        this.astData = this.toAST(originData);
    }

    /**
     * 获取getModels节点
     */
    getConfigNode = () => this.getNode('GETMODELS')[0];

    /**
     * 获取case节点
     */
    getCaseNode = () => this.getNode('CASE');
}
