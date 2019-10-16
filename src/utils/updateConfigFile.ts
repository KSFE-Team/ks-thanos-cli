import Debug from './debugger';
import path from 'path';
import fsExtra from 'fs-extra';
import { formatFile } from './format';
import { lowerFirst } from './string';
import { writeFile } from './file';

const debug = Debug(__filename);

export async function updateConfigFile(options: {
    projectPath: string;
    pageName: string;
    pagePath: string;
    pageConfig: any;
}) {
    const { projectPath, pagePath, pageConfig } = options;
    const configFilePath = path.join(projectPath, 'src/config.js');

    debug(`Update config file: ${configFilePath}`);

    const content = await fsExtra.readFile(configFilePath, 'utf-8');

    let replaceStr = '',
        firstLowerPagePath = pagePath.split('/').map((item) => lowerFirst(item)).join('/');

    replaceStr = `case '${path.join('/', firstLowerPagePath, pageConfig.paramKey ? `/:${pageConfig.paramKey}` : '')}':
                return [
                    () => import('./${path.join('pages', pagePath, 'model')}')
                ];
            default:`;

    const newContent = content.replace(/default:/, replaceStr);

    await writeFile(configFilePath, newContent, false);

    formatFile(configFilePath);
}
