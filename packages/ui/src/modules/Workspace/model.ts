import Api from 'Src/utils/request';
import { message } from 'antd';
import { actions } from 'kredux';
import terminal from 'Src/components/Terminal';

export const STATE = {
    // projects: getObjectStorage('projects') || [],
    currentProject: {},
    // initModalVisible: false,
    // isShowFolder: false,
    projectProcess: {},
    cwd: '',
    projectConfig: {},
    thanosModalVisible: false,
    initPageName: '',
    thanosGeneratorLoading: false,
};

export default {
    namespace: 'workspace',
    initialState: STATE,
    effects: {
        /**
         * 执行NPM命令
         */
        runNpmCommand(payload: any, getState: any) {
            const { cwd } = getState().workspace;
            return Api.getData({
                api: 'runNpmCommand',
                method: 'GET',
                params: {
                    command: payload,
                    cwd,
                },
            });
        },
        /**
         * 清空日志
         */
        clear() {
            terminal.write('\r\n');
            terminal.clear();
        },
        // /**
        //  * 执行命令
        //  */
        // runCommand(payload, getState) {
        //     const { cwd } = getState().project;
        //     return Api.getData({
        //         api: 'runCommand',
        //         method: 'GET',
        //         params: {
        //             command: payload,
        //             cwd
        //         }
        //     });
        // },
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
        /**
         * 获取项目就成状态
         */
        getProjectProcess: async (payload: any, getState: any) => {
            const { cwd } = getState().workspace;

            const response: any = await Api.getData({
                api: 'getProjectProcess',
                method: 'GET',
                params: {
                    cwd,
                },
            });

            if (response && response.code === 0) {
                actions.workspace.setReducers({
                    projectProcess: response.result,
                });
            }
        },
        /**
         * 获取项目配置
         */
        getProjectConfig: async (payload: any, getState: any) => {
            const { cwd } = getState().workspace;

            const response: any = await Api.getData({
                api: 'getProjectConfig',
                method: 'GET',
                params: {
                    cwd,
                },
            });

            if (response && response.code === 0) {
                actions.workspace.setReducers({
                    projectConfig: response.result,
                });
            }
        },
        /**
         * 获取项目配置
         */
        updateProjectConfig: async (payload: any, getState: any) => {
            const { cwd } = getState().workspace;
            const { form, ...OTHERS } = payload;
            const response: any = await Api.getData({
                api: 'updateProjectConfig',
                method: 'post',
                params: {
                    cwd,
                    ...OTHERS,
                },
            });

            if (response && response.code === 0) {
                await actions.workspace.getProjectConfig();
                const { projectConfig } = getState().global;
                form.setFieldsValue(projectConfig);
            }
        },

        /**
         * 执行灭霸命令
         */
        thanosSync: async (payload: any) => {
            const { callback, ...rest } = payload;
            const response: any = await Api.getData({
                api: 'thanosSync',
                method: 'post',
                params: rest,
            });
            if (response && response.code === 0) {
                callback();
            }
        },
    },
};
