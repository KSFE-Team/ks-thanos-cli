import { BasicComponent } from './basicComponent';
import Debug from '../../utils/debugger';
import { ActionStructure, Action } from '../action/action';
import { BasciImport } from '../page/types';

const debug = Debug(__filename);

interface TableColumnConfig {
    title: string;
    dataIndex: string;
    actions?: ActionStructure[];
}

class TableColumn {
    actions: Action[] = [];
    config: TableColumnConfig;
    constructor(config: TableColumnConfig) {
        const { actions, ...other } = config;
        this.config = other;
        if (actions) {
            actions.forEach((action) => {
                const actionInstance = new Action(action);
                this.actions.push(actionInstance);
            });
        }
    }

    getImports() {
        let imports: BasciImport[] = [];
        this.actions.forEach((action) => {
            imports = imports.concat(action.getImports());
        });
        return imports;
    }

    toCode() {
        let codes: string[] = [];
        Object.entries(this.config).forEach((keyValue) => {
            const [key, value] = keyValue;
            codes.push(`${key}: '${value}'`);
        });
        if (this.actions.length) {
            const actionCodes = this.actions.map((action) => action.toCode());
            codes.push(`render: (text) => {
                return (
                    <div>
                        ${actionCodes}
                    </div>
                );
            }`);
        }
        return `{
            ${codes.join(',\n')}
        }`;
    }
}

export class TableComponent extends BasicComponent {

    columns: TableColumn[] = [];
    props: {
        [name: string]: any;
    } = {
        rowKey: 'id'
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
            this.columns = columnsData.map((columnData) => new TableColumn(columnData));
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