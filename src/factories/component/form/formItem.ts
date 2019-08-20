import { Component, ComponentConfig } from '../basic/index';
import Page from 'Src/factories/page';

export interface FormItemConfig extends ComponentConfig {
    label: string; // 搜索表单标题
    key: string; // 表单绑定Key
}

export class FormItem extends Component {

    config: FormItemConfig

    constructor(page: Page, config: FormItemConfig) {
        super(page, config);
        this.config = config;
    }

    initPageState() {
        this.page.model.addInitialState(this.stateName, this.config.key, `''`);
    }

    toCode() {
        const propsCode = [];
        for (let propKey in this.props) {
            const propValue = this.props[propKey];
            propsCode.push(
                `${propKey}={'${propValue}'}`
            );
        }
        return `<Form.Item>
        {
            this.props.form.getFieldDecorator('${this.config.label}')(
                <${this.componentName}
                    ${propsCode}
                />
            )
        }
    </Form.Item>`;
    }
}