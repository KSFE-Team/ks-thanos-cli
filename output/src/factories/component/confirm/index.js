"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basic_1 = require("../basic");
class ConfirmComponent extends basic_1.Component {
    constructor(page, config) {
        super(page, config);
        this.buttonText = '';
        this.title = '';
        this.okText = '';
        this.cancelText = '';
        this.buttonText = config.buttonText;
        this.title = config.title;
        this.okText = config.okText || '确定';
        this.cancelText = config.cancelText || '取消';
    }
    getImports() {
        const imports = super.getImports();
        imports.push({
            name: 'Modal',
            source: 'antd',
            defaultImport: false
        });
        return imports;
    }
    toCode() {
        return `<${this.componentName}
                    onClick={() => {
                        Modal.confirm({
                            title: ${this.title},
                            okText: ${this.okText},
                            cancelText: ${this.cancelText}
                        });
                }}>${this.buttonText}</${this.componentName}>`;
    }
}
exports.ConfirmComponent = ConfirmComponent;
//# sourceMappingURL=index.js.map