import Page from 'Src/factories/page';
import { BasicContainer } from 'Src/factories/basicElement';
import { addComponent } from 'Src/utils/addComponent';
import { Component, ComponentConfig } from 'Src/factories/component/basic';

export interface TableColumnConfig {
    title: string;
    dataIndex: string;
    component?: ComponentConfig;
}

export class TableColumn extends BasicContainer implements TableColumnConfig {
    page: Page
    config: TableColumnConfig
    title: string
    dataIndex: string
    component: Component | undefined

    constructor(page: Page, config: TableColumnConfig) {
        super();
        this.page = page;
        this.config = config;
        this.title = config.title;
        this.dataIndex = config.dataIndex;

        if (config.component) {
            addComponent(this, config.component);
        }
    }

    addComponent(component: Component) {
        this.component = component;
    }

    getImports() {
        if (this.component) {
            return this.component.getImports();
        }
        return [];
    }

    toCode() {
        let codes: string[] = [];
        Object.entries(this.config).forEach((keyValue) => {
            const [key, value] = keyValue;
            codes.push(`${key}: '${value}'`);
        });
        if (this.component) {
            codes.push(`render: (text) => {
                return (
                    <div>
                        ${this.component.toCode()}
                    </div>
                );
            }`);
        }
        return `{
            ${codes.join(',\n')}
        }`;
    }
}