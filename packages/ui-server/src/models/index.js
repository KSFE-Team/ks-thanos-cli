import Database from './database';

let database;

export const initDatabase = async(config) => {
    if (database) {
        return;
    }

    database = new Database(config);
    await database.initDatabase();
};

export const getDB = () => {
    return database.getDB();
};

export const getCollection = (collectionName) => {
    return getDB().collection(collectionName);
};
