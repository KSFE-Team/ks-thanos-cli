import { ModelTransferFunc } from './func';
// import * as babelTypes from '@babel/types';

export class ModelTransfer extends ModelTransferFunc {
    constructor(originData: any) {
        super(originData);
        this.originData = originData;
        this.astData = this.toAST(originData);
    }

    /**
     * 获取STATE节点
     */
    getStateNode = () => this.getNode('STATE')[0];

    /**
     * 获取STATE节点
     */
    getEffectsNode = () => this.getNode('EFFECTS')[0];

    /**
     * 获取import节点
     */
    getImportNodes = () => this.getNode('IMPORT');

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

    /**
     * 合并import
     * @param sourceAst 源ast
     * @param targetAst 目标ast
     */
    combineImportNodes = (sourceAst: any, targetAst: any) => {
        const sourceImportNodes = sourceAst.getNode('IMPORT');
        const targetImportNodes = targetAst.getNode('IMPORT');
        const differentImportNodes = targetImportNodes.filter((targetNode: any) => {
            const sourceImportNodesSourceValues = sourceImportNodes.map((sourceNode: any) => sourceNode.source.value);
            return !sourceImportNodesSourceValues.includes(targetNode.source.value);
        });
        sourceAst.insertNode(sourceImportNodes[sourceImportNodes.length - 1], differentImportNodes);
    };
}
