import request from 'Src/utils/requestExtend';
import { API } from 'Src/api';
import { actions } from 'kredux';
import { message } from 'antd';
import moment from 'moment';

export const STATE = {
    info: {},
    list: [],
    pageList: [],
    projectList: [],
    systemList: [],
    systemTotal: 0,
    projectTotal: 0,
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
        getListByProject: async () => {
            try {
                const response = await request(API.dashboard.getListByProject, {
                    method: 'get',
                });
                if (response && response.errcode === 0) {
                    actions.dashboard.setReducers({
                        projectList: response.result.list,
                        projectTotal: response.result.list.length,
                    });
                }
            } catch (err) {
                message.error(err);
            }
        },
        getSystemList: async (payload: any, getState: any) => {
            try {
                const response = await request(API.dashboard.getSystem, {
                    method: 'get',
                });
                if (response && response.code === 0) {
                    const list = response.systemList;
                    const { projectList } = getState().dashboard;
                    const systemArr = [];
                    for (let i = 0; i < projectList.length; i++) {
                        const item = list.filter(
                            (system: any) => projectList[i].projectName.indexOf(system.clientId) > 0,
                        );
                        systemArr.push(item[0]);
                    }

                    const arr: any = [];
                    await Promise.all(
                        systemArr.map(async (element: any) => {
                            const totalModules = await getSystemDetail(element);
                            const obj: any = {};
                            obj.clientId = element.clientId;
                            obj.name = element.name;
                            obj.totalModules = totalModules;
                            arr.push(obj);
                        }),
                    );

                    actions.dashboard.setReducers({
                        systemList: arr,
                        systemTotal: list.length,
                    });
                }
            } catch (err) {
                message.error(err);
            }
        },
    },
};

// eslint-disable-next-line consistent-return
async function getSystemDetail(payload: any) {
    try {
        const response = await request(`${API.dashboard.getSystemDetail}?systemId=${payload.id}`, {
            method: 'get',
        });
        if (response && response.code === 0) {
            const list = response.resourceList;
            const fliterList = list.filter(
                (item: any) =>
                    (item.type === 1 && item.status === 1) ||
                    (item.type === 2 && item.name.indexOf('新增') > 0 && item.url),
            );
            return fliterList.length;
        }
    } catch (err) {
        message.error(err);
    }
}
