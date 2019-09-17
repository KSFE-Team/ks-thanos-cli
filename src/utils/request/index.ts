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
            const { errcode, result: responseResult } = response.data;
            const { result, message } = responseResult;
            if (errcode || !result) {
                throw new Error(message);
            }

            return result;
        });
}

export default request;
