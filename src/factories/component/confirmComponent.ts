import { BasicComponent } from './basicComponent';
import Page from '../page/page';
import { ComponentStructure } from './types';

export interface ConfirmComponentStructure extends ComponentStructure {
    buttonText: string;
    title: string;
    okText: string;
    cancelText: string;
}

export class ConfirmComponent extends BasicComponent implements ConfirmComponentStructure {

    buttonText: string = ''
    title: string =  ''
    okText: string = ''
    cancelText: string = ''

    constructor(page: Page, config: ConfirmComponentStructure) {
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
        return `<${this.className}
                    onClick={() => {
                        Modal.confirm({
                            title: ${this.title},
                            okText: ${this.okText},
                            cancelText: ${this.cancelText}
                        });
                }}>${this.buttonText}</${this.className}>`;
    }
}