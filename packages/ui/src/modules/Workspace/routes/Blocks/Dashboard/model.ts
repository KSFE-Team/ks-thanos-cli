import request from 'Src/utils/requestExtend';
import { API } from 'Src/api';
import { actions } from 'kredux';
import { message } from 'antd';
import moment from 'moment';

export const STATE = {
    info: {},
    list: [],
    pageList: [],
};

export default {
    namespace: 'dashboard',
    initialState: STATE,
    effects: {
        getInfo: async () => {
            try {
                const response = await request(API.dashboard.get, {
                    method: 'get',
                });
                if (response && response.errcode === 0) {
                    actions.dashboard.setReducers({
                        info: {
                            pageTotal: response.result.totalCount,
                        },
                        list: response.result.list,
                    });
                }
            } catch (err) {
                message.error(err);
            }
        },
        getPageActByTime: async (payload: { timeType: number }) => {
            try {
                const response = await request(API.dashboard.query, {
                    method: 'get',
                    body: payload,
                });
                if (response && response.errcode === 0) {
                    actions.dashboard.setReducers({
                        pageList: response.result.list.map((item: any) => ({
                            ...item,
                            time: moment(item.time).format('YYYY-MM-DD'),
                        })),
                    });
                }
            } catch (err) {
                message.error(err);
            }
        },
    },
};
