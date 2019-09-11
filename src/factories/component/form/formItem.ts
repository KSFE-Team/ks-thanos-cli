import { Component, ComponentConfig } from '../basic/index';

/**
 * FormItem组件配置
 */
export interface FormItemConfig extends ComponentConfig {
    label: string; // 搜索表单标题
    key: string; // 表单绑定Key
    isRequired: boolean;
    formType: 'search' | 'normal';
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
            this.page.model.addInitialState(this.stateName, this.config.key, `''`);
        }
    }

    abstract config: FormItemConfig // 组件配置

}
