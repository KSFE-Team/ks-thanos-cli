import { actions, connect } from 'kredux';
import Api from 'Utils/request';

/**
 * 首页页面的业务模块
 */
const projectModel = {
    namespace: 'project', // 项目命名空间,
    initialState: {
        isShowFolder: false,
        fileList: [],
        currentPath: '/Users',
        projectName: ''
    },
    effects: {
        /**
         * 执行命令
         */
        runCommand(payload, getState) {
            const { currentPath } = getState().project;

            Api.getData({
                api: 'runCommand',
                method: 'GET',
                params: {
                    command: payload,
                    cwd: currentPath
                }
            });
        },
        /**
         * 选择文件
         */
        selectFolder(payload, getState) {
            const { path } = payload;

            Api.getData({
                api: 'file',
                method: 'GET',
                params: {
                    path
                }
            }).then((response) => {
                console.log(response);

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
            const { fileList, currentPath } = getState().project;
            const length = fileList.filter((f) => f.name === 'package.json').length;

            if (length === 1) {
                actions.project.setReducers({
                    isShowFolder: false,
                    fileList: [],
                    currentPath,
                    projectName: currentPath.substring(currentPath.lastIndexOf('/') + 1)
                });
            }
        }
    }
};

/**
 * 首页模块的容器
 */
export const projectContainer = connect(({ project }) => ({ project }));

export default projectModel;
