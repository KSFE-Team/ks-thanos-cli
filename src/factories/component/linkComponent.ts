import { BasicComponent, ComponentStructure } from './basicComponent';

export interface LinkComponentStructure extends ComponentStructure {
    href: string;
    text: string;
}

export class LinkComponent extends BasicComponent implements LinkComponentStructure {

    href = ''
    text = ''

    constructor(config: LinkComponentStructure) {
        super(config);
        this.href = config.href;
        this.text = config.text;
    }

    toCode() {
        return `<a href="${this.href}">${this.text}</a>`;
    }
}