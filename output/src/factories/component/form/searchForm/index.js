"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../formDelegate/index");
const manager_1 = require("Src/factories/model/effect/manager");
const debugger_1 = __importDefault(require("Src/utils/debugger"));
const debug = debugger_1.default(__filename);
class SearchFormDelegate extends index_1.FormDelegate {
    constructor(form) {
        super(form);
        const activeEvents = form.config.activeEvents || [];
        activeEvents.forEach((activeEvent) => {
            const activeEventType = activeEvent.eventType;
            debug(`NormalForm activeEvent: ${JSON.stringify(activeEvent)}`);
            if (activeEventType === 'request') {
                debug('生成 listEffect');
                this.listEffect = manager_1.EffectManager.create(form.stateName, form.page.model, activeEvent.dependencies);
            }
        });
        if (!this.listEffect) {
            debug('SearchForm 缺少 listEffect');
        }
    }
    getImports() {
        const imports = [{
                source: 'ks-cms-ui',
                name: 'KSSearchForm',
                defaultImport: false
            }, {
                source: 'ks-cms-utils',
                name: 'goto',
                defaultImport: false
            }];
        return imports;
    }
    initEffects() {
        const pageModel = this.form.page.model;
        if (this.listEffect) {
            if (!pageModel.getEffect(this.listEffect.name)) {
                pageModel.addEffect(this.listEffect);
            }
        }
    }
    initPageMethods() {
        const form = this.form;
        if (this.listEffect) {
            const pageModel = form.page.model;
            form.page.addMethod(`
                ${form.stateName}Reset() {
                    actions.${pageModel.namespace}.setReducers({
                        ${form.stateName}: {
                            ...this.props.${pageModel.namespace}.${form.stateName},
                            page: 1
                        }
                    });
                    this.${this.listEffect.name}();
                }
            `);
        }
    }
    toFormItemCode(item) {
        return `{
            key: '${item.config.key}',
            title: '${item.config.label}',
            component: ${item.toCode()}
        }`;
    }
    toCode() {
        const form = this.form;
        return `<Form>
            <KSSearchForm
                form={this.props.form}
                components={[
                    ${form.components.map(this.toFormItemCode).join(',\n')}
                ]}
                actions={<React.Fragment>
                    <Button
                        className="mar-l-4"
                        onClick={() => {
                            this.${form.stateName}Reset();
                        }}
                    >查询</Button>
                    <Button
                        type="primary"
                        className="mar-l-4"
                        onClick={() => {
                            // TODO: 跳转新增页面
                            goto.push('');
                        }}
                    >新增</Button>
                    </React.Fragment>}
            />
        </Form>`;
    }
}
exports.SearchFormDelegate = SearchFormDelegate;
//# sourceMappingURL=index.js.map