"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basicElement_1 = require("Src/factories/basicElement");
class ConnectDecorator extends basicElement_1.BasicElement {
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