import Page from 'Src/factories/page';
import { BasicContainer } from 'Src/factories/basicElement';
import { Component, ComponentConfig } from 'Src/factories/component/basic';
import { ComponentManager } from '../manager';
import { COLUMN_TYPE } from './constants';

const [{key: NORMAL}, {key: TIME}, {key: MONEY}] = COLUMN_TYPE;

export interface TableColumnConfig {
    title: string; // 标题
    dataIndex: string; // dataIndex
    component?: ComponentConfig; // 渲染组件
    dataType?: string;
}

export class TableColumn extends BasicContainer implements TableColumnConfig {
    page: Page // 所属页面对象
    config: TableColumnConfig // column配置
    title: string // 标题
    dataIndex: string // dataIndex
    dataType: string // columns展示类型
    component: Component | undefined // 需要渲染的组件

    constructor(page: Page, config: TableColumnConfig) {
        super();
        this.page = page;
        this.config = config;
        this.title = config.title;
        this.dataIndex = config.dataIndex;
        this.dataType = config.dataType || NORMAL;

        if (config.component) {
            ComponentManager.add(this, config.component);
        }
    }

    addComponent(component: Component) {
        this.component = component;
    }

    getImports() {
        let imports: any[] = [];
        switch (this.dataType) {
            case TIME:
                imports = [
                    ...imports,
                    {
                        source: 'Src/utils',
                        name: 'formatDateTime',
                        defaultImport: false
                    }
                ];
                break;
            case MONEY:
                imports = [
                    ...imports,
                    {
                        source: 'ks-cms-utils',
                        name: 'formatMoney',
                        defaultImport: false
                    }
                ];
                break;
            case NORMAL:
            default:
                if (this.component) {
                    imports = [
                        ...imports,
                        this.component.getImports()
                    ];
                }
        }
        return imports;
    }

    toCode() {
        let codes: string[] = [];
        const { component, ...otherConfig } = this.config;
        Object.entries(otherConfig).forEach((keyValue) => {
            const [key, value] = keyValue;
            if (key === 'width') {
                if (value) {
                    codes.push(`${key}: ${value}`);
                }
                return;
            }
            if (key === 'dataType') {
                return;
            }
            codes.push(`${key}: '${value}'`);
        });
        switch (this.dataType) {
            case TIME:
                codes.push(`render: (time) => time && formatDateTime(time)`);
                break;
            case MONEY:
                codes.push(`render: (text) => text && formatMoney(text)`);
                break;
            case NORMAL:
                break;
        }
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
