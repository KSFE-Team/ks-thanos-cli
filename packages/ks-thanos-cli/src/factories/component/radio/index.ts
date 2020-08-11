import Page from 'Src/factories/page';
import { FormItem } from 'Src/factories/component/formItem';
import { FormItemConfig } from '../formItem';
import { getPropStr } from 'Src/utils/getPropValue';
/**
 * Radio组件
 */
interface RadioConfig extends FormItemConfig {
    options: any[];
}
export class Radio extends FormItem {

    config: RadioConfig

    constructor(page: Page, config: RadioConfig) {
        super(page, config);
        this.componentName = 'Radio';
        this.config = config;
    }

    getDecoratorConfigCode() {
        return `{}`;
    }

    toCode() {
        let code = this.config.options.map((item: any) => {
            const propsCode = [];

            propsCode.push(getPropStr('value', item.value));
            propsCode.push(getPropStr('key', item.value));

            return (
                `<Radio ${propsCode.join(',').replace(/,/g, '\n')}>${item.text}</Radio>`
            );
        });
        return `<Radio.Group>
            ${code.join('\n')}
        </Radio.Group>`;
    }
}
