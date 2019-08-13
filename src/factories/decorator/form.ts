import { FormDecoratorConfig } from './types';

export class FormDecorator {

    config: FormDecoratorConfig

    constructor(config: FormDecoratorConfig) {
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