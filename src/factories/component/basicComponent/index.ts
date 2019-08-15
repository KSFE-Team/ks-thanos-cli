import { BasciImport } from '../../page/types';
import Debug from '../../../utils/debugger';
import Page from '../../page';
import { Basic, ComponentConfig } from '../types';

const debug = Debug(__filename);

type componentSourceType = 'antd' | 'ks-cms-ui';

export abstract class BasicComponent extends Basic {
    name = ''
    componentName = ''
    stateName = ''
    upperStateName = ''
    source: componentSourceType = 'antd'
    default = false
    components: BasicComponent[] = []
    props: {
        [name: string]: any;
    } = {}
    config: ComponentConfig

    page: Page

    constructor(
        page: Page,
        config: ComponentConfig,
    ) {
        super();
        
        this.page = page;

        const { componentName, stateName, source, default: defaultImport } = config;

        this.config = config;
        this.componentName = componentName;
        this.stateName = stateName;
        this.source = source;
        this.default = defaultImport;

        debug(`Component Create -> componentName: ${this.componentName}, stateName: ${this.stateName}, source: ${this.source}, default: ${this.default}`);
    }

    init() {
        const { props = {} } = this.config;
        for (let propKey in props) {
            this.addProp(propKey, props[propKey]);
        }
        this.initProps && this.initProps();
        this.initPageState && this.initPageState();
        this.initEffects && this.initEffects();
        this.initPageMethods && this.initPageMethods();
        this.initPageLifecycle && this.initPageLifecycle();
        this.initPageDecorators && this.initPageDecorators();
    }

    addProp(key: string, value: any) {
        debug(`add props: ${key}, ${JSON.stringify(value)}`);
        this.props[key] = value;
    }

    getImports(): BasciImport[] {
        let componentImports: BasciImport[] = [{
            source: this.source,
            name: this.componentName,
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