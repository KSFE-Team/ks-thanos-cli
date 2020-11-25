import Page from 'Src/factories/page';
import { FormItemConfig } from '../formItem';
import { FormItem } from 'Src/factories/component/formItem';

/**
 * Input组件
 */
export class RangePicker extends FormItem {

    config: FormItemConfig;

    constructor(page: Page, config: FormItemConfig) {
        super(page, config);
        this.componentName = 'RangePicker';
        this.parentComponentName = 'KSDatePicker';
        this.config = config;
    }

    getImports() {
        let imports = super.getImports();
        imports = imports.concat([
            {
                source: 'ks-cms-ui',
                name: 'KSDatePicker',
                defaultImport: false
            }
        ]);
        return imports;
    }

    getDecoratorConfigCode() {
        return `{}`;
    }

    toCode() {
        const { props = {} } = this.config;
        const place = props.placeholder.split('/');
        return `<KSDatePicker.RangePicker
        placeholder={[${place.map((item:string) => `'${item}'`).join(', ')}]}
    />`;
    }
}
