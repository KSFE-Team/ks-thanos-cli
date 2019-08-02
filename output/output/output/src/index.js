"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debugger_1 = __importDefault(require("./utils/debugger"));
const path_1 = __importDefault(require("path"));
const getPage_1 = require("./services/getPage");
const createPage_1 = require("./factories/createPage");
const debug = debugger_1.default(__filename);
async function runSync(options) {
    const { pageName, projectPath } = options;
    debug(`Sync args: projectPath: ${projectPath}, pageName: ${pageName}`);
    const pagePath = path_1.default.join(projectPath, 'pages', pageName);
    const pageConfig = await getPage_1.getPage(pageName);
    await createPage_1.createPage({
        pageName,
        pagePath,
        pageConfig
    });
}
exports.runSync = runSync;
//# sourceMappingURL=index.js.map