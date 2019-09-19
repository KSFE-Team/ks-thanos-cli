import { Effect } from './index';

export class UpdateeEffect extends Effect {
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
            message.success('修改成功！');
        }
    } catch (error) {
        console.error(error);
    }
}
`;
    }
}
