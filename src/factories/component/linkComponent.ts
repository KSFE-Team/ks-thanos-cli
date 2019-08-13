import { BasicComponent } from './basicComponent';
import Page from '../page/page';
import { ComponentConfig } from './types';

export interface LinkComponentStructure extends ComponentConfig {
    href: string;
    text: string;
}

export class LinkComponent extends BasicComponent implements LinkComponentStructure {

    href = ''
    text = ''

    constructor(page: Page, config: LinkComponentStructure) {
        super(page, config);
        this.href = config.href;
        this.text = config.text;
    }

    toCode() {
        return `<a href="${this.href}">${this.text}</a>`;
    }
}