import Basic from '../../../types/Basic';

export default class Input extends Basic {
    groupType: string = 'component';

    components: any[] = [];

    path: number[] = [0];

    name: string = 'input';

    configProps: {
        [name: string]: any;
    } = {
        value: 'hahaha',
    };

    openConfig = () => {};

    validator = () => {
        return false;
    };

    toCode = () => {
        return '1';
    };
}
