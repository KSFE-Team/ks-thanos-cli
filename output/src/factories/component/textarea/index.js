"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../basic/index");
class Textarea extends index_1.Component {
    constructor(page, config) {
        super(page, config);
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
            this.props.form.getFieldDecorator('${this.config.label}')(
                <Textarea/>
            )
        }
    </Form.Item>`;
    }
}
exports.Textarea = Textarea;
//# sourceMappingURL=index.js.map