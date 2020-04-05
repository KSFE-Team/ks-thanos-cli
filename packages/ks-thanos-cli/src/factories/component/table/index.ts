import { Component, ComponentConfig } from '../basic';
import Debug from 'Src/utils/debugger';
import { TableColumn, TableColumnConfig } from './tableColumn';
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
    props: any;
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
        this.effect = EffectManager.create(this.page.pageName, config.stateName, page.model, config.dependencies);
        this.config = config;
    }

    initProps() {
        const { showSelectedRows, showSelectedRowsType } = this.config;
        this.addProp('rowKey', `'id'`);
        this.addProp('dataSource', `${this.stateName}.list`);
        this.addProp('loading', `${this.effect.name}Loading`);
        this.addProp('pagination', `{
            current: ${this.stateName}.page,
            pageSize: ${this.stateName}.limit,
            total: ${this.stateName}.total,
            onChange: this.onPageChange
        }`);
        showSelectedRows && this.addProp('rowSelection', `{
            type: '${showSelectedRowsType}',
            selectedRowKeys: ${this.stateName}.selectedRowKeys,
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
        const { showSelectedRows } = this.config;

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
    }

    initPageLifecycle() {
        this.page.addDidMountStep(`this.${this.effect.name}();`);
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

    
    initRenderVariableDeclaration() {
        const { pageName } = this.page;
        const renderVariables = [
            {
                name: 'columns',
                source: 'this.state'
            },
            {
                name: pageName,
                source: `this.props`
            },
            {
                name: this.stateName,
                source: `this.props.${pageName}`
            },
            {
                name: `${this.effect.name}Loading`,
                source: 'this.props'
            }
        ];
        renderVariables.forEach((config) => {
            this.page.addRenderVariableDeclaration(config);
        });
    }

    initStateVariableDeclaration() {
        const columnsData = this.config.props.columns as TableColumnConfig[];
        this.columns = columnsData.map((columnData) => new TableColumn(this.page, columnData));
        const columnsCode = this.columns.map((column) => column.toCode()).join(',\n');   
        this.page.addStateVariableDeclaration({
            key: 'columns',
            value: `[${columnsCode}]`
        });
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
            // const columnsData = value as TableColumnConfig[];
            // this.columns = columnsData.map((columnData) => new TableColumn(this.page, columnData));
            // const columnsCode = this.columns.map((column) => column.toCode()).join(',\n');
            // finalValue = `[
            //     ${columnsCode}
            // ]`;
            finalValue = `columns`;
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
