import IO from 'socket.io-client';
import { actions } from 'kredux';
import terminal from 'Modules/project/terminal';
const socket = IO('http://localhost:3000', {
    path: '/api/ks-thanos-ui-server/v1/socket'
});

let timeout, inited = false, templog = '';

/**
 * 首页页面的业务模块
 */
const socketModel = {
    namespace: 'socket', // 首页的命名空间,
    initialState: {
        pageData: ''
    },
    effects: {
        /**
         * 初始化页面首页的数据
         */
        init(payload, getState) {
            if (!inited) {
                socket.on('log', (socketRes) => {
                    const str = socketRes.replace(/\n/g, '\r\n');
                    terminal.write(str);
                    templog += str;

                    clearTimeout(timeout);
                    timeout = setTimeout(() => {
                        const { projects, currentIndex } = getState().project;
                        const project = projects[currentIndex];

                        if (!project.log) project.log = '';
                        project.log += templog;
                        templog = '';

                        actions.project.setReducers({
                            projects
                        });
                    }, 500);
                });

                socket.on('thanosCallback', (socketRes) => {
                    const { cmd, args } = socketRes;
                    if (cmd === 'init') {
                        const [{value: config}] = args;
                        actions.project.updateProjectList({
                            add: {
                                path: `${config.projectPath}/${config.projectName}`,
                                name: config.projectName
                            }
                        });
                    }
                });
            }

            inited = true;
        },
    }
};

export default socketModel;
