"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
Object.defineProperty(exports, "file", {
  enumerable: true,
  get: function () {
    return _file.default;
  }
});
Object.defineProperty(exports, "runCommand", {
  enumerable: true,
  get: function () {
    return _runCommand.default;
  }
});

var _index = _interopRequireDefault(require("../utils/logger/index"));

var _file = _interopRequireDefault(require("./file"));

var _runCommand = _interopRequireDefault(require("./runCommand"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(context) {
  _index.default.info('hello!');

  context.body = {
    message: 'hello world!'
  };
}

;
//# sourceMappingURL=index.js.map