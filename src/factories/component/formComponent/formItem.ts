import { FormItemConfig } from '../types';
import { upperFirst } from '../../../utils/upperFirst';

export class FormItem {

    className: string
    config: FormItemConfig
    props: string[] = []

    constructor(config: FormItemConfig) {
        this.className = upperFirst(config.name);
        this.config = config;
        this.addProps(`placeholder="请输入${this.config.label}内容"`);
        this.addProps(`allowClear`);
    }

    addProps(propCode: string) {
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