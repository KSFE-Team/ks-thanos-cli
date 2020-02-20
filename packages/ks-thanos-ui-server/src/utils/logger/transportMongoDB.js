import {Transport} from 'winston';
import Database from '../../models/database';

const collectionName = 'logs';

export default class TransportMongoDB extends Transport {
    constructor(options = {}) {
        super();
        this.host = options.host;
        this.dbName = options.dbName;
        this.port = options.port;
        this.database = new Database({
            dbName: this.dbName,
            host: this.host,
            port: this.port
        });
        this.database.initDatabase();
    }

    /**
     * 每一次日志输出时调用的函数
     * @param   {Object}    info        日志信息
     * @param   {Function}  callback    回调函数
     */
    log(info, callback) {
        const db = this.database.getDB();
        if (!db) {
            return;
        }
        db.collection(collectionName).insertOne({
            level: info[Symbol.for('level')],
            message: info.message,
            timestamp: info.timestamp
        })
            .then(() => {
                if (callback instanceof Function) {
                    callback();
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
}
