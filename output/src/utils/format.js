"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eslint_1 = __importDefault(require("eslint"));
function formatFile(filePath) {
    const eslintEngine = new eslint_1.default.CLIEngine({
        fix: true,
        useEslintrc: true
    });
    const lintResult = eslintEngine.executeOnFiles([
        filePath
    ]);
    eslint_1.default.CLIEngine.outputFixes(lintResult);
}
exports.formatFile = formatFile;
//# sourceMappingURL=format.js.map