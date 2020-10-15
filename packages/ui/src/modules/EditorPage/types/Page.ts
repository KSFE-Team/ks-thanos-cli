// eslint-disable-next-line import/no-cycle
import Basic from './Basic';
import { GROUP_TYPE_DICT } from './constants';

export default abstract class Page extends Basic {
    groupType: string = GROUP_TYPE_DICT.PAGE;

    pageName: string = ''; // 页面名称

    components: any[] = []; // 页面中的子组件

    /**
     * 发布
     */
    abstract publish(): void;
}

export const getPage = () => Page;
