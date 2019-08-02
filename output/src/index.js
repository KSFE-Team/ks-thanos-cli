"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debugger_1 = __importDefault(require("./utils/debugger"));
const getPage_1 = require("./services/getPage");
const createPage_1 = require("./factories/page/createPage");
const createModel_1 = require("./factories/model/createModel");
const debug = debugger_1.default(__filename);
async function runSync(options) {
    const { pageName, projectPath } = options;
    debug(`Sync args: projectPath: ${projectPath}, pageName: ${pageName}`);
    const pageConfig = await getPage_1.getPage(pageName);
    const page = await createPage_1.createPage({
        pageName,
        projectPath,
        pageConfig
    });
    await createModel_1.createModel({
        page,
        projectPath
    });
}
exports.runSync = runSync;
//# sourceMappingURL=index.js.map