import { Component, ComponentConfig } from '../basic/index';
import { isArray, isObject } from 'util';

/**
 * FormItem组件配置
 */
export interface FormItemConfig extends ComponentConfig {
    label: string; // 搜索表单标题
    key: string; // 表单绑定Key
    isRequired: boolean; // 是否必填
    formType: 'search' | 'normal'; // 表单类型
    defaultValue: any; // 默认值
    props: { // 组件属性
        [name: string]: any;
    };
}

/**
 * FormItem类型组件的基类
 */
export abstract class FormItem extends Component {

    initPageState() {
        if (this.config.formType === 'search') {
            const defaultValue = this.config.defaultValue;
            let stateValue = `''`;
            switch (typeof defaultValue) {
                case 'boolean':
                case 'number':
                    stateValue = `${defaultValue}`;
                    break;
                case 'string':
                    stateValue = `'${defaultValue}'`;
                    break;
                default:
                    if (isArray(defaultValue)) {
                        stateValue = `[${defaultValue.map((item) => {
                            if (typeof item === 'string') {
                                return `'${item}'`;
                            }
                            if (isObject(item)) {
                                return JSON.stringify(item);
                            }
                            return item;
                        }).toString()}]`;
                    } else if (isObject(defaultValue)) {
                        stateValue = `${JSON.stringify(defaultValue)}`;
                    }
            }
            this.page.model.addInitialState(this.stateName, this.config.key, stateValue);
        }
    }

    abstract config: FormItemConfig // 组件配置

}
