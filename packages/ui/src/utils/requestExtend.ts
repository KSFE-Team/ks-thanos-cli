import { stringify } from 'qs';
import { notification } from 'antd';
const fetch = require('isomorphic-fetch');

// import Humps from 'ks-module-humps';
const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

/**
 * 检查返回值状态码
 *
 * @param {response||response.json()} 状态码和返回code的双重判断
 * @return {response||error}
 */
function checkStatus(response, customerError) {
    /**
    * status 可能是状态码 可能是返回code
    * @type {number}
    */
    let status;
    if ('status' in response) {
        status = response.status;
    } else if ('errcode' in response) {
        status = response.errcode;
    } else if ('code' in response) {
        status = response.code;
    }
    if ((status >= 200 && status < 300) || status === 0) {
        return response;
    } else if (customerError) {
        return response;
    }
    // const errortext = codeMessage[status] || response.statusText || response.msg;
    const errortext = response.statusText || (response.result && response.result.message) || codeMessage[status];
    if (status !== 401) {
        notification.error({
            message: `请求错误 ${status}`, // : ${response.url}
            description: errortext,
        });
    }
    const error: any = new Error(errortext);
    error.name = status;
    error.response = response;
    throw error;
}

/**
 * 异步请求
 * @param  {String} url     // 请求地址
 * @param {Option} options // 配置
 * @return {Promise}        // 返回promise对象
 *
 * @typedef {Object} Option
 * @property {String} method // 请求方式  默认不传为get
 * @property {Object} body // 请求体
 */
export default function request(url, options, customerError = false) {
    const defaultOptions = {
        mode: 'cors',
        // credentials: 'include',
        headers: {}
    };
    let newOptions = { ...defaultOptions, ...options };
    switch (`${newOptions.method}`) {
        case 'post':
        case 'POST':
            newOptions.method = 'POST';
            break;
        case 'get':
        case 'GET':
            newOptions.method = 'GET';
            break;
        default:
    }
    if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
        if (!(newOptions.body instanceof FormData)) {
            newOptions.headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                ...newOptions.headers,
            };
            newOptions.body = JSON.stringify(newOptions.body);
        } else {
            // newOptions.body is FormData
            delete newOptions.headers;
        }
    } else if (newOptions.method === 'GET') {
        if (newOptions.body) {
            url = `${url}?${stringify(newOptions.body)}`;
        }
        newOptions = null;
    }
    return fetch(url, newOptions)
        .then((response) => checkStatus(response, customerError))
        .then((response) => response.json())
        .then((response) => checkStatus(response, customerError))
        // .then((response) => Humps.parse(response))
        .catch((e) => {
            console.warn(e);
        }); ;
}
