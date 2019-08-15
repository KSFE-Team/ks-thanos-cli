import { FormItemConfig } from '../types';
import { BasicComponent } from '../basicComponent/index';
import Page from '../../page';

export class FormItem extends BasicComponent{

    config: FormItemConfig
    props: string[] = []

    constructor(page: Page, config: FormItemConfig) {
        super(page, config);
        this.config = config;
        this.addProps(`placeholder="请输入${this.config.label}内容"`);
        this.addProps(`allowClear`);
    }

    initPageState() {
        this.page.model.addInitialState(this.stateName, this.config.key, `''`);
    }

    addProps(propCode: string) {
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