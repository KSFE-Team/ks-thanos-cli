import Page from 'Src/factories/page';
import { BasicContainer } from 'Src/factories/basicElement';
import { Component, ComponentConfig } from 'Src/factories/component/basic';
import { ComponentManager } from '../manager';

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
            ComponentManager.add(this, config.component);
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
        const { component, ...otherConfig } = this.config;
        Object.entries(otherConfig).forEach((keyValue) => {
            const [key, value] = keyValue;
            codes.push(`${key}: '${value}'`);
        });
        if (this.component) {
            let recordCode = '';
            if (this.component.effect) {
                const effectParams = this.component.effect.params;
                recordCode = effectParams.filter((param) => !param.defaultValue).map((param) => param.name).join(',\n');
            }
            codes.push(`render: (text, ${recordCode ? `{ ${recordCode} }` : 'record'}) => {
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