import { ConnectDecoratorConfig } from './types';
import { BasicElement } from 'Src/factories/basicElement';

export class ConnectDecorator extends BasicElement {
    config: ConnectDecoratorConfig
    constructor(config: ConnectDecoratorConfig) {
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