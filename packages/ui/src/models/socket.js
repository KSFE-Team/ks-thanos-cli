import IO from 'socket.io-client';
import { terminal } from 'Modules/project';
const socket = IO('http://localhost:3000', {
    path: '/api/ks-thanos-ui-server/v1/socket'
});

let inited = false;

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
                    terminal.write(socketRes.replace(/\n/g, '\r\n'));
                });
            }

            inited = true;
        }
    }
};

export default socketModel;
