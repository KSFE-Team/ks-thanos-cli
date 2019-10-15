import Debug from 'Src/utils/debugger';
import { infoText, successText, errorText } from 'Src/utils/log';
import { getPage } from 'Src/services/getPage';
import { createPage } from 'Src/factories/page/createPage';
import { createModel } from 'Src/factories/model/createModel';
import { updateConfigFile } from 'Src/utils/updateConfigFile';
import { prompt } from 'inquirer';
import { upperFirst, isEnglish, lowerFirst } from 'Src/utils/string';
import path from 'path';
import fsExtra from 'fs-extra';

const debug = Debug(__filename);

/**
 * 运行页面同步命令
 * @param options 参数
 */
export async function runSync(options: {
    projectPath: string; // 项目根目录地址
}) {
    const questions = [
        {
            type: 'input',
            name: 'templateName',
            message: '模板名称',
            validate: (value: string) => {
                if(!value) {
                    return '请输入模板名称';
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'pageName',
            message: '页面英文名',
            validate: (value: string) => {
                if (!isEnglish(value)) {
                    return '请输入页面英文名';
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'pageChineseName',
            message: '页面名称',
            validate: (value: string) => {
                if (!value) {
                    return '请输入页面名称';
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'pagePath',
            message: '页面路径（相对于 src/pages 的路径）'
        }
    ];

    const { projectPath } = options;

    // 验证是否在项目根目录（判断是否有无 package.json）
    if(!fsExtra.existsSync(path.join(projectPath, 'package.json'))) {
        console.log(errorText('请在项目根目录中执行此命令！'));
        return;
    }

    const { templateName, pageName, pageChineseName, pagePath } = await prompt(questions);

    // 页面名称，首字母大写
    let firstUpperPagePath = pagePath.split('/').map((path: string) => upperFirst(path)).join('/');

    const pageFolderPath = path.join(projectPath, 'src/pages', firstUpperPagePath, upperFirst(pageName));

    debug(`Sync args —— projectPath: ${projectPath}, pageName: ${firstUpperPagePath}, templateName: ${templateName}, pageChineseName: ${pageChineseName}, pagePath: ${pagePath}`);

    try {
        console.log(infoText(`正在获取页面模板: ${templateName}`));
        const pageConfig = await getPage(templateName);

        console.log(infoText(`获取页面模板成功，正在生成页面: ${pageName}`));
        const page = await createPage({
            pageName,
            pageChineseName,
            pageConfig,
            pagePath: pageFolderPath
        });

        console.log(infoText(`生成页面成功，正在生成 Model`));
        await createModel({
            page,
            pageChineseName,
            pagePath: pageFolderPath,
        });

        await updateConfigFile({
            projectPath,
            pageName: lowerFirst(pageName),
            pagePath: path.join(firstUpperPagePath, upperFirst(pageName))
        });

        console.log(successText(`${pageName} 生成成功！`));
    } catch (err) {
        console.log(errorText(err.message));
    }
}
