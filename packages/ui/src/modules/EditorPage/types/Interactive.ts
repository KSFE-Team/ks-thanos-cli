import Basic from './Basic';

export default abstract class Interactive extends Basic {
    /**
     * 拖拽事件
     */
    abstract dnd(): void;

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
