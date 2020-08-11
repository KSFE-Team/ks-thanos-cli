import Page from 'Src/factories/page';
import { SelectConfig, PropsConfig, OptionData } from './interface';
import { FormItem } from 'Src/factories/component/formItem';
import { getPropStr } from 'Src/utils/getPropValue';
/**
 * Select组件
 */
export class Select extends FormItem {
    config: SelectConfig;
    constructor(page: Page, config: SelectConfig) {
        super(page, config);
        this.componentName = 'Select';
        this.config = config;
        this.props = config.props;
    }

    getDecoratorConfigCode() {
        return `{}`;
    }

    getProps = (data: PropsConfig) => {
        const propsCode = [];
        for (let propKey in data) {
            propsCode.push(getPropStr(propKey, data[propKey]));
        };
        return propsCode.join('\n');
    }

    toCode() {
        let code = this.config.options.map((item: OptionData) => {
            return (
                `<Select.Option ${this.getProps(item.props)}>
                    ${item.label}
                </Select.Option>`
            );
        });

        return `<Select
            ${this.getProps(this.props)}
        >
            ${ code.join('\n')}
        </Select>`;
    }
}
