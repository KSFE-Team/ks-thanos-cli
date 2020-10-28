import { handlePageJson } from 'Src/modules/EditorPage/utils'

export const STATE = {
    selectedId: '',
    pageJson: {
        pageName: '',
        components: [
            {
                componentName: 'Form',
                source: 'antd',
                default: false,
                props: {},
                id: 'wl1cuuzftp',
                components: [
                    {
                        id: 'kqzwrhm1nrp',
                        componentName: 'Input',
                        source: 'antd',
                        default: false,
                        props: {},
                    },
                    {
                        id: 'kqzwrhho4nq7bxgk91nrp',
                        componentName: 'Input',
                        source: 'antd',
                        default: false,
                        props: {},
                    },
                ],
            },
        ],
    },
};

export default {
    namespace: 'page',
    initialState: STATE,
    reducers: {
        handlePageJson(state: any, { payload }: any) {
            console.log('state====>', {...state});
            console.log('payload=====>', payload);
        }
    }
};
