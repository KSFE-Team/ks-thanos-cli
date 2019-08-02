import { BasicComponent, ComponentStructure } from './basicComponent';

export interface RequestComponentStructure extends ComponentStructure {
    api: string;
    method: string;
    text: string;
}

export class RequestComponent extends BasicComponent implements RequestComponentStructure {

    api = ''
    method = ''
    text = ''

    constructor(config: RequestComponentStructure) {
        super(config);
        this.api = config.api;
        this.method = config.method || 'get';
        this.text = config.text;
    }

    toCode() {
        return `<Button>${this.text}</Button>`;
    }
}