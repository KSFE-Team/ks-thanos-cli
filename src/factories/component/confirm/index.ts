import { Component, ComponentConfig } from '../basic';
import Page from '../../page';

export interface ConfirmComponentConfig extends ComponentConfig {
    buttonText: string;
    title: string;
    okText: string;
    cancelText: string;
}

export class ConfirmComponent extends Component implements ConfirmComponentConfig {

    buttonText: string = ''
    title: string =  ''
    okText: string = ''
    cancelText: string = ''

    constructor(page: Page, config: ConfirmComponentConfig) {
        super(page, config);
        this.buttonText = config.buttonText;
        this.title = config.title;
        this.okText = config.okText || '确定';
        this.cancelText = config.cancelText || '取消';
    }

    getImports() {
        const imports = super.getImports();
        imports.push({
            name: 'Modal',
            source: 'antd',
            defaultImport: false
        });
        return imports;
    }

    toCode() {
        return `<${this.componentName}
                    onClick={() => {
                        Modal.confirm({
                            title: ${this.title},
                            okText: ${this.okText},
                            cancelText: ${this.cancelText}
                        });
                }}>${this.buttonText}</${this.componentName}>`;
    }
}