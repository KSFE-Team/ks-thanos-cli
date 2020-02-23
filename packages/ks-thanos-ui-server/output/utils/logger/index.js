"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _winston = require("winston");

var _config = _interopRequireDefault(require("../../models/config"));

var _transportMongoDB = _interopRequireDefault(require("./transportMongoDB"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  combine,
  timestamp,
  json,
  prettyPrint,
  colorize,
  simple
} = _winston.format;
const transportHelpers = [new _winston.transports.Console({
  format: simple()
}), new _transportMongoDB.default({
  host: _config.default.host,
  port: _config.default.port,
  dbName: _config.default.dbName
})];
const logger = (0, _winston.createLogger)({
  level: 'info',
  format: combine(colorize(), json(), timestamp({
    format: 'YY-MM-DD HH:mm:ss'
  }), prettyPrint()),
  transports: transportHelpers,
  exceptionHandlers: transportHelpers.concat([new _winston.transports.File({
    filename: 'log/exceptions.log'
  })])
});
var _default = logger;
exports.default = _default;
//# sourceMappingURL=index.js.map