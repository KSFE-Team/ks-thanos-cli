import Debug from 'Src/utils/debugger';
import { infoText, successText, errorText, createSplash } from 'Src/utils/log';
import { getPage } from 'Src/services/getPage';
import { createPage } from 'Src/factories/page/createPage';
import { createModel } from 'Src/factories/model/createModel';
import { updateConfigFile } from 'Src/utils/updateConfigFile';
import { prompt } from 'inquirer';
import { upperFirst, isEnglish, lowerFirst } from 'Src/utils/string';
import path from 'path';
import fsExtra from 'fs-extra';
import { ModelTransfer } from 'Src/utils/thanos-ast/modelTransfer';
import fs from 'fs';
import {gitPush} from 'Src/utils/git';

const debug = Debug(__filename);

/**
 * 运行页面同步命令
 * @param options 参数
 */
export async function runSync(options: {
    projectPath: string; // 项目根目录地址
    config: string; // 一键配置参数
}) {
    const questions = [
        {
            type: 'input',
            name: 'templateName',
            message: '模板名称',
            validate: (value: string) => {
                if (!value) {
                    return '请输入模板名称';
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'pageName',
            message: '页面英文名称',
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
            message: '页面中文名称',
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
        },
        {
            type: 'confirm',
            message: '是否合并model？',
            name: 'isCombine',
            default: false
        },
    ];

    const { projectPath, config: mutipleConfig } = options;
    const config = mutipleConfig && JSON.parse(mutipleConfig);
    // 验证是否在项目根目录（判断是否有无 package.json）
    if (!fsExtra.existsSync(path.join(projectPath, 'package.json'))) {
        console.log(errorText('请在项目根目录中执行此命令！'));
        return;
    }

    const { templateName = '', pageName = '', pageChineseName = '', pagePath = '', isCombine = false } = config || await prompt(questions);
    let tempPagePath = pagePath.includes('src/pages') ? pagePath.split('src/pages').pop() : pagePath,
        // 页面名称，首字母大写
        firstUpperPagePath = tempPagePath.split('/').map((path: string) => upperFirst(path)).join('/');

    const pageFolderPath = path.join(projectPath, 'src/pages', firstUpperPagePath, upperFirst(pageName));
    const combineModelFolderPath = path.join(projectPath, 'src/pages', firstUpperPagePath);

    debug(`Sync args —— projectPath: ${projectPath}, pageName: ${firstUpperPagePath}, templateName: ${templateName}, pageChineseName: ${pageChineseName}, pagePath: ${pagePath}`);
    try {
        console.log(infoText(`正在获取页面模板: ${templateName}`));
        const pageConfig = await getPage(templateName);
        let currNamespaceName: string = lowerFirst(pageName); // 默认取页面名称
        if (isCombine) { // 若合并，namespace取被合并model文件的namespace
            const originModelPath = path.join(combineModelFolderPath, 'model.js');
            const originodelContent = fs.readFileSync(originModelPath, { encoding: 'utf-8' });
            const originModelAst = new ModelTransfer(originodelContent);
            currNamespaceName = originModelAst.getNamespaceName();
        }

        console.log(infoText(`获取页面模板成功，正在生成页面: ${pageName}`));
        const page = await createPage({
            pageName,
            pageChineseName,
            namespaceValue: currNamespaceName, // 不合并取pageName，合并取被合并model 的namespace
            pageConfig,
            pagePath: pageFolderPath
        });
        console.log(infoText(`生成页面成功，正在生成 Model`));
        await createModel({
            page,
            pageChineseName,
            pagePath: pageFolderPath,
            isCombine,
            combinePath: combineModelFolderPath,
        });

        await updateConfigFile({
            projectPath,
            pageName: lowerFirst(currNamespaceName),
            pagePath: path.join(firstUpperPagePath, upperFirst(pageName)),
            importPath: isCombine ? upperFirst(firstUpperPagePath) : path.join(firstUpperPagePath, upperFirst(pageName)),
            pageConfig,
        });

        console.log(successText(`${pageName} 生成成功！`));
        gitPush(pagePath,templateName,pageName);
        console.log(createSplash('THANOS'));
    } catch (err) {
        console.log(errorText(err.message));
    }
}
