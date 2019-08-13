import { BasicComponent } from './basicComponent';
import Page from '../page/page';
import { ComponentConfig } from './types';

export interface RequestComponentStructure extends ComponentConfig {
    api: string;
    method: string;
    text: string;
}

export class RequestComponent extends BasicComponent implements RequestComponentStructure {

    api = ''
    method = ''
    text = ''

    constructor(page: Page, config: RequestComponentStructure) {
        super(page, config);
        this.api = config.api;
        this.method = config.method || 'get';
        this.text = config.text;
    }

    toCode() {
        return `<Button>${this.text}</Button>`;
    }
}