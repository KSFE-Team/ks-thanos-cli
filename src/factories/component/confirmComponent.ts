import { BasicComponent, ComponentStructure } from './basicComponent';

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

    constructor(config: ConfirmComponentStructure) {
        super(config);
        this.buttonText = config.buttonText;
        this.title = config.title;
        this.okText = config.okText || '确定';
        this.cancelText = config.cancelText || '取消';
    }

    toCode() {
        return `
            <${this.className} onClick={() => {
                Modal.confirm({
                    title: ${this.title},
                    okText: ${this.okText},
                    cancelText: ${this.cancelText}
                });
            }}>${this.buttonText}</${this.className}>
        `;
    }
}