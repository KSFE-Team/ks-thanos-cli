"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../basic/index");
const form_1 = require("Src/factories/decorator/form");
const manager_1 = require("Src/factories/model/effect/manager");
const debugger_1 = __importDefault(require("Src/utils/debugger"));
const debug = debugger_1.default(__filename);
class SearchForm extends index_1.Component {
    constructor(page, config) {
        super(page, config);
        this.toFormItemCode = (item) => {
            return `<Col span={3}>
            <Form.Item className='mar-b-0'>
                {
                    this.props.form.getFieldDecorator('${item.config.key}')(
                        ${item.toCode()}
                    )
                }
            </Form.Item>
        </Col>`;
        };
        this.page = page;
        const activeEvents = config.activeEvents || [];
        activeEvents.forEach((activeEvent) => {
            const activeEventType = activeEvent.eventType;
            debug(`NormalForm activeEvent: ${JSON.stringify(activeEvent)}`);
            if (activeEventType === 'request') {
                debug('生成 listEffect');
                let dependencies = activeEvent.dependencies;
                if (config.relationId) {
                    const relationComponent = this.page.pageComponents.find((component) => `${component.id}` === `${config.relationId}`);
                    if (relationComponent) {
                        dependencies = {
                            ...dependencies,
                            showSelectedRows: relationComponent.showSelectedRows
                        };
                    }
                }
                this.listEffect = manager_1.EffectManager.create(this.stateName, this.page.model, dependencies);
            }
        });
        if (!this.listEffect) {
            debug('SearchForm 缺少 listEffect');
        }
    }
    getImports() {
        let imports = super.getImports();
        imports = imports.concat([
            {
                source: 'antd',
                name: 'Button',
                defaultImport: false
            },
            {
                source: 'ks-cms-utils',
                name: 'goto',
                defaultImport: false
            },
            {
                source: 'antd',
                name: 'Row',
                defaultImport: false
            },
            {
                source: 'antd',
                name: 'Col',
                defaultImport: false
            },
        ]);
        return imports;
    }
    initEffects() {
        const pageModel = this.page.model;
        if (this.listEffect) {
            if (!pageModel.getEffect(this.listEffect.name)) {
                pageModel.addEffect(this.listEffect);
            }
        }
    }
    initPageMethods() {
        const page = this.page;
        if (this.listEffect) {
            const pageModel = page.model;
            page.addMethod(`
                ${this.stateName}Reset() {
                    actions.${pageModel.namespace}.setReducers({
                        ${this.stateName}: {
                            ...this.props.${pageModel.namespace}.${this.stateName},
                            page: 1
                        }
                    });
                    this.${this.listEffect.name}();
                }
            `);
        }
    }
    initPageState() {
    }
    initPageDecorators() {
        const decoratorConfig = {
            name: 'Form.create',
            type: 'search',
            pageName: this.page.pageName,
            stateName: this.stateName,
            formItems: this.components.map((item) => item.config.key)
        };
        const decorator = new form_1.FormDecorator(decoratorConfig);
        this.page.addDecorator(decorator);
    }
    initPageTitle() {
    }
    initPageLifecycle() {
    }
    toCode() {
        return `<Form>
            <Row>
                <Col
                    span={2}
                    className='line-h-40'
                >
                    ${this.page.pageChineseName || ''}
                </Col>
                ${this.components.map(this.toFormItemCode).join('\n')}
                <Col span={6}>
                    <Form.Item className='mar-b-0'>
                        <Button
                            onClick={() => {
                                this.Reset();
                            }}
                            className='mar-l-4'
                        >查询</Button>
                        <Button
                            className='mar-l-4'
                            type='primary'
                            onClick={() => {
                                goto.push('')
                            }}
                        >新增</Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>`;
    }
}
exports.SearchForm = SearchForm;
//# sourceMappingURL=searchForm.js.map