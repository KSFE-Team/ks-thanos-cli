import Debug from './debugger';
import path from 'path';
import fsExtra from 'fs-extra';
import { formatFile } from './format';
import { lowerFirst } from './string';
import { writeFile } from './file';
import { ConfigTransfer } from 'Src/utils/thanos-ast/configTransfer';

const debug = Debug(__filename);

/**
 * 更新项目目录中的config文件
 * @param options.projectPath 项目地址
 * @param options.pageName 页面名称
 * @param options.pagePath 页面地址
 * @param options.pageConfig 页面配置
 */
export async function updateConfigFile(options: {
    projectPath: string;
    pageName: string;
    pagePath: string;
    pageConfig: any;
    importPath: string;
}) {
    const { projectPath, pagePath, pageConfig, importPath } = options;
    const configFilePath = path.join(projectPath, 'src/config.js');

    debug(`Update config file: ${configFilePath}`);

    const content = await fsExtra.readFile(configFilePath, 'utf-8');

    let replaceStr = '',
        firstLowerPagePath = pagePath.split('/').map((item) => lowerFirst(item)).join('/'),
        caseContent = path.join('/', firstLowerPagePath, pageConfig.paramKey ? `/:${pageConfig.paramKey}` : '');
    replaceStr = `case '${caseContent}':
                return [
                    () => import('./${path.join('pages', importPath, 'model')}')
                ];
            default:`;
    const sourceAst = new ConfigTransfer(content);
    const caseNodes = sourceAst.getCaseNode();
    const isRepeat = caseNodes.some((node) => node?.test?.value === caseContent); // 是否已经存在当前config配置
    if (isRepeat) { return; }

    const newContent = content.replace(/default:/, replaceStr);

    await writeFile(configFilePath, newContent, false);

    formatFile(configFilePath);
}
