"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCollection = exports.getDB = exports.initDatabase = void 0;

var _database = _interopRequireDefault(require("./database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let database;

const initDatabase = async config => {
  if (database) {
    return;
  }

  database = new _database.default(config);
  await database.initDatabase();
};

exports.initDatabase = initDatabase;

const getDB = () => {
  return database.getDB();
};

exports.getDB = getDB;

const getCollection = collectionName => {
  return getDB().collection(collectionName);
};

exports.getCollection = getCollection;
//# sourceMappingURL=index.js.map