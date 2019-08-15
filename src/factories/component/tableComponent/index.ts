import { BasicComponent } from '../basicComponent';
import Debug from '../../../utils/debugger';
import { TableColumn, TableColumnConfig } from './tableColumn';
import Page from '../../page';
import { TableComponentConfig } from '../types';
import { DataDependence } from '../../request';
import { ConnectDecoratorConfig } from '../../decorator/types';
import { ConnectDecorator } from '../../decorator/connect';

const debug = Debug(__filename);

export class TableComponent extends BasicComponent {

    columns: TableColumn[] = []
    props: {
        [name: string]: any;
    } = {
        rowKey: 'id'
    }

    dataDependencies: DataDependence

    constructor(page: Page, config: TableComponentConfig) {
        super(page, config);
        this.dataDependencies = new DataDependence(this.stateName, page.model, config.dependencies);
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
                `${this.stateName}ListLoading: loading.effects['${pageName}/${this.dataDependencies.effect.name}']`
            ]
        };
        debug(`add decorators: ${JSON.stringify(decoratorConfig)}`);

        const decorator = new ConnectDecorator(decoratorConfig);
        this.page.addDecorator(decorator);
    }

    getImports() {
        let imports = super.getImports();
        this.columns.forEach((column) => {
            imports = imports.concat(column.getImports());
        });
        return imports;
    }

    addProp(key: string, value: any) {
        let finalValue: string;
        if (key === 'columns') {
            const columnsData = value as TableColumnConfig[];
            this.columns = columnsData.map((columnData) => new TableColumn(this.page, columnData));
            const columnsCode = this.columns.map((column) => column.toCode());
            finalValue = `[
                ${columnsCode.join(',\n')}
            ]`;
        } else {
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
            propsCode.push(
                `${propKey}={${propValue}}`
            );
        }
        return `<Fragment>
            <${this.componentName}
                ${propsCode.join('\n')}
            />
        </Fragment>`;
    }
}