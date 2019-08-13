"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const upperFirst_1 = require("../../../utils/upperFirst");
class FormItem {
    constructor(config) {
        this.props = [];
        this.className = upperFirst_1.upperFirst(config.name);
        this.config = config;
        this.addProps(`placeholder="请输入${this.config.label}内容"`);
        this.addProps(`allowClear`);
    }
    addProps(propCode) {
        this.props.push(propCode);
    }
    toCode() {
        const propsCode = this.props.join('\n');
        return `<FormItem>
        {
            this.props.form.getFieldDecorator('${this.config.label}')(
                <${this.className}
                    ${propsCode}
                />
            )
        }
    </FormItem>`;
    }
}
exports.FormItem = FormItem;
//# sourceMappingURL=formItem.js.map