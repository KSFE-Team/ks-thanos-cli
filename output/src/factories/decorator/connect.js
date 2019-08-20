"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseElement_1 = require("Src/factories/baseElement");
class ConnectDecorator extends baseElement_1.BaseElement {
    constructor(config) {
        super();
        this.config = config;
    }
    getImports() {
        return [
            {
                name: 'connect',
                source: 'kredux',
                defaultImport: false
            }
        ];
    }
    toCode() {
        const inputCode = this.config.inputProps.join(',\n');
        const outputCode = this.config.outputProps.join(',\n');
        return `@connect((
            { 
                ${inputCode}
            }
        ) => ({
            ${outputCode}   
        }))`;
    }
}
exports.ConnectDecorator = ConnectDecorator;
//# sourceMappingURL=connect.js.map