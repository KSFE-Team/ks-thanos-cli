import { actions, connect } from 'kredux';
import { message } from 'antd';
import Api from 'Utils/request';
import terminal from 'Src/components/Terminal';

/**
 * 首页页面的业务模块
 */
const projectModel = {
    namespace: 'project', // 项目命名空间,

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
                    actions.project.setReducers({
                        projects,
                        currentPath: INIT_PROJECT.path,
                        cwd: INIT_PROJECT.path
                    });
                }
            }
        },
        /**
         * 执行NPM命令
         */
        runNpmCommand(payload, getState) {
            const { cwd } = getState().project;
            return Api.getData({
                api: 'runNpmCommand',
                method: 'GET',
                params: {
                    command: payload,
                    cwd
                }
            });
        },
        /**
         * 执行命令
         */
        runCommand(payload, getState) {
            const { cwd } = getState().project;

            return Api.getData({
                api: 'runCommand',
                method: 'GET',
                params: {
                    command: payload,
                    cwd
                }
            });
        },
        /**
         * 选择文件
         */
        selectFolder(payload = {}, getState) {
            const { currentPath } = getState().project;
            const { path = currentPath } = payload;

            Api.getData({
                api: 'file',
                method: 'GET',
                params: {
                    path
                }
            }).then((response) => {
                if (response.code === 0) {
                    actions.project.setReducers({
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
            let { projects, currentPath } = getState().project;
            const name = currentPath.substring(currentPath.lastIndexOf('/') + 1);
            /* 没有重复路径 */
            if (projects.every(({ path }) => path !== currentPath)) {
                projects.push({
                    path: currentPath,
                    name
                });
            }
            actions.project.setReducers({
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
            actions.project.setReducers({
                isShowFolder: false
            });
        },
        /**
         * 切换当前项目
         */
        changeCurrentIndex(payload, getState) {
            const { projects } = getState().project;

            if (projects[payload]) {
                actions.project.setReducers({
                    currentIndex: payload,
                    currentPath: projects[payload].path,
                    cwd: projects[payload].path
                });

                terminal.clear();
                terminal.write(projects[payload].log || '');
            }
        },
        /**
         * 清空日志
         */
        clear(payload, getState) {
            // const { projects, currentIndex } = getState().project;

            // if (projects[currentIndex]) {
            //     const project = projects[currentIndex];
            //     project.log = '';
            //     actions.project.setReducers({
            //         projects
            //     });
            // }
            terminal.write('\r\n');
            terminal.clear();
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
                actions.project.setReducers({
                    thanosModalVisible: false,
                    // thanosGeneratorLoading: true
                });
            }
        },
        /**
         * 执行项目初始化
         */
        initProject: async(payload) => {
            const response = await Api.getData({
                api: 'thanos',
                method: 'GET',
                params: {
                    ...payload,
                    // cmd: '-V',
                    // args: JSON.stringify([])
                }
            });
            if (response.code === 0) {
                message.success('项目初始化中请稍等');
                actions.project.setReducers({
                    initModalVisible: false
                });
            }
        },
        /**
         * 更新项目列表
         */
        updateProjectList: (payload, getState) => {
            const { replace, add } = payload;
            let { projects } = getState().project;
            if (replace) {
                projects = replace;
            } else if (add) {
                projects = [
                    ...projects,
                    add
                ];
            }

            actions.project.setReducers({
                projects
            });

            localStorage.setItem('projects', JSON.stringify(projects));
        },
        /**
         * 获取项目就成状态
         */
        getProjectProcess: async(payload, getState) => {
            let { cwd } = getState().project;

            const response = await Api.getData({
                api: 'getProjectProcess',
                method: 'GET',
                params: {
                    cwd,
                }
            });

            if (response && response.code === 0) {
                actions.project.setReducers({
                    projectProcess: response.result
                });
            }
        },
        /**
         * 获取项目配置
         */
        getProjectConfig: async(payload, getState) => {
            let { cwd } = getState().project;

            const response = await Api.getData({
                api: 'getProjectConfig',
                method: 'GET',
                params: {
                    cwd,
                }
            });

            if (response && response.code === 0) {
                actions.project.setReducers({
                    projectConfig: response.result
                });
            }
        },
    }
};

/**
 * 首页模块的容器
 */
export const projectContainer = connect(({ project, loading }) => ({
    project,
    thanosLoading: loading.effects['project/thanosSync'],
    initProjectLoading: loading.effects['project/initProject'],
}));

export default projectModel;
