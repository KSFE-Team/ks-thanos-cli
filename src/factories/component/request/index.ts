import { Component, ComponentConfig } from '../basic';
import Page from '../../page';

export interface RequestComponentConfig extends ComponentConfig {
    api: string;
    method: string;
    text: string;
}

export class RequestComponent extends Component implements RequestComponentConfig {

    api = ''
    method = ''
    text = ''

    constructor(page: Page, config: RequestComponentConfig) {
        super(page, config);
        this.api = config.api;
        this.method = config.method || 'get';
        this.text = config.text;
    }

    toCode() {
        return `<Button>${this.text}</Button>`;
    }
}