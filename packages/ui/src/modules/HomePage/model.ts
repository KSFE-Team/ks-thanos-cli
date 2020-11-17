import Api from 'Src/utils/request';
import { getObjectStorage } from 'Src/utils';
import { message } from 'antd';
import { actions } from 'kredux';
import { ProjectItem } from './types';

interface UpdateProjectPayload {
    replace?: ProjectItem[];
    add?: ProjectItem;
}

export const STATE = {
    projects: getObjectStorage('projects') || [],
    currentPath: getObjectStorage('currentProject'),
    initModalVisible: false,
    isShowFolder: false,
};

export default {
    namespace: 'homepage',
    initialState: STATE,
    effects: {
        /**
         * 执行项目初始化
         */
        initProject: async (payload: { cwd: string; cmd: string; args: string }) => {
            const response: any = await Api.getData({
                api: 'thanos',
                method: 'GET',
                params: payload,
            });
            if (response.code === 0) {
                message.success('项目初始化中请稍等');
                actions.homepage.setReducers({
                    initModalVisible: false,
                });
            }
        },
    },
    reducers: {
        updateProjectList: (payload: UpdateProjectPayload, getState: any) => {
            const { replace, add } = payload;
            let { projects } = getState().homepage;
            if (replace) {
                projects = replace;
            } else if (add) {
                projects = [...projects, add];
            }
            localStorage.setItem('projects', JSON.stringify(projects));
            return {
                projects,
            };
        },
    },
};
