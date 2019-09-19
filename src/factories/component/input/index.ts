import Page from 'Src/factories/page';
import { FormItemConfig, FormItem } from '../formItem';

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
            const propValue = this.props[propKey];
            propsCode.push(
                `${propKey}={'${propValue}'}`
            );
        }
        return `<Input
        ${propsCode}
    />`;
    }
}
