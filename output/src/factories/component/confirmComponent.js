"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basicComponent_1 = require("./basicComponent");
class ConfirmComponent extends basicComponent_1.BasicComponent {
    constructor(config) {
        super(config);
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
        return `<${this.className} onClick={() => {
                Modal.confirm({
                    title: ${this.title},
                    okText: ${this.okText},
                    cancelText: ${this.cancelText}
                });
            }}>${this.buttonText}</${this.className}>`;
    }
}
exports.ConfirmComponent = ConfirmComponent;
//# sourceMappingURL=confirmComponent.js.map