import path from 'path';
import { writeFile } from 'Src/utils/file';
import Page from '../page';
import { formatFile } from 'Src/utils/format';
import fs from 'fs';
import { ModelTransfer } from 'Src/utils/thanos-ast/modelTransfer';

/**
 * 生成model代码
 * @param options model配置
 */
export async function createModel(
    options: {
        page: Page; // page对象
        pageChineseName: string; // 页面中文名称
        pagePath: string; // 页面路径
        isCombine: boolean; // 是否合并model
        combinePath: string; //合并model的路径
    }
) {
    const { page, pagePath, isCombine, combinePath } = options;
    const modelPath = path.join(pagePath, 'model.js');
    const modelContent = page.model.toCode();
    if (isCombine) { // 合并model
        const originModelPath = path.join(combinePath, 'model.js');
        const originodelContent = fs.readFileSync(originModelPath, { encoding: 'utf-8' });
        // 转ast
        const sourceAst = new ModelTransfer(originodelContent);
        const targetAst = new ModelTransfer(modelContent);
        const { combineStateNodes, combineEffectsNodes, combineImportNodes } = sourceAst;
        // 合并STATE
        combineStateNodes(sourceAst, targetAst);
        // 合并effects
        combineEffectsNodes(sourceAst, targetAst);
        // 处理import
        combineImportNodes(sourceAst, targetAst);
        // ast转js
        const combineContent = sourceAst.toJS();
        writeFile(originModelPath, combineContent);

        formatFile(originModelPath);
    } else { // 不合并
        writeFile(modelPath, modelContent);

        formatFile(modelPath);
    }
}
