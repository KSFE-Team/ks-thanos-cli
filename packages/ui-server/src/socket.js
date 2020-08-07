let socketIo = {};

export const roomId = 'thanos';
export const createSocket = (app) => {
    const server = require('http').createServer(app.callback());
    // 创建socket实例
    socketIo = require('socket.io')(server, {
        path: '/api/ks-thanos-ui-server/v1/socket'
    });
    // 连接事件
    socketIo.on('connection', (socket) => {
        // console.log(`有客户端连接成功: ${JSON.stringify(socket.handshake.query || {})}`);
        socket.join(roomId);

        socket.emit('connection', '连接成功');
        // 断开事件
        socket.on('disconnect', function(data) {
            // console.log(`有客户端失去连接: ${JSON.stringify(socket.handshake.query || {})}`);
            socket.leave(roomId);
        });
    });
    return server;
};

/**
 * @desc 发送日志
 * @param data
 */
export const sendLog = (data) => {
    socketIo.sockets.in(roomId).emit('log', data);
};

/**
 * @desc 推送完成项目初始化
 * @param data
 */
export const thanosCallback = (data) => {
    socketIo.sockets.in(roomId).emit('thanosCallback', data);
};
