import { BasicComponent } from '../basicComponent';
import Debug from '../../../utils/debugger';
import { TableColumn, TableColumnConfig } from './tableColumn';
import { ConnectDecorator } from '../../page/types';
import Page from '../../page/page';
import { TableComponentStructure } from '../types';
import { DataDependence } from '../../request';

const debug = Debug(__filename);

export class TableComponent extends BasicComponent {

    columns: TableColumn[] = []
    props: {
        [name: string]: any;
    } = {
        rowKey: 'id'
    }

    dataDependencies: DataDependence[] = []
    listDependence: DataDependence | undefined

    constructor(page: Page, config: TableComponentStructure) {
        super(page, config);
        this.dataDependencies = config.dependencies.map((item) => {
            const dataDependence = new DataDependence(item);
            if (item.responseType === 'list') {
                this.listDependence = dataDependence;
            }
            return dataDependence;
        });
    }

    initProps() {
        const { pageName } = this.page;
        const tableStateName = this.componentName;

        this.addProp('dataSource', `this.props.${pageName}.${tableStateName}.list`);
        this.addProp('loading', `this.props.${pageName}.${tableStateName}.loading`);
        this.addProp('pagination', `{
            current: this.props.${pageName}.${tableStateName}.page,
            pageSize: this.props.${pageName}.${tableStateName}.limit,
            total: this.props.${pageName}.${tableStateName}.total,
            onChange: this.onPageChange
        }`);
    }

    initEffects() {
        const className = this.componentUpperName;
        const tableStateName = this.componentName;
        const loadEffectName = `load${className}List`;
        const { pageName } = this.page;
        const queryApi = this.listDependence ? this.listDependence.api : '';
        this.page.model.addEffect(`
            async ${loadEffectName}(payload, getState) {
                try {
                    const tableState = getState().${pageName}.${tableStateName};

                    let postData = {
                        size: tableState.limit,
                        page: tableState.page,
                    };

                    const response = await call(request, \`${queryApi}?\${stringify(postData)}\`)

                    if (response && response.code === 200) {
                        actions.${pageName}.setReducer({
                            ${tableStateName}: {
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
        const tableStateName = this.componentName;
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
                    ${tableStateName}: {
                        ...this.props.${pageName}.${tableStateName},
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
        const tableStateName = this.componentName;
        const { pageName } = this.page;
        const loadEffectName = `load${className}List`;

        const decorator: ConnectDecorator = {
            name: 'connect',
            inputProps: [
                pageName,
                'loading'
            ],
            process: [
            ],
            outputProps: [
                pageName,
                `${tableStateName}ListLoading: loading.effects['${pageName}/${loadEffectName}']`
            ]
        };
        debug(`add decorators: ${JSON.stringify(decorator)}`);
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
        return `<${this.className}
            ${propsCode.join('\n')}
        />`;
    }
}