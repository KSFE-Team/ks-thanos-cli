"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getPropValue_1 = require("Src/utils/getPropValue");
const index_1 = require("../formDelegate/index");
const manager_1 = require("Src/factories/model/effect/manager");
const value_1 = require("Src/factories/value");
const debugger_1 = __importDefault(require("Src/utils/debugger"));
const debug = debugger_1.default(__filename);
class NormalFormDelegate extends index_1.FormDelegate {
    constructor(form) {
        super(form);
        const activeEvents = form.config.activeEvents || [];
        activeEvents.forEach((activeEvent) => {
            const activeEventType = activeEvent.eventType;
            const actionType = activeEvent.dependencies.actionType;
            debug(`NormalForm activeEvent: ${JSON.stringify(activeEvent)}`);
            if (activeEventType === 'request') {
                const effect = manager_1.EffectManager.create(form.stateName, form.page.model, activeEvent.dependencies);
                switch (actionType) {
                    case 'get':
                        debug('生成 getEffect');
                        this.getEffect = effect;
                        break;
                    case 'save':
                        debug('生成 createEffect');
                        this.createEffect = effect;
                        break;
                    case 'update':
                        debug('生成 updateEffect');
                        this.updateEffect = effect;
                        break;
                }
            }
        });
        if (!this.createEffect || !this.updateEffect) {
            debug('NormalForm 缺少 createEffect 或 updateEffect');
        }
    }
    getImports() {
        let imports = [
            {
                source: 'Src/utils/constants',
                name: 'FORM_LAYOUT',
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
            {
                source: 'antd',
                name: 'Icon',
                defaultImport: false
            },
            {
                source: 'ks-cms-utils',
                name: 'goto',
                defaultImport: false
            }
        ];
        return imports;
    }
    initPageState() {
        const form = this.form;
        const pageModel = form.page.model;
        pageModel.addInitialState(form.stateName, '');
    }
    initEffects() {
        const pageModel = this.form.page.model;
        const effects = [this.getEffect, this.createEffect, this.updateEffect];
        effects.forEach((effect) => {
            if (!effect) {
                return;
            }
            if (!pageModel.getEffect(effect.name)) {
                pageModel.addEffect(effect);
            }
        });
    }
    initPageDecorators() {
        const form = this.form;
        if (this.createEffect && this.updateEffect) {
            form.page.updateConnectDecorator(['loading'], [
                new value_1.Value({
                    key: `requestLoading`,
                    value: `loading.effects['${form.page.pageName}/${this.createEffect.name}'] || loading.effects['${form.page.pageName}/${this.updateEffect.name}']`,
                    type: 'bool'
                })
            ]);
        }
    }
    initPageMethods() {
        const form = this.form;
        if (!this.createEffect || !this.updateEffect) {
            return;
        }
        const paramKey = this.form.config.paramKey || 'id';
        form.page.addMethod(`
            handleSubmit = () => {
                this.props.form.validateFieldsAndScroll({ force: true }, (err, fieldsValue) => {
                    if (err) {
                        return;
                    }
                    const { ${form.stateName} } = this.props.${form.page.pageName};
                    const postData = {
                        ...${form.stateName},
                        ...fieldsValue
                    };
                    const ${paramKey} = this.props.match.params.${paramKey};
                    if (${paramKey} >= 0) {
                        actions.${form.page.pageName}.${this.updateEffect.name}(postData);
                    } else {
                        actions.${form.page.pageName}.${this.createEffect.name}(postData);
                    }
                });
            }
        `);
    }
    initPageTitle() {
        const form = this.form;
        form.page.initPageTitleCode(`pageTitle={
                            <div>
                                <Row>
                                    <Col span={8} style={{ lineHeight: '32px' }}>
                                        ${form.page.pageChineseName}
                                    </Col>
                                    <Col span={16} style={{ textAlign: 'right' }}>
                                        <Button
                                            type='primary'
                                            className='mar-l-4'
                                            loading={ this.props.requestLoading }
                                            onClick={this.handleSubmit}
                                        ><Icon type="form" />保存</Button>
                                        <Button
                                            className='mar-l-4'
                                            onClick={() => {
                                                goto.go(-1);
                                            }}><Icon type="rollback" />返回</Button>
                                    </Col>
                                </Row>
                            </div>
                        }`);
    }
    initPageLifeCycle() {
        if (this.getEffect) {
            const { config, page } = this.form;
            const paramKey = config.paramKey || 'id';
            this.form.page.addDidMountStep(`if (this.props.match.params.${paramKey} > 0) {
                actions.${page.pageName}.${this.getEffect.name}({
                    ${paramKey}: this.props.match.params.${paramKey}
                });
            }`);
        }
    }
    toFormItemCode(item) {
        debug(`normalForm: toFormItemCode ---- ${item.componentName}`);
        const labelValue = getPropValue_1.getPropValue(item.config.label);
        if (item.componentName === 'Fragment') {
            return item.toCode();
        }
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
    toCode() {
        const form = this.form;
        const componentsCode = form.components.map(this.toFormItemCode);
        return `<Form>
        ${componentsCode.join('\n')}
    </Form>`;
    }
}
exports.NormalFormDelegate = NormalFormDelegate;
//# sourceMappingURL=index.js.map