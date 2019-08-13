export interface DataDependenceStructure {
    type: 'fetch' | 'dict';
    api: string;
    responseType: 'list' | 'object';
}

export class DataDependence {

    type: 'fetch' | 'dict'
    api: string
    responseType: 'list' | 'object'

    constructor(config: DataDependenceStructure) {
        this.type = config.type;
        this.api = config.api;
        this.responseType = config.responseType;
    }
}
