import { Effect } from './index';
import Model from '..';
import { upperFirst } from 'Src/utils/string';
import { EffectConfig } from 'Src/factories/model/effect';

export class DeleteEffect extends Effect {

    constructor(stateName: string, model: Model, config: EffectConfig) {
        super(stateName, model, config);
    }

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
                source: 'kredux',
                name: 'actions',
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
        return `
            async ${this.name}(payload, getState) {
                try {
                    const response = await request(API.${this.model.namespace}.${this.api.key}, {
                        method: '${this.method}',
                        data: payload
                    });
                    if (response && response.code === 0) {
                        message.success('删除成功！');
                        actions.${this.model.namespace}.${this.stateName}.load${upperFirst(this.stateName)}List();
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        `;
    }
}
