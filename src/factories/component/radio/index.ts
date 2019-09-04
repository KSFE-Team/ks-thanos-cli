import Page from 'Src/factories/page';
import { FormItemConfig } from '../form/formItem';
import { Component } from 'Src/factories/component/basic';
/**
 * Radio组件
 */
export class Radio extends Component {

    config: FormItemConfig

    constructor(page: Page, config: FormItemConfig) {
        super(page, config);
        this.componentName = 'Radio';
        this.config = config;
    }

    initPageState() {
        this.page.model.addInitialState(this.stateName, this.config.key, `''`);
    }
    

    toCode() {
        let code = this.config.props.configList.map((item: any, index: any) => {
            let value=typeof item.value === 'number'?item.value:`'${item.value}'`;
            return (
                ` <Radio value={${value}} key={${item.id}}>${item.label}</Radio>`
            );
        });
        let defaultValue= typeof this.config.props.defaultValue === 'number'?this.config.props.defaultValue:`'${this.config.props.defaultValue}'`
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
                ${
                    code.join('\n')
                }
                </Radio.Group>
            )
        }
    </Form.Item>`;
    }
}