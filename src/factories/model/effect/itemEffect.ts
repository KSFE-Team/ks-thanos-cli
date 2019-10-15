import { Effect } from './index';

export class ItemEffect extends Effect {
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
async ${this.name}(payload) {
    try {
        const response = await request(API.${this.model.namespace}.${this.api.key}, {
            method: '${this.method}',
            body: payload
        });

        if (response && response.code === 0) {
            actions.${namespace}.setReducers({
                ${this.stateName}: response.data
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
