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
            actions.${namespace}.setReducers({
                ${this.stateName}: {
                    ...state,
                    list: response.data.content,
                    page: response.data.pageNumber,
                    total: response.data.totalElements
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