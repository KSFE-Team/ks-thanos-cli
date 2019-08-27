import { Component, ComponentConfig } from '../basic';
import Debug from 'Src/utils/debugger';
import { TableColumn, TableColumnConfig } from './tableColumn';
import Page from 'Src/factories/page';
import { ConnectDecoratorConfig } from 'Src/factories/decorator/types';
import { ConnectDecorator } from 'Src/factories/decorator/connect';
import { ListEffect } from 'Src/factories/model/effect/listEffect';
import { EffectConfig } from 'Src/factories/model/effect';
import { EffectManager } from 'Src/factories/model/effect/manager';

const debug = Debug(__filename);

/**
 * table组件配置
 */
export interface TableComponentConfig extends ComponentConfig {
    dependencies: EffectConfig; // 数据依赖配置
}

/**
 * table组件
 */
export class Table extends Component {

    columns: TableColumn[] = [] // table中的column属性
    effect: ListEffect // table所使用的列表effect

    constructor(page: Page, config: TableComponentConfig) {
        super(page, config);
        this.effect = EffectManager.create(this.stateName, page.model, config.dependencies);
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

        const decoratorConfig: ConnectDecoratorConfig = {
            name: 'connect',
            stateName: this.stateName,
            pageName: this.page.pageName,
            inputProps: [
                pageName,
                'loading'
            ],
            process: [
            ],
            outputProps: [
                pageName,
                `${this.stateName}ListLoading: loading.effects['${pageName}/${this.effect.name}']`
            ]
        };
        debug(`add decorators: ${JSON.stringify(decoratorConfig)}`);

        const decorator = new ConnectDecorator(decoratorConfig);
        this.page.addDecorator(decorator);
    }

    getImports() {
        let imports = super.getImports();

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
        return `<React.Fragment>
            <${this.componentName}
                ${propsCode.join('\n')}
            />
        </React.Fragment>`;
    }
}