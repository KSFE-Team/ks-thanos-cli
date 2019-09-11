import Page from 'Src/factories/page';
import { BasicContainer } from 'Src/factories/basicElement';
import { Component, ComponentConfig } from 'Src/factories/component/basic';
import { ComponentManager } from '../manager';

export interface TableColumnConfig {
    title: string; // 标题
    dataIndex: string; // dataIndex
    component?: ComponentConfig; // 渲染组件
}

export class TableColumn extends BasicContainer implements TableColumnConfig {
    page: Page // 所属页面对象
    config: TableColumnConfig // column配置
    title: string // 标题
    dataIndex: string // dataIndex
    component: Component | undefined // 需要渲染的组件

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
