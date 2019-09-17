import { ConnectDecoratorConfig } from './types';
import { Decorator } from './index';
import { Value } from '../value/index';

export class ConnectDecorator extends Decorator {
    config: ConnectDecoratorConfig
    constructor(config: ConnectDecoratorConfig) {
        super();
        this.config = config;
    }

    updateInputProps(inputProps: string[]) {
        this.config.inputProps = this.config.inputProps.concat(inputProps);
    }

    updateOutputProps(outputProps: Value[]) {
        this.config.outputProps = this.config.outputProps.concat(outputProps);
    }

    getOutputPropTypesCode() {
        const outputProps = this.config.outputProps;
        return outputProps.map((props) => {
            const {key, type} = props;
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
        const inputCode = this.config.inputProps.join(',\n');
        const outputCode = this.config.outputProps.map((props) => {
            const { key, value } = props;
            if (key === value) {
                return key;
            } else {
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
