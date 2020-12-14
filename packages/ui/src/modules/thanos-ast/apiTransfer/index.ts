import { ApiTransferFunc } from './func';
// import * as babelTypes from '@babel/types';

export class ApiTransfer extends ApiTransferFunc {
    constructor(originData: any) {
        super(originData);
        this.originData = originData;
        this.astData = this.toAST(originData);
    }

    /**
     * 获取API节点
     */
    getApiNode = () => this.getNode('API')[0];

    /**
     * 获取第一个子节点
     */
    getFirstChildNode = () => {
        const apiNode = this.getApiNode();
        const firstChildNode = apiNode.init.properties && apiNode.init.properties[0];
        return firstChildNode;
    };

    /**
     * 合并STATE
     * @param sourceAst 源ast
     * @param targetAst 目标ast
     */
    combineStateNodes = (sourceAst: any, targetAst: any) => {
        const sourceAstStateNode = sourceAst.getStateNode();
        const targetAstStateNode = targetAst.getStateNode();
        const mergeStateNode = sourceAst.copyNode(sourceAstStateNode);
        mergeStateNode.init.properties = [...sourceAstStateNode.init.properties, ...targetAstStateNode.init.properties];
        sourceAst.replaceNode('STATE', mergeStateNode);
    };

    /**
     * 合并effects
     * @param sourceAst 源ast
     * @param targetAst 目标ast
     */
    combineEffectsNodes = (sourceAst: any, targetAst: any) => {
        const sourceAstEffectsNode = sourceAst.getEffectsNode();
        const targetAstEffectsNode = targetAst.getEffectsNode();
        const mergeEffectNode = { ...sourceAstEffectsNode };
        mergeEffectNode.value.properties = [
            ...sourceAstEffectsNode.value.properties,
            ...targetAstEffectsNode.value.properties,
        ];
        sourceAst.replaceNode('EFFECTS', mergeEffectNode);
    };
}
