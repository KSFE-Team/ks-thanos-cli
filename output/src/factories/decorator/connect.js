"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConnectDecorator {
    constructor(config) {
        this.config = config;
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