"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
function getPropValue(value) {
    let propValue = `''`;
    switch (typeof value) {
        case 'boolean':
        case 'number':
            propValue = `${value}`;
            break;
        case 'string':
            propValue = `'${value}'`;
            break;
        default:
            if (util_1.isArray(value)) {
                propValue = `[${value.map((item) => {
                    if (typeof item === 'string') {
                        return `'${item}'`;
                    }
                    if (util_1.isObject(item)) {
                        return JSON.stringify(item);
                    }
                    return item;
                }).toString()}]`;
            }
            else if (util_1.isObject(value)) {
                propValue = `${JSON.stringify(value)}`;
            }
    }
    return propValue;
}
exports.getPropValue = getPropValue;
//# sourceMappingURL=getPropValue.js.map