"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formItem_1 = require("Src/factories/component/formItem");
const getPropValue_1 = require("Src/utils/getPropValue");
class Select extends formItem_1.FormItem {
    constructor(page, config) {
        super(page, config);
        this.getProps = (data) => {
            const propsCode = [];
            for (let propKey in data) {
                const propValue = getPropValue_1.getPropValue(data[propKey]);
                propsCode.push(`${propKey}={${propValue}}`);
            }
            ;
            return propsCode.join('\n');
        };
        this.componentName = 'Select';
        this.config = config;
        this.props = config.props;
    }
    getDecoratorConfigCode() {
        return `{}`;
    }
    toCode() {
        let code = this.config.options.map((item) => {
            return (`<Select.Option ${this.getProps(item.props)}>
                    ${item.label}
                </Select.Option>`);
        });
        return `<Select
            ${this.getProps(this.props)}
        >
            ${code.join('\n')}
        </Select>`;
    }
}
exports.Select = Select;
//# sourceMappingURL=index.js.map