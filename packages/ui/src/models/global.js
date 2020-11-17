import { actions } from 'kredux';
import { message } from 'antd';
import Api from 'Utils/request';
import terminal from 'Src/components/Terminal';

/**
 * 首页页面的业务模块
 */
const projectModel = {
    namespace: 'global', // 项目命名空间,

    initialState: {
        isShowFolder: false,
        fileList: [],
        currentPath: '/Users',
        cwd: '',
        projects: [],
        currentIndex: 0,
        projectProcess: {},
        thanosModalVisible: false, // 灭霸弹框 显|隐
        initModalVisible: false, // 项目初始化弹框 显|隐
        thanosGeneratorLoading: false, // 灭霸生成代码loading

        projectConfig: {}
    },

    effects: {
        /**
         * 初始化
         */
        init() {
            const projectsStr = localStorage.getItem('projects');
            if (projectsStr) {
                let projects = JSON.parse(projectsStr);

                if (projects && projects.length > 0) {
                    const [INIT_PROJECT = {}] = projects;
                    actions.global.setReducers({
                        projects,
                        currentPath: INIT_PROJECT.path,
                        cwd: INIT_PROJECT.path
                    });
                }
            }
        },
        // /**
        //  * 执行NPM命令
        //  */
        // runNpmCommand(payload, getState) {
        //     const { cwd } = getState().global;
        //     return Api.getData({
        //         api: 'runNpmCommand',
        //         method: 'GET',
        //         params: {
        //             command: payload,
        //             cwd
        //         }
        //     });
        // },
        // /**
        //  * 执行命令
        //  */
        // runCommand(payload, getState) {
        //     const { cwd, currentPath } = getState().global;

        //     return Api.getData({
        //         api: 'runCommand',
        //         method: 'GET',
        //         params: {
        //             command: payload,
        //             cwd: cwd || currentPath
        //         }
        //     });
        // },
        /**
         * 选择文件
         */
        selectFolder(payload = {}, getState) {
            const { currentPath } = getState().global;
            const { path = currentPath } = payload;

            Api.getData({
                api: 'file',
                method: 'GET',
                params: {
                    path
                }
            }).then((response) => {
                if (response.code === 0) {
                    actions.global.setReducers({
                        isShowFolder: true,
                        fileList: response.result,
                        currentPath: path
                    });
                }
            });
        },
        /**
         * 确认文件
         */
        confirmFilePath(payload, getState) {
            let { projects, currentPath } = getState().global;
            const name = currentPath.substring(currentPath.lastIndexOf('/') + 1);
            /* 没有重复路径 */
            if (projects.every(({ path }) => path !== currentPath)) {
                projects.push({
                    path: currentPath,
                    name
                });
            }
            actions.global.setReducers({
                // isShowFolder: false,
                // fileList: [],
                currentPath,
                cwd: currentPath,
                projects
            });

            localStorage.setItem('projects', JSON.stringify(projects));
        },
        /**
         * 取消选择项目
         */
        cancelSelect() {
            actions.global.setReducers({
                isShowFolder: false
            });
        },
        /**
         * 切换当前项目
         */
        changeCurrentIndex(payload, getState) {
            const { projects } = getState().global;

            if (projects[payload]) {
                actions.global.setReducers({
                    currentIndex: payload,
                    currentPath: projects[payload].path,
                    cwd: projects[payload].path
                });

                terminal.clear();
                terminal.write(projects[payload].log || '');
            }
        },
        /**
         * 执行灭霸命令
         */
        thanosSync: async(payload) => {
            const response = await Api.getData({
                api: 'thanosSync',
                method: 'GET',
                params: payload
            });
            if (response.code === 0) {
                message.success('灭霸打响指了');
                actions.global.setReducers({
                    thanosModalVisible: false,
                    // thanosGeneratorLoading: true
                });
            }
        },
    }
};

export default projectModel;
