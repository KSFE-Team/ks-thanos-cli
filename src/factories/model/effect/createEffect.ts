import { Effect } from './index';

export class CreateEffect extends Effect {
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
            }
        ];
        return imports;
    }

    toCode() {
        return `
async ${this.name}(payload, getState) {
    try {
        const response = await request('${this.config.api}', {
            method: '${this.method}',
            body: payload
        });
        if (response && response.code === 200) {
            message.success('新增成功！');
        }
    } catch (error) {
        console.error(error);
    }
}
`;
    }
}