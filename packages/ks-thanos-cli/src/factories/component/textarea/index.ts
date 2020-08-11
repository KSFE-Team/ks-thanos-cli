import Page from 'Src/factories/page';
import { FormItemConfig, FormItem } from '../formItem';
import { getPropStr } from 'Src/utils/getPropValue';

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

    getImports() {
        const imports = [{
            source: 'antd',
            name: 'Input',
            defaultImport: false
        }];
        return imports;
    }

    toCode() {
        const propsCode = [];
        for (let propKey in this.props) {
            propsCode.push(getPropStr(propKey, this.props[propKey]));
        }
        return `<Input.TextArea
        ${propsCode.join('\n')}
    />`;
    }
}
