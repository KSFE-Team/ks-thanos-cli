import Basic from './Basic';
import { GROUP_TYPE_DICT } from './constants';

export interface ComponentConfig {
    componentName: string; // 组件名称
    componentPrevirwImg: string; // 组件预览图
    componentType: string; // 组件类型
}

export abstract class Page extends Basic implements ComponentConfig {
    groupType: string = GROUP_TYPE_DICT.PAGE;
}
