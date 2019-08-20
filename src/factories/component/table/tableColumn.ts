import { Action, ActionConfig } from '../../action/action';
import Page from 'Src/factories/page';
import { Import } from 'Src/factories/page/types';
import { BaseElement } from 'Src/factories/component/baseElement';

export interface TableColumnConfig {
    title: string;
    dataIndex: string;
    actions?: ActionConfig[];
}

export class TableColumn extends BaseElement {
    actions: Action[] = [];
    config: TableColumnConfig;
    constructor(page: Page, config: TableColumnConfig) {
        super();
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
        let imports: Import[] = [];
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