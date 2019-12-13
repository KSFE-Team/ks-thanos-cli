import File from '.';
import { writeFile } from 'Src/utils/file';
import path from 'path';
import Debug from 'Src/utils/debugger';
import { formatFile } from 'Src/utils/format';

const debug = Debug(__filename);

/**
 * 创建页面
 */
export function createFile(
    options: {
        pageName: string; // 页面名称
        chineseName: string; // 页面中文名称
        pagePath: string; // 页面路径
        pageConfig: any; // 页面配置
        fileName: string; // 文件名称
        page: any; // 文件类型
    }
) {
    const { pageName, chineseName, pagePath, pageConfig = {}, fileName, page } = options;
    debug(`pageName: ${pageName}`);
    debug(`pageConfig: ${JSON.stringify(pageConfig)}`);
    const pageFilePath = path.join(pagePath, `/components/${fileName}.js`);
    const { components = [], paramKey = '' } = pageConfig;
    const pageInstance = new File({
        name: pageName,
        chineseName: chineseName,
        components,
        pagePath,
        paramKey,
        filePage: page
    });

    // 输出文件
    writeFile(pageFilePath, pageInstance.toCode());

    // eslint格式化文件
    formatFile(pagePath);

    return pageInstance;
}
