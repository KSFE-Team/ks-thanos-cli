import Page from 'Src/factories/page';
import { FormItemConfig, FormItem } from '../formItem';

/**
 * Textarea组件
 */
export class Textarea extends FormItem {

    config: FormItemConfig
    constructor(page: Page, config: FormItemConfig) {
        super(page, config);
        this.componentName = 'Textarea';
        this.config = config;
    }

    getDecoratorConfigCode() {
        return `{}`;
    }

    toCode() {
        const propsCode = [];
        for (let propKey in this.props) {
            const propValue = this.props[propKey];
            propsCode.push(
                `${propKey}={'${propValue}'}`
            );
        }
        return `<Input.TextArea
        ${propsCode.join('\n')}
    />`;
    }
}
