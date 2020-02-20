import { isEmptyObject, serializeObject } from 'ks-utils';
import Api from './api';

/**
 * @typedef {Object} ResponseData
 * @property {number} errcode 错误码
 * @property {Object} result 响应数据
 * @property {string} message 错误信息
 */
/**
 * @typedef {Object} RequestOptions
 * @property {string} api 使用的api
 * @property {string} method 使用的方法
 * @property {Object} params 携带的数据
 * @property {Object} headers 请求头
 */
/**
 * XHR请求
 * @param {RequestOptions} options 参数
 * @return {Promise<ResponseData>}
 */
const getData = (options) => {
    return new Promise((resolve, reject) => {
        if (!options.api) {
            reject(new Error('api参数为空'));
        }
        let xhr = new XMLHttpRequest(),
            method = options.method || 'get',
            url = getRequestUrl(method, options || {}),
            reqParam = options.params;
        xhr.open(method, url);
        xhr.responseType = 'json';
        xhr.setRequestHeader('Content-Type', 'application/json');
        // 参数中有headers来重新设置请求头信息,headers为对象,且不为空
        if (options.headers && !isEmptyObject(options.headers)) {
            for (const key in options.headers) {
                if (options.headers.hasOwnProperty(key)) {
                    xhr.setRequestHeader(key, options.headers[key]);
                }
            }
        }
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    let response = xhr.response;
                    response = typeof (response) === 'object' ? response : JSON.parse(response);
                    resolve(response);
                } else if (xhr.status === 0) {
                    reject(new Error('No Network'));
                } else {
                    reject(new Error(xhr.statusText));
                }
            }
        };
        xhr.send(JSON.stringify(reqParam));
    });
};

const getRequestUrl = (method = 'get', options) => {
    let api = Api[options.api] || options.api;
    method = method.toLowerCase();
    if (method === 'post' || method === 'put') {
        return api;
    } else if (method === 'get' || method === 'delete') {
        if (isEmptyObject(options.params)) {
            return api;
        } else {
            api += '?' + serializeObject(options.params);
            return api;
        }
    }
    return api;
};

export default {
    getData
};
