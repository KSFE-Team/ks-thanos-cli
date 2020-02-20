"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const file_1 = require("Src/utils/file");
const format_1 = require("Src/utils/format");
async function createModel(options) {
    const { page, pagePath } = options;
    const modelPath = path_1.default.join(pagePath, 'model.js');
    file_1.writeFile(modelPath, page.model.toCode());
    format_1.formatFile(modelPath);
}
exports.createModel = createModel;
//# sourceMappingURL=createModel.js.map