import Debug from './debugger';
import path from 'path';
import fsExtra from 'fs-extra';

const debug = Debug(__filename);

export async function updateConfigFile(options: {
    projectPath: string;
    pageName: string;
}) {
    const { projectPath, pageName } = options;
    const configFilePath = path.join(projectPath, 'src/config.js');

    debug(`Update config file: ${configFilePath}`);

    const content = await fsExtra.readFile(configFilePath, 'utf-8');

    let replaceStr = '';

    replaceStr = `case '/${pageName}':
                return [
                    () => import('./pages/${pageName}/model')
                ];
            default:`;

    const newContent = content.replace(/default:/, replaceStr);

    await fsExtra.outputFile(configFilePath, newContent, { encoding: 'utf-8' });
}
