"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const string_1 = require("Src/utils/string");
const basicElement_1 = require("Src/factories/basicElement");
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const PREFIX_NAME_MAP = {
    'get': 'load',
    'save': 'create',
    'delete': 'delete',
    'update': 'update'
};
const SUFFIX_NAME_MAP = {
    'list': 'List',
    'object': 'Item'
};
class Effect extends basicElement_1.BasicElement {
    constructor(stateName, model, config) {
        super();
        this.params = [];
        this.getRowSelectionCodes = () => {
        };
        this.model = model;
        this.config = config;
        this.stateName = stateName;
        const { method, api, type, params = [], actionType, responseType } = config;
        this.method = method;
        this.api = api;
        this.dataSourceType = type;
        this.responseType = responseType;
        this.actionType = actionType;
        this.params = params;
        this.name = PREFIX_NAME_MAP[actionType] + string_1.upperFirst(stateName) + SUFFIX_NAME_MAP[responseType];
        const apiDataPath = path_1.default.join(process.cwd(), 'src/api/apiData.json');
        const apiDataJSON = fs_extra_1.default.readJSONSync(apiDataPath);
        const pageAPI = apiDataJSON[this.model.namespace] || {};
        pageAPI[api.key] = api.value;
        apiDataJSON[api.stageName || this.model.namespace] = pageAPI;
        fs_extra_1.default.writeJSONSync(apiDataPath, apiDataJSON, {
            spaces: '\t'
        });
    }
}
exports.Effect = Effect;
//# sourceMappingURL=index.js.map