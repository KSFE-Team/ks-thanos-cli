import Page from 'Src/factories/page';
// import { FormItemConfig } from '../form/formItem';
import { CheckboxConfig, PropsConfig } from './interface';
import { Component } from 'Src/factories/component/basic';

/**
 * Checkbox组件
 */
export class Checkbox extends Component {

    config: CheckboxConfig

    constructor(page: Page, config: CheckboxConfig) {
        super(page, config);
        this.componentName = 'Checkbox';
        this.config = config;
    }

    initPageState() {
        this.page.model.addInitialState(this.stateName, this.config.key, `''`);
    }
    getProps = (data: PropsConfig) => {
        const propsCode = [];
        for (let propKey in data) {
            const propValue = data[propKey];
            if (typeof propValue === 'boolean') {
                propsCode.push(
                    `${propKey}={${propValue}}`
                );
            } else {
                propsCode.push(
                    `${propKey}={'${propValue}'}`
                );
            }
        }
        return propsCode.join('\n');
    }
    toCode() {
        console.log(this.config);
        let code = this.config.options.map((item: any) => {
            return (
                `<Checkbox ${this.getProps(item.props)}>
                    ${item.text}
                </Checkbox>`
            );
        });
        return `<Form.Item label='${this.config.label}'>
    {
        this.props.Form.getFieldDecorator('${this.config.key}')(
            <Checkbox.Group>
                ${
    code.join('\n')
}
            </Checkbox.Group>

        )
    }
</Form.Item>`;
    }
}
