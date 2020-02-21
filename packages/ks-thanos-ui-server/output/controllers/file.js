"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = async;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function async(context) {
  const path = context.query.path || '/';

  const files = _fs.default.readdirSync(path);

  let items = (files || []).filter(f => !f.startsWith('.')).map(f => {
    const fpath = path + '/' + f;
    let type = 'file',
        size = 0,
        createdAt = null,
        updatedAt = null;

    try {
      const stat = _fs.default.statSync(fpath);

      type = stat.isDirectory() ? 'dir' : type;
      size = stat.size;
      createdAt = stat.birthtimeMs;
      updatedAt = stat.mtimeMs;
    } catch (err) {}

    return {
      name: f,
      type,
      size,
      createdAt,
      updatedAt
    };
  });
  console.log(JSON.stringify(items));
  context.body = {
    code: 0,
    result: items
  };
}
//# sourceMappingURL=file.js.map