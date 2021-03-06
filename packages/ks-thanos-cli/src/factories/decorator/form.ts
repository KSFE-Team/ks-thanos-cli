import { FormDecoratorConfig } from './types';
import { Decorator } from './index';

export class FormDecorator extends Decorator {

    config: FormDecoratorConfig

    constructor(config: FormDecoratorConfig) {
        super();
        this.config = config;
    }

    getMapPropsToFieldsCode() {
        const codes = this.config.formItems.map((item) => {
            return `${item}: Form.createFormField({
                    ...props.${this.config.namespaceValue}.${this.config.stateName}.${item},
                    value: props.${this.config.namespaceValue}.${this.config.stateName}.${item}.value
                }),`;
        });
        return codes.join('\n');
    }

    getOnFieldsChangeCode() {
        return `actions.${this.config.namespaceValue}.setReducers({
                ${this.config.stateName}: {
                    ...props.${this.config.namespaceValue}.${this.config.stateName},
                    ...fields
                }
            });`;
    }

    getOutputPropTypesCode() {
        return 'form: PropTypes.object\n';
    }

    getImports() {
        return [
            {
                name: 'Form',
                source: 'antd',
                defaultImport: false
            },
            {
                source: 'kredux',
                name: 'actions',
                defaultImport: false
            }
        ];
    }

    toCode() {
        const mapPropsToFieldsCode = this.getMapPropsToFieldsCode();
        const onFieldsChangeCode = this.getOnFieldsChangeCode();
        if(this.config.type === 'search') {
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
        return `@Form.create()`;
    }
}
