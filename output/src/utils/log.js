"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const figlet_1 = __importDefault(require("figlet"));
exports.infoText = chalk_1.default.blue;
exports.errorText = chalk_1.default.red;
exports.successText = chalk_1.default.green;
exports.warningText = chalk_1.default.yellow;
function createSplash(str) {
    return chalk_1.default.gray(figlet_1.default.textSync(str, {
        horizontalLayout: 'default',
        verticalLayout: 'default',
    }));
}
exports.createSplash = createSplash;
//# sourceMappingURL=log.js.map