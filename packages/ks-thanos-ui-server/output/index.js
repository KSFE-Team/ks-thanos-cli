"use strict";

var _koa = _interopRequireDefault(require("koa"));

var _routers = _interopRequireDefault(require("./routers"));

var _models = require("./models");

var _koaBodyparser = _interopRequireDefault(require("koa-bodyparser"));

var _config = _interopRequireDefault(require("./models/config"));

var _koa2Cors = _interopRequireDefault(require("koa2-cors"));

var _logger = _interopRequireDefault(require("./utils/logger"));

var _socket = require("./socket");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const port = 3000;
const app = new _koa.default();
const server = (0, _socket.createSocket)(app);
process.on('unhandledRejection', err => {
  _logger.default.error(err);
});
app.use((0, _koa2Cors.default)({
  origin: '*',
  allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'token', 'X-Requested-With']
}));
app.use((context, next) => {
  _logger.default.info(`${context.method} ${context.href} ${context.headers['content-type']} ${context.headers['user-agent']} ${context.headers.token || ''}`);

  return next();
});
app.use(async (context, next) => {
  try {
    await next();
  } catch (error) {
    _logger.default.error(`${error.stack}`);

    context.status = 200;
    context.body = {
      errcode: error.code || -1,
      message: error.message,
      result: {}
    };
  }
});
app.use((0, _koaBodyparser.default)({
  jsonLimit: '50mb',
  enableTypes: ['json', 'form', 'multipart']
}));
app.use(_routers.default.routes());
app.use(_routers.default.allowedMethods());
app.use((context, next) => {
  if (context.body) {
    if (context.body.errcode === undefined) {
      let {
        message,
        ...other
      } = context.body;
      context.body = {
        errcode: 0,
        result: other
      };
      message && (context.body.message = message);
    }

    context.set('Content-Type', 'application/json');
    context.body = JSON.stringify(context.body);
  }

  return next();
});
(0, _models.initDatabase)(_config.default).then(startServer).catch(err => {
  _logger.default.error(err);
});

function startServer() {
  server.listen(port, () => {
    _logger.default.info(`server listening on ${port}...`);
  });
}
//# sourceMappingURL=index.js.map