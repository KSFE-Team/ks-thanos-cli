import Api from 'Src/utils/request';
import { message } from 'antd';
import { actions } from 'kredux';
import terminal from 'Src/components/Terminal';
import { NGINX_ENV } from './routes/Running/constants';

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
    localNginxEnv: '',
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
                const { nginxPort } = response.result;
                if (nginxPort) {
                    actions.workspace.getNginxEnv({
                        cwd,
                        cmd: 'cv',
                        args: JSON.stringify([
                            {
                                key: '--config',
                                value: {
                                    action: 'get',
                                    port: nginxPort,
                                },
                            },
                        ]),
                        callback: () => {},
                    });
                }
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
                actions.workspace.setReducers({
                    thanosResponse: response.data,
                });
                callback();
            }
        },

        /**
         * 获取nginx环境
         */
        getNginxEnv: async (payload: any) => {
            const { callback, ...rest } = payload;
            const response: any = await Api.getData({
                api: 'thanosSync',
                method: 'post',
                params: rest,
            });
            if (response && response.code === 0) {
                let handleData = response.data || [];
                handleData = NGINX_ENV.find((env) => handleData.includes(env));
                if (handleData) {
                    actions.workspace.setReducers({
                        localNginxEnv: handleData,
                    });
                    callback();
                }
            }
        },

        /**
         * 处理音频播放
         */
        handleAudioPlay: async (payload: { audioUrl: string }) => {
            const audio: HTMLAudioElement | null = document.getElementById('audio') as HTMLAudioElement | null;
            const { audioUrl } = payload;
            if (audio) {
                audio.src = audioUrl;
            }
            audio?.play();
        },
    },
};
