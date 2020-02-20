import Page from 'Src/factories/page';
import { FormItemConfig } from '../formItem';
import { FormItem } from 'Src/factories/component/formItem';
import { getPropValue } from 'Src/utils/getPropValue';

/**
 * InputNumber组件
 */
export class InputNumber extends FormItem {

    config: FormItemConfig

    constructor(page: Page, config: FormItemConfig) {
        super(page, config);
        this.componentName = 'InputNumber';
        this.config = config;
    }

    getDecoratorConfigCode() {
        return `{
            initialValue: ${this.config.initialValue}
        }`;
    }

    toCode() {
        const propsCode = [];
        for (let propKey in this.props) {
            const propValue = getPropValue(this.props[propKey]);
            propsCode.push(
                `${propKey}={${propValue}}`
            );
        }
        return `<InputNumber
        ${propsCode.join(',').replace(/,/g, '\n')}
    />`;
    }
}
