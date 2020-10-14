import Basic from './Basic';

export default abstract class Interactive extends Basic {
    /**
     * 拖拽事件
     */
    dnd(): void;

    /**
     * 删除事件
     */
    remove(): void;

    /**
     * 排序事件
     */
    sort(): void;

    /**
     * 选中事件
     */
    active(): void;
}
