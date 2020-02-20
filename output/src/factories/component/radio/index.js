"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formItem_1 = require("Src/factories/component/formItem");
const getPropValue_1 = require("Src/utils/getPropValue");
class Radio extends formItem_1.FormItem {
    constructor(page, config) {
        super(page, config);
        this.componentName = 'Radio';
        this.config = config;
    }
    getDecoratorConfigCode() {
        return `{
            rules: [
                {
                    required: ${this.config.isRequired},
                    message: '请选择${this.config.label}'
                }
            ],
            initialValue: ${this.config.initialValue}
        }`;
    }
    toCode() {
        let code = this.config.options.map((item) => {
            let value = getPropValue_1.getPropValue(item.value);
            return (`<Radio value={${value}} key={${item.rowKey}}>${item.text}</Radio>`);
        });
        return `<Radio.Group>
        ${code.join('\n')}
        </Radio.Group>`;
    }
}
exports.Radio = Radio;
//# sourceMappingURL=index.js.map