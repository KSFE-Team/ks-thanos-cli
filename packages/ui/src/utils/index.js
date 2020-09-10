import { parseQueryString } from 'ks-utils';
import { browserHistory } from '../routers/utils';

/**
 * 统一规范 必输入提示
 */
export const requiredMessage = (string) => {
    return `请输入${string}`;
};

/**
 * 统一跳转方法
 */
export const goto = {
    push: (url) => {
        browserHistory.push(url);
    },
    go: (url) => {
        browserHistory.go(url);
    },
};

/**
 * 本地存储
 * @param {String} key
 * @param {String} value
 */
export const setStorage = (key, value) => {
    localStorage.setItem(key, value);
};

/**
 * 获取存储
 * @param {String} key
 */
export const getStorage = (key) => {
    return localStorage.getItem(key);
};

/**
 * 存储复杂数据结构
 * @param {String} key
 * @param {Object} value
 */
export const setObjectStorage = (key, value) => {
    setStorage(key, JSON.stringify(value));
};

/**
 * 获取存储
 * @param {String} key
 */
export const getObjectStorage = (key) => {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
};

/**
 * 整理serverPort
 */
export const formatServerPort = () => {
    const queryString = parseQueryString(window.location.search);
    const storageServerPort = getStorage('serverPort');
    if (queryString.serverPort) {
        setStorage('serverPort', queryString.serverPort);
        return queryString.serverPort;
    } else if (storageServerPort) {
        return storageServerPort;
    } else {
        return 3000;
    }
};
