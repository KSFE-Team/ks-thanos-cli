import { actions, connect } from 'kredux';
import { message } from 'antd';
import Api from 'Utils/request';
import terminal from 'Modules/project/terminal';

/**
 * 首页页面的业务模块
 */
const projectModel = {
    namespace: 'project', // 项目命名空间,

    initialState: {
        isShowFolder: false,
        fileList: [],
        currentPath: '/Users',
        projects: [],
        currentIndex: 0,

        thanosModalVisible: false, // 灭霸弹框 显|隐
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
                    actions.project.setReducers({
                        projects,
                        currentPath: projects[0].path
                    });
                }
            }
        },
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
            const { fileList, projects, currentPath } = getState().project;
            const length = fileList.filter((f) => f.name === 'package.json').length;

            if (length === 1) {
                const name = currentPath.substring(currentPath.lastIndexOf('/') + 1);

                projects.push({
                    path: currentPath,
                    name
                });

                actions.project.setReducers({
                    isShowFolder: false,
                    fileList: [],
                    currentPath,
                    projects
                });

                localStorage.setItem('projects', JSON.stringify(projects));
            } else {
                alert('请选择正确的项目根目录');
            }
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
                    currentPath: projects[payload].path
                });

                terminal.clear();
                terminal.write(projects[payload].log || '');
            }
        },
        /**
         * 清空日志
         */
        clear(payload, getState) {
            const { projects, currentIndex } = getState().project;

            if (projects[currentIndex]) {
                const project = projects[currentIndex];
                project.log = '';
                terminal.write('\r\n');
                terminal.clear();
                actions.project.setReducers({
                    projects
                });
            }
        },
        /**
         * 执行灭霸命令
         */
        thanos: async(payload) => {
            const response = await Api.getData({
                api: 'thanos',
                method: 'GET',
                params: payload
            });
            if (response.code === 0) {
                message.success('灭霸打响指了');
                actions.project.setReducers({
                    thanosModalVisible: false
                });
            }
        }
    }
};

/**
 * 首页模块的容器
 */
export const projectContainer = connect(({ project, loading }) => ({
    project,
    thanosLoading: loading.effects['project/thanos']
}));

export default projectModel;
