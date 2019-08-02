import Debug from '../../utils/debugger';
import { upperFirst } from '../../utils/upperFirst';
import { Import } from '../page/types';

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

export class ComponentInjection {
    name = ''
    source: componentSourceType = 'antd'
    default = false
    components: ComponentInjection[] = []
    props: {
        [name: string]: any;
    } = {}
    className = ''

    constructor(config: ComponentStructure) {
        const { name, source, default: defaultImport, components = [], props = {} } = config;

        this.name = name;
        this.className = upperFirst(name);
        this.source = source;
        this.default = defaultImport;
        this.components = components.map((component) => new ComponentInjection(component));
        this.props = props;
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

    toCode() {
        const propsCode = [];
        for (let propKey in this.props) {
            const propValue = this.props[propKey];
            const propValueStr = JSON.stringify(propValue);
            debug(`Component propKey ———— ${propKey}: ${propValueStr}`);
            propsCode.push(
                `${propKey}={${propValueStr}}`
            );
        }
        return `<${this.className} ${propsCode.join(' ')}/>`;
    }
}