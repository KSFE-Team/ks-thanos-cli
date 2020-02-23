"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendLog = exports.createSocket = exports.roomId = void 0;
let socketIo = {};
const roomId = 'thanos';
exports.roomId = roomId;

const createSocket = app => {
  const server = require('http').createServer(app.callback());

  socketIo = require('socket.io')(server, {
    path: '/api/ks-thanos-ui-server/v1/socket'
  });
  socketIo.on('connection', socket => {
    console.log(`有客户端连接成功: ${JSON.stringify(socket.handshake.query || {})}`);
    socket.join(roomId);
    socket.emit('connection', '连接成功');
    socket.on('disconnect', function (data) {
      console.log(`有客户端失去连接: ${JSON.stringify(socket.handshake.query || {})}`);
      socket.leave(roomId);
    });
  });
  return server;
};

exports.createSocket = createSocket;

const sendLog = data => {
  socketIo.sockets.in(roomId).emit('log', data);
};

exports.sendLog = sendLog;
//# sourceMappingURL=socket.js.map