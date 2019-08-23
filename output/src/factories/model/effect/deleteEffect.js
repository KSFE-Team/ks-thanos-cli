"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const string_1 = require("Src/utils/string");
class DeleteEffect extends index_1.Effect {
    constructor(stateName, model, config) {
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
            }
        ];
        return imports;
    }
    toCode() {
        return `
            async ${this.name}(payload, getState) { 
                try {
                    const response = await request(${this.api}, {
                        method: '${this.method}',
                        data: payload
                    });
                    if (response && response.code === 200) {
                        message.success('删除成功！');
                        actions.${this.model.namespace}.${this.stateName}.load${string_1.upperFirst(this.stateName)}List();
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        `;
    }
}
exports.DeleteEffect = DeleteEffect;
//# sourceMappingURL=deleteEffect.js.map