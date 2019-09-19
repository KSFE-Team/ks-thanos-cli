import Page from 'Src/factories/page';
import { FormItem } from 'Src/factories/component/formItem';
import { FormItemConfig } from '../formItem';
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
        return `{
            rules: [
                {
                    required: ${this.config.isRequired},
                    message: '请选择${this.config.label}'
                }
            ],
            initialValue: ${this.config.initialValue}
        }`;
    }

    toCode() {
        let code = this.config.options.map((item: any) => {
            let value = typeof item.value === 'number' ? item.value : `'${item.value}'`;
            return (
                `<Radio value={${value}} key={${item.rowKey}}>${item.text}</Radio>`
            );
        });
        return `<Radio.Group>
        ${code.join('\n')}
        </Radio.Group>`;
    }
}
