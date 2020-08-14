import { Component, ComponentConfig } from '../basic/index';
import { getPropValue } from 'Src/utils/getPropValue';

/**
 * FormItem组件配置
 */
export interface FormItemConfig extends ComponentConfig {
    label: string; // 搜索表单标题
    key: string; // 表单绑定Key
    isRequired: boolean; // 是否必填
    formType: 'search' | 'normal'; // 表单类型
    initialValue: any; // 默认值
    props: { // 组件属性
        [name: string]: any;
    };
}

/**
 * FormItem类型组件的基类
 */
export abstract class FormItem extends Component {

    static getRulesCode(rules: Record<string, any>[]) {
        if (rules.length) {
            const rulesCodes = rules
                .map((rule) => {
                    const ruleCodes = Object.entries(rule).map(([key, value]) => `${key}: ${value}`);
                    return `{
                        ${ruleCodes.join(', ')}
                    }`;
                })
                .toString();
            return rulesCodes;
        }
        return '';
    }

    initPageState() {
        if (this.config.formType === 'search') {
            const stateValue = getPropValue(this.config.initialValue);
            this.page.model.addInitialState(this.stateName, this.config.key, stateValue);
            this.page.model.listEffectRequestParams.push({
                name: this.config.key
            });
        }
    }

    abstract config: FormItemConfig // 组件配置
    abstract getDecoratorConfigCode(): string
}
