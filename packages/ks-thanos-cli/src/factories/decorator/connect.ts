import { ConnectDecoratorConfig } from './types';
import { Decorator } from './index';
import { Value } from '../value/index';

export class ConnectDecorator extends Decorator {
    config: ConnectDecoratorConfig
    constructor(config: ConnectDecoratorConfig) {
        super();
        this.config = config;
    }

    /* 更新connect注入 */
    updateInputProps(inputProps: string[]) {
        this.config.inputProps = this.config.inputProps.concat(inputProps);
    }

    /* 更新connect输出 */
    updateOutputProps(outputProps: Value[]) {
        this.config.outputProps = this.config.outputProps.concat(outputProps);
    }

    /* 替换connect注入 */
    replaceInputProps(inputProps: string[]) {
        this.config.inputProps = inputProps;
    }

    /* 替换connect输出 */
    replaceOutputProps(outputProps: Value[]) {
        this.config.outputProps = outputProps;
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
        const inputCode = Array.from(new Set(this.config.inputProps)).join(',\n');
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
