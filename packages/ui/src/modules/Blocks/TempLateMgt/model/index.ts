import request from 'Src/utils/requestExtend';
import { API } from 'Src/api';
import { actions } from 'kredux';
import { message } from 'antd';

export const STATE = {
    templateList: [],
    searchTemplateForm: {
        page: 1,
        limit: 10,
        totalPage: 0,
        total: 0,
        templateName: {
            value: ''
        }, // 模版名称
        type: {
            value: ''
        },
    },
};
export default {
    namespace: 'myTemplate',
    initialState: { ...STATE },
    effects: {
        async getTemplateList(payload: any, getState: any) {
            const searchForm = getState().myTemplate.searchTemplateForm;
            const postData = {
                page: searchForm.page,
                limit: searchForm.limit,
                type: payload && payload.type,
                templateName: searchForm.templateName.value
            };
            const response = await request(API.template.query, {
                method: 'GET',
                body: postData
            });
            if (response && !response.errcode) {
                const result = response.result;
                actions.myTemplate.setReducers({
                    templateList: result.list,
                    searchTemplateForm: {
                        ...searchForm,
                        totalPage: result.totalPage,
                        total: result.total
                    }
                });
            }
        },
        async deleteTemplateItem(payload: any) {
            const { templateName } = payload;
            const response = await request(API.template.delete, {
                method: 'POST',
                body: {
                    templateName
                }
            });

            if (response && !response.errcode) {
                message.success(`删除模板${templateName}成功`);
                actions.myTemplate.getTemplateList();
            }
        }
    }
};
