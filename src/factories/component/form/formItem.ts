import { Component, ComponentConfig } from '../basic/index';

/**
 * FormItem组件配置
 */
export interface FormItemConfig extends ComponentConfig {
    label: string; // 搜索表单标题
    key: string; // 表单绑定Key
    isRequired: boolean;
    formType: 'search' | 'normal';
    defaultValue: any;
    props: {
        [name: string]: any;
    };
}

/**
 * FormItem类型组件的基类
 */
export abstract class FormItem extends Component {

    initPageState() {
        if (this.config.formType === 'search') {
            let stateValue = `''`;
            switch (typeof this.config.defaultValue) {
                case 'boolean':
                case 'number':
                    stateValue = `${this.config.defaultValue}`;
                    break;
                case 'string':
                    stateValue = `'${this.config.defaultValue}'`;
                    break;
            }
            this.page.model.addInitialState(this.stateName, this.config.key, stateValue);
        }
    }

    abstract config: FormItemConfig // 组件配置

}
