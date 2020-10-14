import Basic from './Basic';
import { GROUP_TYPE_DICT } from './constants';

export default abstract class Page extends Basic {
    groupType: string = GROUP_TYPE_DICT.PAGE;

    components: any[] = [];
}
