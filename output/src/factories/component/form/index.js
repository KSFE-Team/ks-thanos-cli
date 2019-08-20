"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../basic/index");
const form_1 = require("Src/factories/decorator/form");
const listEffect_1 = require("Src/factories/model/effect/listEffect");
class Form extends index_1.Component {
    constructor(page, config) {
        super(page, config);
        this.config = config;
        const activeEvent = this.config.activeEvent;
        const activeEventType = activeEvent.eventType;
        if (activeEventType === 'api') {
            this.effect = new listEffect_1.ListEffect(this.stateName, page.model, config.activeEvent.dependencies);
        }
    }
    getImports() {
        let imports = super.getImports();
        imports = imports.concat([
            {
                source: 'antd',
                name: 'Row',
                defaultImport: false
            },
            {
                source: 'antd',
                name: 'Col',
                defaultImport: false
            }
        ]);
        return imports;
    }
    initEffects() {
        const pageModel = this.page.model;
        if (this.effect) {
            if (!pageModel.getEffect(this.effect.name)) {
                pageModel.addEffect(this.effect);
            }
        }
    }
    initPageMethods() {
        if (this.effect && this.effect.responseType === 'list') {
            const pageModel = this.page.model;
            this.page.addMethod(`
                ${this.stateName}Reset() {
                    actions.${pageModel.namespace}.setReducers({
                        ${this.stateName}: {
                            ...this.props.${pageModel.namespace}.${this.stateName},
                            page: 1
                        }
                    });
                    this.${this.effect.name}();
                }
            `);
        }
    }
    initPageDecorators() {
        const decoratorConfig = {
            name: 'Form.create',
            pageName: this.page.pageName,
            stateName: this.stateName,
            formItems: this.components.map((item) => item.config.key)
        };
        const decorator = new form_1.FormDecorator(decoratorConfig);
        this.page.addDecorator(decorator);
    }
    toCode() {
        const componentsCode = this.components.map((item) => `<Col span={3}>
            ${item.toCode()}
        </Col>`);
        return `<${this.componentName}>
            <Row>
                ${componentsCode}
            </Row>
        </${this.componentName}>`;
    }
}
exports.Form = Form;
//# sourceMappingURL=index.js.map