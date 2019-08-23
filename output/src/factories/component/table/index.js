"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const basic_1 = require("../basic");
const debugger_1 = __importDefault(require("Src/utils/debugger"));
const tableColumn_1 = require("./tableColumn");
const connect_1 = require("Src/factories/decorator/connect");
const manager_1 = require("Src/factories/model/effect/manager");
const debug = debugger_1.default(__filename);
class Table extends basic_1.Component {
    constructor(page, config) {
        super(page, config);
        this.columns = [];
        this.effect = manager_1.EffectManager.create(this.stateName, page.model, config.dependencies);
    }
    initProps() {
        const { pageName } = this.page;
        this.addProp('rowKey', `'id'`);
        this.addProp('dataSource', `this.props.${pageName}.${this.stateName}.list`);
        this.addProp('loading', `this.props.${pageName}.${this.stateName}ListLoading`);
        this.addProp('pagination', `{
            current: this.props.${pageName}.${this.stateName}.page,
            pageSize: this.props.${pageName}.${this.stateName}.limit,
            total: this.props.${pageName}.${this.stateName}.total,
            onChange: this.onPageChange
        }`);
    }
    initEffects() {
        const pageModel = this.page.model;
        if (!pageModel.getEffect(this.effect.name)) {
            pageModel.addEffect(this.effect);
        }
    }
    initPageState() {
        const pageModel = this.page.model;
        pageModel.addInitialState(this.stateName, 'list', '[]');
        pageModel.addInitialState(this.stateName, 'page', '1');
        pageModel.addInitialState(this.stateName, 'limit', '10');
        pageModel.addInitialState(this.stateName, 'total', '0');
    }
    initPageMethods() {
        const dataDependenciesEffect = this.effect;
        const { pageName } = this.page;
        this.page.addMethod(`
            ${dataDependenciesEffect.name}() {
                actions.${pageName}.${dataDependenciesEffect.name}();
            }
        `);
        this.page.addMethod(`
            onPageChange(page, pageSize) {
                actions.${pageName}.setReducers({
                    ${this.stateName}: {
                        ...this.props.${pageName}.${this.stateName},
                        page,
                        limit: pageSize
                    }
                });
                this.${dataDependenciesEffect.name}();
            }
        `);
    }
    initPageLifecycle() {
        this.page.addDidMountStep(`this.${this.effect.name}();`);
    }
    initPageDecorators() {
        const { pageName } = this.page;
        const decoratorConfig = {
            name: 'connect',
            stateName: this.stateName,
            pageName: this.page.pageName,
            inputProps: [
                pageName,
                'loading'
            ],
            process: [],
            outputProps: [
                pageName,
                `${this.stateName}ListLoading: loading.effects['${pageName}/${this.effect.name}']`
            ]
        };
        debug(`add decorators: ${JSON.stringify(decoratorConfig)}`);
        const decorator = new connect_1.ConnectDecorator(decoratorConfig);
        this.page.addDecorator(decorator);
    }
    getImports() {
        let imports = super.getImports();
        this.columns.forEach((column) => {
            imports = imports.concat(column.getImports());
        });
        return imports;
    }
    addProp(key, value) {
        let finalValue = `${value}`;
        if (key === 'columns') {
            const columnsData = value;
            this.columns = columnsData.map((columnData) => new tableColumn_1.TableColumn(this.page, columnData));
            const columnsCode = this.columns.map((column) => column.toCode()).join(',\n');
            finalValue = `[
                ${columnsCode}
            ]`;
        }
        super.addProp(key, finalValue);
    }
    toCode() {
        const propsCode = [];
        for (let propKey in this.props) {
            const propValue = this.props[propKey];
            debug(`propKey: ${propKey}`);
            debug(`propValue: ${propValue}`);
            propsCode.push(`${propKey}={${propValue}}`);
        }
        return `<React.Fragment>
            <${this.componentName}
                ${propsCode.join('\n')}
            />
        </React.Fragment>`;
    }
}
exports.Table = Table;
//# sourceMappingURL=index.js.map