import Page from 'Src/factories/page';
import { FormItem, FormItemConfig } from '../form/formItem';

/**
 * Input组件
 */
export class Input extends FormItem {

    config: FormItemConfig

    constructor(page: Page, config: FormItemConfig) {
        super(page, config);
        this.componentName = 'Input';
        this.config = config;
    }
}