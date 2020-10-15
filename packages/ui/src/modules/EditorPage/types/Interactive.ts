// eslint-disable-next-line import/no-cycle
import Basic from './Basic';

export default abstract class Interactive extends Basic {
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
