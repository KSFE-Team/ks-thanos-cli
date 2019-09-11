import Page from 'Src/factories/page';
import { Component } from 'Src/factories/component/basic';
import { SelectConfig, PropsConfig } from './interface';
import { EffectManager } from 'Src/factories/model/effect/manager';
// import { EffectConfig } from 'Src/factories/model/effect';
/**
 * Select组件
 */
export class Select extends Component {
    config: SelectConfig;
    // effect: EffectConfig
    constructor(page: Page, config: SelectConfig) {
        super(page, config);
        this.componentName = 'Select';
        this.config = config;
        this.props = config.props;
        this.effect = EffectManager.create(this.stateName, page.model, config.dependencies);
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
        let code = this.config.options.map((item: any, index: any) => {
            return (
                `<Select.Option ${this.getProps(item.props)}>
                    ${item.lable}
                </Select.Option>`
            );
        });
        return `<Form.Item>
        {
            this.props.Form.getFieldDecorator('${this.config.label}')(
                <Select 
                    ${this.getProps(this.props)}
                >   
                    ${code.join('\n')}
                </Select>

            )
        } 
    </Form.Item>`;
    }
}