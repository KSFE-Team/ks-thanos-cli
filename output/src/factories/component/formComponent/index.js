"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../basicComponent/index");
const form_1 = require("../../decorator/form");
const index_2 = require("../../request/index");
class FormComponent extends index_1.BasicComponent {
    constructor(page, config) {
        super(page, config);
        this.config = config;
        const activeEvent = this.config.activeEvent;
        const activeEventType = activeEvent.eventType;
        if (activeEventType === 'api') {
            this.dataDependencies = new index_2.DataDependence(this.stateName, page.model, config.activeEvent.dependencies);
        }
    }
    getImports() {
        const imports = super.getImports();
        imports.push({
            source: 'antd',
            name: 'Row',
            defaultImport: false
        });
        imports.push({
            source: 'antd',
            name: 'Col',
            defaultImport: false
        });
        return imports;
    }
    initEffects() {
        const pageModel = this.page.model;
        if (this.dataDependencies) {
            if (!pageModel.getEffect(this.dataDependencies.effect.name)) {
                pageModel.addEffect(this.dataDependencies.effect);
            }
        }
    }
    initPageMethods() {
        if (this.dataDependencies && this.dataDependencies.responseType === 'list') {
            const pageModel = this.page.model;
            this.page.addMethod(`
                ${this.stateName}Reset() {
                    actions.${pageModel.namespace}.setReducers({
                        ${this.stateName}: {
                            ...this.props.${this.stateName},
                            page: 1
                        }
                    });
                    this.${this.dataDependencies.effect.name}();
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
exports.FormComponent = FormComponent;
//# sourceMappingURL=index.js.map