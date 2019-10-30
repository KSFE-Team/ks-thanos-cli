import {Import} from 'Src/factories/page/types';
import Debug from 'Src/utils/debugger';
import Page from 'Src/factories/page';
import {Effect} from 'Src/factories/model/effect';
import {BasicContainer} from 'Src/factories/basicElement';

const debug = Debug(__filename);

export interface ComponentConfig {
    componentName: string; // 组件名称
    parentComponentName: string; // 父组件名称
    stateName: string; // 组件使用state名称
    source: string; // 组件来源
    default: boolean; // 是否默认导出
    components: ComponentConfig[]; // 子组件
    props?: {
        [name: string]: any;
    }; // 组件需要注入的父属性
}

export abstract class Component extends BasicContainer implements ComponentConfig {
    componentName = ''; // 组件名称
    parentComponentName = ''; // 父组件名称
    stateName = ''; // 组件所使用的状态名称
    upperStateName = ''; // 组件所使用的状态名称（首字母大写）
    source = 'antd'; // 组件导入来源
    default = false; // 组件是否默认导入
    components: Component[] = []; // 子组件
    props: { // 组件props
        [name: string]: any;
    } = {};
    config: ComponentConfig;// 组件配置

    page: Page; // 组件所属页面
    effect: Effect | undefined; // 组件所用的effect

    constructor(page: Page, // 页面
        config: ComponentConfig, // 组件配置
    ) {
        super();

        this.page = page;

        const {componentName, stateName, source, default: defaultImport, parentComponentName} = config;

        this.config = config;
        this.componentName = componentName;
        this.parentComponentName = parentComponentName;
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

    /**
     * 组件初始化
     */
    init() {
        const {props = {}} = this.config;
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

    /**
     * 添加组件prop
     */
    addProp(key: string, value: any) {
        debug(`add props: ${key}, ${JSON.stringify(value)}`);
        this.props[key] = `${value}`;
    }

    /**
     * 获取组件所需导入的依赖
     */
    getImports(): Import[] {
        let componentImports: Import[] = this.source ? [{
            source: this.source,
            name: this.parentComponentName || this.componentName,
            defaultImport: this.default
        }] : [];
        for (let component of this.components) {
            componentImports = componentImports.concat(component.getImports());
        }
        return componentImports;
    }

    /**
     * 添加子组件
     */
    addComponent(component: Component) {
        this.components.push(component);
    }
}
