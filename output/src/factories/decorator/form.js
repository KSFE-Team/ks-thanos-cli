"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseElement_1 = require("Src/factories/baseElement");
class FormDecorator extends baseElement_1.BaseElement {
    constructor(config) {
        super();
        this.config = config;
    }
    getMapPropsToFieldsCode() {
        const codes = this.config.formItems.map((item) => {
            return `${item}: Form.createFormField({
                    ...props.${this.config.pageName}.${this.config.stateName}.${item},
                    value: props.${this.config.pageName}.${this.config.stateName}.${item}.value
                }),`;
        });
        return codes.join('\n');
    }
    getOnFieldsChangeCode() {
        return `actions.${this.config.pageName}.setReducer({
                ${this.config.stateName}: {
                    ...props.${this.config.pageName}.${this.config.stateName},
                    ...fields
                }
            });`;
    }
    getImports() {
        return [
            {
                name: 'Form',
                source: 'antd',
                defaultImport: false
            }
        ];
    }
    toCode() {
        const mapPropsToFieldsCode = this.getMapPropsToFieldsCode();
        const onFieldsChangeCode = this.getOnFieldsChangeCode();
        return `@Form.create({
                mapPropsToFields(props) { 
                    return {
                        ${mapPropsToFieldsCode}
                    };
                },
                onFieldsChange(props, fields) {
                    ${onFieldsChangeCode}
                }
            })`;
    }
}
exports.FormDecorator = FormDecorator;
//# sourceMappingURL=form.js.map