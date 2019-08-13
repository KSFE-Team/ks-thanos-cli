import { BasicComponent } from '../basicComponent';
import Debug from '../../../utils/debugger';
import { TableColumn, TableColumnConfig } from './tableColumn';
import Page from '../../page/page';
import { TableComponentConfig } from '../types';
import { DataDependence } from '../../request';
import { ConnectDecoratorConfig } from '../../decorator/types';
import { ConnectDecorator } from '../../decorator/connect';
import { SearchFormComponent } from './searchForm';

const debug = Debug(__filename);

export class TableComponent extends BasicComponent {

    columns: TableColumn[] = []
    props: {
        [name: string]: any;
    } = {
        rowKey: 'id'
    }

    searchForm: SearchFormComponent | undefined

    stateName: string = ''

    dataDependencies: DataDependence[] = []
    listDependence: DataDependence | undefined

    constructor(page: Page, config: TableComponentConfig) {
        super(page, config);
        this.dataDependencies = config.dependencies.map((item) => {
            const dataDependence = new DataDependence(item);
            if (item.responseType === 'list') {
                this.listDependence = dataDependence;
            }
            return dataDependence;
        });
        this.stateName = this.componentName;
        if (config.searchForm) {
            this.searchForm = new SearchFormComponent(page, {
                name: 'Form',
                source: 'antd',
                componentName: `${config.componentName}From`,
                components: [],
                default: false,
                formItems: config.searchForm
            }, this);
            this.searchForm.init();
        }
    }

    initProps() {
        const { pageName } = this.page;

        this.addProp('dataSource', `this.props.${pageName}.${this.stateName}.list`);
        this.addProp('loading', `this.props.${pageName}.${this.stateName}.loading`);
        this.addProp('pagination', `{
            current: this.props.${pageName}.${this.stateName}.page,
            pageSize: this.props.${pageName}.${this.stateName}.limit,
            total: this.props.${pageName}.${this.stateName}.total,
            onChange: this.onPageChange
        }`);
    }

    initEffects() {
        const className = this.componentUpperName;
        const stateName = this.componentName;
        const loadEffectName = `load${className}List`;
        const { pageName } = this.page;
        const queryApi = this.listDependence ? this.listDependence.api : '';
        this.page.model.addEffect(`
            async ${loadEffectName}(payload, getState) {
                try {
                    const tableState = getState().${pageName}.${stateName};

                    let postData = {
                        size: tableState.limit,
                        page: tableState.page,
                    };

                    const response = await call(request, \`${queryApi}?\${stringify(postData)}\`)

                    if (response && response.code === 200) {
                        actions.${pageName}.setReducer({
                            ${stateName}: {
                                ...tableState,
                                list: response.data.content,
                                page: response.data.pageNumber,
                                total: response.data.totalElements
                            }
                        });
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        `);
    }

    initPageMethods() {
        const className = this.componentUpperName;
        const loadEffectName = `load${className}List`;
        const { pageName } = this.page;

        this.page.addMethod(`
            ${loadEffectName}() {
                actions.${pageName}.${loadEffectName}();
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
                this.${loadEffectName}();
            }
        `);
    }

    initPageLifecycle() {
        const className = this.componentUpperName;
        const loadEffectName = `load${className}List`;
        this.page.addDidMountStep(`this.${loadEffectName}t();`);
    }

    initPageDecorators() {
        const className = this.componentUpperName;
        const { pageName } = this.page;
        const loadEffectName = `load${className}List`;

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
                `${this.stateName}ListLoading: loading.effects['${pageName}/${loadEffectName}']`
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
            ${this.searchForm && this.searchForm.toCode()}
            <${this.className}
                ${propsCode.join('\n')}
            />
        </Fragment>`;
    }
}