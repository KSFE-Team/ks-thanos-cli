"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const basic_1 = require("../../basic");
const debugger_1 = __importDefault(require("Src/utils/debugger"));
const tableColumn_1 = require("../../table/tableColumn");
const manager_1 = require("Src/factories/model/effect/manager");
const value_1 = require("Src/factories/value");
const debug = debugger_1.default(__filename);
class Table extends basic_1.Component {
    constructor(page, config) {
        super(page, config);
        this.columns = [];
        this.effect = manager_1.EffectManager.create(this.stateName, page.model, {
            ...config.dependencies,
            showSelectedRows: !!config.showSelectedRows
        });
        this.config = config;
    }
    initProps() {
        const { pageName } = this.page;
        const { showSelectedRows, showSelectedRowsType } = this.config;
        this.addProp('rowKey', `'id'`);
        this.addProp('dataSource', `this.props.${pageName}.${this.stateName}.list`);
        this.addProp('autoHeight', `{type: 'column'}`);
        this.addProp('loading', `this.props.${pageName}.${this.stateName}ListLoading`);
        this.addProp('pagination', `{
            current: this.props.${pageName}.${this.stateName}.page,
            pageSize: this.props.${pageName}.${this.stateName}.limit,
            total: this.props.${pageName}.${this.stateName}.total,
            onChange: this.onPageChange
        }`);
        showSelectedRows && this.addProp('rowSelection', `{
            type: '${showSelectedRowsType}',
            selectedRowKeys: this.props.${pageName}.${this.stateName}.selectedRowKeys,
            onChange: this.onChange.bind(this)
        }`);
    }
    initEffects() {
        const pageModel = this.page.model;
        if (!pageModel.getEffect(this.effect.name)) {
            pageModel.addEffect(this.effect);
        }
    }
    initPageState() {
        const { showSelectedRows } = this.config;
        const pageModel = this.page.model;
        pageModel.addInitialState(this.stateName, 'list', '[]');
        pageModel.addInitialState(this.stateName, 'page', '1');
        pageModel.addInitialState(this.stateName, 'limit', '10');
        pageModel.addInitialState(this.stateName, 'total', '0');
        showSelectedRows && pageModel.addInitialState(this.stateName, 'selectedRowKeys', '[]');
        showSelectedRows && pageModel.addInitialState(this.stateName, 'selectedRows', '[]');
    }
    initPageMethods() {
        const dataDependenciesEffect = this.effect;
        const { pageName } = this.page;
        const { showSelectedRows, tableType } = this.config;
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
        if (showSelectedRows) {
            this.page.addMethod(`onChange(selectedRowKeys, selectedRows) {
                actions.${pageName}.setReducers({
                    ${this.stateName}: {
                        ...this.props.${pageName}.${this.stateName},
                        selectedRowKeys: selectedRowKeys,
                        selectedRows: selectedRows
                    }
                });
            };`);
        }
        if (`${tableType}` === '3') {
            const tempStateName = this.config.parentTableStageName || this.stateName;
            this.page.addMethod(`componentDidUpdate(prevProps) {
                if (this.props.${pageName}.${tempStateName}.selectedRowKeys !== prevProps.${pageName}.${tempStateName}.selectedRowKeys) {
                    this.${dataDependenciesEffect.name}();
                }
            };`);
        }
    }
    initPageLifecycle() {
        const { tableType } = this.config;
        if (`${tableType}` !== '3') {
            this.page.addDidMountStep(`this.${this.effect.name}();`);
        }
    }
    initPageDecorators() {
        const { pageName } = this.page;
        this.page.updateConnectDecorator(['loading'], [
            new value_1.Value({
                key: `${this.effect.name}Loading`,
                value: `loading.effects['${pageName}/${this.effect.name}']`,
                type: 'bool'
            })
        ]);
    }
    getImports() {
        let imports = super.getImports();
        imports = imports
            .filter((item) => item.name !== 'Table')
            .concat([
            {
                source: 'kredux',
                name: 'actions',
                defaultImport: false
            },
            {
                source: 'ks-cms-ui',
                name: 'KSTable',
                defaultImport: false
            }
        ]);
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
        return `<KSTable
            ${propsCode.join('\n')}
        />`;
    }
}
exports.Table = Table;
//# sourceMappingURL=table.js.map