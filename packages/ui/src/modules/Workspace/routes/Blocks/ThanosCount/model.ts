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
        /** 执行 git diff */
        gitDiff: async (payload: any, getState: any) => {
            const { codeInitCount, record, newCommitId, oldCommitId, pagePath, projectName } = payload;
            const response: any = await request(API.thanosLog.gitDiff, {
                method: 'post',
                body: {
                    newCommitId,
                    oldCommitId,
                    pagePath,
                    projectName,
                },
                mode: 'no-cors',
            });
            if (response && response.code === 0) {
                const { add, codeDeleteCount } = response.data;
                const codeOnlineCount = codeInitCount + add - codeDeleteCount;
                const effectiveRate = `${(((codeInitCount - codeDeleteCount) / codeOnlineCount) * 100).toFixed(2)}`;
                const params = {
                    codeInitCount,
                    effectiveRate,
                    codeOnlineCount,
                    codeDeleteCount,
                };
                const postData = {
                    // eslint-disable-next-line no-underscore-dangle
                    id: record._id,
                    postData: params,
                };
                actions.thanoslog.updateLog(postData);
            }
        },
    },
};
