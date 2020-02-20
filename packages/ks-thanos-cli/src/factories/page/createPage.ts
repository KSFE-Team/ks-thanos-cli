import Page from '.';
import { writeFile } from 'Src/utils/file';
import path from 'path';
import Debug from 'Src/utils/debugger';
import { formatFile } from 'Src/utils/format';

const debug = Debug(__filename);

/**
 * 创建页面
 */
export function createPage(
    options: {
        pageName: string; // 页面名称
        pageChineseName: string; // 页面中文名称
        pagePath: string; // 页面路径
        pageConfig: any; // 页面配置
    }
) {
    const { pageName, pageChineseName, pagePath, pageConfig } = options;

    debug(`pageName: ${pageName}`);
    debug(`pageConfig: ${JSON.stringify(pageConfig)}`);

    const pageFilePath = path.join(pagePath, 'index.js');
    const { components = [], paramKey = '' } = pageConfig;
    const pageInstance = new Page({
        name: pageName,
        chineseName: pageChineseName,
        components,
        pagePath,
        paramKey
    });

    // 输出文件
    writeFile(pageFilePath, pageInstance.toCode());

    // eslint格式化文件
    formatFile(pagePath);

    return pageInstance;
}
