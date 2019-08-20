import Page from 'Src/factories/page';
import { FormItem, FormItemConfig } from '../form/formItem';

export class Input extends FormItem {

    config: FormItemConfig

    constructor(page: Page, config: FormItemConfig) {
        super(page, config);
        this.componentName = 'Input';
        this.config = config;
    }
}