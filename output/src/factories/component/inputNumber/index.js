"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formItem_1 = require("Src/factories/component/formItem");
const getPropValue_1 = require("Src/utils/getPropValue");
class InputNumber extends formItem_1.FormItem {
    constructor(page, config) {
        super(page, config);
        this.componentName = 'InputNumber';
        this.config = config;
    }
    getDecoratorConfigCode() {
        return `{
            initialValue: ${this.config.initialValue}
        }`;
    }
    toCode() {
        const propsCode = [];
        for (let propKey in this.props) {
            const propValue = getPropValue_1.getPropValue(this.props[propKey]);
            propsCode.push(`${propKey}={${propValue}}`);
        }
        return `<InputNumber
        ${propsCode.join(',').replace(/,/g, '\n')}
    />`;
    }
}
exports.InputNumber = InputNumber;
//# sourceMappingURL=index.js.map