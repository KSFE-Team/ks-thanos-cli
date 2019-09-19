import Page from 'Src/factories/page';
import { FormItemConfig } from '../formItem';
import { FormItem } from 'Src/factories/component/formItem';

/**
 * DatePicker组件
 */
export class DatePicker extends FormItem {

    config: FormItemConfig;

    constructor(page: Page, config: FormItemConfig) {
        super(page, config);
        this.componentName = 'DatePicker';
        this.config = config;
    }

    getImports() {
        let imports = super.getImports();
        imports = imports.concat([
            {
                source: 'antd',
                name: 'DatePicker',
                defaultImport: false
            }
        ]);
        return imports;
    }

    getDecoratorConfigCode() {
        return '{}';
    }

    toCode() {
        const propsKeyArr: string[] = this.config.props && Object.keys(this.config.props);
        const propsCode = propsKeyArr.map((item) => {
            let value: any = this.config.props[item];
            switch (item) {
                case 'placeholder':
                    return `${item}={'${value}'}`;
                case 'showTime':
                    return `${item}={${JSON.stringify(value)}}`;
                case 'format':
                    return `${item}='${value}'`;
            }
        });
        return `<DatePicker
        ${propsCode.join('\n').replace(/\"/g, '\'')}
      />`;
    }
}
