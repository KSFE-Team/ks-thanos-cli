import Page from 'Src/factories/page';
import { FormItemConfig } from '../formItem';
import { FormItem } from 'Src/factories/component/formItem';
import { getPropStr } from 'Src/utils/getPropValue';

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
        return `{}`;
    }

    toCode() {
        const propsCode = [];
        for (let propKey in this.props) {
            propsCode.push(getPropStr(propKey, this.props[propKey]));
        }
        return `<InputNumber
        ${propsCode.join(',').replace(/,/g, '\n')}
    />`;
    }
}
