import { isEmptyObject, serializeObject } from 'ks-utils';
import { API } from 'Src/api';

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
interface XHROptions {
    api: string;
    method: string;
    params: any;
    headers?: any;
}

export interface Response {
    [key: string]: any;
    code: number;
}

const getData = (options: XHROptions) => {
    return new Promise((resolve, reject) => {
        if (!options.api) {
            reject(new Error('api参数为空'));
        }
        const xhr = new XMLHttpRequest();
        const method = options.method || 'get';
        const url = getRequestUrl(method, options || {});
        const reqParam = options.params;
        xhr.open(method, url);
        xhr.responseType = 'json';
        xhr.setRequestHeader('Content-Type', 'application/json');
        // 参数中有headers来重新设置请求头信息,headers为对象,且不为空
        if (options.headers && !isEmptyObject(options.headers)) {
            Object.keys(options.headers).forEach((key) => {
                if (key in options.headers) {
                    xhr.setRequestHeader(key, options.headers[key]);
                }
            });
        }
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const { response } = xhr;
                    const resultResponse: Response = typeof response === 'object' ? response : JSON.parse(response);
                    resolve(resultResponse);
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

const getRequestUrl = (method: string = 'get', options: XHROptions) => {
    let api = API.uiApi[options.api] || options.api;
    const lowerMethod = method.toLowerCase();
    if (lowerMethod === 'post' || lowerMethod === 'put') {
        return api;
    }
    if (lowerMethod === 'get' || lowerMethod === 'delete') {
        if (isEmptyObject(options.params)) {
            return api;
        }
        api += `?${serializeObject(options.params)}`;
        return api;
    }
    return api;
};

export default {
    getData,
    Response,
};
