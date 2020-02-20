"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formItem_1 = require("Src/factories/component/formItem");
class DatePicker extends formItem_1.FormItem {
    constructor(page, config) {
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
        const propsKeyArr = this.config.props && Object.keys(this.config.props);
        const propsCode = (propsKeyArr || []).map((item) => {
            let value = this.config.props[item];
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
exports.DatePicker = DatePicker;
//# sourceMappingURL=index.js.map