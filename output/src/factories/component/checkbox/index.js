"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formItem_1 = require("Src/factories/component/formItem");
const getPropValue_1 = require("Src/utils/getPropValue");
class Checkbox extends formItem_1.FormItem {
    constructor(page, config) {
        super(page, config);
        this.getProps = (data) => {
            const propsCode = [];
            for (let propKey in data) {
                const propValue = getPropValue_1.getPropValue(data[propKey]);
                propsCode.push(`${propKey}={${propValue}}`);
            }
            return propsCode.join('\n');
        };
        this.componentName = 'Checkbox';
        this.config = config;
    }
    getDecoratorConfigCode() {
        return '{}';
    }
    toCode() {
        let code = this.config.options.map((item) => {
            return (`<Checkbox ${this.getProps(item.props)}>
                    ${item.text}
                </Checkbox>`);
        });
        return `
            <Checkbox.Group>
                ${code.join('\n')}
            </Checkbox.Group>
        `;
    }
}
exports.Checkbox = Checkbox;
//# sourceMappingURL=index.js.map