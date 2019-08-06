import { upperFirst } from '../../utils/upperFirst';
import { BasciImport } from '../page/types';
import Debug from '../../utils/debugger';

const debug = Debug(__filename);

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

export abstract class Basic {
    abstract addComponent(component: BasicComponent): void;
    abstract toCode(): string
}

export abstract class BasicComponent extends Basic {
    name = ''
    source: componentSourceType = 'antd'
    default = false
    components: BasicComponent[] = []
    props: {
        [name: string]: any;
    } = {}
    className = ''
    config: ComponentStructure;

    constructor(config: ComponentStructure) {
        super();
        const { name, source, default: defaultImport } = config;

        this.config = config;
        this.name = name;
        this.className = upperFirst(name);
        this.source = source;
        this.default = defaultImport;
    }

    init() {
        const { props = {} } = this.config;
        for (let propKey in props) {
            this.addProps(propKey, props[propKey]);
        }
    }

    addProps(key: string, value: any) {
        debug(`add props: ${key}, ${JSON.stringify(value)}`);
        this.props[key] = value;
    }

    getImports(): BasciImport[] {
        let componentImports: BasciImport[] = [{
            source: this.source,
            name: this.className,
            defaultImport: this.default
        }];
        for (let component of this.components) {
            componentImports = componentImports.concat(component.getImports());
        }
        return componentImports;
    }

    addComponent(component: BasicComponent) {
        this.components.push(component);
    }
}