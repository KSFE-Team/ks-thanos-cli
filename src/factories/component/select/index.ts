import Page from 'Src/factories/page';
import { Component } from 'Src/factories/component/basic';
import { SelectConfig, PropsConfig, OptionData } from './interface';
/**
 * Select组件
 */
export class Select extends Component {
    config: SelectConfig;
    constructor(page: Page, config: SelectConfig) {
        super(page, config);
        this.componentName = 'Select';
        this.config = config;
        this.props = config.props;
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
        };
        return propsCode.join('\n');
    }
    toCode() {
        let code = this.config.options.map((item: OptionData) => {
            return (
                `<Select.Option ${this.getProps(item.props)}>
                    ${item.label}
                </Select.Option>`
            );
        });
        return `
        <Form.Item>
            {
                this.props.form.getFieldDecorator('${this.config.label}')(
                    <Select 
                        ${this.getProps(this.props)}
                    >   
                        ${ code.join('\n')}
                    </Select>

                )
            }
        </Form.Item>`;
    }
}