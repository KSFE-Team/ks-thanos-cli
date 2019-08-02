import { Page } from './page';
import { writeFile } from '../../utils/file';
import path from 'path';
import { ComponentInjection } from '../component/component';

export function createPage(
    options: {
        pageName: string;
        pageConfig: any;
        projectPath: string;
    }
) {
    const { pageName, pageConfig, projectPath } = options;
    const pagePath = path.join(projectPath, 'pages', pageName, 'index.js');
    const pageInstance = new Page(pageName);

    const { components = [] } = pageConfig;
    if (components.length) {
        components.forEach((component: any) => {
            pageInstance.addImports({
                name: component.name,
                source: component.source,
                defaultImport: component.default
            });
            pageInstance.addComponents([
                new ComponentInjection(component)
            ]);
        });
    }

    writeFile(pagePath, pageInstance.toCode());

    return pageInstance;
}