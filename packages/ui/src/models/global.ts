import { actions } from 'kredux';
import { message } from 'antd';
import Api from 'Src/utils/request';
import request from 'Src/utils/requestExtend';
import { API } from 'Src/api';
// import terminal from 'Src/components/Terminal';

export const STATE = {
    isShowFolder: false,
    fileList: [],
    currentPath: '/Users',
    cwd: '',
    projects: [],
    projectProcess: {},
    thanosModalVisible: false, // 灭霸弹框 显|隐
    initModalVisible: false, // 项目初始化弹框 显|隐
    thanosGeneratorLoading: false, // 灭霸生成代码loading
    projectConfig: {},
    selectTemplateModalVisible: false,
    templateList: [],
    searchTemplateForm: {
        page: 1,
        limit: 12,
        totalPage: 0,
        total: 0,
        pageName: {
            value: '',
        }, // 模版名
    },
};

/**
 * 首页页面的业务模块
 */
const projectModel = {
    namespace: 'global', // 项目命名空间,

    initialState: { ...STATE },

    effects: {
        /**
         * 初始化
         */
        init() {
            const projectsStr = localStorage.getItem('projects');
            if (projectsStr) {
                const projects = JSON.parse(projectsStr);

                if (projects && projects.length > 0) {
                    const [INIT_PROJECT = {}] = projects;
                    actions.global.setReducers({
                        projects,
                        currentPath: INIT_PROJECT.path,
                        cwd: INIT_PROJECT.path,
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
        selectFolder(payload: any = {}, getState) {
            const { currentPath } = getState().global;
            const { path = currentPath } = payload;

            Api.getData({
                api: 'file',
                method: 'GET',
                params: {
                    path,
                },
            }).then((response) => {
                if (response.code === 0) {
                    actions.global.setReducers({
                        isShowFolder: true,
                        fileList: response.result,
                        currentPath: path,
                    });
                }
            });
        },
        /**
         * 确认文件
         */
        confirmFilePath(payload: any, getState) {
            const { projects, currentPath } = getState().global;
            const name = currentPath.substring(currentPath.lastIndexOf('/') + 1);
            /* 没有重复路径 */
            if (projects.every(({ path }) => path !== currentPath)) {
                projects.push({
                    path: currentPath,
                    name,
                });
            }
            actions.global.setReducers({
                // isShowFolder: false,
                // fileList: [],
                currentPath,
                cwd: currentPath,
                projects,
            });

            localStorage.setItem('projects', JSON.stringify(projects));
        },
        /**
         * 取消选择项目
         */
        cancelSelect() {
            actions.global.setReducers({
                isShowFolder: false,
            });
        },
        /**
         * 执行灭霸命令
         */
        thanosSync: async (payload: any) => {
            const response = await Api.getData({
                api: 'thanosSync',
                method: 'GET',
                params: payload,
            });
            if (response.code === 0) {
                message.success('灭霸打响指了');
                actions.global.setReducers({
                    thanosModalVisible: false,
                    // thanosGeneratorLoading: true
                });
            }
        },
        /**
         * 加载模版列表
         */
        loadTemplateList: async (payload: any, getState: any) => {
            const searchForm = getState().global.searchTemplateForm;
            const postData = {
                page: searchForm.page,
                limit: searchForm.limit,
                pageName: searchForm.pageName && searchForm.pageName.value,
            };
            const response = await request(API.page.query, {
                method: 'GET',
                body: postData,
            });
            if (response && !response.errcode) {
                const { result } = response;
                actions.global.setReducers({
                    templateList: result.list,
                    searchTemplateForm: {
                        ...searchForm,
                        total: result.total,
                    },
                });
            }
        },
    },
};

export default projectModel;
