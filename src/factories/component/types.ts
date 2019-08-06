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
