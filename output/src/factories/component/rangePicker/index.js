"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basic_1 = require("Src/factories/component/basic");
class RangePicker extends basic_1.Component {
    constructor(page, config) {
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
        const propsKeyArr = this.config.props && Object.keys(this.config.props);
        const propsCode = propsKeyArr.map((item) => {
            let value = this.config.props[item];
            switch (item) {
                case 'placeholder':
                    return `${item}={[${value.map((e) => `'${e}'`).join(',')}]}`;
                case 'showTime':
                    return `${item}={${JSON.stringify(value)}}`;
                case 'format':
                    return `${item}='${value}'`;
            }
        });
        return `<Form.Item label='${this.config.label}'>
    {
        this.props.form.getFieldDecorator('${this.config.key}')(
            <DatePicker.RangePicker ${propsCode.join(' ').replace(/\"/g, '\'')}/>
        )
    }
</Form.Item>`;
    }
}
exports.RangePicker = RangePicker;
//# sourceMappingURL=index.js.map