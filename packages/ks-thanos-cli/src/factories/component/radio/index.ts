import Page from 'Src/factories/page';
import { FormItem } from 'Src/factories/component/formItem';
import { FormItemConfig } from '../formItem';
import { getPropValue } from 'Src/utils/getPropValue';
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
            let value = getPropValue(item.value);
            return (
                `<Radio value={'${value}'} key={'${value}'}>${item.text}</Radio>`
            );
        });
        return `<Radio.Group>
            ${code.join('\n')}
        </Radio.Group>`;
    }
}
