import Page from '.';
import { writeFile } from 'Src/utils/file';
import path from 'path';
import Debug from 'Src/utils/debugger';
import { formatFile } from 'Src/utils/format';
import { upperFirst } from 'Src/utils/string';

const debug = Debug(__filename);

/**
 * 创建页面
 */
export function createPage(
    options: {
        pageName: string; // 页面名称
        pageConfig: any; // 页面配置
        projectPath: string; // 项目地址
    }
) {
    const { pageName, pageConfig, projectPath } = options;

    debug(`pageName: ${pageName}`);
    debug(`pageConfig: ${JSON.stringify(pageConfig)}`);
    debug(`projectPath: ${projectPath}`);

    const pagePath = path.join(projectPath, 'src/pages', upperFirst(pageName), 'index.js');
    const { components = [] } = pageConfig;
    const pageInstance = new Page(pageName, components);

    // 输出文件
    writeFile(pagePath, pageInstance.toCode());

    // eslint格式化文件
    formatFile(pagePath);

    return pageInstance;
}
