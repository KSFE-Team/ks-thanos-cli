import request from 'Src/utils/requestExtend';
import { API } from 'Src/api';
import { actions } from 'kredux';
import { message } from 'antd';

export const STATE = {
    pageList: [],
    searchPageForm: {
        page: 1,
        limit: 12,
        totalPage: 0,
        total: 0,
        pageName: {
            value: '',
        }, // 模版名称
    },
    cuPageModalVisible: false,
} as any;
export default {
    namespace: 'existingPage',
    initialState: { ...STATE },
    effects: {
        async getPageList(payload: any, getState: any) {
            const searchForm = getState().existingPage.searchPageForm;
            const postData = {
                page: searchForm.page,
                limit: searchForm.limit,
                pageName: searchForm.pageName.value,
            };
            const response = await request(API.page.query, {
                method: 'GET',
                body: postData,
            });
            if (response && !response.errcode) {
                const { result } = response;
                actions.existingPage.setReducers({
                    pageList: result.list,
                    searchPageForm: {
                        ...searchForm,
                        totalPage: result.totalPage,
                        total: result.total,
                    },
                });
            }
        },
        async deletePageItem(payload: any) {
            const { pageName } = payload;
            const response = await request(API.page.delete, {
                method: 'POST',
                body: {
                    pageName,
                },
            });

            if (response && !response.errcode) {
                message.success(`删除页面${pageName}成功`);
                actions.existingPage.getPageList();
            }
        },
    },
};
