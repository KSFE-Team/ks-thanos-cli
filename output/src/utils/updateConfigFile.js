"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debugger_1 = __importDefault(require("./debugger"));
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const format_1 = require("./format");
const string_1 = require("./string");
const file_1 = require("./file");
const debug = debugger_1.default(__filename);
async function updateConfigFile(options) {
    const { projectPath, pagePath, pageConfig } = options;
    const configFilePath = path_1.default.join(projectPath, 'src/config.js');
    debug(`Update config file: ${configFilePath}`);
    const content = await fs_extra_1.default.readFile(configFilePath, 'utf-8');
    let replaceStr = '', firstLowerPagePath = pagePath.split('/').map((item) => string_1.lowerFirst(item)).join('/');
    replaceStr = `case '${path_1.default.join('/', firstLowerPagePath, pageConfig.paramKey ? `/:${pageConfig.paramKey}` : '')}':
                return [
                    () => import('./${path_1.default.join('pages', pagePath, 'model')}')
                ];
            default:`;
    const newContent = content.replace(/default:/, replaceStr);
    await file_1.writeFile(configFilePath, newContent, false);
    format_1.formatFile(configFilePath);
}
exports.updateConfigFile = updateConfigFile;
//# sourceMappingURL=updateConfigFile.js.map