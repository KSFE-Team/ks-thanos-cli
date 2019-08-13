import { DataDependenceStructure } from '../request';

type componentSourceType = 'antd' | 'ks-cms-ui';

export abstract class Basic {
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
     * 添加子组件
     */
    abstract addComponent(component: Basic): void;

    /**
     * 生成代码
     */
    abstract toCode(): string;
}

export interface ComponentStructure {
    name: string; // 组件标签名称
    componentName: string; // 组件id名称
    source: componentSourceType; // 组件来源
    default: boolean; // 是否默认导出
    components: ComponentStructure[]; // 子组件
    props?: {
        [name: string]: any;
    }; // 组件需要注入的父属性
}

export interface TableComponentStructure extends ComponentStructure {
    dependencies: DataDependenceStructure[];
}