import { Component, ComponentConfig } from '../basic';
import Page from '../../page';

export interface LinkComponentConfig extends ComponentConfig {
    href: string;
    text: string;
}

export class LinkComponent extends Component implements LinkComponentConfig {

    href = ''
    text = ''

    constructor(page: Page, config: LinkComponentConfig) {
        super(page, config);
        this.href = config.href;
        this.text = config.text;
    }

    toCode() {
        return `<a href="${this.href}">${this.text}</a>`;
    }
}