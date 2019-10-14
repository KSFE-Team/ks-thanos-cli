import { Effect } from './index';

export class ListEffect extends Effect {
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

        const response = await request(API.${this.model.namespace}.${this.api.key}, {
            method: '${this.method}',
            body: postData
        });

        if (response && response.code === 200) {
            actions.${namespace}.setReducers({
                ${this.stateName}: {
                    ...state,
                    list: response.page.list,
                    total: response.page.totalCount
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
