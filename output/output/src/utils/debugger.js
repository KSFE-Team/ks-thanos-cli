"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const path_1 = __importDefault(require("path"));
function Debug(filename) {
    return debug_1.default(`ks: ${path_1.default.basename(filename, '.js')} ----> `);
}
exports.default = Debug;
//# sourceMappingURL=debugger.js.map