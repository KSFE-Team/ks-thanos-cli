"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getPropValue_1 = require("Src/utils/getPropValue");
const basic_1 = require("Src/factories/component/basic");
const debugger_1 = __importDefault(require("Src/utils/debugger"));
const debug = debugger_1.default(__filename);
class Fragment extends basic_1.Component {
    constructor(page, config) {
        super(page, config);
        this.components = [];
        this.componentName = 'Fragment';
        this.config = config;
    }
    getImports() {
        let imports = super.getImports();
        imports = imports.concat([
            {
                source: 'react',
                name: 'Fragment',
                defaultImport: false
            }
        ]);
        return imports;
    }
    initPageState() {
        const pageModel = this.page.model;
        pageModel.addInitialState(this.stateName, '');
    }
    toFormItemCode(item) {
        debug(`Fragment: toFormItemCode  ======  ${item.componentName}`);
        const labelValue = getPropValue_1.getPropValue(item.config.label);
        return `<Form.Item
                label={${labelValue}}
                { ...FORM_LAYOUT }
            >
            {
                this.props.form.getFieldDecorator('${item.config.key}', ${item.getDecoratorConfigCode()})(
                    ${item.toCode()}
                )
            }
        </Form.Item>`;
    }
    toCode(item) {
        const components = item ? item.components : this.components;
        const componentsCode = components.map((item) => {
            if (item.componentName === 'Fragment') {
                return this.toCode(item);
            }
            let formItemCode = this.toFormItemCode(item);
            return formItemCode;
        });
        const showKey = (item || this).config.showKey;
        const showValue = (item || this).config.showValue;
        return `
            {
                this.props.form.getFieldValue('${showKey}') === ${showValue} && <Fragment>
                    ${componentsCode.join('\n')}
                </Fragment>
            }
        `;
    }
}
exports.Fragment = Fragment;
//# sourceMappingURL=index.js.map