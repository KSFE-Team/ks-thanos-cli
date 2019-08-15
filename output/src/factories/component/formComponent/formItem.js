"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../basicComponent/index");
class FormItem extends index_1.BasicComponent {
    constructor(page, config) {
        super(page, config);
        this.props = [];
        this.config = config;
        this.addProps(`placeholder="请输入${this.config.label}内容"`);
        this.addProps(`allowClear`);
    }
    initPageState() {
        this.page.model.addInitialState(this.stateName, this.config.key, `''`);
    }
    addProps(propCode) {
        this.props.push(propCode);
    }
    toCode() {
        const propsCode = this.props.join('\n');
        return `<FormItem>
        {
            this.props.form.getFieldDecorator('${this.config.label}')(
                <${this.componentName}
                    ${propsCode}
                />
            )
        }
    </FormItem>`;
    }
}
exports.FormItem = FormItem;
//# sourceMappingURL=formItem.js.map