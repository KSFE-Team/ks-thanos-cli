import Interactive from './Interactive';
import { GROUP_TYPE_DICT } from './constants';

export default abstract class ComponentBase extends Interactive {
    groupType: string = GROUP_TYPE_DICT.COMPONENT;
}
