import { Import } from 'Src/factories/page/types';
import Debug from 'Src/utils/debugger';
import Page from 'Src/factories/page';
import { BaseElement } from '../baseElement/index';

const debug = Debug(__filename);

export interface ComponentConfig {
    componentName: string; // 组件名称
    stateName: string; // 组件使用state名称
    source: string; // 组件来源
    default: boolean; // 是否默认导出
    components: ComponentConfig[]; // 子组件
    props?: {
        [name: string]: any;
    }; // 组件需要注入的父属性
}

export abstract class Component extends BaseElement implements ComponentConfig {
    componentName = ''
    stateName = ''
    upperStateName = ''
    source = 'antd'
    default = false
    components: Component[] = []
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

    /**
     * 初始化页面状态
     */
    initPageState?(): void;

    /**
     * 初始化属性
     */
    initProps?(): void;

    /**
     * 初始化effect
     */
    initEffects?(): void;

    /**
     * 初始化页面方法
     */
    initPageMethods?(): void;

    /**
     * 初始化页面生命周期
     */
    initPageLifecycle?(): void;

    /**
     * 初始化页面decorator
     */
    initPageDecorators?(): void;

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
        this.props[key] = `${value}`;
    }

    getImports(): Import[] {
        let componentImports: Import[] = [{
            source: this.source,
            name: this.componentName,
            defaultImport: this.default
        }];
        for (let component of this.components) {
            componentImports = componentImports.concat(component.getImports());
        }
        return componentImports;
    }

    addComponent(component: Component) {
        this.components.push(component);
    }
}