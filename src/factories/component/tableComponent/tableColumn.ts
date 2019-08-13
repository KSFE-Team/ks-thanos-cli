import { Action, ActionStructure } from '../../action/action';
import Page from '../../page/page';
import { BasciImport } from '../../page/types';

export interface TableColumnConfig {
    title: string;
    dataIndex: string;
    actions?: ActionStructure[];
}

export class TableColumn {
    actions: Action[] = [];
    config: TableColumnConfig;
    constructor(page: Page, config: TableColumnConfig) {
        const { actions, ...other } = config;
        this.config = other;
        if (actions) {
            actions.forEach((action) => {
                const actionInstance = new Action(page, action);
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