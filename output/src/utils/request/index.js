"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const debugger_1 = __importDefault(require("../debugger"));
const debug = debugger_1.default(__filename);
async function request(options) {
    const { method = 'get', url, headers = {}, params = {} } = options;
    const requestMethod = method.toLowerCase();
    let config = {
        url,
        method,
        headers
    };
    if (requestMethod === 'post' || requestMethod === 'put') {
        config.data = params;
    }
    else {
        config.params = params;
    }
    debug(JSON.stringify(config));
    return axios_1.default(config)
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
exports.default = request;
//# sourceMappingURL=index.js.map