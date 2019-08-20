"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const basicComponent_1 = require("../basicComponent");
const debugger_1 = __importDefault(require("../../../utils/debugger"));
const tableColumn_1 = require("./tableColumn");
const request_1 = require("../../request");
const connect_1 = require("../../decorator/connect");
const debug = debugger_1.default(__filename);
class TableComponent extends basicComponent_1.BasicComponent {
    constructor(page, config) {
        super(page, config);
        this.columns = [];
        this.props = {
            rowKey: `'id'`
        };
        this.dataDependencies = new request_1.DataDependence(this.stateName, page.model, config.dependencies);
    }
    initProps() {
        const { pageName } = this.page;
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
        if (!pageModel.getEffect(this.dataDependencies.effect.name)) {
            pageModel.addEffect(this.dataDependencies.effect);
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
        const dataDependenciesEffect = this.dataDependencies.effect;
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
        this.page.addDidMountStep(`this.${this.dataDependencies.effect.name}();`);
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
                `${this.stateName}ListLoading: loading.effects['${pageName}/${this.dataDependencies.effect.name}']`
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
        let finalValue;
        if (key === 'columns') {
            const columnsData = value;
            this.columns = columnsData.map((columnData) => new tableColumn_1.TableColumn(this.page, columnData));
            const columnsCode = this.columns.map((column) => column.toCode());
            finalValue = `[
                ${columnsCode.join(',\n')}
            ]`;
        }
        else {
            finalValue = `${value}`;
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
exports.TableComponent = TableComponent;
//# sourceMappingURL=index.js.map