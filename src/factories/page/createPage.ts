import { Page } from './page';
import { writeFile } from '../../utils/file';
import path from 'path';
import Debug from '../../utils/debugger';

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

    writeFile(pagePath, pageInstance.toCode());

    return pageInstance;
}