"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debugger_1 = __importDefault(require("Src/utils/debugger"));
const log_1 = require("Src/utils/log");
const getPage_1 = require("Src/services/getPage");
const createPage_1 = require("Src/factories/page/createPage");
const createModel_1 = require("Src/factories/model/createModel");
const updateConfigFile_1 = require("Src/utils/updateConfigFile");
const inquirer_1 = require("inquirer");
const string_1 = require("Src/utils/string");
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const debug = debugger_1.default(__filename);
async function runSync(options) {
    const questions = [
        {
            type: 'input',
            name: 'templateName',
            message: '模板名称',
            validate: (value) => {
                if (!value) {
                    return '请输入模板名称';
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'pageName',
            message: '页面英文名',
            validate: (value) => {
                if (!string_1.isEnglish(value)) {
                    return '请输入页面英文名';
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'pageChineseName',
            message: '页面名称',
            validate: (value) => {
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
    if (!fs_extra_1.default.existsSync(path_1.default.join(projectPath, 'package.json'))) {
        console.log(log_1.errorText('请在项目根目录中执行此命令！'));
        return;
    }
    const { templateName, pageName, pageChineseName, pagePath } = await inquirer_1.prompt(questions);
    let firstUpperPagePath = pagePath.split('/').map((path) => string_1.upperFirst(path)).join('/');
    const pageFolderPath = path_1.default.join(projectPath, 'src/pages', firstUpperPagePath, string_1.upperFirst(pageName));
    debug(`Sync args —— projectPath: ${projectPath}, pageName: ${firstUpperPagePath}, templateName: ${templateName}, pageChineseName: ${pageChineseName}, pagePath: ${pagePath}`);
    try {
        console.log(log_1.infoText(`正在获取页面模板: ${templateName}`));
        const pageConfig = await getPage_1.getPage(templateName);
        console.log(log_1.infoText(`获取页面模板成功，正在生成页面: ${pageName}`));
        const page = await createPage_1.createPage({
            pageName,
            pageChineseName,
            pageConfig,
            pagePath: pageFolderPath
        });
        console.log(log_1.infoText(`生成页面成功，正在生成 Model`));
        await createModel_1.createModel({
            page,
            pageChineseName,
            pagePath: pageFolderPath,
        });
        await updateConfigFile_1.updateConfigFile({
            projectPath,
            pageName: string_1.lowerFirst(pageName),
            pagePath: path_1.default.join(firstUpperPagePath, string_1.upperFirst(pageName)),
            pageConfig
        });
        console.log(log_1.successText(`${pageName} 生成成功！`));
        console.log(log_1.createSplash('THANOS'));
    }
    catch (err) {
        console.log(log_1.errorText(err.message));
    }
}
exports.runSync = runSync;
//# sourceMappingURL=sync.js.map