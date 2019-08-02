"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const log_1 = require("./log");
function writeFile(targetPath, content) {
    try {
        fs_extra_1.default.outputFileSync(targetPath, content, { encoding: 'utf-8' });
    }
    catch (e) {
        console.log(log_1.errorText(e));
    }
}
exports.writeFile = writeFile;
//# sourceMappingURL=file.js.map