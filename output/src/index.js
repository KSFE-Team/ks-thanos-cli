"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const debugger_1 = __importDefault(require("./utils/debugger"));
const getPage_1 = require("./services/getPage");
const createPage_1 = require("./factories/page/createPage");
const createModel_1 = require("./factories/model/createModel");
const log_1 = require("./utils/log");
const debug = debugger_1.default(__filename);
async function runSync(options) {
    const { pageName, projectPath } = options;
    debug(`Sync args: projectPath: ${projectPath}, pageName: ${pageName}`);
    console.log(log_1.infoText(`正在获取页面:${pageName}`));
    const pageConfig = await getPage_1.getPage(pageName);
    console.log(log_1.infoText(`获取页面成功，正在生成页面`));
    const page = await createPage_1.createPage({
        pageName,
        projectPath,
        pageConfig
    });
    console.log(log_1.infoText(`生成页面成功，正在生成 Model`));
    await createModel_1.createModel({
        page,
        projectPath
    });
    console.log(log_1.successText(`${pageName} 生成成功！`));
}
exports.runSync = runSync;
//# sourceMappingURL=index.js.map