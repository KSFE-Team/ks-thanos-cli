import path from 'path';
import { writeFile } from 'Src/utils/file';
import Page from '../page';
import { formatFile } from 'Src/utils/format';

/**
 * 生成model代码
 * @param options model配置
 */
export async function createModel(
    options: {
        page: Page; // page对象
        projectPath: string; // 项目地址
    }
) {
    const { page, projectPath } = options;
    const modelPath = path.join(projectPath, 'pages', page.pageName, 'model.js');

    writeFile(modelPath, page.model.toCode());

    formatFile(modelPath);
}