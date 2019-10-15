import axios, { AxiosRequestConfig, Method } from 'axios';
import Debug from '../debugger';

const debug = Debug(__filename);

async function request(options: {
    method?: Method;
    url: string;
    params?: {
        [name: string]: any;
    };
    headers?: {
        [name: string]: string;
    };
}) {
    const { method = 'get', url, headers = {}, params = {} } = options;
    const requestMethod = method.toLowerCase();
    let config: AxiosRequestConfig = {
        url,
        method,
        headers
    };
    if (requestMethod === 'post' || requestMethod === 'put') {
        config.data = params;
    } else {
        config.params = params;
    }

    debug(JSON.stringify(config));

    return axios(config)
        .then((response) => {
            if (response.status !== 200) {
                throw new Error(response.statusText);
            }
            const { errcode, message, result } = response.data;
            if (errcode || !result) {
                if (result) {
                    throw new Error(result.message || '请求失败！');
                }
                throw new Error(message || '请求失败！');
            }

            return result;
        });
}

export default request;
