"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formItem_1 = require("../formItem");
class Textarea extends formItem_1.FormItem {
    constructor(page, config) {
        super(page, config);
        this.componentName = 'Textarea';
        this.config = config;
    }
    getDecoratorConfigCode() {
        return `{}`;
    }
    toCode() {
        const propsCode = [];
        for (let propKey in this.props) {
            const propValue = this.props[propKey];
            propsCode.push(`${propKey}={'${propValue}'}`);
        }
        return `<Input.TextArea
        ${propsCode.join('\n')}
    />`;
    }
}
exports.Textarea = Textarea;
//# sourceMappingURL=index.js.map