export const STATE = {
    pageJson: {
        pageName: '',
        components: [
            {
                componentName: 'Form',
                source: 'antd',
                default: false,
                stateName: 'searchForm',
                config: {
                    type: 'search',
                    key: '',
                    label: '',
                    saveApi: '',
                    updateApi: '',
                    getApi: '',
                    paramKey: '',
                },
                props: {},
                id: 'wl1cuuzftp',
                configVisible: false,
                components: [
                    {
                        id: 'kqzwrhm1nrp',
                        stateName: 'searchForm',
                        componentName: 'Input',
                        source: 'antd',
                        default: false,
                        config: {
                            key: 'name',
                            label: '支付方式名称',
                            isRequired: true,
                            defaultValue: '',
                        },
                        props: {
                            placeholder: '支付方式名称',
                        },
                        configVisible: false,
                        formType: 'search',
                    },
                    {
                        id: 'kqzwrhho4nq7bxgk91nrp',
                        stateName: 'searchForm',
                        componentName: 'Input',
                        source: 'antd',
                        default: false,
                        config: {
                            key: 'title',
                            label: '支付方式标题',
                            isRequired: true,
                            defaultValue: '',
                        },
                        props: {
                            placeholder: '支付方式标题',
                        },
                        configVisible: false,
                        formType: 'search',
                    },
                ],
            },
        ],
    },
};

export default {
    namespace: 'page',
    initialState: STATE,
};
