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
        pageChineseName: string; // 页面中文名称
        pagePath: string; // 页面路径
    }
) {
    const { page, pagePath } = options;
    const modelPath = path.join(pagePath, 'model.js');

    writeFile(modelPath, page.model.toCode());

    formatFile(modelPath);
}
