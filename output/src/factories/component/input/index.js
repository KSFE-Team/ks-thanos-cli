"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formItem_1 = require("../form/formItem");
class Input extends formItem_1.FormItem {
    constructor(page, config) {
        super(page, config);
        this.componentName = 'Input';
        this.config = config;
    }
}
exports.Input = Input;
//# sourceMappingURL=index.js.map