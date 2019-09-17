import Page from 'Src/factories/page';
// import { FormItemConfig } from '../form/formItem';
import { CheckboxConfig, PropsConfig } from './interface';
import { FormItem } from 'Src/factories/component/form/formItem';

/**
 * Checkbox组件
 */
export class Checkbox extends FormItem {

    config: CheckboxConfig

    constructor(page: Page, config: CheckboxConfig) {
        super(page, config);
        this.componentName = 'Checkbox';
        this.config = config;
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

    getDecoratorConfigCode() {
        return '{}';
    }

    toCode() {
        let code = this.config.options.map((item: any) => {
            return (
                `<Checkbox ${this.getProps(item.props)}>
                    ${item.text}
                </Checkbox>`
            );
        });
        return `
            <Checkbox.Group>
                ${code.join('\n')}
            </Checkbox.Group>
        `;
    }
}
