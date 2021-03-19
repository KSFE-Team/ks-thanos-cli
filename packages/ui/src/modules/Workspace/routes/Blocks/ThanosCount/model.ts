import request from 'Src/utils/requestExtend';
import { API } from 'Src/api';
import { actions } from 'kredux';
import { message } from 'antd';

export const STATE = {
    searchForm: {
        page: 1,
        limit: 10,
        total: 0,
    },
    list: [],
};

export default {
    namespace: 'thanoslog',
    initialState: { ...STATE },
    effects: {
        createLog: async (payload: any) => {
            try {
                const response = await request(API.thanosLog.create, {
                    method: 'post',
                    body: payload,
                });
                if (response && response.errcode === 0) {
                    // message.success('log创建成功');
                }
            } catch (err) {
                message.error(err);
            }
        },
        getLogList: async (payload: any, getState: any) => {
            try {
                const state = getState().thanoslog.searchForm;

                const postData = {
                    count: state.limit,
                    page: state.page,
                };
                const response = await request(API.thanosLog.get, {
                    method: 'post',
                    body: postData,
                });

                if (response && response.errcode === 0) {
                    actions.thanoslog.setReducers({
                        searchForm: {
                            ...state,
                            total: response.result.total,
                        },
                        list: response.result.list,
                    });
                }
            } catch (err) {
                message.error(err);
            }
        },
        updateLog: async (payload: any) => {
            try {
                const response = await request(API.thanosLog.update, {
                    method: 'post',
                    body: payload,
                });
                if (response && response.errcode === 0) {
                    actions.thanoslog.getLogList();
                }
            } catch (err) {
                message.error(err);
            }
        },
    },
};
