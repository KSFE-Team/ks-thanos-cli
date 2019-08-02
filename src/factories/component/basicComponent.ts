import { upperFirst } from '../../utils/upperFirst';
import { TableComponent } from './tableComponent';
import { Import } from '../page/types';

type componentSourceType = 'antd' | 'ks-cms-ui';

export interface ComponentStructure {
    name: string; // 组件名称
    source: componentSourceType; // 组件来源
    default: boolean; // 是否默认导出
    components: ComponentStructure[]; // 子组件
    props?: {
        [name: string]: any;
    }; // 组件需要注入的父属性
}

export abstract class BasicComponent {
    name = ''
    source: componentSourceType = 'antd'
    default = false
    components: BasicComponent[] = []
    props: {
        [name: string]: any;
    } = {}
    className = ''

    constructor(config: ComponentStructure) {
        const { name, source, default: defaultImport } = config;

        this.name = name;
        this.className = upperFirst(name);
        this.source = source;
        this.default = defaultImport;
    }

    addProps(key: string, value: any) {
        this.props[key] = value;
    }

    getImports(): Import[] {
        let componentImports: Import[] = [{
            [this.source]: [{
                name: this.className,
                defaultImport: this.default
            }]
        }];
        for (let component of this.components) {
            componentImports.concat(component.getImports());
        }
        return componentImports;
    }

    addComponents(components: ComponentStructure[]) {
        components.forEach((component) => {
            switch (component.name) {
                case 'table':
                    this.components.push(new TableComponent(component));
                    break;
                default:
                    break;
            }
        });
    }

    abstract toCode(): string
}