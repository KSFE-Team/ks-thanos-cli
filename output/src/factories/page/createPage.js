"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const file_1 = require("Src/utils/file");
const path_1 = __importDefault(require("path"));
const debugger_1 = __importDefault(require("Src/utils/debugger"));
const format_1 = require("Src/utils/format");
const string_1 = require("Src/utils/string");
const debug = debugger_1.default(__filename);
function createPage(options) {
    const { pageName, pageConfig, projectPath } = options;
    debug(`pageName: ${pageName}`);
    debug(`pageConfig: ${JSON.stringify(pageConfig)}`);
    debug(`projectPath: ${projectPath}`);
    const pagePath = path_1.default.join(projectPath, 'pages', string_1.upperFirst(pageName), 'index.js');
    const { components = [] } = pageConfig;
    const pageInstance = new _1.default(pageName, components);
    file_1.writeFile(pagePath, pageInstance.toCode());
    format_1.formatFile(pagePath);
    return pageInstance;
}
exports.createPage = createPage;
//# sourceMappingURL=createPage.js.map