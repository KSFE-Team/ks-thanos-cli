"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
class ConnectDecorator extends index_1.Decorator {
    constructor(config) {
        super();
        this.config = config;
    }
    updateInputProps(inputProps) {
        this.config.inputProps = this.config.inputProps.concat(inputProps);
    }
    updateOutputProps(outputProps) {
        this.config.outputProps = this.config.outputProps.concat(outputProps);
    }
    replaceInputProps(inputProps) {
        this.config.inputProps = inputProps;
    }
    replaceOutputProps(outputProps) {
        this.config.outputProps = outputProps;
    }
    getOutputPropTypesCode() {
        const outputProps = this.config.outputProps;
        return outputProps.map((props) => {
            const { key, type } = props;
            return `${key}: PropTypes.${type}`;
        }).join(',\n');
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
        const inputCode = Array.from(new Set(this.config.inputProps)).join(',\n');
        const outputCode = this.config.outputProps.map((props) => {
            const { key, value } = props;
            if (key === value) {
                return key;
            }
            else {
                return `${key}: ${value}`;
            }
        }).join(',\n');
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