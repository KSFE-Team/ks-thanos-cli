"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const upperFirst_1 = require("../../utils/upperFirst");
const effect_1 = require("../model/effect");
const PREFIX_NAME_MAP = {
    'GET': 'load',
    'POST': 'set'
};
const SUFFIX_NAME_MAP = {
    'list': 'List',
    'object': 'Item'
};
class DataDependence {
    constructor(stateName, model, config) {
        this.type = config.type;
        this.api = config.api;
        this.responseType = config.responseType;
        this.method = config.method;
        const effectName = PREFIX_NAME_MAP[this.method] + upperFirst_1.upperFirst(stateName) + SUFFIX_NAME_MAP[this.responseType];
        const effectCode = `
            async ${effectName}(payload, getState) {
                try {
                    const state = getState().${model.namespace}.${stateName};

                    let postData = {
                        size: state.limit,
                        page: state.page,
                    };

                    const response = await call(request, \`${this.api}?\${stringify(postData)}\`)

                    if (response && response.code === 200) {
                        actions.${model.namespace}.setReducer({
                            ${stateName}: {
                                ...state,
                                list: response.data.content,
                                page: response.data.pageNumber,
                                total: response.data.totalElements
                            }
                        });
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        `;
        this.effect = new effect_1.Effect({
            name: effectName,
            code: effectCode
        });
    }
}
exports.DataDependence = DataDependence;
//# sourceMappingURL=index.js.map