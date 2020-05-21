import Page from 'Src/factories/page';
import { FormItemConfig, FormItem } from '../form/formItem';

/**
 * Input组件
 */
export class Input extends FormItem {

    config: FormItemConfig

    constructor(page: Page, config: FormItemConfig) {
        super(page, config);
        this.componentName = 'Input';
        this.config = config;
    }

    toCode() {
        const propsCode = [];
        for (let propKey in this.props) {
            const propValue = this.props[propKey];
            propsCode.push(
                `${propKey}={'${propValue}'}`
            );
        }
        return `<Form.Item
        label={'${this.config.label}'}>
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
