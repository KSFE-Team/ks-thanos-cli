import Page from 'Src/factories/page';
import {  ComponentConfig } from '../basic/index';
import { Component } from 'Src/factories/component/basic';
/**
 * Radio组件
 */
interface FormItemConfig extends ComponentConfig {
    label: string; // 搜索表单标题
    key: string; // 表单绑定Key
    isRequired: boolean;
    options: any[];
    defaultValue: any;
}
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
        let code = this.config.options.map((item: any, index: number) => {
                let value = typeof item.value === 'number' ? item.value : `'${item.value}'`;
                return (
                    ` <Radio value={${value}} key={${item.rowKey}}>${item.text}</Radio>`
                );
            }),
            defaultValue = typeof this.config.defaultValue === 'number' ? this.config.defaultValue : `'${this.config.defaultValue}'`;
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