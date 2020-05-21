import Page from 'Src/factories/page';
import { FormItemConfig } from '../form/formItem';
import { Component } from 'Src/factories/component/basic';

/**
 * Input组件
 */
export class RangePicker extends Component {

    config: FormItemConfig;

    constructor(page: Page, config: FormItemConfig) {
        super(page, config);
        this.componentName = 'RangePicker';
        this.parentComponentName = 'DatePicker';
        this.config = config;
    }

    initPageState() {
        this.page.model.addInitialState(this.stateName, this.config.key, `''`);
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

    toCode() {
        const propsKeyArr: string[] = this.config.props && Object.keys(this.config.props);
        const propsCode = propsKeyArr.map((item) => {
            let value: any[] | string = this.config.props[item];
            switch (item) {
                case 'placeholder':
                    return `${item}={[${Array.isArray(value) && value.map((e: any)=> `'${e}'`).join(',')}]}`;
                case 'showTime':
                    return `${item}={${JSON.stringify(value)}}`;
                case 'format':
                    return `${item}='${value}'`;
            }
        });
        return `<Form.Item 
                    label='${this.config.label}'>
    {
        this.props.form.getFieldDecorator('${this.config.key}')(
            <DatePicker.RangePicker 
                ${propsCode.join('\n').replace(/\"/g, '\'')}
            />
        )
    }
</Form.Item>`;
    }
}
