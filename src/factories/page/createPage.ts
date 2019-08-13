import Page from './page';
import { writeFile } from '../../utils/file';
import path from 'path';
import Debug from '../../utils/debugger';
import { formatFile } from '../../utils/format';

const debug = Debug(__filename);

export function createPage(
    options: {
        pageName: string;
        pageConfig: any;
        projectPath: string;
    }
) {
    const { pageName, pageConfig, projectPath } = options;

    debug(`pageName: ${pageName}`);
    debug(`pageConfig: ${JSON.stringify(pageConfig)}`);
    debug(`projectPath: ${projectPath}`);

    const pagePath = path.join(projectPath, 'pages', pageName, 'index.js');
    const pageInstance = new Page(pageName);

    const { components = [] } = pageConfig;
    if (components.length) {
        pageInstance.addComponents(components);
    }

    // 输出文件
    writeFile(pagePath, pageInstance.toCode());

    // eslint格式化文件
    formatFile(pagePath);

    return pageInstance;
}