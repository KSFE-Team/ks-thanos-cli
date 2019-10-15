import Page from 'Src/factories/page';
import { FormItemConfig, FormItem } from '../formItem';
import { getPropValue } from 'Src/utils/getPropValue';

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

    getDecoratorConfigCode() {
        return '{}';
    }

    toCode() {
        const propsCode = [];
        for (let propKey in this.props) {
            const propValue = getPropValue(this.props[propKey]);
            propsCode.push(
                `${propKey}={${propValue}}`
            );
        }
        return `<Input
        ${propsCode}
    />`;
    }
}
