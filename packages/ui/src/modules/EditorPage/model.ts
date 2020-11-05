import request from 'Src/utils/requestExtend';
import { API } from 'Src/api';
import { message } from 'antd';
import { goto } from 'Src/utils';

export const STATE = {
    selectedId: '',
    pageJson: {
        pageName: '',
        paramKey: '',
        components: [
            {
                componentName: 'Form',
                source: 'antd',
                default: false,
                props: {},
                id: 'wl1cuuzftp',
                components: [
                    // {
                    //     id: 'kqzwrhm1nrp',
                    //     componentName: 'Input',
                    //     source: 'antd',
                    //     default: false,
                    //     props: {},
                    // },
                    {
                        id: 'kqzwrhm1nr323p',
                        componentName: 'InputNumber',
                        source: 'antd',
                        default: false,
                        props: {},
                    },
                    // {
                    //     id: 'kqzwrhho4nq7bxgk91nrp',
                    //     componentName: 'Input',
                    //     source: 'antd',
                    //     default: false,
                    //     props: {},
                    // },
                ],
            },
        ],
    },
};

export default {
    namespace: 'page',
    initialState: STATE,
    effects: {
        save: async (payload: any) => {
            try {
                const response = await request(API.page.addOrUpdate, {
                    method: 'post',
                    body: payload,
                });
                if (response && response.code === 0) {
                    message.success('创建页面成功');
                    goto.go(-1);
                }
            } catch (err) {
                message.error(err);
            }
        },
    },
};
