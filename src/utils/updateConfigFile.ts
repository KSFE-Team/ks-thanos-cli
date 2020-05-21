import Debug from './debugger';
import path from 'path';
import fsExtra from 'fs-extra';
import { formatFile } from './format';

const debug = Debug(__filename);

export async function updateConfigFile(options: {
    projectPath: string;
    pageName: string;
    pagePath: string;
}) {
    const { projectPath, pageName, pagePath } = options;
    const configFilePath = path.join(projectPath, 'src/config.js');

    debug(`Update config file: ${configFilePath}`);

    const content = await fsExtra.readFile(configFilePath, 'utf-8');

    let replaceStr = '';

    replaceStr = `case '/${pageName}':
                return [
                    () => import('./${path.join('pages', pagePath, 'model')}')
                ];
            default:`;

    const newContent = content.replace(/default:/, replaceStr);

    await fsExtra.outputFile(configFilePath, newContent, { encoding: 'utf-8' });

    formatFile(configFilePath);
}
