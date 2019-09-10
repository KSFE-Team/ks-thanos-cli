import Debug from 'Src/utils/debugger';
import { infoText, successText, errorText } from 'Src/utils/log';
import { getPage } from 'Src/services/getPage';
import { createPage } from 'Src/factories/page/createPage';
import { createModel } from 'Src/factories/model/createModel';
import { updateConfigFile } from 'Src/utils/updateConfigFile';
import { prompt } from 'inquirer';
import { upperFirst, isChinese, isEnglish } from 'Src/utils/string';
import path from 'path';

const debug = Debug(__filename);

export async function runSync(options: {
    projectPath: string;
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
            message: '页面中文名',
            validate: (value: string) => {
                if (!isChinese(value)) {
                    return '请输入页面中文名';
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

    const { templateName, pageName, pageChineseName, pagePath } = await prompt(questions);

    let firstUpperPagePath = pagePath.split('/').map((path: string) => upperFirst(path)).join('/');

    const { projectPath } = options;
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
            pageName
        });

        console.log(successText(`${pageName} 生成成功！`));
    } catch (err) {
        console.log(errorText(err));
    }
}
