"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basic_1 = require("Src/factories/component/basic");
class Input extends basic_1.Component {
    constructor(page, config) {
        super(page, config);
        this.componentName = 'Input';
        this.config = config;
    }
    initPageState() {
        this.page.model.addInitialState(this.stateName, this.config.key, `''`);
    }
    toCode() {
        const propsCode = [];
        for (let propKey in this.props) {
            const propValue = this.props[propKey];
            propsCode.push(`${propKey}={'${propValue}'}`);
        }
        return `<Form.Item>
        {
            this.props.form.getFieldDecorator('${this.config.key}')(
                <Input
                    ${propsCode}
                />
            )
        }
    </Form.Item>`;
    }
}
exports.Input = Input;
//# sourceMappingURL=index.js.map