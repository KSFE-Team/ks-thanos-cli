"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const string_1 = require("Src/utils/string");
const basicElement_1 = require("Src/factories/basicElement");
const PREFIX_NAME_MAP = {
    'GET': 'load',
    'POST': 'set'
};
const SUFFIX_NAME_MAP = {
    'list': 'List',
    'object': 'Item'
};
class Effect extends basicElement_1.BasicElement {
    constructor(stateName, model, config) {
        super();
        this.params = [];
        this.model = model;
        this.config = config;
        this.stateName = stateName;
        const { method, api, type, params = [], actionType, responseType } = config;
        this.method = method;
        this.api = api;
        this.type = type;
        this.responseType = responseType;
        this.actionType = actionType;
        this.params = params;
        this.name = PREFIX_NAME_MAP[method] + string_1.upperFirst(stateName) + SUFFIX_NAME_MAP[responseType];
    }
}
exports.Effect = Effect;
//# sourceMappingURL=index.js.map