"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
class ListEffect extends index_1.Effect {
    getImports() {
        const imports = [
            {
                name: 'request',
                source: 'Src/utils/request',
                defaultImport: true
            }
        ];
        return imports;
    }
    toCode() {
        const namespace = this.model.namespace;
        return `
async ${this.name}(payload, getState) {
    try {
        const state = getState().${namespace}.${this.stateName};

        let postData = {
            size: state.limit,
            page: state.page,
        };

        const response = await request('${this.config.api}', { 
            method: ${this.method},
            data: postData
        });

        if (response && response.code === 200) {
            actions.${namespace}.setReducer({
                ${this.stateName}: {
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
}`;
    }
}
exports.ListEffect = ListEffect;
//# sourceMappingURL=listEffect.js.map