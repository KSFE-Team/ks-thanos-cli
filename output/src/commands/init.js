"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const initProject_1 = require("Src/utils/initProject");
const debugger_1 = __importDefault(require("Src/utils/debugger"));
const log_1 = require("Src/utils/log");
const fs_extra_1 = __importDefault(require("fs-extra"));
const bluebird_1 = require("bluebird");
const inquirer_1 = require("inquirer");
const debug = debugger_1.default(__filename);
async function runInit(options) {
    const { isForce } = options;
    const questions = [
        {
            type: 'input',
            name: 'projectName',
            message: '项目名称',
            validate: (value) => {
                if (!value) {
                    return '请输入项目名称';
                }
                if (fs_extra_1.default.existsSync(value) && !isForce) {
                    return '目录已经存在，请重新命名！';
                }
                return true;
            },
        },
    ];
    const { projectName } = await inquirer_1.prompt(questions);
    const projectPath = path_1.default.join(process.cwd(), projectName);
    debug(`Run Init Command —— projectName: ${projectName}, projectPath: ${projectPath}, isForce: ${isForce}`);
    if (fs_extra_1.default.existsSync(projectName) && isForce) {
        console.log(log_1.warningText(`将会删除已经存在的目录 ${projectName}, 你有 3 秒钟时间取消(CTRL-C)`));
        await bluebird_1.delay(3000);
        console.log(log_1.errorText(`删除目标目录 ${projectName}...`));
        fs_extra_1.default.removeSync(projectName);
    }
    console.log(log_1.infoText('\n开始生成...\n'));
    initProject_1.initProjectFolder(projectName);
    console.log(log_1.infoText('\n安装依赖中...\n'));
    initProject_1.installDependencies(projectPath);
}
exports.runInit = runInit;
//# sourceMappingURL=init.js.map