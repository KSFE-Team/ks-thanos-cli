"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formItem_1 = require("../formItem");
const getPropValue_1 = require("Src/utils/getPropValue");
class Input extends formItem_1.FormItem {
    constructor(page, config) {
        super(page, config);
        this.componentName = 'Input';
        this.config = config;
    }
    getDecoratorConfigCode() {
        return '{}';
    }
    toCode() {
        const propsCode = [];
        for (let propKey in this.props) {
            const propValue = getPropValue_1.getPropValue(this.props[propKey]);
            propsCode.push(`${propKey}={${propValue}}`);
        }
        return `<Input
        ${propsCode}
    />`;
    }
}
exports.Input = Input;
//# sourceMappingURL=index.js.map