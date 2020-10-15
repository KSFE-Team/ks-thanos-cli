import Basic from '../../../types/Basic';
import { GROUP_TYPE_DICT } from '../../../types/constants';
import Input from '../Input';

export default class Page extends Basic {
    groupType: string = GROUP_TYPE_DICT.PAGE;

    name: string = 'page';

    components: any[] = [new Input()];

    configProps: {
        [name: string]: any;
    } = {
        title: 'caic',
    };

    openConfig = () => {};

    validator = () => {
        return false;
    };

    toCode = () => {
        return '1';
    };
}
