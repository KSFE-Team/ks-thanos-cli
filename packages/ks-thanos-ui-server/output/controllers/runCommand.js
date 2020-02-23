"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _socket = require("../socket");

var _treeKill = _interopRequireDefault(require("tree-kill"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let spawns = {};

function _default(context) {
  console.log(JSON.stringify(context.query));
  const cwd = context.query.cwd;

  if (!cwd) {
    context.body = {
      code: -1,
      message: '请选择项目'
    };
  }

  const childProcess = require('child_process');

  if (context.query.command === 'stop') {
    (0, _socket.sendLog)(`stopping ${cwd}\n`);
    (0, _socket.sendLog)(`\n`);

    if (spawns[cwd]) {
      (0, _treeKill.default)(spawns[cwd], () => {
        (0, _socket.sendLog)(`stopped, thanks for use!!!\n`);
      });
      delete spawns[cwd];
    } else {
      (0, _socket.sendLog)(`no work need to stop!!!\n`);
    }

    context.body = {
      code: 0,
      result: 'success'
    };
    return;
  }

  const spawnObj = childProcess.spawn(`npm`, [context.query.command], {
    cwd,
    encoding: 'utf-8'
  });
  spawnObj.stdout.on('data', function (chunk) {
    (0, _socket.sendLog)(chunk.toString());
  });
  spawnObj.stderr.on('data', chunk => {
    (0, _socket.sendLog)(chunk.toString());
  });
  spawnObj.on('close', function (code) {
    this.stdin.pause();
    console.log('close code : ' + code);
  });
  spawnObj.on('exit', code => {});
  spawns[cwd] = spawnObj.pid;
  context.body = {
    code: 0,
    result: 'success'
  };
}

;
//# sourceMappingURL=runCommand.js.map