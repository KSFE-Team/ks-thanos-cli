"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function upperFirst(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
}
exports.upperFirst = upperFirst;
function lowerFirst(str) {
    return str.slice(0, 1).toLowerCase() + str.slice(1);
}
exports.lowerFirst = lowerFirst;
function isEnglish(str = '') {
    return /^[a-zA-Z]+$/.test(str);
}
exports.isEnglish = isEnglish;
function isChinese(str = '') {
    return /^[\u4e00-\u9fa5]+$/.test(str);
}
exports.isChinese = isChinese;
//# sourceMappingURL=string.js.map