"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../basicComponent/index");
const formItem_1 = require("../formComponent/formItem");
const form_1 = require("../../decorator/form");
class SearchFormComponent extends index_1.BasicComponent {
    constructor(page, config, table) {
        super(page, config);
        this.formItmes = [];
        this.formItmes = config.formItems.map((item) => new formItem_1.FormItem(item));
        this.table = table;
        this.stateName = this.table.stateName;
        this.loadEffectName = `load${this.table.className}List`;
    }
    initPageMethods() {
        const pageName = this.page.pageName;
        this.page.addMethod(`
            ${this.stateName}Reset() {
                actions.${pageName}.setReducers({
                    ${this.stateName}: {
                        ...this.props.${this.stateName},
                        page: 1
                    }
                });
                this.${this.loadEffectName}();
            }
        `);
    }
    initPageDecorators() {
        const decoratorConfig = {
            name: 'Form.create',
            pageName: this.page.pageName,
            stateName: this.stateName,
            formItems: this.formItmes.map((item) => item.config.key)
        };
        const decorator = new form_1.FormDecorator(decoratorConfig);
        this.page.addDecorator(decorator);
    }
    toCode() {
        const formItemsCode = this.formItmes.map((item) => `<Col span={3}>
                ${item.toCode()}
            </Col>`);
        const colCount = formItemsCode.length;
        const stateName = this.table.componentName;
        return `<Form>
                    <Row>
                        ${formItemsCode} 
                        <Col span={${24 - colCount}}>
                            <Button
                                onClick={() => {
                                    this.${stateName}Reset();
                                }}
                            >查询</Button>
                        </Col>    
                    </Row>
                </Form>`;
    }
}
exports.SearchFormComponent = SearchFormComponent;
//# sourceMappingURL=searchForm.js.map