import { getUniqueID } from 'Src/utils';

class Page {
    instants: any;

    id: string;

    constructor(config: any) {
        this.id = config.id;
    }

    getInitJson = (): any => ({
        name: 'Page',
        id: this.id,
        pageName: '',
        components: [
            {
                name: 'Form',
                id: '23434',
                components: [
                    {
                        name: 'Input',
                        id: 'dnf3234',
                    },
                    {
                        name: 'Input',
                        id: 'dnf323444',
                    },
                    {
                        name: 'Input',
                        id: 'dnf32234',
                    },
                ],
            },
        ],
    });
}

export default new Page({
    id: getUniqueID(),
});
