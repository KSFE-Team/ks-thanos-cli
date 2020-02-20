"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formItem_1 = require("Src/factories/component/formItem");
class RangePicker extends formItem_1.FormItem {
    constructor(page, config) {
        super(page, config);
        this.componentName = 'RangePicker';
        this.parentComponentName = 'DatePicker';
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
        return `{}`;
    }
    toCode() {
        const propsKeyArr = this.config.props && Object.keys(this.config.props);
        const propsCode = propsKeyArr.map((item) => {
            let value = this.config.props[item];
            switch (item) {
                case 'placeholder':
                    return `${item}={[${Array.isArray(value) && value.map((e) => `'${e}'`).join(',')}]}`;
                case 'showTime':
                    return `${item}={${JSON.stringify(value)}}`;
                case 'format':
                    return `${item}='${value}'`;
            }
        });
        return `<DatePicker.RangePicker
        ${propsCode.join('\n').replace(/\"/g, '\'')}
    />`;
    }
}
exports.RangePicker = RangePicker;
//# sourceMappingURL=index.js.map