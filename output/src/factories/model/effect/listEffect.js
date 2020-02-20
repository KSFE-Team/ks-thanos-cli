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
            },
            {
                name: 'message',
                source: 'antd',
                defaultImport: false
            },
            {
                name: 'actions',
                source: 'kredux',
                defaultImport: false
            },
            {
                name: 'API',
                source: 'Src/api',
                defaultImport: false
            }
        ];
        return imports;
    }
    toCode(listParmas = []) {
        const namespace = this.model.namespace;
        const otherPostData = listParmas.map((param) => {
            const { name, value, defaultValue } = param;
            if (value) {
                if (defaultValue) {
                    return `${name}: ${value} || ${defaultValue}`;
                }
                return `${name}: ${value}`;
            }
            else {
                if (defaultValue) {
                    return `${name}: (state.${name} && state.${name}.value) || ${defaultValue}`;
                }
                return `${name}: state.${name} && state.${name}.value`;
            }
        }).join(',\n');
        let selectionCodes = '';
        if (this.config.showSelectedRows) {
            selectionCodes = `,\nselectedRowKeys: response.data.list.length ? [response.data.list[0].id] : [],\nselectedRows: response.data.list.length ? [response.data.list[0]] : []`;
        }
        return `
async ${this.name}(payload, getState) {
    try {
        const state = getState().${namespace}.${this.stateName};

        let postData = {
            pageSize: state.limit,
            pageNo: state.page,${otherPostData ? '\n' + otherPostData : ''}
        };

        const response = await request(API.${this.api.stageName || this.model.namespace}.${this.api.key}, {
            method: '${this.method}',
            body: postData
        });

        if (response && response.code === 0) {
            actions.${namespace}.setReducers({
                ${this.stateName}: {
                    ...state,
                    list: response.data.list,
                    total: response.data.totalCount${selectionCodes}
                }
            });
        } else {
            message.error(response.message);
        }
    } catch (error) {
        console.error(error);
    }
}`;
    }
}
exports.ListEffect = ListEffect;
//# sourceMappingURL=listEffect.js.map