"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basic_1 = require("Src/factories/component/basic");
class Radio extends basic_1.Component {
    constructor(page, config) {
        super(page, config);
        this.componentName = 'Radio';
        this.config = config;
    }
    initPageState() {
        this.page.model.addInitialState(this.stateName, this.config.key, `''`);
    }
    toCode() {
        let code = this.config.props.configList.map((item, index) => {
            let value = typeof item.value === 'number' ? item.value : `'${item.value}'`;
            return (` <Radio value={${value}} key={${item.id}}>${item.label}</Radio>`);
        });
        let defaultValue = typeof this.config.props.defaultValue === 'number' ? this.config.props.defaultValue : `'${this.config.props.defaultValue}'`;
        return `<Form.Item
        label='${this.config.label}'
        >
        {
            this.props.form.getFieldDecorator('${this.config.key}',{
                rules: [
                    {required: ${this.config.isRequired}, message: '请选择${this.config.label}'}
                ],
                initialValue: ${defaultValue}
            })(
                <Radio.Group>
                ${code.join('\n')}
                </Radio.Group>
            )
        }
    </Form.Item>`;
    }
}
exports.Radio = Radio;
//# sourceMappingURL=index.js.map