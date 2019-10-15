import { Effect, EffectRequestParams } from './index';

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

    toCode(listParmas: EffectRequestParams[] = []) {
        const namespace = this.model.namespace;
        const otherPostData = listParmas.map((param) => {
            const { name, value, defaultValue } = param;
            if (value) {
                if(defaultValue) {
                    return `${name}: ${value} || ${defaultValue}`;
                }
                return `${name}: ${value}`;
            } else {
                if (defaultValue) {
                    return `${name}: (state.${name} && state.${name}.value) || ${defaultValue}`;
                }
                return `${name}: state.${name} && state.${name}.value`;
            }
        }).join(',\n');
        return `
async ${this.name}(payload, getState) {
    try {
        const state = getState().${namespace}.${this.stateName};

        let postData = {
            pageSize: state.limit,
            pageNo: state.page,${otherPostData ? '\n' + otherPostData : ''}
        };

        const response = await request(API.${this.model.namespace}.${this.api.key}, {
            method: '${this.method}',
            body: postData
        });

        if (response && response.code === 0) {
            actions.${namespace}.setReducers({
                ${this.stateName}: {
                    ...state,
                    list: response.data.list,
                    total: response.data.totalCount
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
