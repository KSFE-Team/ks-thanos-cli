"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _winston = require("winston");

var _database = _interopRequireDefault(require("../../models/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const collectionName = 'logs';

class TransportMongoDB extends _winston.Transport {
  constructor(options = {}) {
    super();
    this.host = options.host;
    this.dbName = options.dbName;
    this.port = options.port;
    this.database = new _database.default({
      dbName: this.dbName,
      host: this.host,
      port: this.port
    });
    this.database.initDatabase();
  }

  log(info, callback) {
    const db = this.database.getDB();

    if (!db) {
      return;
    }

    db.collection(collectionName).insertOne({
      level: info[Symbol.for('level')],
      message: info.message,
      timestamp: info.timestamp
    }).then(() => {
      if (callback instanceof Function) {
        callback();
      }
    }).catch(error => {
      console.error(error);
    });
  }

}

exports.default = TransportMongoDB;
//# sourceMappingURL=transportMongoDB.js.map