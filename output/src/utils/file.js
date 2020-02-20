"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const prettier_1 = __importDefault(require("prettier"));
const prettierConfig_1 = __importDefault(require("Src/utils/prettierConfig"));
function writeFile(targetPath, content, format = true) {
    const formatContent = format ? prettier_1.default.format(content, prettierConfig_1.default) : content;
    fs_extra_1.default.outputFileSync(targetPath, formatContent, { encoding: 'utf-8' });
}
exports.writeFile = writeFile;
//# sourceMappingURL=file.js.map