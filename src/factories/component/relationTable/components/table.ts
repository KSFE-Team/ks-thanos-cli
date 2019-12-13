import { Component, ComponentConfig } from '../../basic';
import Debug from 'Src/utils/debugger';
import { TableColumn, TableColumnConfig } from '../../table/tableColumn';
import Page from 'Src/factories/page';
import { ListEffect } from 'Src/factories/model/effect/listEffect';
import { EffectConfig } from 'Src/factories/model/effect';
import { EffectManager } from 'Src/factories/model/effect/manager';
import { Value } from 'Src/factories/value';

const debug = Debug(__filename);

/**
 * table组件配置
 */
export interface TableComponentConfig extends ComponentConfig {
    dependencies: EffectConfig; // 数据依赖配置
    showSelectedRows: string[] | number[]; // 是否展示选中
    showSelectedRowsType: string[] | number[]; // 是否展示选中
    tableType: number
}

/**
 * table组件
 */
export class Table extends Component {

    columns: TableColumn[] = [] // table中的column属性
    effect: ListEffect // table所使用的列表effect
    config: TableComponentConfig;

    constructor(page: Page, config: TableComponentConfig) {
        super(page, config);
        this.effect = EffectManager.create(this.stateName, page.model, config.dependencies);
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
            };`)
        }

        /* 如果为子列表则监听父列表selectRowKey */
        if (`${tableType}` === '3') {
            this.page.addMethod(`componentDidUpdate(prevProps) {
                if (this.props.${pageName}.${this.stateName}.selectedRowKeys !== prevProps.${pageName}.${this.stateName}.selectedRowKeys) {
                    this.${dataDependenciesEffect.name}();
                }
            };`)
        }
    }

    initPageLifecycle() {
        const { tableType } = this.config;
        /* 子列表默认不加载数据 */
        if (`${tableType}` !== '3') {
            this.page.addDidMountStep(`this.${this.effect.name}();`);
        }
    }

    initPageDecorators() {
        const { pageName } = this.page;
        this.page.updateConnectDecorator(
            ['loading'],
            [
                new Value({
                    key: `${this.effect.name}Loading`,
                    value: `loading.effects['${pageName}/${this.effect.name}']`,
                    type: 'bool'
                })
            ]
        );
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
        // 获取 column 中的依赖
        this.columns.forEach((column) => {
            imports = imports.concat(column.getImports());
        });
        return imports;
    }

    addProp(key: string, value: any) {
        let finalValue = `${value}`;
        if (key === 'columns') {
            const columnsData = value as TableColumnConfig[];
            this.columns = columnsData.map((columnData) => new TableColumn(this.page, columnData));
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
            propsCode.push(
                `${propKey}={${propValue}}`
            );
        }
        return `<KSTable
            ${propsCode.join('\n')}
        />`;
    }
}
