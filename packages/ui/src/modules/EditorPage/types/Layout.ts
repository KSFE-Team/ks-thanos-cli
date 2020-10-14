import Interactive from './Interactive';
import { GROUP_TYPE_DICT } from './constants';

export default abstract class Layout extends Interactive {
    groupType: string = GROUP_TYPE_DICT.LAYOUT;
}
