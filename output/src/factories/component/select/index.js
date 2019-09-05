"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basic_1 = require("Src/factories/component/basic");
const manager_1 = require("Src/factories/model/effect/manager");
class Select extends basic_1.Component {
    constructor(page, config) {
        super(page, config);
        this.getProps = (data) => {
            const propsCode = [];
            for (let propKey in data) {
                const propValue = data[propKey];
                if (typeof propValue === 'boolean') {
                    propsCode.push(`${propKey}={${propValue}}`);
                }
                else {
                    propsCode.push(`${propKey}={'${propValue}'}`);
                }
            }
            return propsCode.join('\n');
        };
        this.componentName = 'Select';
        this.config = config;
        this.props = config.props;
        this.effect = manager_1.EffectManager.create(this.stateName, page.model, config.dependencies);
    }
    initPageState() {
        this.page.model.addInitialState(this.stateName, this.config.key, `''`);
    }
    initPageLifecycle() {
    }
    toCode() {
        let code = this.config.options.map((item, index) => {
            return (`<Select.Option ${this.getProps(item.props)}>
                    ${item.lable}
                </Select.Option>`);
        });
        return `<Form.Item>
        {
            this.props.Form.getFieldDecorator('${this.config.label}')(
                <Select 
                    ${this.getProps(this.props)}
                >   
                    ${code.join('\n')}
                </Select>

            )
        }
    </Form.Item>`;
    }
}
exports.Select = Select;
//# sourceMappingURL=index.js.map