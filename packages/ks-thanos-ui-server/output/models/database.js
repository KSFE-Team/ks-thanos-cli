"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongodb = require("mongodb");

class Database {
  constructor({
    host,
    port,
    dbName
  }) {
    this.host = host;
    this.port = port;
    this.dbName = dbName;
    this.db = undefined;
  }

  async initDatabase() {
    if (this.db) {
      return Promise.resolve(this.db);
    }

    const url = `${this.host}:${this.port}`;

    try {
      const client = await _mongodb.MongoClient.connect(url, {
        useNewUrlParser: true
      });
      this.db = client.db(this.dbName);
      return this.db;
    } catch (err) {
      throw err;
    }
  }

  getDB() {
    return this.db;
  }

}

exports.default = Database;
//# sourceMappingURL=database.js.map