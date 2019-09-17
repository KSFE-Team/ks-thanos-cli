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
    initialValue: any; // 默认值
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
            const initialValue = this.config.initialValue;
            let stateValue = `''`;
            switch (typeof initialValue) {
                case 'boolean':
                case 'number':
                    stateValue = `${initialValue}`;
                    break;
                case 'string':
                    stateValue = `'${initialValue}'`;
                    break;
                default:
                    if (isArray(initialValue)) {
                        stateValue = `[${initialValue.map((item) => {
                            if (typeof item === 'string') {
                                return `'${item}'`;
                            }
                            if (isObject(item)) {
                                return JSON.stringify(item);
                            }
                            return item;
                        }).toString()}]`;
                    } else if (isObject(initialValue)) {
                        stateValue = `${JSON.stringify(initialValue)}`;
                    }
            }
            this.page.model.addInitialState(this.stateName, this.config.key, stateValue);
        }
    }

    abstract config: FormItemConfig // 组件配置
    abstract getDecoratorConfigCode(): string
}
