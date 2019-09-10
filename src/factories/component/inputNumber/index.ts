import Page from 'Src/factories/page';
import { FormItemConfig } from '../form/formItem';
import { Component } from 'Src/factories/component/basic';
import Debug from 'Src/utils/debugger';

/**
 * InputNumber组件
 */
const debug = Debug(__filename);

export class InputNumber extends Component {

    config: FormItemConfig

    constructor(page: Page, config: FormItemConfig) {
        super(page, config);
        this.componentName = 'InputNumber';
        this.config = config;
    }

    initPageState() {
        this.page.model.addInitialState(this.stateName, this.config.key, `''`);
        debug(`add decorators: 1111}`);
    }

    toCode() {
        const propsCode = [];
        let initValue = '';
        for (let propKey in this.props) {
            const propValue = this.props[propKey];
            if (propKey !== 'defaultValue') {
                propsCode.push(
                    `${propKey}={${propValue}}`
                );
            } else {
                initValue = propValue;
            }
        }
        debug(`InputNumber: ${propsCode}, ${initValue}`);
        return `<Form.Item>
        {
            this.props.form.getFieldDecorator('${this.config.key}',{
                initialValue: ${initValue}
            })(
                <InputNumber
                    ${propsCode.join(',').replace(/,/g, '\n')}
                />
            )
        }
    </Form.Item>`;
    }
}