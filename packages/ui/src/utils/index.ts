import { parseQueryString } from 'ks-utils';
import { browserHistory } from '../routers/utils';

/**
 * 统一规范 必输入提示
 */
export const requiredMessage = (string: string) => {
    return `请输入${string}`;
};

/**
 * 统一跳转方法
 */
let baseUrl: string = '';
export const goto = {
    setBaseUrl: (url: string) => {
        baseUrl = url;
    },
    push: (url: string) => {
        browserHistory.push(baseUrl + url);
    },
    go: (url: string) => {
        browserHistory.go(baseUrl + url);
    },
};

/**
 * 本地存储
 * @param {String} key
 * @param {String} value
 */
export const setStorage = (key: string, value: any) => {
    localStorage.setItem(key, value);
};

/**
 * 获取存储
 * @param {String} key
 */
export const getStorage = (key: string) => {
    return localStorage.getItem(key);
};

/**
 * 存储复杂数据结构
 * @param {String} key
 * @param {Object} value
 */
export const setObjectStorage = (key: string, value: any) => {
    setStorage(key, JSON.stringify(value));
};

/**
 * 获取存储
 * @param {String} key
 */
export const getObjectStorage = (key: string) => {
    const value: any = localStorage.getItem(key);
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
    }
    if (storageServerPort) {
        return storageServerPort;
    }
    return 3000;
};

// 生成随机码
export const getUniqueID = () => {
    return Math.random().toString(36).substring(2);
};

/* 展示组件默认获取默认值 */
export const getDefaultValue = (data: any, key: string, defaultValue: any) => {
    const value = data[key];
    if (value || value === 0) {
        return value;
    }
    return defaultValue;
};

/* 是否为线上预览版本 */
export const isOnlyPreview = () => {
    return window.METHOD === 'onlyPreview';
};
