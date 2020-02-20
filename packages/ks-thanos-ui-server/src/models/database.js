import { MongoClient } from 'mongodb';

export default class Database {
    constructor({ host, port, dbName }) {
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
            const client = await MongoClient.connect(url, { useNewUrlParser: true });
            this.db = client.db(this.dbName);
            return this.db;
        } catch (err) {
            throw err;
        }
    };

    getDB() {
        return this.db;
    }
}
