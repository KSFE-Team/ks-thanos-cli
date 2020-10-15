import Interactive from './Interactive';
import { GROUP_TYPE_DICT } from './constants';

export interface ComponentConfig {
    componentName: string; // 组件名称
    componentPreviewIng: string; // 组件预览图
    components: ComponentConfig[]; // 子组件
    props?: {
        [name: string]: any;
    }; // 组件需要注入的父属性
}

export default abstract class ComponentBase extends Interactive {
    groupType: string = GROUP_TYPE_DICT.COMPONENT;
}
