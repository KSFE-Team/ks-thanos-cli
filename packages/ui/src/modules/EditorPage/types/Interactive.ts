// eslint-disable-next-line import/no-cycle
import Basic from './Basic';

export interface ComponentConfig {
    componentName: string; // 组件名称
    componentPreviewIng: string; // 组件预览图
    components: ComponentConfig[]; // 子组件
    props?: {
        [name: string]: any;
    }; // 组件需要注入的父属性
}

export default abstract class Interactive extends Basic {
    /**
     * 拖拽前
     */
    abstract beforeDrag(): void;

    /**
     * 拖拽开始
     */
    abstract onDragStart(): void;

    /**
     * 拖拽中
     */
    abstract onDragging(): void;

    /**
     * 拖拽结束
     */
    abstract onDragEnd(): void;

    /**
     * 放入后
     */
    abstract afterDrop(): void;

    // 检查是否可以放入
    abstract checkIsCanDrop(): void;

    /**
     * 删除事件
     */
    abstract remove(): void;

    /**
     * 排序事件
     */
    abstract sort(): void;

    /**
     * 选中事件
     */
    abstract active(): void;
}
