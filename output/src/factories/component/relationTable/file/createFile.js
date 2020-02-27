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
const debug = debugger_1.default(__filename);
function createFile(options) {
    const { pageName, chineseName, pagePath, pageConfig = {}, fileName, page, pageComponents } = options;
    debug(`pageName: ${pageName}`);
    debug(`pageConfig: ${JSON.stringify(pageConfig)}`);
    const pageFilePath = path_1.default.join(pagePath, `/components/${fileName}.js`);
    const { components = [], paramKey = '' } = pageConfig;
    const pageInstance = new _1.default({
        name: pageName,
        chineseName: chineseName,
        components,
        pagePath,
        paramKey,
        filePage: page,
        pageComponents
    });
    file_1.writeFile(pageFilePath, pageInstance.toCode());
    format_1.formatFile(pagePath);
    return pageInstance;
}
exports.createFile = createFile;
//# sourceMappingURL=createFile.js.map