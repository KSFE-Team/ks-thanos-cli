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
    if (isCombine) {
        const originModelPath = path.join(combinePath, 'model.js');
        const originodelContent = fs.readFileSync(originModelPath, { encoding: 'utf-8' });
        const sourceAst = new ModelTransfer(originodelContent);
        const targetAst = new ModelTransfer(modelContent);
        // 合并STATE
        sourceAst.combineStateNodes(sourceAst, targetAst);
        // 合并effects
        sourceAst.combineEffectsNodes(sourceAst, targetAst);
        // 处理import
        sourceAst.combineImportNodes(sourceAst, targetAst);
        const combineContent = sourceAst.toJS();
        writeFile(originModelPath, combineContent);

        formatFile(originModelPath);
    } else {
        writeFile(modelPath, modelContent);

        formatFile(modelPath);
    }
}
