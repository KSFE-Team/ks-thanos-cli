import request from 'Src/utils/requestExtend';
import { API } from 'Src/api';
import { message, Modal } from 'antd';
import { goto } from 'Src/utils';

export const STATE = {
    selectedId: '',
    pageJson: {
        pageName: '',
        paramKey: '',
        components: [
            // {
            //     id: 'kqzwrhho4nq7bxgk91nrp',
            //     componentName: 'Select',
            //     source: 'antd',
            //     default: false,
            //     props: {},
            // },
            // {
            //     id: 'kqzwrhho4nq7bxgk91n22rp',
            //     componentName: 'Checkbox',
            //     source: 'antd',
            //     default: false,
            //     props: {},
            // },
            // {
            //     componentName: 'Form',
            //     source: 'antd',
            //     default: false,
            //     props: {},
            //     id: 'wl1cuuzftp',
            //     components: [
            //         {
            //             id: 'kqzwrhm1nrp',
            //             componentName: 'Input',
            //             source: 'antd',
            //             default: false,
            //             props: {},
            //         },
            //         {
            //             id: 'kqzwrhm1nr323p',
            //             componentName: 'Checkbox',
            //             source: 'antd',
            //             default: false,
            //             props: {},
            //         },s
            //         {
            //             id: 'kqzwrhho4nq7bxgk91nrp',
            //             componentName: 'Input',
            //             source: 'antd',
            //             default: false,
            //             props: {},
            //         },
            //     ],
            // },
        ],
    },
};

export default {
    namespace: 'page',
    initialState: STATE,
    effects: {
        save: async (payload: any) => {
            const { pageOrTemp, postDate } = payload;
            try {
                const response = await request(API[pageOrTemp].addOrUpdate, {
                    method: 'post',
                    body: {
                        ...postDate,
                    },
                });
                if (response && response.errcode === 0) {
                    const text = postDate.id ? '修改' : '新增';
                    if (pageOrTemp === 'template') {
                        message.success(`${text}模板配置成功`);
                        Modal.confirm({
                            title: '是否前往模板列表查看',
                            okText: '确定',
                            cancelText: '取消',
                            onOk: () => {
                                goto.go('/workspace/blocks/tempLateMgt');
                            },
                        });
                    } else {
                        message.success(`${text}页面配置成功`);
                        goto.go(-1);
                    }
                }
            } catch (err) {
                message.error(err);
            }
        },
    },
};
