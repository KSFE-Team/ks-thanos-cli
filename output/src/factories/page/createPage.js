"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const page_1 = require("./page");
const file_1 = require("../../utils/file");
const path_1 = __importDefault(require("path"));
const debugger_1 = __importDefault(require("../../utils/debugger"));
const format_1 = require("../../utils/format");
const debug = debugger_1.default(__filename);
function createPage(options) {
    const { pageName, pageConfig, projectPath } = options;
    debug(`pageName: ${pageName}`);
    debug(`pageConfig: ${JSON.stringify(pageConfig)}`);
    debug(`projectPath: ${projectPath}`);
    const pagePath = path_1.default.join(projectPath, 'pages', pageName, 'index.js');
    const pageInstance = new page_1.Page(pageName);
    const { components = [] } = pageConfig;
    if (components.length) {
        pageInstance.addComponents(components);
    }
    file_1.writeFile(pagePath, pageInstance.toCode());
    format_1.formatFile(pagePath);
    return pageInstance;
}
exports.createPage = createPage;
//# sourceMappingURL=createPage.js.map