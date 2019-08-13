import { ConnectDecoratorConfig } from './types';

export class ConnectDecorator {
    config: ConnectDecoratorConfig
    constructor(config: ConnectDecoratorConfig) {
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